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
    title: "Turning Gopher into a bounded, inspectable local workbench",
    summary:
      "DIG 3.0.0 is a real Gopher client with three deliberate surfaces: a CLI over TCP, a live browser explorer behind a same-origin local gateway, and a fixture-only GitHub Pages build. The shared core parses RFC 1436 responses and RFC 4266 addresses without pretending a static browser can open raw sockets.",
    readMinutes: "11",
    facts: [
      ["Product", "Gopher CLI, local gateway and browser explorer"],
      ["Protocol", "RFC 1436 requests, menus and text; RFC 4266 URLs and search"],
      ["Safety", "Fail-closed destination policy with DNS pinning"],
      ["Status", "Open-source v3.0.0 under the MIT License"],
    ],
    evidence: {
      title: "Evidence ledger",
      intro: "The v3.0.0 claims are tied to executable checks and visible boundaries:",
      items: [
        ["Verification", "90 Node.js tests and four Chromium E2E tests pass, including the complete live path at an exact 320 px viewport."],
        ["Network policy", "Hosted mode requires an access token, rejects a hostname when any DNS answer is non-public and connects only to the address it already validated."],
        ["Output integrity", "The CLI writes through a same-directory temporary file and exposes the final path atomically; binary bytes are never printed to an interactive terminal."],
        ["Runtime", "The dependency audit reports zero vulnerabilities, and the production Docker image passes its runtime smoke check as an unprivileged process."],
        ["Public boundary", "GitHub Pages serves the explorer with committed fixtures only. Live Gopher requests require the same-origin gateway."],
      ],
    },
    starting: {
      title: "The gap between a protocol sketch and a useful client",
      paragraphs: [
        "The earlier interface could illustrate a Gopher menu, but it could not prove the important parts: how a selector becomes bytes on a socket, how text framing ends or what happens when a remote server stalls, lies about its type or returns binary data.",
        "Version 3.0.0 rebuilds the project around the real request path. The CLI opens bounded TCP connections. The local browser uses that same client through a same-origin gateway. The public Pages site stays fixture-only because browser JavaScript cannot create the raw TCP socket Gopher requires.",
      ],
    },
    constraints: {
      title: "Rules the implementation cannot blur",
      intro: "The protocol is simple; the trust boundary is not:",
      items: [
        "RFC 4266 address parsing must preserve selector and search-query semantics, while RFC 1436 framing, text terminators, dot-stuffing and binary types keep distinct wire and output rules.",
        "Every network operation needs a total deadline, idle timeout, request cap, response cap and menu-entry ceiling.",
        "Hosted fetches must fail closed on private, loopback or mixed public/private DNS answers and must connect to the validated address rather than resolving again.",
        "Untrusted text cannot control the terminal, and binary responses cannot be decoded or printed as if they were text.",
      ],
    },
    diagnosis: {
      title: "A local gateway, not an open proxy",
      paragraphs: [
        "Putting an internet-wide HTTP proxy behind the explorer would make the page convenient and create an SSRF service at the same time. DIG instead keeps the gateway beside the user, accepts API calls only from its own browser origin and emits no CORS access for other sites.",
        "Hosted mode is explicit rather than inferred. It requires a token, blocks private destinations and pins the validated DNS result into the TCP connection. Local private access exists only behind an explicit flag and a visible warning.",
      ],
    },
    architecture: {
      title: "One fetch path, two live interfaces",
      intro:
        "A Gopher URL and optional search query pass through URL validation, destination policy and a pinned bounded TCP connection. The response then enters the shared RFC parser. The CLI renders or saves it directly; the same-origin gateway returns a typed result to the browser explorer.",
      labels: ["URL + QUERY", "DESTINATION POLICY", "PINNED TCP", "RFC PARSER", "CLI + EXPLORER"],
      caption: "The CLI and local explorer share the real protocol path; Pages stops at the fixture boundary.",
    },
    decisions: {
      title: "Decisions that make the boundary visible",
      intro: "Each surface says clearly what it can reach and what it stores.",
      items: [
        {
          title: "Resolve once, then connect to what was checked",
          body: "The hosted policy rejects the whole hostname if any DNS answer is non-public. A successful lookup returns the exact address used by the TCP client, closing the usual validation-to-connection gap.",
          tradeoff: "Strict mixed-answer rejection can block unusual but legitimate DNS setups; it is safer than guessing which answer an attacker intended.",
        },
        {
          title: "Keep live requests same-origin",
          body: "The gateway serves both the interface and its small JSON API, validating origin, body shape, rate and size before any Gopher fetch. Pages ships the same explorer over fixtures and never enables live or cross-origin access.",
          tradeoff: "A live resource requires the local or deliberately hosted gateway; the public site remains static rather than becoming a reusable proxy API.",
        },
        {
          title: "Preserve response bytes",
          body: "Raw inspection is opt-in for text and menus. Binary resources retain exact bytes, byte count and SHA-256 digest; the browser downloads them and the CLI saves them atomically.",
          tradeoff: "Exactness needs separate text and binary paths, but avoids silent UTF-8 corruption and half-written files.",
        },
      ],
    },
    delivery: {
      title: "How v3.0.0 is checked",
      paragraphs: [
        "The 90-test Node.js suite covers RFC parsing, real TCP fixtures, network policy, the HTTP contract, atomic CLI output, static assets and release rules. Four Chromium flows drive the explorer through the local gateway, including search, history, bookmarks, raw inspection, export, binary download and the 320 px layout.",
        "The release gate also runs a zero-vulnerability dependency audit and starts the unprivileged Docker image for a runtime smoke check. The project ships under MIT; the Pages build remains static while the container starts only the authenticated hosted gateway.",
      ],
    },
    result: {
      title: "What works today",
      paragraphs: [
        "From the terminal, a user can fetch real menus, text, searches and common binary types, inspect hashes and sizes, or save exact bytes without exposing a partial target file. In the local explorer, the same live fetch path adds navigation history, bookmarks, search forms, raw response inspection, JSON export and binary download.",
        "DIG does not turn Gopher into HTTP. Traffic to a Gopher server remains cleartext, Pages does not fetch live resources, and Gopher+, TLS, Telnet sessions and recursive crawling stay outside the supported contract.",
      ],
    },
    scope:
      "This case study describes the checked v3.0.0 implementation: RFC 1436 menu and text framing, RFC 4266 URLs and search, common binary items, bounded TCP, a same-origin gateway and the fixture-only Pages explorer. UTF-8 is the supported URL-field encoding; the project does not provide server authentication or encrypted Gopher transport.",
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
    category: "School operations software",
    cardTitle: "VECTOR",
    title: "Designing a self-hosted placement system that a school can own",
    summary:
      "VECTOR 3.0.0 is a white-label placement operations system that a school can run on its own infrastructure. It brings cohorts, students, hosts, placements, hours, check-ins and evidence into one server-backed workflow, with access rules enforced by the API.",
    readMinutes: "12",
    facts: [
      ["Product", "Self-hosted white-label placement operations"],
      ["Role", "Clean-room product, architecture and implementation"],
      ["Deployment", "One school per installation"],
      ["Status", "Open-source v3.0.0 under the MIT License"],
    ],
    evidence: {
      title: "Evidence ledger",
      intro: "The v3.0.0 repository ties its product claims to concrete controls:",
      items: [
        ["Access", "Admin, coordinator, tutor and viewer permissions are checked on the server. A seeded administrator must replace the temporary password before using operational data."],
        ["Records", "SQLite runs in WAL mode behind explicit migrations. Revision checks prevent one operator from silently overwriting another operator’s changes."],
        ["Workflow", "Readiness gates and state transitions cover placements, verified or voided hours, check-ins and evidence that can be superseded without erasing its history."],
        ["Governance", "Audit metadata excludes personal fields. Retention runs honour student-level holds and require an exact preview fingerprint before bounded deletion batches execute."],
        ["Delivery", "The release path builds a reproducible source artifact, verifies it from extraction and exercises backup, inspection, restore and compaction against the packaged application."],
      ],
    },
    starting: {
      title: "The operational problem",
      paragraphs: [
        "Placement work is not one dashboard. A school has to coordinate cohorts, students, host organisations, tutors, dates, hours, check-ins and signed evidence. Different roles need different views of the same record, and corrections must not erase what happened before.",
        "The earlier academic implementation could not be reused as a product codebase. I rebuilt VECTOR from first principles, using only the placement domain as a reference. No legacy code, personal records, names or assets entered the new repository.",
      ],
    },
    constraints: {
      title: "What a school-owned system must guarantee",
      intro: "The architecture starts with four practical constraints:",
      items: [
        "Each installation belongs to one school, which owns its database, branding, backups and deployment.",
        "Permissions and tutor scope must be enforced by the server before records are selected, counted or exported.",
        "Verified hours and signed evidence need explicit correction paths that preserve the original record.",
        "Imports, exports, retention and recovery must be bounded, reviewable and safe to repeat after a failure.",
      ],
    },
    diagnosis: {
      title: "Choose the ownership boundary first",
      paragraphs: [
        "Keeping more state in the browser would still leave the difficult questions unanswered. It could hide role checks in the interface, load an entire school into memory and treat a changed field as if no previous value had existed.",
        "VECTOR uses one school per installation instead of building a shared multi-tenant service. That gives each school a clear operational boundary and makes backup, retention and white-label configuration easier to reason about. It also means the project ships software, not a managed cloud platform.",
      ],
    },
    architecture: {
      title: "A compact server with explicit boundaries",
      intro:
        "The browser workspace talks to an Express API that owns authentication, role checks and workflow transitions. SQLite stores one school’s records in WAL mode. Opaque AES-GCM cursors bind pagination to the active school, scope and filters, while bounded lookup routes keep forms responsive without loading whole tables.",
      labels: ["BROWSER WORKSPACE", "EXPRESS POLICY LAYER", "SQLITE WAL", "AUDIT + RETENTION", "BACKUP + RELEASE"],
      caption: "The server decides what an operator may see and change; the browser renders that decision.",
    },
    decisions: {
      title: "Decisions that make daily use safer",
      intro: "The product favours visible rules over convenient hidden state.",
      items: [
        {
          title: "Scope before paging",
          body: "Every list applies school and role scope before its limit. Authenticated opaque cursors bind that scope, the active filters and a stable sort position. Search lookups return only a small set of eligible records.",
          tradeoff: "The interface cannot fetch an unlimited table in one request. Full operational extraction lives in a separate filtered export with a 10,000-row cap.",
        },
        {
          title: "Correct evidence without rewriting history",
          body: "Readiness rules govern placement transitions. Hours move through verification or voiding, and a signed document is corrected by superseding it with a new record instead of editing the evidence in place.",
          tradeoff: "Operators take an explicit correction step, but reviewers can still reconstruct the sequence of decisions.",
        },
        {
          title: "Make bulk administration fail closed",
          body: "CSV imports validate the complete file inside one transaction. Retention previews include held records, remaining work and an exact fingerprint; execution rejects a stale preview and deletes in bounded batches.",
          tradeoff: "Large administrative changes require a deliberate preview and may need several runs. That is preferable to a partial import or an unreviewed mass deletion.",
        },
      ],
    },
    delivery: {
      title: "Self-hosting and recovery",
      paragraphs: [
        "Schools can set their own name, colours, logo and support details with revision checks that protect concurrent edits. The Docker image runs as a non-root user and supports a read-only root filesystem. Health and doctor commands expose configuration and storage problems before normal use.",
        "Backup tooling creates a private SQLite snapshot, inspects it without starting the application, restores it through a guarded maintenance path and compacts retained data when required. Release automation builds the source package twice, verifies its inventory and commit, scans for secrets, installs from the extracted artifact and runs the acceptance path there.",
      ],
    },
    result: {
      title: "What VECTOR supports today",
      paragraphs: [
        "A school can manage cohorts, students, hosts, placement periods and assignments; verify hours; record check-ins; preserve document history; review scoped audit events; import data atomically and export a filtered operational snapshot. Administrators can also place a student on retention hold before old records are removed.",
        "VECTOR is self-hosted open-source software. It is not a managed SaaS, and it does not claim compliance certification, high-availability deployment or SSO. Those remain deployment and product work for an institution that needs them.",
      ],
    },
    scope:
      "This case study describes the checked-in v3.0.0 architecture and its self-hosting controls. GitHub Pages presents the product without operational data; the application itself runs from the server package. No real school records, institutional integrations or placement outcomes are represented.",
  },
};
