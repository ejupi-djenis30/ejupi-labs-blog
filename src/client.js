export function shouldCloseOnEscape(key, expanded) {
  return key === "Escape" && expanded;
}

if (typeof document !== "undefined") {
document.documentElement.classList.remove("no-js");

const menuToggle = document.querySelector("[data-menu-toggle]");
const menu = document.querySelector("[data-menu]");

function setMenu(open, { restoreFocus = true } = {}) {
  if (!(menuToggle instanceof HTMLButtonElement) || !(menu instanceof HTMLElement)) return;
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? menuToggle.dataset.closeLabel ?? "Close" : menuToggle.dataset.openLabel ?? "Open");
  menu.dataset.open = String(open);
  document.body.classList.toggle("menu-open", open);
  if (open) {
    const firstLink = menu.querySelector("a");
    if (firstLink instanceof HTMLAnchorElement) firstLink.focus();
  } else if (restoreFocus) {
    menuToggle.focus();
  }
}

if (menuToggle && menu) {
  menuToggle.addEventListener("click", () => setMenu(menuToggle.getAttribute("aria-expanded") !== "true"));
  menu.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) setMenu(false, { restoreFocus: false });
  });
  document.addEventListener("keydown", (event) => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    if (shouldCloseOnEscape(event.key, expanded)) {
      setMenu(false);
    }
  });
  window.matchMedia("(min-width: 821px)").addEventListener("change", (event) => {
    if (event.matches && menuToggle.getAttribute("aria-expanded") === "true") {
      setMenu(false, { restoreFocus: false });
    }
  });
}

const progress = document.querySelector("[data-reading-progress]");

function updateReadingProgress() {
  if (!(progress instanceof HTMLElement)) return;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
  progress.style.setProperty("--reading-progress", String(ratio));
}

if (progress) {
  updateReadingProgress();
  document.addEventListener("scroll", updateReadingProgress, { passive: true });
  window.addEventListener("resize", updateReadingProgress, { passive: true });
}

const observedSections = [...document.querySelectorAll("[data-story-section]")];
const tocLinks = [...document.querySelectorAll("[data-toc-link]")];

if (observedSections.length > 0 && tocLinks.length > 0 && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      const active = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];

      if (!active) return;

      for (const link of tocLinks) {
        link.toggleAttribute("aria-current", link.getAttribute("href") === `#${active.target.id}`);
      }
    },
    { rootMargin: "-20% 0px -65%", threshold: [0, 0.2, 0.7] },
  );

  for (const section of observedSections) observer.observe(section);
}
}
