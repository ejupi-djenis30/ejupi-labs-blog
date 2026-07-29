export const labsCases = {
  "careeros-local": {
    category: "Local-first product",
    cardTitle: "CareerOS Local",
    title: "Building a private career workspace around evidence, not generated claims",
    summary:
      "CareerOS Local combines a Tauri desktop shell, a FastAPI sidecar, a versioned SQLite vault and a required local LLM runtime. The result is a career utility that keeps source facts, documents and analysis on the user’s device.",
    readMinutes: "13",
    facts: [
      ["Product", "Open-source desktop utility"],
      ["Role", "Product, architecture and implementation"],
      ["Trust boundary", "Local device by default"],
      ["Status", "Signed v1.8.0 release with verified native packages for six platform and architecture targets"],
    ],
    evidence: {
      title: "Evidence ledger",
      intro: "The current repository records these reproducible checks and boundaries:",
      items: [
        ["Backend", "The v1.8.0 candidate passes 1,456 backend tests with 4 expected skips."],
        ["Frontend + shell", "354 frontend checks and all 17 Rust tests pass, alongside lint, production build and dependency-audit gates."],
        ["Portable archive", "Archive format v5 preserves the logical opportunity relationship and can still inspect and restore formats v1 through v4."],
        ["Search provenance", "Listings record first seen, last seen and content revision; a newer advert invalidates older analysis still in flight."],
        ["CLI + MCP", "The read-only CLI and stdio MCP server expose seven bounded tools through revocable, account-bound grants without opening a network listener."],
      ],
    },
    starting: {
      title: "The product problem",
      paragraphs: [
        "Career information tends to fragment across old CVs, job boards, notes and application portals. Generic AI tools add another problem: a polished answer can lose the connection to the fact that supports it.",
        "CareerOS Local was designed as a working record first. Experience, education, skills and achievements keep provenance, verification state and revision history. The guided search now starts from confirmed, contact-redacted Career Vault facts, and the LLM analyses that owned record instead of inventing a second profile.",
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
    technology: {
      title: "Why this stack fits a private desktop utility",
      intro:
        "Each boundary keeps a different responsibility local and makes its operational cost visible.",
      items: [
        {
          choice: "Tauri 2 owns the desktop shell and native lifecycle.",
          why:
            "CareerOS needs an installable workspace that can supervise the bundled sidecar, constrain native permissions and coordinate local files and backups. Tauri provides that boundary while React remains responsible for the interface.",
          alternative:
            "Electron would package another browser runtime around the same local services, while a browser-only build could not honestly own the Python process, local model runtime and native artifact lifecycle.",
          cost:
            "The project accepts Rust integration, operating-system prerequisites and cross-platform packaging work instead of treating the interface as a standalone website.",
        },
        {
          choice: "A loopback FastAPI sidecar owns the application services.",
          why:
            "The career domain benefits from Pydantic validation, SQLAlchemy transactions, Alembic migrations and Python document and analysis tooling. A narrow local API gives the React workspace one explicit contract to those capabilities.",
          alternative:
            "Moving everything into Rust would require rebuilding that service layer and its Python-oriented integrations; putting it in the browser would expose storage and local-runtime concerns to an environment that cannot supervise them.",
          cost:
            "Two processes must start, authenticate and stop together, and the release has to package the sidecar and defend its loopback boundary.",
        },
        {
          choice: "SQLite and local artifacts form the durable vault.",
          why:
            "The product is a locally owned personal workspace rather than a shared hosted service. SQLite provides transactions, explicit migrations and a portable database that can participate in the same backup and erasure workflow as generated documents.",
          alternative:
            "A separate database server would add an administered process and credentials; a cloud store would add a network and provider data boundary. Neither solves a shared-service requirement in this product’s scope.",
          cost:
            "Concurrency and scale remain those of a local utility, and migrations, archive preflight and verified restore need deliberate engineering.",
        },
        {
          choice: "A managed llama.cpp-compatible runtime performs required analysis locally.",
          why:
            "Matching and coaching operate on private career evidence. Keeping inference on the device preserves the stated boundary, and schema-validated tasks stop the model from becoming a second source of record.",
          alternative:
            "A cloud API would simplify first use and offer different model capacity, but it would send task context outside the device and make privacy depend on a provider and network connection.",
          cost:
            "Users accept model provisioning, hardware-dependent latency and a narrower set of supported runtimes; the application must also fail closed when the approved local model is unavailable.",
        },
      ],
    },
    decisions: {
      title: "Decisions that make it a utility",
      intro: "The useful product is the complete workflow around the model.",
      items: [
        {
          title: "Keep provenance in the record",
          body: "Career facts retain their source, verification status and revisions. Job listings separately record their observation history and content revision, so stale model work cannot overwrite a newer advert.",
          tradeoff: "This requires more structure than a free-form profile or replace-in-place job table, but corrections and analysis remain traceable.",
        },
        {
          title: "Keep model output downstream of evidence",
          body: "The vault supplies explicit context to matching and coaching. Model output may interpret or draft from that evidence, but it cannot become the source of record or silently overwrite verified facts.",
          tradeoff: "The user must review useful suggestions before they enter the workflow, trading seamless automation for provenance that remains inspectable and correctable.",
        },
        {
          title: "Track one application per opportunity",
          body: "A job card opens one logical application timeline with its stage, next action, versioned resumes, answers, requirement mappings and verified files. The dossier exports with a canonical SHA-256 manifest.",
          tradeoff: "The pipeline enforces a deliberate record instead of allowing duplicate ad-hoc trackers, but that record stays coherent across provider duplicates and concurrent requests.",
        },
      ],
    },
    delivery: {
      title: "How the product is verified",
      paragraphs: [
        "The v1.8.0 release candidate passed 1,456 backend tests with 4 expected skips, 354 frontend checks and 17 Rust tests. Database migrations ran as upgrade, downgrade and upgrade round trips, while archive tests exercised v5 plus inspection and restore compatibility for v1 through v4.",
        "Release automation checked dependency licences, SBOMs, containers and vulnerability policy before building the published Windows, macOS and Linux packages for x64 and ARM64. The source-installed CLI and stdio MCP server also run through bounded grant, redaction and entry-point tests.",
      ],
    },
    result: {
      title: "What exists today",
      paragraphs: [
        "CareerOS Local v1.8.0 is a working desktop utility with a Career Vault, guided search, a revisioned Job Library, one application timeline for each opportunity, a resume studio, dossiers, archive v5 and a supervised local analysis runtime.",
        "A read-only CLI and stdio MCP server let Codex, Claude Code and shell scripts inspect a deliberately small view of an authorized account. Grants are scoped, expiring and revocable; the automation surface cannot edit the vault or run free-form prompts.",
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
    readMinutes: "14",
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
    technology: {
      title: "Why the experiment stays small and explicit",
      intro:
        "The implementation favours inspectable behaviour and separated data roles over a more impressive-looking model.",
      items: [
        {
          choice: "Rust implements the training, evaluation and inference pipeline.",
          why:
            "The project publishes a repeatable executable workflow rather than a sequence of interactive cells. Rust types also encode the distinct data roles so final test fixtures cannot enter selection APIs by accident.",
          alternative:
            "A Python-only notebook would be convenient for exploration, but mutable cell state and loosely connected scripts would make the frozen protocol and release artifact harder to audit as one system.",
          cost:
            "Model experimentation requires more explicit code and a smaller library surface, and changes take longer than editing a notebook.",
        },
        {
          choice: "Training uses TF-IDF features and multinomial logistic regression.",
          why:
            "The bounded synthetic corpus suits a compact linear model whose vocabulary, probabilities, top-two margin and feature contributions can all be inspected and reproduced locally.",
          alternative:
            "A transformer could model richer language, but this corpus does not justify its data and compute demands, and a larger opaque model would distract from the evaluation protocol the lab is meant to expose.",
          cost:
            "The classifier has limited semantic reach and remains sensitive to vocabulary and phrasing; the project publishes those weak cases instead of implying broader understanding.",
        },
        {
          choice: "Group-aware nested selection keeps prompt families together.",
          why:
            "Paraphrases in one semantic family are not independent examples. Grouped outer and inner folds keep related wording on one side of each boundary while separating candidate selection from out-of-fold measurement.",
          alternative:
            "A random row split would be simpler, but near-related formulations could appear in both training and evaluation and make the resulting score easier to overstate.",
          cost:
            "The effective sample size is smaller, the protocol fits many more models and the split ledger is more involved to maintain.",
        },
        {
          choice: "Temperature calibration feeds an explicit abstention policy.",
          why:
            "Weak in-distribution evidence and out-of-distribution inputs should not be forced into a known intent. Separate calibration and OOD-development roles let confidence and margin thresholds be fixed before final testing.",
          alternative:
            "Returning the highest-probability class for every input would produce a simpler demo, but it would present an answer even when the model has little evidence for one.",
          cost:
            "Abstention reduces coverage, requires additional fixtures and threshold governance, and does not turn the remaining predictions into a safety guarantee.",
        },
      ],
    },
    decisions: {
      title: "Decisions that keep the result honest",
      intro: "The project treats the evaluation protocol as part of the software.",
      items: [
        {
          title: "Bound the claim to the synthetic fixture",
          body: "The versioned corpus is synthetic and deliberately bounded. Reported behaviour describes that fixture and frozen protocol, not clinical language, broad intent coverage or production readiness.",
          tradeoff: "This limits the conclusions, but it makes the educational experiment reproducible without borrowing credibility from a domain it has not measured.",
        },
        {
          title: "Publish the selection record",
          body: "Fold assignments, candidate ranks and out-of-fold probabilities are frozen in a SHA-256-pinned report linked to the released bundle, so the chosen model and policy can be reconstructed from the artifact.",
          tradeoff: "The release carries more governed files and consistency checks, but its summary is independently auditable instead of resting on a final score alone.",
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
    readMinutes: "12",
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
    technology: {
      title: "Why the runtime is split at the authority boundary",
      intro:
        "The stack is organised around what can observe, what can propose and what is actually allowed to act.",
      items: [
        {
          choice: "Python coordinates perception, policy and tool execution.",
          why:
            "The runtime needs Windows automation libraries, Selenium, FastAPI, model SDKs and introspection of real function signatures. Python connects those surfaces while turning the checked signatures into declared tool schemas.",
          alternative:
            "A single compiled desktop stack could simplify distribution, but it would require replacing or wrapping the automation and model integrations that define this experiment.",
          cost:
            "Dynamic boundaries demand extensive validation and tests, worker threads cannot be cancelled arbitrarily, and packaging native Windows dependencies remains part of the product.",
        },
        {
          choice: "UI Automation and Selenium provide structural interaction.",
          why:
            "Accessibility properties and browser DOM state give actions named targets that can be checked again after execution. Separate native and browser adapters also expose what each runtime can actually control.",
          alternative:
            "Coordinate- or pixel-only automation would cover some inaccessible surfaces, but ordinary layout, scaling, focus or window movement could silently change what a click means.",
          cost:
            "Accessibility trees and DOMs are incomplete for canvas-heavy or custom interfaces, Selenium adds its own runtime, and focus still limits native reliability.",
        },
        {
          choice: "Gemini must return one structured, declared action.",
          why:
            "A declared function name and structured arguments can pass through permission tiers and allowlists before execution; timeouts and the next observed state then bound and verify the result.",
          alternative:
            "Free-form commands or a general shell would be easier for a model to improvise, but they would collapse intent, parsing and permission into one ambiguous text channel.",
          cost:
            "Every capability needs a maintained schema, malformed calls fail closed and the model can only act through the smaller vocabulary the runtime exposes.",
        },
        {
          choice: "A local FastAPI console is the operator control plane.",
          why:
            "The console belongs beside the single running agent, where loopback binding, an operator token, short-lived sessions and bounded WebSockets can expose status without creating a remote service.",
          alternative:
            "A hosted control plane would make remote access easier, but it would introduce accounts, tenancy, internet exposure and centralized handling of an authority-bearing agent.",
          cost:
            "The operator must run and secure the local service, and the design deliberately gives up managed availability, multi-user collaboration and remote administration.",
        },
      ],
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
    readMinutes: "13",
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
    technology: {
      title: "Why the live protocol boundary sits outside the browser",
      intro:
        "DIG keeps transport, destination policy and representation explicit instead of hiding Gopher behind a generic web request.",
      items: [
        {
          choice: "A Node.js TCP client and gateway perform live Gopher requests.",
          why:
            "Node can write the selector and CRLF to a raw socket, enforce byte and time limits and reuse the same parser and policy as the CLI.",
          alternative:
            "Browser JavaScript cannot open raw TCP sockets, while a generic forwarding proxy would hide Gopher-specific selectors, item types and response limits behind an unrelated abstraction.",
          cost:
            "Live browser exploration needs a local process and a second HTTP boundary; the public static site can offer only verified fixtures.",
        },
        {
          choice: "The gateway is same-origin, bounded and destination-aware.",
          why:
            "DNS validation, IP pinning, response limits and the absence of CORS keep each request inside the documented local or authenticated hosted policy.",
          alternative:
            "An anonymous public proxy would be simpler to visit, but it would create an abuse and server-side request-forgery surface for arbitrary destinations.",
          cost:
            "Operators must configure authentication and network policy, and private destinations require an explicit local override rather than working by default.",
        },
        {
          choice: "Transport paths preserve response bytes before interpretation.",
          why:
            "Gopher serves menus, text and binary item types. Exact bytes, byte counts and SHA-256 digests let the CLI save binary data without corrupting it and make parser decisions inspectable.",
          alternative:
            "Decoding every response as text would be convenient for display, but it would damage binary payloads and conceal invalid or unsupported encodings.",
          cost:
            "The implementation must branch deliberately by item type, keep text encoding support narrow and carry additional metadata through each surface.",
        },
        {
          choice: "Deterministic TCP fixtures and contract tests back the browser checks.",
          why:
            "The suite can exercise real selectors, menus, binary bytes, network rejection and the local gateway through Playwright without relying on an external Gopher server.",
          alternative:
            "Manual checks against public servers would demonstrate connectivity, but remote content and availability would make failures difficult to reproduce and leave negative boundaries under-tested.",
          cost:
            "Fixtures and cross-surface contracts need maintenance, and passing them does not claim compatibility with every historical Gopher server.",
        },
      ],
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
          title: "Label fixture-only mode honestly",
          body: "The public Pages explorer states that it is backed only by deterministic fixtures. Live browsing is offered only by the local or deliberately hosted gateway, so the interface never implies that a static browser opened a Gopher connection.",
          tradeoff: "Visitors cannot point the public demo at arbitrary servers, but they can inspect the interface without turning Pages into a misleading proxy.",
        },
        {
          title: "Commit downloads only when complete",
          body: "The CLI stages output and publishes the requested path only after the bounded fetch succeeds. On failure it removes the temporary artifact instead of leaving a plausible but partial file.",
          tradeoff: "Atomic output needs staging, cleanup and sufficient local space, but callers never have to guess whether a visible target is complete.",
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
    readMinutes: "11",
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
    technology: {
      title: "Why the implementations share a contract, not a runtime",
      intro:
        "The desktop and web tools stay native to their environments while one corpus defines the behaviour they both promise.",
      items: [
        {
          choice: "Java and TypeScript keep separate numerical implementations.",
          why:
            "The executable JAR and browser application can each run independently with their platform’s normal packaging, interface and numerical code.",
          alternative:
            "A runtime bridge or generated shared source would couple both releases and could make the same implementation defect appear as agreement rather than independent evidence.",
          cost:
            "Algorithm changes and fixes must be implemented twice, and parity is enforced through tests instead of source reuse.",
        },
        {
          choice: "The browser uses a custom bounded expression parser.",
          why:
            "A documented grammar can admit x, arithmetic, constants and selected functions while rejecting unsupported syntax before numerical evaluation.",
          alternative:
            "JavaScript eval or Function would accept a broader expression language, but it would also execute arbitrary code in a tool that only needs mathematics.",
          cost:
            "The supported language is intentionally smaller, and the project owns tokenization, precedence, validation and useful parse errors.",
        },
        {
          choice: "Canvas renders the responsive browser plot.",
          why:
            "The workbench controls sampling, axes and curve rendering directly without adding a charting dependency or mapping numerical state into a large set of document nodes.",
          alternative:
            "A chart library would bring its own data and interaction conventions, while an SVG-first plot would require managing many generated elements for each redraw.",
          cost:
            "Resizing, labels, high-density rendering and non-visual explanations must be implemented explicitly because Canvas has no semantic structure of its own.",
        },
        {
          choice: "A versioned golden corpus defines cross-runtime behaviour.",
          why:
            "JUnit and Vitest consume the same cases while retaining explicit Java and TypeScript expected values and tolerances. Reviewers can see exactly where legitimate floating-point differences are allowed.",
          alternative:
            "Sharing the calculation code would guarantee similar outputs but would not independently check that two implementations satisfy the intended numerical contract.",
          cost:
            "The corpus is a governed artifact: every supported behavioural change requires reviewed cases, versioning and runtime-specific expectations.",
        },
      ],
    },
    decisions: {
      title: "Decisions that improve mathematical clarity",
      intro: "The workbench labels approximation as approximation.",
      items: [
        {
          title: "Preserve signed area",
          body: "Midpoint, trapezoidal and Simpson calculations retain the sign of the function, so regions below the x-axis subtract from the definite integral instead of being presented as positive geometric area.",
          tradeoff: "A user who wants total geometric area must split or transform the problem; preserving the sign keeps the tool faithful to the integral it labels.",
        },
        {
          title: "Name the reference correctly",
          body: "The web comparison uses composite Simpson’s rule with 8,192 subintervals and calls it a reference rather than an exact result.",
          tradeoff: "Some discontinuous or non-finite functions are rejected; the project is not a symbolic proof system.",
        },
        {
          title: "Use exactly the requested segment count",
          body: "Midpoint and trapezoidal estimates calculate and draw exactly the number of subintervals the user entered, including odd counts; the interface does not silently round it to an even value.",
          tradeoff: "A small count can produce a visibly rough approximation, but the picture remains an honest rendering of the requested experiment.",
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
    readMinutes: "14",
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
    technology: {
      title: "Why the deployment stays compact and school-owned",
      intro:
        "The stack follows the chosen ownership boundary: one institution, one installation and one recoverable record.",
      items: [
        {
          choice: "Each installation serves one school.",
          why:
            "Database ownership, branding, retention and backups align with one operational institution, making the scope of every record and administrative action explicit.",
          alternative:
            "A multi-tenant SaaS could centralize upgrades, but it would require tenant isolation, shared service operations, account recovery and governance that are outside this product’s contract.",
          cost:
            "Every school operates its own deployment and cannot rely on a managed fleet, cross-school reporting or built-in high availability.",
        },
        {
          choice: "Express and Node.js own the authorization boundary.",
          why:
            "The API applies role and tutor scope before selecting, counting, changing or exporting records, and it owns the workflow transitions that preserve evidence history.",
          alternative:
            "A browser-only application could render forms, but client-side checks cannot protect a shared school record from another operator or a modified request.",
          cost:
            "The institution must run and update a server, and API, session and migration contracts need ongoing compatibility work.",
        },
        {
          choice: "SQLite runs in WAL mode behind explicit migrations.",
          why:
            "A single-school installation gains transactions, strict relational records and a database that the supplied backup and inspection tools can snapshot as one owned artifact.",
          alternative:
            "PostgreSQL or a cloud database would offer a larger concurrency and availability envelope, but it would add another administered service to a deliberately compact deployment.",
          cost:
            "Write concurrency and scaling remain single-node concerns, and reliable use depends on maintenance windows, tested backups and guarded restore procedures.",
        },
        {
          choice: "Docker and repository-owned backup tooling define the deployment path.",
          why:
            "A school can run the same packaged service, inspect a snapshot without starting the application and restore through an explicit maintenance workflow while retaining custody of its data.",
          alternative:
            "A managed platform could absorb infrastructure work, but it would move runtime, storage and recovery decisions into a provider-specific service.",
          cost:
            "The operator remains responsible for patches, secrets, storage, monitoring and recovery drills; containers alone do not provide compliance or high availability.",
        },
      ],
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
  "jdoor-security-lab": {
    category: "Secure remote assistance",
    cardTitle: "JDoor Assist",
    title: "Turning a school remote-control prototype into consent-first assistance",
    summary:
      "JDoor began as a 2022 school networking project co-created by Djenis and a collaborator. Djenis later rebuilt its security model, session lifecycle, product UX, tests and release path as JDoor Assist: a visible, view-only-by-default desktop tool for authorized help on trusted local networks.",
    readMinutes: "12",
    facts: [
      ["Product", "Consent-first LAN remote assistance"],
      ["Origin", "2022 school project co-created by Djenis and a collaborator"],
      ["Modernization", "Security, product UX, testing and release engineering by Djenis"],
      ["Status", "Versioned v1.0.0 source snapshot under GPL-3.0"],
    ],
    evidence: {
      title: "Evidence ledger",
      intro: "The v1.0.0 repository makes these controls and limitations inspectable:",
      items: [
        [
          "Session security",
          "The host creates an ephemeral P-256 certificate, shares its exact SHA-256 pin with a random 128-bit single-use token, and requires a visible local approval before a viewer enters the session.",
        ],
        [
          "Protocol boundary",
          "A versioned binary protocol validates direction, type, dimensions, UTF-8 and payload size. One viewer is admitted at a time, screen frames are bounded, and remote input is ignored until the host enables control.",
        ],
        [
          "Verification gate",
          "The Maven Wrapper gate runs the JUnit suite, JaCoCo thresholds and Spotless checks, then builds a runnable shaded JAR and CycloneDX SBOM. Integration coverage exercises invalid-token rejection, view-only startup, streaming, permission changes and input release.",
        ],
        [
          "Boundary",
          "JDoor Assist is direct LAN software for the primary display. It provides no relay, account service, NAT traversal, file transfer or unattended access, and the documented community app images are currently unsigned.",
        ],
      ],
    },
    starting: {
      title: "Preserve the origin, change the trust model",
      paragraphs: [
        "The original JDoor was a 2022 school project that Djenis built with a collaborator. It demonstrated Java networking, screen capture and remote input. That shared origin remains part of the project record; the later work does not recast the classroom prototype as a solo project.",
        "A demonstration is not yet a support product. The old design treated an incoming connection as a control channel, without a strong authenticated pairing ceremony, a view-only state or a complete lifecycle for stuck keys, socket failures and shutdown. The modernization therefore began by narrowing what the application is allowed to do.",
      ],
    },
    constraints: {
      title: "Rules for authorized assistance",
      intro: "The rebuilt product follows four non-negotiable constraints:",
      items: [
        "Every session is for authorized support initiated by both people: the host stays visible, approves each viewer locally and never exposes unattended or background access.",
        "The network path may be observed or modified, so the viewer must authenticate the exact ephemeral certificate and present the short-lived one-time token received out of band.",
        "Screen viewing and remote control are separate permissions; control starts off, the host can revoke it immediately, and revocation or disconnect releases tracked keys and mouse buttons.",
        "Protocol input is untrusted: messages, images, timeouts, workers and cleanup need explicit bounds, directional rules and deterministic closure.",
      ],
    },
    diagnosis: {
      title: "Remote assistance, not remote administration",
      paragraphs: [
        "The central decision was not how to hide or extend the original control path. It was to replace that path with a product boundary that makes consent visible and removes persistence, shell execution and unattended access from the design.",
        "For the modernization, Djenis separated TLS identity and pairing, the framed protocol, session state, screen capture, input policy, audit events and Swing presentation. That structure makes authentication, approval, viewing and control distinct states instead of side effects of opening a socket.",
      ],
    },
    architecture: {
      title: "A session built around explicit consent",
      intro:
        "The host UI creates an ephemeral identity and one-time link. The viewer pins that certificate, presents the token and waits for local approval. Only then does the bounded channel carry screen frames; pointer and keyboard messages are applied only while the active host session owns an explicit control grant.",
      labels: ["HOST UI", "CONSENT SESSION", "PINNED TLS", "BOUNDED WIRE", "VIEWER UI"],
      caption: "Frames flow to one approved viewer; input flows back only during the host’s visible control grant.",
    },
    technology: {
      title: "Why the assistance surface stays narrow",
      intro:
        "The implementation preserves the project’s Java origin while removing infrastructure and privileges that visible LAN assistance does not need.",
      items: [
        {
          choice: "Java 21 and Swing remain the desktop application stack.",
          why:
            "The project already centres on Java networking, screen capture and input, and Swing can place host approval, view-only state and disconnect controls in the same native runtime.",
          alternative:
            "A web interface cannot perform the required raw LAN, capture and input work by itself; an Electron rewrite would add a browser-to-native bridge and discard the project’s existing implementation path.",
          cost:
            "The product accepts Swing-specific UX work, platform integration differences and Java application packaging instead of inheriting a web UI ecosystem.",
        },
        {
          choice: "The viewer connects directly over the trusted LAN.",
          why:
            "Direct connectivity keeps screen data and session decisions between the two endpoints and avoids a central service that stores accounts or relays an authority-bearing session.",
          alternative:
            "A relay and account backend would make internet and NAT traversal easier, but it would add persistent identities, hosted infrastructure and a much larger operational and security boundary.",
          cost:
            "Both people must arrange network reachability, JDoor does not cross NAT automatically and exposing its port beyond the trusted LAN is outside the supported model.",
        },
        {
          choice: "Every run uses ephemeral pinned TLS and a single-use token.",
          why:
            "The complete invitation binds the viewer to the exact temporary certificate and one short-lived session, while local approval confirms the person before viewing begins.",
          alternative:
            "A reusable password or long-lived account identity would reduce repeated pairing, but compromise and recovery would persist beyond one support session and require an identity service.",
          cost:
            "The invitation must be shared privately, both parties pair again for each host run and there is no account-based recovery when the link expires.",
        },
        {
          choice: "A narrow framed protocol carries only the approved session features.",
          why:
            "Direction, message type, dimensions and payload size can be validated, and viewing remains distinct from the host’s revocable input grant.",
          alternative:
            "A general-purpose RDP or VNC stack would require constraining or disabling broader facilities such as clipboard, file transfer and unattended access because they contradict this product’s consent-first boundary.",
          cost:
            "JDoor supports fewer capabilities, one approved viewer and the primary display, and every future protocol feature must preserve the explicit state machine and bounds.",
        },
      ],
    },
    decisions: {
      title: "Decisions that changed the product",
      intro: "Each decision removes an implicit privilege from the original prototype.",
      items: [
        {
          title: "Make approval legible to the host",
          body: "Before any stream begins, the local dialog identifies the viewer by name and network address, pairs that identity with a verification code and asks the host to approve that person explicitly.",
          tradeoff: "Possessing the invitation is not enough and the host must be present; that extra step turns access into a visible human decision.",
        },
        {
          title: "Separate viewing from control",
          body: "Approval starts a view-only stream. A host toggle grants input only for the current session and keeps the permission visible while it is active.",
          tradeoff: "This adds a second permission step, but viewing no longer implies authority to act.",
        },
        {
          title: "Release remote input on every exit path",
          body: "Revocation, focus loss, disconnect and shutdown each trigger deterministic cleanup that releases held keys and buttons before control ends.",
          tradeoff: "The lifecycle needs explicit cleanup branches and tests, but an ended session cannot leave remote input logically pressed.",
        },
      ],
    },
    delivery: {
      title: "From classroom code to a reviewable release",
      paragraphs: [
        "The Java 21 project uses Maven Wrapper, JUnit integration tests, JaCoCo and Spotless. The shaded application is exercised through its CLI, and the repository documents architecture, privacy, threat assumptions, security reporting and contributor expectations alongside the code.",
        "CI verifies Linux and Windows paths, CodeQL performs scheduled static analysis, and release jobs create jpackage app images for Windows, macOS and Linux with checksums, a CycloneDX inventory and provenance attestations. The project states clearly that community packages are not yet platform-signed.",
      ],
    },
    result: {
      title: "What JDoor Assist is now",
      paragraphs: [
        "JDoor Assist is a working desktop application with launcher, host and viewer flows; an expiring one-time link; certificate pinning; local approval; view-only streaming; an explicit control grant; input cleanup; lifecycle audit records and visible disconnect controls.",
        "The 2022 prototype remains credited as work co-created with a collaborator. The later safety, product, UX, testing and release modernization is Djenis’s contribution, and its result is intentionally limited to visible assistance between authorized people on a trusted local network.",
      ],
    },
    scope:
      "This case study covers the checked v1.0.0 source snapshot and its documented direct-LAN behaviour. JDoor Assist is only for authorized, visible support; it is not an internet relay, unattended administration tool or claim of independent security certification. It does not promise NAT traversal, multi-display capture, platform signing or protection after either endpoint is compromised.",
  },
};
