export function shouldCloseOnEscape(key, expanded) {
  return key === "Escape" && expanded;
}

export function calculateReadingProgress(scrollY, scrollHeight, viewportHeight) {
  const scrollable = Math.max(0, scrollHeight - viewportHeight);
  if (scrollable === 0) return 0;
  return Math.min(1, Math.max(0, scrollY / scrollable));
}

if (typeof document !== "undefined") {
  document.documentElement.classList.remove("no-js");

  const skipLink = document.querySelector('.skip-link[href^="#"]');

  if (skipLink instanceof HTMLAnchorElement) {
    skipLink.addEventListener("click", () => {
      const target = document.querySelector(skipLink.hash);
      if (!(target instanceof HTMLElement)) return;
      window.requestAnimationFrame(() => target.focus());
    });
  }

  const menuToggle = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("[data-menu]");

  if (menuToggle instanceof HTMLButtonElement && menu instanceof HTMLElement) {
    const mobileNavigation = window.matchMedia("(max-width: 820px)");
    const navigationLinks = [...menu.querySelectorAll("a[href]")].filter(
      (element) => element instanceof HTMLAnchorElement,
    );
    const backgroundElements = [
      document.querySelector(".skip-link"),
      document.querySelector(".brand"),
      document.querySelector("main"),
      document.querySelector("footer"),
    ].filter((element) => element instanceof HTMLElement);

    let lockedScrollPosition = 0;
    let backgroundStates = [];

    function setMenuAvailability(open) {
      const unavailable = mobileNavigation.matches && !open;
      menu.inert = unavailable;
      menu.toggleAttribute("inert", unavailable);
      if (unavailable) menu.setAttribute("aria-hidden", "true");
      else menu.removeAttribute("aria-hidden");
    }

    function isolatePage() {
      backgroundStates = backgroundElements.map((element) => ({
        element,
        wasInert: element.inert,
        ariaHidden: element.getAttribute("aria-hidden"),
      }));

      for (const { element } of backgroundStates) {
        element.inert = true;
        element.setAttribute("inert", "");
        element.setAttribute("aria-hidden", "true");
      }
    }

    function restorePageAccess() {
      for (const { element, wasInert, ariaHidden } of backgroundStates) {
        element.inert = wasInert;
        element.toggleAttribute("inert", wasInert);
        if (ariaHidden === null) element.removeAttribute("aria-hidden");
        else element.setAttribute("aria-hidden", ariaHidden);
      }
      backgroundStates = [];
    }

    function restoreScrollPosition() {
      document.body.classList.remove("menu-open");
      document.body.style.removeProperty("top");
      const previousScrollBehavior = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = "auto";
      window.scrollTo(0, lockedScrollPosition);
      document.documentElement.style.scrollBehavior = previousScrollBehavior;
    }

    function setMenu(open, { restoreFocus = true } = {}) {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

      if (open && !mobileNavigation.matches) return;
      if (open === isOpen) {
        setMenuAvailability(open);
        return;
      }

      menuToggle.setAttribute("aria-expanded", String(open));
      menuToggle.setAttribute(
        "aria-label",
        open
          ? (menuToggle.dataset.closeLabel ?? "Close")
          : (menuToggle.dataset.openLabel ?? "Open"),
      );
      menu.dataset.open = String(open);
      setMenuAvailability(open);

      if (open) {
        lockedScrollPosition = window.scrollY;
        isolatePage();
        document.body.style.top = `-${lockedScrollPosition}px`;
        document.body.classList.add("menu-open");
        window.requestAnimationFrame(() => navigationLinks[0]?.focus());
        return;
      }

      restorePageAccess();
      restoreScrollPosition();
      if (restoreFocus) menuToggle.focus();
    }

    function closeForNavigation() {
      if (menuToggle.getAttribute("aria-expanded") === "true") {
        setMenu(false, { restoreFocus: false });
      }
    }

    menuToggle.addEventListener("click", () => {
      setMenu(menuToggle.getAttribute("aria-expanded") !== "true");
    });

    menu.addEventListener("click", (event) => {
      if (event.target instanceof Element && event.target.closest("a[href]")) {
        closeForNavigation();
      }
    });

    document.addEventListener("keydown", (event) => {
      const expanded = menuToggle.getAttribute("aria-expanded") === "true";

      if (shouldCloseOnEscape(event.key, expanded)) {
        event.preventDefault();
        setMenu(false);
        return;
      }

      if (event.key !== "Tab" || !expanded || !mobileNavigation.matches) return;

      const focusableItems = [menuToggle, ...navigationLinks];
      const firstItem = focusableItems[0];
      const lastItem = focusableItems.at(-1);
      if (!firstItem || !lastItem) return;

      if (event.shiftKey && document.activeElement === firstItem) {
        event.preventDefault();
        lastItem.focus();
      } else if (!event.shiftKey && document.activeElement === lastItem) {
        event.preventDefault();
        firstItem.focus();
      }
    });

    mobileNavigation.addEventListener("change", () => {
      if (menuToggle.getAttribute("aria-expanded") === "true") {
        setMenu(false, { restoreFocus: false });
      } else {
        setMenuAvailability(false);
      }
    });

    window.addEventListener("hashchange", closeForNavigation);
    window.addEventListener("popstate", closeForNavigation);
    window.addEventListener("pageshow", closeForNavigation);
    setMenuAvailability(false);
  }

  const progress = document.querySelector("[data-reading-progress]");

  if (progress instanceof HTMLElement) {
    let progressFrame = 0;

    function updateReadingProgress() {
      progressFrame = 0;
      const ratio = calculateReadingProgress(
        window.scrollY,
        document.documentElement.scrollHeight,
        window.innerHeight,
      );
      progress.style.setProperty("--reading-progress", String(ratio));
    }

    function scheduleReadingProgress() {
      if (progressFrame) return;
      progressFrame = window.requestAnimationFrame(updateReadingProgress);
    }

    updateReadingProgress();
    document.addEventListener("scroll", scheduleReadingProgress, { passive: true });
    window.addEventListener("resize", scheduleReadingProgress, { passive: true });
  }

  const observedSections = [...document.querySelectorAll("[data-story-section]")];
  const tocLinks = [...document.querySelectorAll("[data-toc-link]")];

  if (observedSections.length > 0 && tocLinks.length > 0 && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        const active = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => first.boundingClientRect.top - second.boundingClientRect.top)[0];

        if (!active) return;

        for (const link of tocLinks) {
          link.toggleAttribute(
            "aria-current",
            link.getAttribute("href") === `#${active.target.id}`,
          );
        }
      },
      { rootMargin: "-20% 0px -65%", threshold: [0, 0.2, 0.7] },
    );

    for (const section of observedSections) observer.observe(section);
  }
}
