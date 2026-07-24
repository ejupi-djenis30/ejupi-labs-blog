export function shouldCloseOnEscape(key, expanded) {
  return key === "Escape" && expanded;
}

export function calculateReadingProgress(scrollY, scrollHeight, viewportHeight) {
  const scrollable = Math.max(0, scrollHeight - viewportHeight);
  if (scrollable === 0) return 0;
  return Math.min(1, Math.max(0, scrollY / scrollable));
}

export function normalizeSearchValue(value) {
  return String(value)
    .normalize("NFKD")
    .replace(/\p{Diacritic}/gu, "")
    .toLocaleLowerCase()
    .trim()
    .replace(/\s+/g, " ");
}

export function matchesCaseStudy(
  { text, kind, topic },
  { query = "", selectedKind = "", selectedTopic = "" },
) {
  const words = normalizeSearchValue(query).split(" ").filter(Boolean);
  const normalizedText = normalizeSearchValue(text);
  return (
    (!selectedKind || kind === selectedKind) &&
    (!selectedTopic || topic === selectedTopic) &&
    words.every((word) => normalizedText.includes(word))
  );
}

if (typeof document !== "undefined") {
  document.documentElement.classList.remove("no-js");

  const discovery = document.querySelector("[data-discovery]");
  const caseCards = [...document.querySelectorAll("[data-case-card]")];

  if (discovery instanceof HTMLElement && caseCards.length > 0) {
    const search = discovery.querySelector("[data-case-search]");
    const topic = discovery.querySelector("[data-case-topic]");
    const typeButtons = [
      ...discovery.querySelectorAll("[data-case-type]"),
    ].filter((element) => element instanceof HTMLButtonElement);
    const clearButtons = [
      ...document.querySelectorAll("[data-case-clear]"),
    ].filter((element) => element instanceof HTMLButtonElement);
    const count = discovery.querySelector("[data-case-count]");
    const countLabel = discovery.querySelector("[data-case-count-label]");
    const empty = document.querySelector("[data-case-empty]");
    const searchIndexUrl = discovery.dataset.searchIndexUrl ?? "";
    const fullTextBySlug = new Map();
    let searchIndexState = "idle";
    let searchIndexPromise = null;
    let selectedKind = "";

    if (
      search instanceof HTMLInputElement &&
      topic instanceof HTMLSelectElement &&
      count instanceof HTMLElement &&
      countLabel instanceof HTMLElement &&
      empty instanceof HTMLElement
    ) {
      discovery.hidden = false;

      function readUrlState() {
        const parameters = new URLSearchParams(window.location.search);
        search.value = parameters.get("q") ?? "";
        const requestedKind = parameters.get("type") ?? "";
        selectedKind = typeButtons.some(
          (button) => button.dataset.caseType === requestedKind,
        )
          ? requestedKind
          : "";
        const requestedTopic = parameters.get("topic") ?? "";
        topic.value = [...topic.options].some(
          (option) => option.value === requestedTopic,
        )
          ? requestedTopic
          : "";
      }

      function writeUrlState() {
        const url = new URL(window.location.href);
        const values = {
          q: search.value.trim(),
          type: selectedKind,
          topic: topic.value,
        };
        for (const [key, value] of Object.entries(values)) {
          if (value) url.searchParams.set(key, value);
          else url.searchParams.delete(key);
        }
        window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
      }

      async function loadSearchIndex() {
        if (searchIndexState === "loaded" || searchIndexState === "unavailable") return;
        if (searchIndexPromise) return searchIndexPromise;

        searchIndexState = "loading";
        discovery.setAttribute("aria-busy", "true");
        searchIndexPromise = (async () => {
          try {
            if (!searchIndexUrl) throw new Error("Search index URL is missing.");
            const response = await fetch(searchIndexUrl, {
              credentials: "same-origin",
              cache: "force-cache",
            });
            if (!response.ok) throw new Error(`Search index returned ${response.status}.`);
            const payload = await response.json();
            if (
              payload?.schemaVersion !== 1 ||
              !Array.isArray(payload.cases) ||
              payload.cases.length !== caseCards.length
            ) {
              throw new Error("Search index has an unexpected shape.");
            }
            for (const entry of payload.cases) {
              if (
                typeof entry?.slug !== "string" ||
                typeof entry?.text !== "string" ||
                !caseCards.some((card) => card.dataset.caseSlug === entry.slug)
              ) {
                throw new Error("Search index contains an invalid case.");
              }
              fullTextBySlug.set(entry.slug, entry.text);
            }
            searchIndexState = "loaded";
          } catch {
            fullTextBySlug.clear();
            searchIndexState = "unavailable";
          } finally {
            discovery.removeAttribute("aria-busy");
          }
        })();
        return searchIndexPromise;
      }

      function updateResults({ updateUrl = true } = {}) {
        const hasQuery = normalizeSearchValue(search.value).length > 0;
        if (hasQuery && (searchIndexState === "idle" || searchIndexState === "loading")) {
          if (updateUrl) writeUrlState();
          if (searchIndexState === "idle") {
            void loadSearchIndex().then(() => updateResults({ updateUrl: false }));
          }
          return;
        }

        let visibleCount = 0;
        for (const card of caseCards) {
          const slug = card.dataset.caseSlug ?? "";
          const visible = matchesCaseStudy(
            {
              text: fullTextBySlug.get(slug) ?? card.textContent ?? "",
              kind: card.dataset.kind ?? "",
              topic: card.dataset.topic ?? "",
            },
            {
              query: search.value,
              selectedKind,
              selectedTopic: topic.value,
            },
          );
          card.hidden = !visible;
          if (visible) visibleCount += 1;
        }

        for (const button of typeButtons) {
          button.setAttribute(
            "aria-pressed",
            String(button.dataset.caseType === selectedKind),
          );
        }
        count.textContent = String(visibleCount);
        countLabel.textContent =
          visibleCount === 1
            ? countLabel.dataset.singular
            : countLabel.dataset.plural;
        empty.hidden = visibleCount !== 0;
        if (updateUrl) writeUrlState();
      }

      function resetFilters({ focusSearch = true } = {}) {
        search.value = "";
        topic.value = "";
        selectedKind = "";
        updateResults();
        if (focusSearch) search.focus();
      }

      search.addEventListener("input", () => updateResults());
      topic.addEventListener("change", () => updateResults());
      for (const button of typeButtons) {
        button.addEventListener("click", () => {
          selectedKind = button.dataset.caseType ?? "";
          updateResults();
        });
      }
      for (const button of clearButtons) {
        button.addEventListener("click", () => resetFilters());
      }
      document.addEventListener("keydown", (event) => {
        const target = event.target;
        const isEditing =
          target instanceof HTMLInputElement ||
          target instanceof HTMLTextAreaElement ||
          target instanceof HTMLSelectElement ||
          target instanceof HTMLElement && target.isContentEditable;
        if (event.key === "/" && !isEditing && !event.metaKey && !event.ctrlKey && !event.altKey) {
          event.preventDefault();
          search.focus();
        } else if (event.key === "Escape" && document.activeElement === search && search.value) {
          event.preventDefault();
          search.value = "";
          updateResults();
        }
      });
      window.addEventListener("popstate", () => {
        readUrlState();
        updateResults({ updateUrl: false });
      });
      readUrlState();
      updateResults({ updateUrl: false });
    }
  }

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
      window.scrollTo({
        top: lockedScrollPosition,
        left: 0,
        behavior: "instant",
      });
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
      if (restoreFocus) menuToggle.focus({ preventScroll: true });
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
