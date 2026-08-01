/**
 * @param {string} key
 * @param {boolean} expanded
 * @returns {boolean}
 */
export function shouldCloseOnEscape(key, expanded) {
  return key === "Escape" && expanded;
}

/**
 * @param {number} scrollY
 * @param {number} scrollHeight
 * @param {number} viewportHeight
 * @returns {number}
 */
export function calculateReadingProgress(scrollY, scrollHeight, viewportHeight) {
  const scrollable = Math.max(0, scrollHeight - viewportHeight);
  if (scrollable === 0) return 0;
  return Math.min(1, Math.max(0, scrollY / scrollable));
}

/**
 * @param {unknown} value
 * @returns {string}
 */
export function normalizeSearchValue(value) {
  return String(value)
    .normalize("NFKD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");
}

/**
 * @param {{ text: string, kind?: string, topic?: string }} candidate
 * @param {{ query?: string, selectedKind?: string, selectedTopic?: string }} filters
 * @returns {boolean}
 */
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

  const discoveryCandidate = document.querySelector("[data-discovery]");
  const caseCards = [...document.querySelectorAll("[data-case-card]")].filter(
    (element) => element instanceof HTMLElement,
  );

  if (discoveryCandidate instanceof HTMLElement && caseCards.length > 0) {
    const discovery = discoveryCandidate;
    const searchCandidate = discovery.querySelector("[data-case-search]");
    const clearButtons = [
      ...document.querySelectorAll("[data-case-clear]"),
    ].filter((element) => element instanceof HTMLButtonElement);
    const countCandidate = discovery.querySelector("[data-case-count]");
    const countLabelCandidate = discovery.querySelector("[data-case-count-label]");
    const searchStateCandidate = discovery.querySelector("[data-search-state]");
    const emptyCandidate = document.querySelector("[data-case-empty]");
    const caseListCandidate = document.querySelector("[data-case-list]");
    const searchIndexUrl = discovery.dataset.searchIndexUrl ?? "";
    /** @type {Map<string, string>} */
    const fullTextBySlug = new Map();
    let searchIndexState = "idle";
    /** @type {Promise<void> | null} */
    let searchIndexPromise = null;

    if (
      searchCandidate instanceof HTMLInputElement &&
      countCandidate instanceof HTMLElement &&
      countLabelCandidate instanceof HTMLElement &&
      searchStateCandidate instanceof HTMLElement &&
      emptyCandidate instanceof HTMLElement &&
      caseListCandidate instanceof HTMLElement
    ) {
      const search = searchCandidate;
      const count = countCandidate;
      const countLabel = countLabelCandidate;
      const searchState = searchStateCandidate;
      const empty = emptyCandidate;
      const caseList = caseListCandidate;
      discovery.hidden = false;

      function readUrlState() {
        const parameters = new URLSearchParams(window.location.search);
        search.value = parameters.get("q") ?? "";
      }

      function writeUrlState() {
        const url = new URL(window.location.href);
        const query = search.value.trim();
        if (query) url.searchParams.set("q", query);
        else url.searchParams.delete("q");
        url.searchParams.delete("type");
        url.searchParams.delete("topic");
        window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
      }

      async function loadSearchIndex() {
        if (searchIndexState === "loaded" || searchIndexState === "unavailable") return;
        if (searchIndexPromise) return searchIndexPromise;

        searchIndexState = "loading";
        discovery.setAttribute("aria-busy", "true");
        searchState.textContent = searchState.dataset.loading ?? "";
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
              payload.locale !== document.documentElement.lang ||
              !Array.isArray(payload.cases) ||
              payload.cases.length !== caseCards.length
            ) {
              throw new Error("Search index has an unexpected shape.");
            }
            const seenSlugs = new Set();
            for (const entry of payload.cases) {
              if (
                typeof entry?.slug !== "string" ||
                typeof entry?.text !== "string" ||
                seenSlugs.has(entry.slug) ||
                !caseCards.some((card) => card.dataset.caseSlug === entry.slug)
              ) {
                throw new Error("Search index contains an invalid case.");
              }
              seenSlugs.add(entry.slug);
              fullTextBySlug.set(entry.slug, entry.text);
            }
            searchIndexState = "loaded";
            searchState.textContent = "";
          } catch {
            fullTextBySlug.clear();
            searchIndexState = "unavailable";
            searchState.textContent = searchState.dataset.fallback ?? "";
          } finally {
            discovery.removeAttribute("aria-busy");
          }
        })();
        return searchIndexPromise;
      }

      function updateResults({ updateUrl = true } = {}) {
        const hasQuery = normalizeSearchValue(search.value).length > 0;
        for (const button of clearButtons) button.disabled = !hasQuery;
        if (!hasQuery) {
          searchState.textContent = "";
        } else if (searchIndexState === "unavailable") {
          searchState.textContent = searchState.dataset.fallback ?? "";
        }
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
            },
            {
              query: search.value,
            },
          );
          card.hidden = !visible;
          if (visible) {
            card.dataset.resultTone = ["paper", "oxide", "ink"][visibleCount % 3];
            visibleCount += 1;
          } else {
            delete card.dataset.resultTone;
          }
        }

        caseList.dataset.visibleCount = String(visibleCount);
        count.textContent = String(visibleCount);
        countLabel.textContent =
          visibleCount === 1
            ? (countLabel.dataset.singular ?? "")
            : (countLabel.dataset.plural ?? "");
        empty.hidden = visibleCount !== 0;
        if (updateUrl) writeUrlState();
      }

      function resetSearch({ focusSearch = true } = {}) {
        search.value = "";
        updateResults();
        if (focusSearch) search.focus();
      }

      search.addEventListener("input", () => updateResults());
      for (const button of clearButtons) {
        button.addEventListener("click", () => resetSearch());
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

  const menuToggleCandidate = document.querySelector("[data-menu-toggle]");
  const menuCandidate = document.querySelector("[data-menu]");

  if (
    menuToggleCandidate instanceof HTMLButtonElement &&
    menuCandidate instanceof HTMLElement
  ) {
    const menuToggle = menuToggleCandidate;
    const menu = menuCandidate;
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
    /** @type {Array<{ element: HTMLElement, wasInert: boolean, ariaHidden: string | null }>} */
    let backgroundStates = [];

    /** @param {boolean} open */
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
        behavior: "auto",
      });
    }

    /**
     * @param {boolean} open
     * @param {{ restoreFocus?: boolean }} [options]
     */
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

      const firstLink = navigationLinks[0];
      const lastLink = navigationLinks.at(-1);
      if (!firstLink || !lastLink) return;

      if (event.shiftKey && document.activeElement === firstLink) {
        event.preventDefault();
        menuToggle.focus();
      } else if (event.shiftKey && document.activeElement === menuToggle) {
        event.preventDefault();
        lastLink.focus();
      } else if (!event.shiftKey && document.activeElement === lastLink) {
        event.preventDefault();
        menuToggle.focus();
      } else if (!event.shiftKey && document.activeElement === menuToggle) {
        event.preventDefault();
        firstLink.focus();
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

  const progressCandidate = document.querySelector("[data-reading-progress]");

  if (progressCandidate instanceof HTMLElement) {
    const progress = progressCandidate;
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

  for (const link of tocLinks) {
    if (!(link instanceof HTMLAnchorElement)) continue;
    link.addEventListener("click", () => {
      const sectionId = decodeURIComponent(link.hash.slice(1));
      const section = document.getElementById(sectionId);
      if (!(section instanceof HTMLElement)) return;

      for (const tocLink of tocLinks) {
        if (tocLink === link) tocLink.setAttribute("aria-current", "true");
        else tocLink.removeAttribute("aria-current");
      }

      const focusTarget = section.querySelector("h2") ?? section;
      if (!(focusTarget instanceof HTMLElement)) return;
      const hadTabIndex = focusTarget.hasAttribute("tabindex");
      if (!hadTabIndex) focusTarget.setAttribute("tabindex", "-1");
      window.requestAnimationFrame(() => {
        focusTarget.focus({ preventScroll: true });
        if (!hadTabIndex) {
          focusTarget.addEventListener(
            "blur",
            () => focusTarget.removeAttribute("tabindex"),
            { once: true },
          );
        }
      });
    });
  }

  if (observedSections.length > 0 && tocLinks.length > 0 && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        const active = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => first.boundingClientRect.top - second.boundingClientRect.top)[0];

        if (!active) return;

        for (const link of tocLinks) {
          if (link.getAttribute("href") === `#${active.target.id}`) {
            link.setAttribute("aria-current", "true");
          } else {
            link.removeAttribute("aria-current");
          }
        }
      },
      { rootMargin: "-20% 0px -65%", threshold: [0, 0.2, 0.7] },
    );

    for (const section of observedSections) observer.observe(section);
  }
}
