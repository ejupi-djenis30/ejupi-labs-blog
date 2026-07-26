export const labsCases = {
  "careeros-local": {
    category: "Local-first product",
    cardTitle: "CareerOS Local",
    title: "Building a private career workspace around evidence, not generated claims",
    summary:
      "CareerOS Local combines a Tauri desktop shell, a FastAPI sidecar, a versioned SQLite vault and a required local LLM runtime. The result is a career utility that keeps source facts, documents and analysis on the user’s device.",
    readMinutes: "11",
    facts: [
      ["Product", "Open-source desktop utility"],
      ["Role", "Product, architecture and implementation"],
      ["Trust boundary", "Local device by default"],
      ["Status", "Signed v1.6.0 release with a verified release pipeline"],
    ],
    evidence: {
      title: "Evidence ledger",
      intro: "The current repository records these reproducible checks and boundaries:",
      items: [
        ["Backend", "1,369 tests pass for v1.6.0; an independent review reran 42 portability and storage tests."],
        ["Frontend + shell", "334 frontend tests across 64 files and 17 Rust library tests pass, including the native backup writer."],
        ["Backup assurance", "Archives from versions 1–4 receive a full non-mutating preflight; the response contains bounded metadata, not archive content."],
        ["Scale fixture", "A 10,000-application agenda fixture records p95 at 68.670 ms against its 200 ms project budget."],
        ["Boundary", "Local receipts do not protect against a process that can write directly to the database; unsigned imports are quarantined."],
      ],
    },
    starting: {
      title: "The product problem",
      paragraphs: [
        "Career information tends to fragment across old CVs, job boards, notes and application portals. Generic AI tools add another problem: a polished answer can lose the connection to the fact that supports it.",
        "CareerOS Local was designed as a working record first. Experience, education, skills and achievements keep provenance, verification state and revision history. The LLM then analyses that owned record for matching and coaching instead of inventing a second, disconnected profile.",
      ],
    },
    constraints: {
      title: "What the system must protect",
      intro: "The architecture follows four product constraints:",
      items: [
        "Private career records, generated documents and analysis stay on the device.",
        "LLM-backed matching and coaching require an approved local runtime; there is no cloud-model fallback.",
        "Generated suggestions cannot silently replace source facts or their revision history.",
        "Backups, exports and erasure must cover both structured records and local artifacts coherently.",
      ],
    },
    diagnosis: {
      title: "The design decision",
      paragraphs: [
        "The hard part was not adding a chat panel. It was building a boundary between evidence, deterministic workflow state and model interpretation. Those three things have different failure modes and should not share one vague data structure.",
        "I separated them into a career vault, reproducible readiness and application records, and schema-validated local analysis pipelines. The interface can show where a conclusion came from and which corrective action belongs in the source record.",
      ],
    },
    architecture: {
      title: "A supervised local runtime",
      intro:
        "Tauri owns the desktop shell and supervises a loopback FastAPI sidecar. React provides the workspace, SQLite and local artifacts hold the durable record, and a managed llama.cpp-compatible runtime performs required LLM analysis without becoming a storage layer.",
      labels: ["TAURI + REACT", "FASTAPI", "SQLITE VAULT", "LOCAL LLM", "DOCUMENTS + JOBS"],
      caption: "Evidence and workflow state remain durable; local inference receives explicit task context.",
    },
    decisions: {
      title: "Decisions that make it a utility",
      intro: "The useful product is the complete workflow around the model.",
      items: [
        {
          title: "Keep provenance in the record",
          body: "Career facts retain their source, verification status and revisions. Resume content and application evidence can point back to that record.",
          tradeoff: "This requires more structure than a free-form profile, but it makes corrections and audits possible.",
        },
        {
          title: "Require local analysis",
          body: "Opportunity matching and coaching fail closed until the approved local runtime is ready. The application never sends the task to a remote model as a convenience fallback.",
          tradeoff: "First-run setup is heavier and hardware matters, but the privacy boundary stays honest.",
        },
        {
          title: "Package applications as evidence",
          body: "Versioned resumes, answers, requirement mappings and verified files can be exported with a canonical SHA-256 manifest.",
          tradeoff: "A dossier is more deliberate than a folder of loose files; it is also reproducible and reviewable.",
        },
      ],
    },
    delivery: {
      title: "How the product is verified",
      paragraphs: [
        "The repository tests Python services, React behaviour and Rust desktop integration. Database migrations run as upgrade, downgrade and upgrade round trips. Backup tests inspect versions 1–4 without mutation, then exercise replacement, corruption detection and verified rollback against disposable local data.",
        "Release automation also checks dependency licenses, SBOMs, containers and high-severity vulnerability policy. Product-tour captures come from the real application with fictional data, and the recorder rejects browser errors, failed API responses and visible alerts.",
      ],
    },
    result: {
      title: "What exists today",
      paragraphs: [
        "CareerOS Local is a working desktop utility with a career vault, resume studio, private opportunity pipeline, application dossiers, backups, exports and a supervised local analysis runtime.",
        "It does not claim that an LLM can decide a career. The model helps interpret an owned body of evidence; the user keeps the record, the source and the final decision.",
      ],
    },
    scope:
      "This case study describes the checked-in architecture and documented product behaviour. It does not claim employment outcomes, model accuracy on private user data or support for every local model and machine.",
  },
  "eliza-lab": {
    category: "Machine learning",
    cardTitle: "ELIZA Lab",
    title: "Turning a risky chatbot prototype into an inspectable open-set ML experiment",
    summary:
      "ELIZA Lab is a Rust machine-learning pipeline for training, calibrating and inspecting an intent classifier locally. It replaces a misleading therapy-bot premise with a reproducible, non-clinical experiment that can abstain.",
    readMinutes: "12",
    facts: [
      ["Product", "Educational ML pipeline and browser lab"],
      ["Role", "ML protocol, Rust implementation and safety redesign"],
      ["Data", "Versioned synthetic fixtures"],
      ["Status", "Reproducible v3 bundle, nested selection audit and CLI"],
    ],
    evidence: {
      title: "Evidence ledger",
      intro: "The checked artifacts expose the selection result, the frozen test and the weak cases together:",
      items: [
        ["Selection protocol", "385 train-and-development rows in 77 families run through 11 outer and 5 inner group folds, for 506 fitted models."],
        ["Selection result", "Out-of-fold accuracy is 62.597% and macro-F1 is 62.640%; the family-clustered 95% accuracy interval is 57.143–68.571%."],
        ["Frozen ID test", "82.857% accuracy and 82.278% macro-F1 on 70 synthetic English rows."],
        ["Open-set result", "The frozen policy covers 62.857% of ID rows and 11.11% of OOD rows; OOD AUROC is 0.80278 and FPR at 95% TPR is 0.7778."],
        ["Known weakness", "The 28-row contrast fixture reaches 42.86% pair accuracy; the project does not hide that failure."],
      ],
    },
    starting: {
      title: "The problem with the original premise",
      paragraphs: [
        "The repository began as a Telegram “psychologist” bot. It stored sensitive conversations and framed generated responses as something closer to care than the software could justify.",
        "I kept one useful engineering question: how does a small text classifier learn, and where does it fail? I removed accounts, transcripts, diagnosis and therapeutic claims. The new project makes the model, data split, calibration policy and safety boundary visible.",
      ],
    },
    constraints: {
      title: "What a credible experiment needs",
      intro: "The redesign had to make evaluation leakage and uncertainty harder to hide:",
      items: [
        "Related prompts must stay grouped so paraphrases cannot leak across train and test partitions.",
        "Calibration, policy selection, in-distribution testing and out-of-distribution testing need separate data roles.",
        "Weak evidence must produce abstention instead of a forced confident label.",
        "The browser and Rust implementations must verify the same versioned artifact and inference contract.",
      ],
    },
    diagnosis: {
      title: "From demo accuracy to a protocol",
      paragraphs: [
        "A single train/test score would not answer the important questions. It would not show whether similar prompt families crossed the split, whether thresholds were tuned on final test data or what happens outside the training domain.",
        "The v3 protocol therefore freezes group-aware partitions and separates model fitting, probability calibration, abstention-policy selection and final evaluation. Rust types keep final test sets out of selection APIs.",
      ],
    },
    architecture: {
      title: "The open-set pipeline",
      intro:
        "Strict TSV validation feeds a deterministic group-aware split. A training-only TF-IDF vocabulary and multinomial logistic regression produce probabilities, temperature scaling calibrates them, and a separately selected policy decides whether the model should abstain.",
      labels: ["SYNTHETIC DATA", "GROUPED SPLIT", "TF-IDF + LOGREG", "CALIBRATION", "ABSTENTION + TRACE"],
      caption: "Training, calibration, policy selection and final evaluation remain distinct.",
    },
    decisions: {
      title: "Decisions that keep the result honest",
      intro: "The project treats the evaluation protocol as part of the software.",
      items: [
        {
          title: "Freeze semantic families",
          body: "The supervised fixture contains 525 rows in 105 equal prompt families. Explicit group IDs keep related wording together during partitioning.",
          tradeoff: "The fixture is intentionally synthetic and bounded; it supports reproducibility, not claims about real clinical language.",
        },
        {
          title: "Separate unknowns from final tests",
          body: "Distinct OOD development and OOD test populations let the abstention policy be selected before its final evaluation.",
          tradeoff: "The protocol needs more fixtures and bookkeeping, but the final measurement is no longer part of tuning.",
        },
        {
          title: "Explain the actual margin",
          body: "Predictions expose probabilities, confidence, top-two margin and feature contributions that reconstruct the winning logit difference.",
          tradeoff: "Feature attribution explains this linear model’s calculation; it does not explain human meaning or intent.",
        },
      ],
    },
    delivery: {
      title: "Reproduction and release checks",
      paragraphs: [
        "The model, policy, metrics and split plan live in a SHA-256-linked bundle. The CLI can rebuild the bundle, verify every contract and run bounded batch inference. A declared reporting precision keeps the v3 bundle byte-identical across supported release targets.",
        "Rust and browser code run parity fixtures against the same model. A separate SHA-256-pinned selection report publishes every out-of-fold probability, fold assignment and candidate rank; the browser reconstructs its metrics and fails closed if the bytes or aggregates change.",
      ],
    },
    result: {
      title: "What the project demonstrates",
      paragraphs: [
        "ELIZA Lab demonstrates a complete small-model workflow: nested group-aware selection, calibration, open-set policy selection, frozen testing, artifact verification and local inference.",
        "It is not a therapist, crisis detector or production language model. Its value is that a learner can inspect the experiment and reproduce the result instead of trusting a black-box demo.",
      ],
    },
    scope:
      "All reported dataset sizes and protocol details come from the versioned repository documentation. The synthetic corpus does not establish clinical validity, broad language coverage or production readiness.",
  },
  "djenis-ai-agent": {
    category: "Agent systems",
    cardTitle: "DjenisAiAgent",
    title: "Building computer automation that exposes its permissions before it acts",
    summary:
      "DjenisAiAgent observes a Windows or browser interface, requests one structured Gemini action, checks it against runtime permissions and feeds the verified result into the next turn.",
    readMinutes: "10",
    facts: [
      ["Product", "Experimental computer-use agent"],
      ["Role", "Architecture, policy layer and implementation"],
      ["Runtime", "Windows native or browser-oriented Docker"],
      ["Status", "Working alpha with bounded capabilities"],
    ],
    evidence: {
      title: "Evidence ledger",
      intro: "The alpha’s claims are tied to checked limits rather than autonomous-task anecdotes:",
      items: [
        ["Verification", "155 unit-test declarations and a 70% repository coverage gate."],
        ["Task bounds", "50 turns, 900 seconds per task, 120 seconds per model request and 45 seconds per action by default."],
        ["Control plane", "A minimum 24-character operator token, at most eight WebSockets and two native streams by default."],
        ["Boundary", "Gemini is a cloud dependency; Docker cannot control the host desktop, and native reliability depends on UI accessibility and focus."],
      ],
    },
    starting: {
      title: "The automation problem",
      paragraphs: [
        "A computer-use loop becomes dangerous when the model’s suggestion and the program’s authority are treated as the same thing. A prompt can describe a goal; it should not silently grant filesystem, shell or desktop access.",
        "The project needed to expose only capabilities the current runtime can support, enforce an operator-selected permission tier and require observation after every action.",
      ],
    },
    constraints: {
      title: "The boundaries the runtime enforces",
      intro: "The agent is designed around explicit limits:",
      items: [
        "The default observe tier exposes runtime checks and read-only file access inside approved paths.",
        "Desktop, browser, file and system tools appear only when both the runtime and permission tier allow them.",
        "There is no general-purpose shell. The bounded program launcher invokes one allowlisted executable directly and rejects pipelines, substitutions and command chaining.",
        "A task cannot report completion until the orchestration loop has a verified post-action observation.",
      ],
    },
    diagnosis: {
      title: "Separate reasoning from authority",
      paragraphs: [
        "The model should decide which declared action it wants to request. It should not decide whether that action is permitted, how long it may run or how much output enters the next prompt.",
        "I put those decisions in a policy-gated tool registry and bounded orchestration layer. Unknown tools fail, retries and task duration are limited, and audit events pass through redaction before reaching disk.",
      ],
    },
    architecture: {
      title: "A loop that observes, decides, gates and verifies",
      intro:
        "Perception captures a screenshot or accessibility tree. Gemini returns one declared function call. The policy layer checks runtime support, tier and allowlists before a tool runs. The resulting observation becomes the next turn’s evidence.",
      labels: ["PERCEPTION", "GEMINI TOOL CALL", "POLICY GATE", "ACTION", "VERIFIED OBSERVATION"],
      caption: "The model proposes; the runtime decides what authority actually exists.",
    },
    decisions: {
      title: "Decisions that narrow the attack surface",
      intro: "Capability is treated as configuration and code, not prompt etiquette.",
      items: [
        {
          title: "Build the registry at runtime",
          body: "Unsupported tools are omitted instead of being advertised and allowed to fail after the model chooses them.",
          tradeoff: "The model sees a smaller toolset, which is preferable to pretending every environment has the same powers.",
        },
        {
          title: "Use independent gates",
          body: "System tools require the system tier and a separate dangerous-action confirmation flag, with path, application and executable allowlists.",
          tradeoff: "Configuration takes longer, but one broad switch cannot expose every high-impact action.",
        },
        {
          title: "Authenticate the local console",
          body: "The web control plane exchanges an operator token for a short-lived HttpOnly session and applies origin, rate, upload and concurrency limits.",
          tradeoff: "It remains a single-process local control plane, not a public multi-tenant service.",
        },
      ],
    },
    delivery: {
      title: "Runtime and release verification",
      paragraphs: [
        "Portable tests run on Linux while Windows CI exercises desktop-aware coverage. Static analysis, dependency audit, site validation and Docker smoke tests cover the surrounding delivery paths.",
        "Container releases are promoted by digest only after vulnerability, SBOM and provenance checks. Native desktop control remains intentionally outside Docker; the public Pages site is a presentation, not an operator console.",
      ],
    },
    result: {
      title: "What the alpha proves",
      paragraphs: [
        "The agent can operate declared desktop and browser tools through a loop whose authority is visible and bounded outside the model response.",
        "It does not claim general autonomy. UI quality, window focus, third-party latency and canvas-heavy interfaces still limit reliability, so the project belongs in disposable or carefully bounded environments.",
      ],
    },
    scope:
      "This case study reflects the documented alpha implementation. It does not claim safe unattended operation, complete protection from an allowlisted program’s own flags or support for every Windows application.",
  },
  "dig-gopher-explorer": {
    category: "Protocol tooling",
    cardTitle: "DIG",
    title: "Making the Gopher protocol inspectable without hiding its rough edges",
    summary:
      "DIG pairs a real terminal Gopher client with a deterministic browser explorer. The CLI opens gopher:// resources over bounded TCP; the web edition teaches the same parser through a safe fixture.",
    readMinutes: "8",
    facts: [
      ["Product", "Terminal client and protocol explorer"],
      ["Role", "Protocol core, CLI and browser experience"],
      ["Runtime", "Node.js and static web"],
      ["Status", "Installable CLI and offline-capable Pages app"],
    ],
    evidence: {
      title: "Evidence ledger",
      intro: "The protocol and transport claims are backed by explicit project limits:",
      items: [
        ["Verification", "68 Node.js test declarations and two browser E2E declarations in the audited release."],
        ["Request bounds", "8 KiB request cap, 5-second total deadline, 2.5-second idle timeout and 10,000 menu-entry limit by default."],
        ["Response bounds", "1 MiB default response ceiling and 10 MiB absolute configurable ceiling."],
        ["Boundary", "Direct TCP is unencrypted; TLS, authentication, Gopher+, Telnet and automatic downloads are unsupported."],
      ],
    },
    starting: {
      title: "Why rebuild a small protocol client",
      paragraphs: [
        "The repository started as a visual Flutter prototype, but the useful problem was lower-level: parse a Gopher menu faithfully, show what each field means and let a terminal user open a real resource without unbounded network behaviour.",
        "Browsers cannot create the raw TCP connection Gopher needs. Rather than disguise that limitation, the project uses one parser in two honest contexts: live TCP in the CLI and a deterministic fixture in the public explorer.",
      ],
    },
    constraints: {
      title: "The protocol boundaries",
      intro: "A small client still needs explicit network and rendering rules:",
      items: [
        "Requests have an absolute deadline, idle timeout, 8 KiB request cap and bounded response size.",
        "Binary bytes remain binary and are never printed directly to an interactive terminal.",
        "Terminal control sequences are neutralised before untrusted text reaches the screen.",
        "Malformed menu lines stay visible so the explorer does not turn parsing errors into plausible data.",
      ],
    },
    diagnosis: {
      title: "One parser, two transports",
      paragraphs: [
        "The parser and URL rules are useful independently of the network connection. Keeping them in the static site makes the protocol explainable and testable in a browser without introducing a proxy that would change the security model.",
        "The CLI adds the missing transport boundary: bounded TCP, direct unencrypted connections and explicit handling for menu, text, search and binary item types.",
      ],
    },
    architecture: {
      title: "The request path",
      intro:
        "A gopher:// URL becomes a host, port and selector. The CLI sends the selector over bounded TCP and hands returned bytes to the shared menu/text interpretation. The browser begins at the same parsing boundary with a checked-in fixture.",
      labels: ["GOPHER URL", "URL CONTRACT", "BOUNDED TCP", "MENU PARSER", "TERMINAL OR WEB"],
      caption: "The browser teaches the protocol; only the CLI crosses the TCP boundary.",
    },
    decisions: {
      title: "Decisions that keep the client legible",
      intro: "The project favours visible protocol behaviour over convenience magic.",
      items: [
        {
          title: "Preserve selectors",
          body: "RFC 4266 search URLs are parsed without collapsing selector dot-segments that belong to the remote protocol path.",
          tradeoff: "Gopher selectors do not behave like familiar HTTP paths, so the distinction must stay explicit.",
        },
        {
          title: "Fail safely in a terminal",
          body: "Text is cleaned of terminal control sequences, while binary resources must be redirected to a file.",
          tradeoff: "The client refuses some convenient output paths because terminal integrity matters more.",
        },
        {
          title: "Keep the web demo deterministic",
          body: "GitHub Pages uses an included fixture and never claims to connect to a live Gopher server.",
          tradeoff: "The explorer is a teaching surface, not a browser-based network client.",
        },
      ],
    },
    delivery: {
      title: "Release integrity",
      paragraphs: [
        "Release candidates are built twice and the npm archives and normalised SBOM evidence must match byte for byte. A clean-prefix smoke test runs the published command before release.",
        "Tagged publication validates the version, reviewed-main ancestry, checksums, attestations and immutable release inventory. None of that expands the protocol scope: Gopher+, TLS, Telnet, authentication and automatic downloads remain outside it.",
      ],
    },
    result: {
      title: "What users can inspect",
      paragraphs: [
        "A terminal user can open real Gopher menus, text and searches through a bounded transport. A browser user can navigate a keyboard-friendly fixture and inspect item type, selector, host and port at each step.",
        "The project is intentionally narrow. That narrowness makes the network boundary, parser behaviour and unsupported features easy to find.",
      ],
    },
    scope:
      "The implementation covers the documented base request, menu, text and search behaviour. Direct Gopher traffic is unencrypted, and arbitrary non-UTF-8 selector octets are outside the current scope.",
  },
  integradraw: {
    category: "Computational mathematics",
    cardTitle: "IntegraDraw",
    title: "Keeping two numerical integration tools honest with one shared corpus",
    summary:
      "IntegraDraw is a Java desktop and TypeScript Canvas workbench for comparing midpoint and trapezoidal sums with a Simpson reference. Both runtimes share versioned numerical cases and explicit tolerances.",
    readMinutes: "9",
    facts: [
      ["Product", "Visual calculus workbench"],
      ["Role", "Cross-runtime rebuild and release engineering"],
      ["Runtimes", "Java 17 desktop and TypeScript web"],
      ["Status", "Working web app and executable JAR"],
    ],
    evidence: {
      title: "Evidence ledger",
      intro: "The numerical contract is small enough to enumerate:",
      items: [
        ["Golden corpus", "Six integral cases, three invalid-expression cases and seven validation cases under schema version 1."],
        ["Verification", "22 JUnit and 80 TypeScript test declarations in the audited release."],
        ["Reference", "The browser’s composite Simpson comparison uses 8,192 subintervals."],
        ["Boundary", "The reference is not exact; discontinuities and non-finite expressions can be rejected, and runtime limits intentionally differ."],
      ],
    },
    starting: {
      title: "The consistency problem",
      paragraphs: [
        "A numerical teaching tool can look convincing while two implementations quietly disagree about interval counts, signed area or invalid functions. IntegraDraw had a Java desktop history and needed a modern browser edition without turning them into unrelated calculators.",
        "The rebuild makes the mathematical contract explicit: exactly the requested number of intervals, signed results, visible approximation error and clear rejection of non-finite inputs.",
      ],
    },
    constraints: {
      title: "What both runtimes must agree on",
      intro: "The interface is useful only when the numerical rules stay stable:",
      items: [
        "Midpoint and trapezoidal methods use exactly the segment count entered by the user.",
        "Negative area remains negative instead of being silently converted to geometric area.",
        "The comparison value is labelled a Simpson reference, never an exact symbolic result.",
        "The browser expression parser must not use eval or Function.",
      ],
    },
    diagnosis: {
      title: "A contract above the implementation",
      paragraphs: [
        "Sharing source code between Java and TypeScript would create an awkward runtime bridge without proving much. Sharing expected behaviour is the more useful boundary.",
        "I introduced a versioned golden corpus consumed by JUnit and Vitest. Runtime-specific tolerances and limits remain explicit, so a mismatch cannot disappear behind a generic loose equality helper.",
      ],
    },
    architecture: {
      title: "Two interfaces, one numerical record",
      intro:
        "The Java application packages a Swing interface and numerical core in an executable JAR. The web application uses a dependency-free expression parser, TypeScript integration routines and a responsive Canvas plot. Both verify against the shared corpus.",
      labels: ["USER FUNCTION", "SAFE PARSER", "NUMERICAL CORE", "GOLDEN CORPUS", "JAVA + CANVAS UI"],
      caption: "The implementations stay separate; their observable numerical contract is shared.",
    },
    decisions: {
      title: "Decisions that improve mathematical clarity",
      intro: "The workbench labels approximation as approximation.",
      items: [
        {
          title: "Use a bounded expression language",
          body: "The browser accepts x, constants, arithmetic, parentheses and a documented set of functions through its own parser.",
          tradeoff: "It is safer and easier to reason about than arbitrary JavaScript, but deliberately less expressive.",
        },
        {
          title: "Name the reference correctly",
          body: "The web comparison uses composite Simpson’s rule with 8,192 subintervals and calls it a reference rather than an exact result.",
          tradeoff: "Some discontinuous or non-finite functions are rejected; the project is not a symbolic proof system.",
        },
        {
          title: "Cross-check observable behaviour",
          body: "Java and TypeScript tests consume the same versioned cases while keeping their numeric tolerances visible.",
          tradeoff: "The corpus must evolve deliberately whenever the supported mathematical contract changes.",
        },
      ],
    },
    delivery: {
      title: "Packaging both applications",
      paragraphs: [
        "CI compiles Java 17, runs JUnit, packages and smoke-tests the executable JAR, then type-checks, tests and builds the TypeScript application. Release candidates also include the web bundle and SBOMs for both runtimes.",
        "Publication compares independent builds, validates dependency inventories and checks SHA-256 manifests and GitHub attestations before making a stable release visible.",
      ],
    },
    result: {
      title: "What the workbench makes visible",
      paragraphs: [
        "Users can change a function, interval and segment count, then see how midpoint and trapezoidal estimates relate to the plotted curve and Simpson reference.",
        "The desktop and web applications remain useful independently, while the shared corpus gives maintainers one place to review the numerical behaviour they promise.",
      ],
    },
    scope:
      "IntegraDraw is an exploratory teaching tool. It does not provide symbolic integration, proof, guaranteed handling of discontinuities or an exact result for arbitrary functions.",
  },
  "vector-placement-operations": {
    category: "Operations software",
    cardTitle: "VECTOR",
    title: "Rebuilding a placement dashboard around a small, testable data model",
    summary:
      "VECTOR turns a fictional placement cohort into a browser-only operations board. Search, status filters, progress views and milestone updates run locally with no account, backend or analytics service.",
    readMinutes: "7",
    facts: [
      ["Product", "Placement operations dashboard"],
      ["Role", "Product reconstruction and frontend engineering"],
      ["Data", "Fictional records only"],
      ["Status", "Working static application"],
    ],
    evidence: {
      title: "Evidence ledger",
      intro: "The public edition ships a deliberately small, testable fixture:",
      items: [
        ["Fixture", "Six fictional placements across four status states; two active and two in review."],
        ["Derived view", "The checked fixture reports 67% aggregate completion from 160/180-hour targets."],
        ["Verification", "30 Node.js and five browser E2E declarations, including 390 px mobile and exact 320 px overflow checks."],
        ["Boundary", "All persistence belongs to one browser. The project is not a live multi-user placement system."],
      ],
    },
    starting: {
      title: "The product question",
      paragraphs: [
        "Placement coordination involves people, host organisations, supervisors, milestones and hours. A useful board needs to answer simple operational questions quickly: who is blocked, what is due and which record needs attention.",
        "The original academic concept was rebuilt as a deliberately bounded static application. Public data is fictional, changes stay in the browser and every demo state can be reset.",
      ],
    },
    constraints: {
      title: "What the public edition promises",
      intro: "The reconstruction keeps its boundary small and inspectable:",
      items: [
        "Every person and organisation in the shipped dataset is fictional.",
        "Search and status filters operate on one explicit placement model.",
        "Milestone updates persist only in browser local storage and can be reset.",
        "No account, database, analytics endpoint or remote write API exists.",
      ],
    },
    diagnosis: {
      title: "Model the operation before the dashboard",
      paragraphs: [
        "A dashboard becomes brittle when totals, labels and row state each derive status differently. The first task was to make placement state and hour calculations one tested model.",
        "The interface then became a projection of that model: cohort metrics, filters and individual progress use the same functions, while local persistence stores only the fictional working state.",
      ],
    },
    architecture: {
      title: "A complete static product boundary",
      intro:
        "A checked-in fictional dataset feeds the placement model. Search, filters, cohort summaries and milestone transitions read the same derived state. The browser persists changes locally; reset restores the original fixture.",
      labels: ["FICTIONAL DATA", "PLACEMENT MODEL", "SEARCH + FILTERS", "MILESTONES", "LOCAL STORAGE"],
      caption: "One browser-local model drives the summary and the individual placement view.",
    },
    decisions: {
      title: "Decisions that keep the demo trustworthy",
      intro: "The public app does less, but every visible interaction is real.",
      items: [
        {
          title: "Ship fictional records",
          body: "The complete cohort is designed for demonstration, so the application does not need redacted production exports.",
          tradeoff: "The demo cannot claim to represent a real institution’s process or data volume.",
        },
        {
          title: "Derive metrics from the model",
          body: "Status and hour calculations are shared by cards, filters and individual records and covered by Node.js tests.",
          tradeoff: "New workflow states must update the model contract before they appear in the interface.",
        },
        {
          title: "Keep persistence local",
          body: "Milestone changes survive a refresh through local storage and a reset returns the original fixture.",
          tradeoff: "There is no collaboration, authentication or cross-device sync in this edition.",
        },
      ],
    },
    delivery: {
      title: "Static-site verification",
      paragraphs: [
        "The local server reproduces the exact GitHub Pages base path so absolute-link regressions fail before deployment. Node.js tests cover the data model and Playwright exercises the browser experience.",
        "Stable releases package deterministic ZIP and TAR archives with an inventory, CycloneDX SBOM, source-commit evidence and SHA-256 checksums.",
      ],
    },
    result: {
      title: "What the board supports",
      paragraphs: [
        "An operator can search by student, host or supervisor, filter the cohort by status, inspect progress, advance a milestone and return to the same local state after a refresh.",
        "VECTOR is a focused demonstrator, not a hosted placement service. Its value is a coherent, working interaction model with an unusually clear data boundary.",
      ],
    },
    scope:
      "The public application uses fictional records and browser-local persistence. It does not claim multi-user operation, production privacy controls, institutional integrations or real placement outcomes.",
  },
};
