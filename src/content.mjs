import { labsCases } from "./labs-content.mjs";
import { labsLocales } from "./labs-locales.mjs";
import {
  assertDefinitionCatalog,
  assertRawLocaleCatalog,
} from "./content-contract.mjs";

export const site = {
  name: "Ejupi Labs",
  section: "Case Studies",
  url: "https://blog.ejupilabs.com",
  portfolioUrl: "https://ejupilabs.com",
  author: {
    name: "Djenis Ejupi",
    url: "https://djenis.ejupilabs.com/",
    id: "https://djenis.ejupilabs.com/#person",
  },
  published: "2026-07-24",
};

export const localeOrder = ["en", "it", "de", "fr"];

export const caseDefinitions = [
  {
    slug: "ai-workflow-cloud-migration",
    number: "01",
    diagram: "cloud",
    kind: "professional",
    categoryKey: "cloud-platforms",
    availableLocales: ["en", "it", "de", "fr"],
    published: "2026-07-22",
    updated: "2026-07-28",
    stack: ["GKE", "Terraform", "Helm", "Cloud Build", "GitLab CI/CD"],
  },
  {
    slug: "archival-workflow-management",
    number: "02",
    diagram: "workflow",
    kind: "professional",
    categoryKey: "workflow-software",
    availableLocales: ["en", "it", "de", "fr"],
    published: "2026-07-22",
    updated: "2026-07-28",
    stack: ["Spring Boot", "React", "Single-SPA", "Camunda", "S3-compatible storage"],
  },
  {
    slug: "retail-erp-evolution",
    number: "03",
    diagram: "erp",
    kind: "professional",
    categoryKey: "enterprise-software",
    availableLocales: ["en", "it", "de", "fr"],
    published: "2026-07-22",
    updated: "2026-07-28",
    stack: ["C#", ".NET Framework 4.8", "SQL Server", "KnockoutJS", "Crystal Reports"],
  },
  {
    slug: "careeros-local",
    number: "04",
    diagram: "careeros",
    kind: "labs",
    categoryKey: "local-first-product",
    availableLocales: ["en", "it", "de", "fr"],
    published: "2026-07-24",
    updated: "2026-07-29",
    projectUrl: "https://ejupi-djenis30.github.io/careeros-local/",
    sourceRef: "v1.8.0",
    sourceUrl: "https://github.com/ejupi-djenis30/careeros-local/commit/6dfeb12d180a2342a01bc264c3963bcc4373aeee",
    verifiedAt: "2026-07-29",
    stack: ["Tauri 2", "React 19", "FastAPI", "SQLite", "llama.cpp"],
  },
  {
    slug: "eliza-lab",
    number: "05",
    diagram: "eliza",
    kind: "labs",
    categoryKey: "machine-learning",
    availableLocales: ["en", "it", "de", "fr"],
    published: "2026-07-24",
    updated: "2026-07-28",
    projectUrl: "https://ejupi-djenis30.github.io/PsychologistRustBot/",
    sourceRef: "v1.5.0",
    sourceUrl: "https://github.com/ejupi-djenis30/PsychologistRustBot/commit/79f5a5722289ce2c2c0801995ae2c91b48d9e1d2",
    verifiedAt: "2026-07-25",
    stack: ["Rust", "TF-IDF", "Logistic regression", "Open-set ML"],
  },
  {
    slug: "djenis-ai-agent",
    number: "06",
    diagram: "agent",
    kind: "labs",
    categoryKey: "agent-systems",
    availableLocales: ["en", "it", "de", "fr"],
    published: "2026-07-24",
    updated: "2026-07-28",
    projectUrl: "https://ejupi-djenis30.github.io/DjenisAiAgent/",
    sourceRef: "v0.2.2",
    sourceUrl: "https://github.com/ejupi-djenis30/DjenisAiAgent/commit/afe50077755b4d8a82ef9ce1b4dd92587ab0dec1",
    verifiedAt: "2026-07-25",
    stack: ["Python", "Gemini", "Windows UIA", "Selenium", "FastAPI"],
  },
  {
    slug: "dig-gopher-explorer",
    number: "07",
    diagram: "dig",
    kind: "labs",
    categoryKey: "protocol-tooling",
    availableLocales: ["en", "it", "de", "fr"],
    published: "2026-07-24",
    updated: "2026-07-28",
    projectUrl: "https://ejupi-djenis30.github.io/Dig/",
    sourceRef: "v3.0.0",
    sourceUrl: "https://github.com/ejupi-djenis30/Dig/commit/9ef8f9406960d1ba6fe21754debda3b69d8f4031",
    verifiedAt: "2026-07-26",
    stack: ["Node.js", "TCP", "RFC 1436 / 4266", "Same-origin gateway", "Playwright"],
  },
  {
    slug: "integradraw",
    number: "08",
    diagram: "integradraw",
    kind: "labs",
    categoryKey: "computational-mathematics",
    availableLocales: ["en", "it", "de", "fr"],
    published: "2026-07-24",
    updated: "2026-07-28",
    projectUrl: "https://ejupi-djenis30.github.io/IntegraDraw/",
    sourceRef: "v1.1.2",
    sourceUrl: "https://github.com/ejupi-djenis30/IntegraDraw/commit/fa7db6675f4b04d8c822fb464ca0d4b130488316",
    verifiedAt: "2026-07-25",
    stack: ["Java 17", "TypeScript", "Canvas", "Numerical methods"],
  },
  {
    slug: "vector-placement-operations",
    number: "09",
    diagram: "vector",
    kind: "labs",
    categoryKey: "operations-software",
    availableLocales: ["en", "it", "de", "fr"],
    published: "2026-07-24",
    updated: "2026-07-28",
    projectUrl: "https://ejupi-djenis30.github.io/vector-placement-operations/",
    sourceRef: "v3.0.0",
    sourceUrl: "https://github.com/ejupi-djenis30/vector-placement-operations/commit/a32002bae031fbfc34b9fb70013dbf9cf4766b9f",
    verifiedAt: "2026-07-26",
    stack: ["Node.js", "Express", "SQLite", "Docker", "Playwright"],
  },
  {
    slug: "jdoor-security-lab",
    number: "10",
    diagram: "jdoor",
    kind: "labs",
    categoryKey: "secure-remote-assistance",
    availableLocales: ["en", "it", "de", "fr"],
    published: "2026-07-26",
    updated: "2026-07-28",
    projectUrl: "https://jdoor.ejupilabs.com/",
    sourceRef: "v1.0.0",
    sourceUrl: "https://api.github.com/repositories/567343188/commits/ac94dd82cdff17551826b7254165d123190aeec7",
    verifiedAt: "2026-07-26",
    stack: ["Java 21", "Swing", "TLS", "Maven", "JUnit"],
  },
];

export function relatedCaseDefinitions(
  currentDefinition,
  definitions = caseDefinitions,
  { localeKey, limit = 2 } = {},
) {
  const currentNumber = Number(currentDefinition.number);
  const currentStack = new Set(currentDefinition.stack.map((item) => item.toLowerCase()));

  return definitions
    .filter(
      (definition) =>
        definition.slug !== currentDefinition.slug &&
        (!localeKey || definition.availableLocales.includes(localeKey)),
    )
    .map((definition) => {
      const sharedStack = definition.stack.filter((item) =>
        currentStack.has(item.toLowerCase()),
      ).length;
      const score =
        (definition.categoryKey === currentDefinition.categoryKey ? 6 : 0) +
        sharedStack * 2 +
        (definition.kind === currentDefinition.kind ? 1 : 0);
      return { definition, score };
    })
    .sort(
      (first, second) =>
        second.score - first.score ||
        Math.abs(Number(first.definition.number) - currentNumber) -
          Math.abs(Number(second.definition.number) - currentNumber) ||
        first.definition.number.localeCompare(second.definition.number) ||
        first.definition.slug.localeCompare(second.definition.slug),
    )
    .slice(0, limit)
    .map(({ definition }) => definition);
}

export const protectedLegacySlugs = Object.freeze([
  "ai-workflow-cloud-migration",
  "archival-workflow-management",
  "retail-erp-evolution",
  "careeros-local",
  "eliza-lab",
  "djenis-ai-agent",
  "dig-gopher-explorer",
  "integradraw",
  "vector-placement-operations",
  "jdoor-security-lab",
]);

export const locales = {
  en: {
    lang: "en",
    locale: "en_CH",
    label: "EN",
    languageName: "English",
    prefix: "",
    ui: {
      skip: "Skip to content",
      home: "Case studies",
      portfolio: "Studio",
      navigation: "Primary navigation",
      languages: "Choose language",
      menuOpen: "Open navigation",
      menuClose: "Close navigation",
      contact: "Discuss a project",
      allWork: "All case studies",
      readCase: "Read case study",
      published: "Published",
      readTime: "min read",
      contents: "On this page",
      stack: "Technology",
      sourceNote: "Evidence boundary",
      socialImageAlt: "Ejupi Labs wordmark beside the headline “Engineering decisions, explained” and an editorial decision diagram.",
      footerLine: "Product software, cloud systems and automation from Switzerland.",
      rights: "All rights reserved.",
      notFoundTitle: "This page is not available.",
      notFoundBody: "Check the address or return to the case-study archive.",
      notFoundAction: "Browse all case studies",
    },
    index: {
      title: "Engineering decisions, explained.",
      description:
        "Case studies tracing constraints, choices, credible alternatives, accepted costs and evidence across anonymised professional systems and open-source Labs projects.",
      eyebrow: "Engineering case studies / 01 / 10",
      ctaTitle: "Need a clearer route through a complex system?",
      ctaBody: "Share the difficult part. We can frame the architecture, delivery path and first useful release together.",
    },
    cases: {
      "ai-workflow-cloud-migration": {
        category: "Cloud platforms",
        cardTitle: "AI workflow platform cloud migration",
        title: "Moving an AI workflow platform to a repeatable cloud foundation",
        summary:
          "In roughly one month, I moved a multi-component document and AI-workflow platform from an environment-specific on-premise setup to reusable Terraform, GKE and a controlled blue/red delivery path on Google Cloud.",
        readMinutes: "14",
        facts: [
          ["Discipline", "Cloud platform engineering"],
          ["Scope", "Infrastructure, workloads and release path"],
          ["Delivery", "Approximately one month"],
          ["Boundary", "Anonymised professional case"],
        ],
        starting: {
          title: "The starting point",
          paragraphs: [
            "The on-premise platform combined a Vue interface, two Spring Boot services, a Python Temporal worker, Temporal, Keycloak, PostgreSQL and MinIO. It handled document extraction and AI-assisted workflows, but environments did not share one dependable setup path.",
            "Calling this a cloud migration would only describe the destination. The actual job was to move stateful and stateless components deliberately, separate demonstration delivery from production delivery, and give operators a controlled switch between two production slots.",
            "I mapped the change as four connected boundaries: workload packaging, managed data, environment configuration and release control. That prevented “put it on Kubernetes” from becoming the whole design.",
          ],
        },
        constraints: {
          title: "What the design had to solve",
          intro: "The new platform model needed to make five things explicit:",
          items: [
            "Vue, Spring Boot, Python, Temporal and Keycloak workloads needed one Kubernetes deployment model.",
            "PostgreSQL and MinIO data responsibilities had to move to Cloud SQL and Cloud Storage without hiding the change behind containers.",
            "Reusable infrastructure had to stay common while environment-specific values remained reviewable inputs.",
            "A demonstration pipeline and the production release path needed different controls because they carried different operational risk.",
            "Production rollout required an inactive slot, smoke verification and an explicit manual switch.",
          ],
        },
        diagnosis: {
          title: "The diagnosis",
          paragraphs: [
            "The fragile part was not a single service. It was the path from source code to a running environment. When that path varies by environment, every change carries hidden assumptions.",
            "A direct lift-and-shift would have reproduced those assumptions in a new location. Running PostgreSQL and MinIO inside the new cluster would also have preserved operational responsibilities that Google Cloud could own at clearer managed boundaries.",
            "I therefore treated reproducibility and reversibility as the central requirements. Terraform modules define the Google Cloud foundation, Helm packages the Kubernetes workloads, and environment values stay separate from reusable definitions.",
          ],
        },
        architecture: {
          title: "The resulting platform model",
          intro:
            "GitLab CI starts the production path, Cloud Build creates the deployable images, and Artifact Registry holds the version that reaches GKE. Deployment targets the inactive blue/red slot. Kubernetes readiness and a smoke test must pass before an operator switches traffic. Cloud SQL and Cloud Storage replace the self-managed PostgreSQL and MinIO responsibilities.",
          labels: ["GITLAB CI", "CLOUD BUILD", "ARTIFACT REGISTRY", "GKE BLUE / RED", "CLOUD SQL + GCS"],
          caption: "Build once, verify the inactive slot, then make the production switch explicit.",
        },
        technology: {
          title: "Why these technologies fit the migration",
          intro:
            "These were choices inside an existing product and an agreed Google Cloud destination, not a greenfield ranking of every possible platform. The useful question was which boundaries made this particular mix of workloads repeatable and operable.",
          items: [
            {
              choice: "GKE as the common workload boundary",
              why: "The platform already combined a Vue interface, Spring Boot services, a Python worker, Temporal and Keycloak. GKE gave those different workloads one deployment, readiness and blue/red slot model while managed data moved outside the cluster.",
              alternative: "Splitting the components across serverless products would have imposed several execution models on one release path, while long-lived VMs would have preserved more host-specific setup and maintenance.",
              cost: "The team accepts a Kubernetes control surface, cluster lifecycle work and the need to keep workload requests, readiness and upgrades explicit.",
            },
            {
              choice: "Terraform modules for the Google Cloud foundation",
              why: "Reusable modules kept common infrastructure definitions together while exposing environment differences as reviewable inputs. That directly addressed the environment-specific setup the migration needed to remove.",
              alternative: "Console configuration or copied templates could create the first environment quickly, but repeated changes would be harder to review and each copy could drift independently.",
              cost: "Module contracts, provider state and version changes require discipline; even a small infrastructure exception must be modelled rather than fixed silently by hand.",
            },
            {
              choice: "Helm for Kubernetes workload packaging",
              why: "Helm provided a release unit for the related Kubernetes resources and a controlled place for environment values without copying the full workload definition for every slot.",
              alternative: "Raw manifests would be more direct for a single deployment, but duplicating them across environments and blue/red slots would make shared changes and intentional differences harder to distinguish.",
              cost: "Templates and values introduce indirection, so rendered output must be inspected and chart changes versioned with the same care as application code.",
            },
            {
              choice: "Separate Cloud Build and GitLab delivery responsibilities",
              why: "Cloud Build produced images in the Google Cloud path, while GitLab CI kept production orchestration, verification and the explicit traffic decision. The split matched the different consequences of building an artifact and releasing it.",
              alternative: "One undifferentiated deploy pipeline would be simpler to describe, but it would blur demonstration and production controls and make artifact creation, rollout and traffic switching one coupled action.",
              cost: "Two systems require credentials, artifact hand-offs and failure diagnosis across a boundary, and their contracts must remain aligned.",
            },
          ],
        },
        decisions: {
          title: "Operating rules for a reversible release",
          intro: "The stack defines the route; these rules define who owns state, what counts as evidence and how production can change without becoming an irreversible leap.",
          items: [
            {
              title: "Turn environment variance into a review surface",
              body: "Before a release, environment-specific values and stateful responsibilities are visible together, including who owns data, backup and recovery. A difference becomes an explicit input or hand-off, not an invisible fix in a running environment.",
              tradeoff: "Reviewing variance and ownership adds preparation, but prevents configuration drift or unowned recovery work from emerging during cutover.",
            },
            {
              title: "Verify the candidate end to end",
              body: "A release is followed from the built image into the inactive environment, then checked with readiness, infrastructure signals and a smoke test. No single green indicator stands in for the whole path.",
              tradeoff: "This takes longer than accepting a successful build as proof; the smoke test is still deliberately scoped and does not claim to cover every business workflow.",
            },
            {
              title: "Separate artifact evidence from traffic authority",
              body: "A successful build creates a candidate; it does not grant production access. The same artifact is deployed and exercised on the inactive blue/red slot, while the decision to move traffic remains a distinct operator action.",
              tradeoff: "This governance adds hand-offs and requires both slots to stay ready, but prevents build success from being mistaken for release approval.",
            },
            {
              title: "Make cutover explicit and reversible",
              body: "Traffic moves only after the checks are visible and an operator approves the switch. The previous slot remains the clear return path instead of being overwritten in place.",
              tradeoff: "The gate adds a deliberate pause, but keeps final production authority and reversal visible when evidence is incomplete.",
            },
          ],
        },
        delivery: {
          title: "Delivery and verification",
          paragraphs: [
            "I ordered the work around dependency and reversibility: establish the Google Cloud foundation, package the workloads, externalise environment values, move data responsibilities, then exercise the release path before switching production traffic.",
            "The demonstration and production paths stay distinct. Production moves from GitLab CI through Cloud Build and Artifact Registry to the inactive GKE environment instead of deploying directly over the live slot.",
            "Verification combines Kubernetes readiness, Google Cloud alerts and infrastructure signals with a smoke test before the switch. This does not prove every business workflow. It establishes that the release candidate is healthy enough for a controlled cutover.",
          ],
        },
        result: {
          title: "The delivered result",
          paragraphs: [
            "The migration replaced an on-premise, environment-specific route with reusable infrastructure modules, packaged workloads, managed data services and two controlled production slots.",
            "The useful outcome is not simply “running on Google Cloud.” It is a release path that can be reviewed before deployment, checked before traffic moves and repeated for the next environment.",
            "I do not attach an invented speed or reliability percentage to that result. The defensible change is structural: fewer environment-specific assumptions, explicit operational ownership and a reversible production decision.",
          ],
        },
        scope:
          "The organisation, product name, endpoints, storage configuration, costs and workload volumes are omitted. The approximate delivery period, component boundaries and release sequence come from the project record.",
      },
      "archival-workflow-management": {
        category: "Workflow software",
        cardTitle: "Archival workflow management",
        title: "Giving operators one clear route through a complex archival workflow",
        summary:
          "Over roughly three months, I built a Spring Boot service and React Single-SPA microfrontend around Camunda so operators could create archival sessions, move source packages through a nine-step lifecycle and track the resulting output.",
        readMinutes: "13",
        facts: [
          ["Discipline", "Workflow and product engineering"],
          ["Scope", "Service, microfrontend and workflow boundary"],
          ["Delivery", "Approximately three months"],
          ["Boundary", "Anonymised professional case"],
        ],
        starting: {
          title: "The starting point",
          paragraphs: [
            "The domain combined archival sessions, session types, organisation codes, input and output storage, source packages, resulting packages and workflow lifecycle. Operators needed one practical way to see how those records moved together.",
            "The feature had to live inside a larger single-spa platform that already supplied its own header, footer, navigation and reusable microfrontends. Reusing those components was a primary requirement, not a later visual tidy-up.",
            "A standalone React application would have duplicated the platform shell and created a second place to maintain navigation and chrome. The useful boundary was a focused archival experience that the existing platform could compose.",
          ],
        },
        constraints: {
          title: "What the design had to solve",
          intro: "The useful boundary sat between process state, operator action and the host platform:",
          items: [
            "A session, its source packages and resulting output packages needed to stay understandable across a nine-step lifecycle.",
            "Operator actions had to map cleanly to valid process transitions.",
            "The new experience had to reuse the platform header, footer, navigation and existing component conventions instead of shipping a parallel shell.",
            "The React single-spa microfrontend needed a narrow mount point and integration contract so archival rules did not spread into the host.",
            "Backend rules, Camunda state and frontend actions could not drift into separate interpretations of the same workflow.",
          ],
        },
        diagnosis: {
          title: "The diagnosis",
          paragraphs: [
            "Camunda could coordinate the process, but orchestration alone was not the operator experience. The missing layer was a coherent application boundary around the workflow.",
            "The host platform already solved composition and chrome. Rebuilding those parts would have increased code without improving the archival workflow, so I limited the microfrontend to the domain surface the platform did not have.",
            "I separated ownership deliberately: the host keeps navigation and shared components; the Spring Boot service owns application rules, S3-compatible storage references and Camunda integration; the React single-spa microfrontend presents current state and valid actions.",
          ],
        },
        architecture: {
          title: "The resulting application slice",
          intro:
            "The existing single-spa shell mounts the React microfrontend inside its shared header, footer and navigation. The microfrontend gives operators the archival surface only. A focused Spring service translates application actions into workflow operations and storage references, while Camunda coordinates the process from session creation through output tracking.",
          labels: ["OPERATOR", "REACT SINGLE-SPA", "SPRING BOOT API", "CAMUNDA", "S3 INPUT + OUTPUT"],
          caption: "The platform owns the shell; the microfrontend and service own the archival workflow boundary.",
        },
        technology: {
          title: "Why these boundaries fit the host platform",
          intro:
            "This was not a greenfield stack selection. The shell, workflow engine and storage conventions belonged to an existing platform; the design task was to add one coherent capability without duplicating or bypassing those boundaries.",
          items: [
            {
              choice: "A focused Spring Boot service boundary",
              why: "The service gave application rules, valid actions, Camunda integration and storage references one backend owner. React could consume an application model instead of learning process-engine mechanics.",
              alternative: "Calling Camunda directly from the browser or distributing archival rules through shared services would expose orchestration details and create more than one interpretation of valid workflow behaviour.",
              cost: "The additional API and mapping layer must evolve with the process, and errors at the service-to-engine boundary need explicit handling.",
            },
            {
              choice: "Camunda for the nine-step process",
              why: "Camunda already coordinated the workflow, so keeping process transitions there preserved one source for progress while the service translated that state for operators.",
              alternative: "A custom state machine, especially one represented mainly as UI state, would duplicate process logic and make browser state compete with the workflow engine for authority.",
              cost: "Process definitions and application models must stay aligned, and operational diagnosis crosses both the service and the engine.",
            },
            {
              choice: "React in the existing single-spa composition",
              why: "A bounded microfrontend could reuse the platform header, footer, navigation and component conventions while owning only the archival route and interaction model.",
              alternative: "Rewriting the shell or shipping a standalone React application would expand the project beyond the missing capability and create duplicate navigation and chrome to maintain.",
              cost: "The microfrontend depends on a stable mount and integration contract, and shared-platform changes require coordination rather than complete local control.",
            },
            {
              choice: "S3-compatible storage for input and output packages",
              why: "Package content stayed at an object-storage boundary while the service and workflow referred to it, keeping archival records and binary payload ownership distinct.",
              alternative: "Database blobs would bind package content to the relational data lifecycle, while local files would bind it to a particular service instance and deployment path.",
              cost: "Buckets, endpoints, credentials and missing-object cases become explicit operational concerns that the service must represent honestly.",
            },
          ],
        },
        decisions: {
          title: "Rules for an operable workflow",
          intro: "The architecture provides one source of process truth; these rules turn it into an experience an operator can read, trust and recover.",
          items: [
            {
              title: "Show state before offering action",
              body: "The current session, its source and output packages, and the process stage stay visible before an operator chooses the next step. An action without that context is not presented as progress.",
              tradeoff: "The interface must explain unavailable, pending and failed states instead of optimising only for the happy path.",
            },
            {
              title: "Derive valid actions from backend state",
              body: "The interface presents transitions supported by the application model, while the service rejects invalid ones. Local browser state never becomes a second authority over what may happen next.",
              tradeoff: "State exchange and refresh behaviour must be explicit, but a stale screen cannot invent a valid workflow step.",
            },
            {
              title: "Preserve session and package continuity",
              body: "The session, source packages and resulting packages remain connected across the nine-step route. Verification follows that same journey from creation and attachment through processing and output tracking.",
              tradeoff: "The model and interface carry more context than a task-only screen, but operators can follow how the work and its output belong together.",
            },
            {
              title: "Make failure and retry visible",
              body: "An incomplete, pending or failed step remains visible. If the next valid action allows a retry or continuation, it appears only after the backend confirms that state.",
              tradeoff: "This increases the number of states and error paths the interface must explain, but distinguishes waiting, failure and recovery instead of leaving operators to guess.",
            },
          ],
        },
        delivery: {
          title: "Delivery and verification",
          paragraphs: [
            "Verification follows the same nine-step route an operator uses: create a session, attach source packages, start the workflow, observe valid transitions and track output packages when processing completes.",
            "I also checked the composition boundary: the new route had to sit inside the existing header, footer and navigation without introducing a second shell or pushing archival state into shared platform components.",
            "The important failure cases sit at the other boundaries. The service must reject invalid transitions, the UI must show incomplete or pending state honestly, and the process integration must remain the source of workflow truth.",
          ],
        },
        result: {
          title: "The qualitative result",
          paragraphs: [
            "The resulting slice covers session handling, package processing and workflow control from the operator interface through to the Camunda process.",
            "Operators get one place to understand the work and move it forward. The wider platform keeps the header, footer, navigation and visual conventions they already know.",
            "The platform gains a contained capability rather than a parallel application: no duplicated shell, no second navigation model and no archival rules distributed across unrelated microfrontends.",
          ],
        },
        scope:
          "The organisation, product name, internal session types, storage endpoints, bucket names and credentials are omitted. The approximate delivery period and domain lifecycle come from the project record.",
      },
      "retail-erp-evolution": {
        category: "Enterprise software",
        cardTitle: "Retail ERP maintenance and evolution",
        title: "Improving a retail ERP without stepping outside daily operations",
        summary:
          "Across approximately nineteen months, I worked through SQL Server, .NET Framework 4.8 and a KnockoutJS frontend in a live retail ERP, covering features, defects, reporting, two courier integrations and stock-receipt modernisation.",
        readMinutes: "14",
        facts: [
          ["Discipline", "Enterprise product engineering"],
          ["Scope", "Database, backend, frontend and integrations"],
          ["Delivery", "Approximately nineteen months"],
          ["Boundary", "Anonymised professional case"],
        ],
        starting: {
          title: "The starting point",
          paragraphs: [
            "The web ERP was a live retail monolith built on SQL Server, C# and .NET Framework 4.8, Entity Framework, KnockoutJS, JavaScript, jQuery, Bootstrap and Crystal Reports. Reliability was a product requirement, not a maintenance footnote.",
            "Its database had no migration system and was not owned by the web application alone. A much older VB6 desktop ERP and till application used the same schema, so a change that worked in the web path could still break daily work elsewhere.",
            "The work covered new features, defects, stored procedures and views, reporting, two external courier integrations, requirements, training and support. Direct contact with the client was crucial for understanding how the software was actually used before changing it.",
          ],
        },
        constraints: {
          title: "What the work had to respect",
          intro: "The system could evolve only if old and new operational paths continued to agree:",
          items: [
            "Existing workflows had to keep serving day-to-day retail work.",
            "SQL Server schema changes had to be backward-compatible because there was no migration history to coordinate every consumer.",
            "The .NET Framework web ERP and the older VB6 desktop and till applications shared the same database contract.",
            "KnockoutJS, jQuery, backend rules and database behaviour needed to change together when the web workflow changed.",
            "Requirements had to be checked with the client in operational language before they became code, reports or integration behaviour.",
            "Two external courier integrations had to remain understandable at the system boundary.",
          ],
        },
        diagnosis: {
          title: "The diagnosis",
          paragraphs: [
            "In a layered ERP, the visible delay or failure is often only the last link in the chain. A screen can be slow because of its request shape, backend work or a database access pattern. An integration issue can surface as a frontend inconsistency.",
            "The shared database changed the usual definition of an internal implementation detail. Tables, columns and stored procedures were also contracts with VB6 software that could not follow a modern migration sequence.",
            "I combined end-to-end tracing with direct client conversations. SQL Server queries and stored procedures, .NET Framework rules, KnockoutJS and jQuery screens, reports, courier exchanges and the legacy desktop path were treated as parts of one operational behaviour.",
          ],
        },
        architecture: {
          title: "The working system view",
          intro:
            "The useful unit of change was the whole operational contract: an action in the KnockoutJS and jQuery web interface, rules in .NET Framework 4.8, data work in the shared SQL Server schema, and the older VB6 desktop and till paths that depended on the same records. Reports and courier exchanges added further boundaries around that core.",
          labels: ["WEB OPERATOR", "KNOCKOUT + JQUERY", ".NET FRAMEWORK 4.8", "SHARED SQL SERVER", "VB6 ERP + TILL"],
          caption: "The web ERP and the older VB6 estate meet at one backward-compatible database contract.",
        },
        technology: {
          title: "Why continuity was an architectural choice",
          intro:
            "This was evolution inside a live ERP estate, not a greenfield endorsement of its stack. The right technology decision was often to preserve an operational contract and improve it in place rather than make every layer new at once.",
          items: [
            {
              choice: "Keep C#/.NET Framework and KnockoutJS for incremental change",
              why: "Features, defects and daily workflows already crossed these layers. Working within them allowed each change to follow the real request path and remain releasable alongside ongoing operations.",
              alternative: "A big-bang rewrite of backend and frontend would require the existing behaviour to be rediscovered and replaced before smaller operational improvements could reach users.",
              cost: "The work accepts older framework constraints, mixed frontend patterns and continued maintenance knowledge instead of gaining a clean modern baseline immediately.",
            },
            {
              choice: "Treat SQL Server as the shared data contract",
              why: "The web ERP, VB6 desktop ERP and till application read and wrote the same schema. Compatible SQL changes protected consumers that could not move with every web release.",
              alternative: "Migrating to a new database or schema as part of the web work would assume all consumers could cut over together despite the absence of a migration system.",
              cost: "Additive changes and transitional structures can remain longer, and database design must account for old reads and writes as well as the new path.",
            },
            {
              choice: "Evolve Crystal Reports and existing reporting paths",
              why: "Reporting was already part of the operational system and its SQL Server behaviour. Keeping that path in scope allowed report changes to be checked with the same data and application contract.",
              alternative: "Introducing a new reporting platform at the same time would add another migration and require existing report behaviour to be translated while application and database changes were still underway.",
              cost: "The solution retains legacy reporting tooling and its design constraints, so report work continues to require specialised knowledge and cross-layer verification.",
            },
            {
              choice: "Deliver one end-to-end workflow slice at a time",
              why: "A change could cover the operator screen, .NET rules, SQL behaviour and, when involved, reports, integrations and older consumers as one coherent operational slice.",
              alternative: "Modernising one technical layer at a time would leave behaviour divided between old and new paths and postpone proof that the real workflow still worked until several migrations were complete.",
              cost: "Each slice must be completed and verified across every layer and consumer it touches, so progress demands disciplined boundaries rather than the visual uniformity of a layer-wide programme.",
            },
          ],
        },
        decisions: {
          title: "Rules for changing a live operation",
          intro: "Stack continuity set the boundary; these rules kept each change connected to the full operating path and to the people using it.",
          items: [
            {
              title: "Trace the whole request path",
              body: "Performance and reliability work starts with behaviour the client or operator can describe, then follows it through the web state, backend rules and database work instead of stopping at the first visible symptom.",
              tradeoff: "This takes more investigation than patching the first slow component, but it avoids moving the bottleneck or fixing a symptom the client did not actually have.",
            },
            {
              title: "Make compatibility part of acceptance",
              body: "A change is accepted only after it works through the web ERP and against the older desktop and till paths that share its records. Stored procedures, views, reports and courier exchanges join that check whenever the workflow touches them.",
              tradeoff: "The acceptance surface is wider than the edited component, but a local success cannot quietly become a failure in another daily path.",
            },
            {
              title: "Define done in the client’s actual workflow",
              body: "Client conversations translate a request into concrete workflows, edge cases and acceptance checks before the change. Delivery is complete only when the resulting behaviour reconnects to daily use, not merely when one component works in isolation.",
              tradeoff: "This definition of done takes coordination time, but it is cheaper than shipping a technically coherent interpretation that does not fit the real retail process.",
            },
            {
              title: "Treat support and training as release feedback",
              body: "Questions raised through support and training keep requirements tied to the way people understand and perform the work. That feedback informs the next bounded correction or improvement.",
              tradeoff: "Delivery responsibility extends beyond merging code, but usability gaps become visible while they can still shape the following release.",
            },
          ],
        },
        delivery: {
          title: "Delivery and verification",
          paragraphs: [
            "Each change was checked at its layer and again through the operational workflow it supported. Stored procedures and views, .NET rules, courier responses, Crystal Reports and KnockoutJS state needed to agree.",
            "Database work also required a compatibility question: what will the VB6 ERP and till application read or write after this change? Without migrations, that question had to be answered in the design rather than deferred to rollout automation.",
            "Direct client feedback completed the check around everyday paths. A technically correct change was not finished if it made routine work harder to understand or no longer matched the operation described by the people using it.",
          ],
        },
        result: {
          title: "The qualitative result",
          paragraphs: [
            "Performance, integrations and daily reliability improved together because the work crossed the boundaries where those concerns met.",
            "The web ERP continued to evolve while preserving the shared database behaviour needed by the older desktop and till applications.",
            "The practical route was not to pretend that a business-critical ERP could be paused and replaced in one clean move. It was to understand the real workflow with the client, make compatible changes and keep the system useful throughout.",
          ],
        },
        scope:
          "The organisation, product name, users, vendors, commercial data and operational KPIs are omitted. The approximate engagement length, technologies and two-integration scope come from the project record.",
      },
    },
  },
  it: {
    lang: "it",
    locale: "it_CH",
    label: "IT",
    languageName: "Italiano",
    prefix: "/it",
    ui: {
      skip: "Vai al contenuto",
      home: "Case study",
      portfolio: "Studio",
      navigation: "Navigazione principale",
      languages: "Scegli la lingua",
      menuOpen: "Apri la navigazione",
      menuClose: "Chiudi la navigazione",
      contact: "Parliamo di un progetto",
      allWork: "Tutti i case study",
      readCase: "Leggi il case study",
      published: "Pubblicato",
      readTime: "min di lettura",
      contents: "In questa pagina",
      stack: "Tecnologie",
      sourceNote: "Limiti delle informazioni",
      socialImageAlt: "Il wordmark Ejupi Labs accanto al titolo «Decisioni tecniche, spiegate» e a un diagramma editoriale delle scelte.",
      footerLine: "Software di prodotto, sistemi cloud e automazione dalla Svizzera.",
      rights: "Tutti i diritti riservati.",
      notFoundTitle: "Questa pagina non è disponibile.",
      notFoundBody: "Controlla l’indirizzo oppure torna all’archivio dei case study.",
      notFoundAction: "Vedi tutti i case study",
    },
    index: {
      title: "Decisioni tecniche, spiegate.",
      description:
        "Case study che ricostruiscono vincoli, scelte, alternative credibili, costi accettati ed evidenze dietro sistemi professionali anonimizzati e progetti Labs open source.",
      eyebrow: "Case study di engineering / 01 / 10",
      ctaTitle: "Serve un percorso più chiaro per un sistema complesso?",
      ctaBody: "Partiamo dalla parte difficile. Possiamo definire insieme architettura, percorso di delivery e prima release utile.",
    },
    cases: {
      "ai-workflow-cloud-migration": {
        category: "Piattaforme cloud",
        cardTitle: "Migrazione cloud di una piattaforma AI",
        title: "Portare una piattaforma AI su una base cloud ripetibile",
        summary:
          "In circa un mese ho portato una piattaforma multicomponente per documenti e workflow AI da un assetto on-premise specifico per ambiente a Terraform riutilizzabile, GKE e un rilascio blue/red controllato su Google Cloud.",
        readMinutes: "14",
        facts: [
          ["Disciplina", "Cloud platform engineering"],
          ["Perimetro", "Infrastruttura, workload e percorso di rilascio"],
          ["Consegna", "Circa un mese"],
          ["Confine", "Caso professionale anonimizzato"],
        ],
        starting: {
          title: "Il punto di partenza",
          paragraphs: [
            "La piattaforma on-premise riuniva un’interfaccia Vue, due servizi Spring Boot, un worker Python Temporal, Temporal, Keycloak, PostgreSQL e MinIO. Gestiva estrazione documentale e workflow assistiti dall’AI, ma gli ambienti non condividevano un percorso di setup affidabile.",
            "Definirla soltanto una migrazione cloud avrebbe descritto la destinazione, non il lavoro. Bisognava spostare con criterio componenti stateful e stateless, separare la delivery dimostrativa da quella di produzione e offrire agli operatori uno switch controllato tra due slot.",
            "Ho scomposto il cambiamento in quattro confini collegati: packaging dei workload, dati gestiti, configurazione degli ambienti e controllo del rilascio. Così “metterla su Kubernetes” non poteva diventare l’intero design.",
          ],
        },
        constraints: {
          title: "Cosa doveva risolvere il nuovo modello",
          intro: "Il disegno della piattaforma doveva rendere espliciti cinque aspetti:",
          items: [
            "I workload Vue, Spring Boot, Python, Temporal e Keycloak dovevano condividere un solo modello di deploy Kubernetes.",
            "Le responsabilità di PostgreSQL e MinIO dovevano passare a Cloud SQL e Cloud Storage senza nascondere il cambiamento dietro altri container.",
            "L’infrastruttura riutilizzabile doveva restare comune, mentre i valori specifici di ogni ambiente dovevano rimanere input revisionabili.",
            "La pipeline dimostrativa e quella di produzione richiedevano controlli diversi perché esponevano a rischi operativi diversi.",
            "Il rollout di produzione richiedeva uno slot inattivo, smoke test e uno switch manuale esplicito.",
          ],
        },
        diagnosis: {
          title: "La diagnosi",
          paragraphs: [
            "La parte fragile non era un singolo servizio. Era il percorso dal codice sorgente a un ambiente funzionante. Quando quel percorso cambia da un ambiente all’altro, ogni modifica porta con sé ipotesi nascoste.",
            "Un semplice lift-and-shift avrebbe riprodotto quelle ipotesi in un’altra posizione. Eseguire PostgreSQL e MinIO nel nuovo cluster avrebbe inoltre conservato responsabilità operative che Google Cloud poteva assumere attraverso confini gestiti più chiari.",
            "Ho quindi trattato riproducibilità e reversibilità come requisiti centrali. I moduli Terraform definiscono la base Google Cloud, Helm impacchetta i workload Kubernetes e i valori d’ambiente restano separati dalle definizioni riutilizzabili.",
          ],
        },
        architecture: {
          title: "Il modello di piattaforma risultante",
          intro:
            "GitLab CI avvia il percorso di produzione, Cloud Build crea le immagini distribuibili e Artifact Registry conserva la versione destinata a GKE. Il deploy raggiunge lo slot blue/red inattivo. Readiness Kubernetes e smoke test devono riuscire prima che un operatore sposti il traffico; Cloud SQL e Cloud Storage sostituiscono le responsabilità autogestite di PostgreSQL e MinIO.",
          labels: ["GITLAB CI", "CLOUD BUILD", "ARTIFACT REGISTRY", "GKE BLUE / RED", "CLOUD SQL + GCS"],
          caption: "Build unica, verifica sullo slot inattivo e switch di produzione esplicito.",
        },
        technology: {
          title: "Perché queste tecnologie erano adatte alla migrazione",
          intro:
            "Erano scelte compiute dentro un prodotto esistente e una destinazione Google Cloud già definita, non una classifica greenfield di ogni piattaforma possibile. La domanda utile era quali confini rendessero ripetibile e gestibile questo insieme concreto di workload.",
          items: [
            {
              choice: "GKE come confine comune per i workload",
              why: "La piattaforma riuniva già un’interfaccia Vue, servizi Spring Boot, un worker Python, Temporal e Keycloak. GKE offriva a workload diversi un unico modello di distribuzione, readiness e slot blue/red, mentre i dati gestiti uscivano dal cluster.",
              alternative: "Distribuire i componenti tra prodotti serverless avrebbe imposto più modelli di esecuzione allo stesso rilascio; VM persistenti avrebbero conservato una parte maggiore del setup e della manutenzione specifici per host.",
              cost: "Il team accetta la superficie operativa di Kubernetes, il ciclo di vita del cluster e la necessità di rendere espliciti risorse, readiness e aggiornamenti dei workload.",
            },
            {
              choice: "Moduli Terraform per la base Google Cloud",
              why: "I moduli riutilizzabili mantenevano unite le definizioni comuni e rendevano le differenze tra ambienti input visibili e revisionabili. Era una risposta diretta al setup specifico per ambiente che la migrazione doveva eliminare.",
              alternative: "Configurazione da console o template copiati avrebbero creato più rapidamente il primo ambiente, ma le modifiche successive sarebbero state meno verificabili e ogni copia avrebbe potuto divergere da sola.",
              cost: "Contratti dei moduli, stato dei provider e cambi di versione richiedono disciplina; anche una piccola eccezione infrastrutturale va modellata invece di essere corretta a mano in silenzio.",
            },
            {
              choice: "Helm per impacchettare i workload Kubernetes",
              why: "Helm forniva un’unità di rilascio per le risorse collegate e un punto controllato per i valori d’ambiente, senza copiare l’intera definizione per ogni ambiente e slot.",
              alternative: "Manifest Kubernetes non templati sarebbero stati più diretti per un singolo deploy, ma duplicarli tra ambienti e slot blue/red avrebbe reso meno distinguibili modifiche condivise e differenze intenzionali.",
              cost: "Template e valori introducono un livello di indirezione: l’output renderizzato va ispezionato e le modifiche al chart vanno versionate con la stessa cura del codice applicativo.",
            },
            {
              choice: "Responsabilità separate tra Cloud Build e GitLab CI",
              why: "Cloud Build produceva le immagini nel percorso Google Cloud, mentre GitLab CI manteneva orchestrazione produttiva, verifiche e decisione esplicita sul traffico. La separazione rifletteva le conseguenze diverse di creare un artefatto e rilasciarlo.",
              alternative: "Un’unica pipeline di deploy indistinta sarebbe stata più semplice da descrivere, ma avrebbe confuso controlli dimostrativi e produttivi e legato in una sola azione build, rollout e spostamento del traffico.",
              cost: "Due sistemi richiedono credenziali, passaggio degli artefatti e diagnosi degli errori attraverso un confine; i loro contratti devono restare allineati.",
            },
          ],
        },
        decisions: {
          title: "Regole operative per un rilascio reversibile",
          intro: "Lo stack definisce il percorso; queste regole chiariscono chi possiede lo stato, quali segnali valgono come evidenza e come cambiare la produzione senza trasformare il passaggio in un salto irreversibile.",
          items: [
            {
              title: "Rendere revisionabili le differenze tra ambienti",
              body: "Prima di un rilascio, i valori specifici dell’ambiente e le responsabilità sullo stato sono visibili insieme, compreso chi risponde di dati, backup e ripristino. Ogni differenza diventa un input o un passaggio esplicito, non una correzione invisibile sull’ambiente in esecuzione.",
              tradeoff: "Revisionare differenze e responsabilità richiede più preparazione, ma impedisce che drift di configurazione o compiti di ripristino senza proprietario emergano durante il cutover.",
            },
            {
              title: "Verificare il candidato da un estremo all’altro",
              body: "Il candidato al rilascio viene seguito dall’immagine costruita fino all’ambiente inattivo, poi verificato con readiness, segnali infrastrutturali e smoke test. Nessun singolo indicatore verde sostituisce l’intero percorso.",
              tradeoff: "Richiede più tempo che accettare una build riuscita come prova; lo smoke test resta intenzionalmente circoscritto e non pretende di coprire ogni workflow di business.",
            },
            {
              title: "Separare l’evidenza sull’artefatto dall’autorità sul traffico",
              body: "Una build riuscita crea un candidato, ma non gli concede accesso alla produzione. Lo stesso artefatto viene distribuito e provato sullo slot blue/red inattivo, mentre la decisione di spostare il traffico resta un’azione distinta dell’operatore.",
              tradeoff: "Questa governance aggiunge passaggi di responsabilità e richiede che entrambi gli slot restino pronti, ma impedisce di scambiare il successo della build per un’approvazione al rilascio.",
            },
            {
              title: "Rendere il cutover esplicito e reversibile",
              body: "Il traffico si sposta soltanto quando le verifiche sono visibili e un operatore approva il passaggio. Lo slot precedente resta il percorso di ritorno chiaro invece di essere sovrascritto.",
              tradeoff: "Il gate introduce una pausa intenzionale, ma mantiene visibili l’autorità finale sulla produzione e la possibilità di tornare indietro quando le evidenze sono incomplete.",
            },
          ],
        },
        delivery: {
          title: "Delivery e verifica",
          paragraphs: [
            "Ho ordinato il lavoro seguendo dipendenze e reversibilità: base Google Cloud, packaging dei workload, valori d’ambiente esternalizzati, spostamento delle responsabilità sui dati e infine esercizio del percorso di rilascio prima dello switch produttivo.",
            "I percorsi dimostrativo e produttivo restano distinti. La produzione passa da GitLab CI a Cloud Build e Artifact Registry prima di raggiungere lo slot GKE inattivo, invece di sovrascrivere quello live.",
            "La verifica combina readiness Kubernetes, alert e segnali Google Cloud con uno smoke test prima dello switch. Non prova ogni flusso di business. Stabilisce che il candidato è abbastanza sano per un cutover controllato.",
          ],
        },
        result: {
          title: "Il risultato consegnato",
          paragraphs: [
            "La migrazione ha sostituito un percorso on-premise specifico per ambiente con moduli infrastrutturali riutilizzabili, workload impacchettati, servizi dati gestiti e due slot produttivi controllati.",
            "Il risultato utile non è semplicemente “gira su Google Cloud”. È un percorso di rilascio revisionabile prima del deploy, verificabile prima dello spostamento del traffico e ripetibile per l’ambiente successivo.",
            "Non associo al risultato una percentuale inventata di velocità o affidabilità. Il cambiamento difendibile è strutturale: meno ipotesi specifiche per ambiente, responsabilità operative esplicite e una decisione produttiva reversibile.",
          ],
        },
        scope:
          "Organizzazione, prodotto, endpoint, configurazione storage, costi e volumi sono omessi. Durata approssimativa, componenti e sequenza di rilascio provengono dal record di progetto.",
      },
      "archival-workflow-management": {
        category: "Software di workflow",
        cardTitle: "Gestione di workflow archivistici",
        title: "Un percorso chiaro per gestire un workflow archivistico complesso",
        summary:
          "In circa tre mesi ho costruito un servizio Spring Boot e un microfrontend React Single-SPA attorno a Camunda, per creare sessioni archivistiche, muovere pacchetti sorgente lungo un ciclo di nove passaggi e seguirne l’output.",
        readMinutes: "13",
        facts: [
          ["Disciplina", "Workflow e product engineering"],
          ["Perimetro", "Servizio, microfrontend e confine workflow"],
          ["Consegna", "Circa tre mesi"],
          ["Confine", "Caso professionale anonimizzato"],
        ],
        starting: {
          title: "Il punto di partenza",
          paragraphs: [
            "Il dominio comprendeva sessioni archivistiche, tipologie, codici ente, storage input/output, pacchetti sorgente, pacchetti risultanti e lifecycle del workflow. Gli operatori avevano bisogno di un percorso pratico per capire come quei record si muovevano insieme.",
            "La funzionalità doveva vivere in una piattaforma single-spa più ampia, che forniva già header, footer, navigazione e microfrontend riutilizzabili. Riutilizzare quei componenti era un obiettivo primario, non una rifinitura visiva successiva.",
            "Un’applicazione React autonoma avrebbe duplicato la shell della piattaforma e creato un secondo punto di manutenzione per navigazione e chrome. Il confine utile era un’esperienza archivistica mirata che la piattaforma esistente potesse comporre.",
          ],
        },
        constraints: {
          title: "Cosa doveva risolvere il design",
          intro: "Il confine utile si trovava tra stato del processo, azione dell’operatore e piattaforma host:",
          items: [
            "Sessione, pacchetti sorgente e output dovevano restare comprensibili lungo nove passaggi.",
            "Le azioni dell’operatore dovevano corrispondere a transizioni valide.",
            "La nuova esperienza doveva riutilizzare header, footer, navigazione e convenzioni dei componenti esistenti invece di distribuire una shell parallela.",
            "Il microfrontend React single-spa richiedeva un mount point e un contratto d’integrazione stretti, così le regole archivistiche non si disperdevano nell’host.",
            "Regole backend, stato Camunda e azioni frontend non potevano divergere in interpretazioni diverse dello stesso workflow.",
          ],
        },
        diagnosis: {
          title: "La diagnosi",
          paragraphs: [
            "Camunda poteva coordinare il processo, ma l’orchestrazione da sola non costituiva l’esperienza operativa. Mancava un confine applicativo coerente attorno al workflow.",
            "La piattaforma host aveva già risolto composizione e chrome. Ricostruire quelle parti avrebbe aumentato il codice senza migliorare il workflow archivistico, quindi ho limitato il microfrontend alla superficie di dominio mancante.",
            "Ho separato deliberatamente le responsabilità: l’host mantiene navigazione e componenti condivisi; Spring Boot possiede regole applicative, riferimenti storage S3-compatible e integrazione Camunda; il microfrontend React single-spa presenta stato corrente e azioni valide.",
          ],
        },
        architecture: {
          title: "La sezione applicativa risultante",
          intro:
            "La shell single-spa esistente monta il microfrontend React dentro header, footer e navigazione condivisi. Il microfrontend offre soltanto la superficie archivistica. Un servizio Spring mirato traduce le azioni in operazioni workflow e riferimenti storage, mentre Camunda coordina il processo dalla creazione della sessione al tracking dell’output.",
          labels: ["OPERATORE", "REACT SINGLE-SPA", "API SPRING BOOT", "CAMUNDA", "S3 INPUT + OUTPUT"],
          caption: "La piattaforma possiede la shell; microfrontend e servizio possiedono il confine del workflow archivistico.",
        },
        technology: {
          title: "Perché questi confini erano adatti alla piattaforma host",
          intro:
            "Non era una selezione greenfield dello stack. Shell, motore di workflow e convenzioni di storage appartenevano a una piattaforma esistente; il compito era aggiungere una capacità coerente senza duplicare o aggirare quei confini.",
          items: [
            {
              choice: "Un servizio Spring Boot con un confine mirato",
              why: "Il servizio assegnava a regole applicative, azioni valide, integrazione Camunda e riferimenti storage un solo proprietario backend. React poteva consumare un modello applicativo senza conoscere i meccanismi del motore di processo.",
              alternative: "Chiamare Camunda direttamente dal browser o distribuire le regole archivistiche tra servizi condivisi avrebbe esposto dettagli di orchestrazione e creato più interpretazioni del comportamento valido.",
              cost: "L’API e il livello di mappatura aggiuntivi devono evolvere insieme al processo; gli errori tra servizio e motore richiedono una gestione esplicita.",
            },
            {
              choice: "Camunda per il processo in nove passaggi",
              why: "Camunda coordinava già il workflow; mantenere lì le transizioni conservava una sola fonte dell’avanzamento, mentre il servizio traduceva quello stato per gli operatori.",
              alternative: "Una macchina a stati personalizzata, soprattutto se rappresentata principalmente nello stato della UI, avrebbe duplicato la logica e messo il browser in concorrenza con il motore come autorità sul processo.",
              cost: "Definizioni del processo e modello applicativo devono restare allineati, e la diagnosi operativa attraversa sia il servizio sia il motore.",
            },
            {
              choice: "React nella composizione single-spa esistente",
              why: "Un microfrontend circoscritto poteva riutilizzare header, footer, navigazione e convenzioni della piattaforma, possedendo soltanto la route archivistica e il suo modello d’interazione.",
              alternative: "Riscrivere la shell o distribuire un’applicazione React autonoma avrebbe ampliato il progetto oltre la capacità mancante e creato navigazione e chrome duplicati da mantenere.",
              cost: "Il microfrontend dipende da un contratto stabile di montaggio e integrazione; i cambiamenti condivisi richiedono coordinamento invece di un controllo completamente locale.",
            },
            {
              choice: "Storage S3-compatible per pacchetti di input e output",
              why: "Il contenuto dei pacchetti restava al confine dello storage a oggetti, mentre servizio e workflow lo referenziavano, separando record archivistici e responsabilità dei payload binari.",
              alternative: "Blob nel database avrebbero legato i pacchetti al ciclo di vita dei dati relazionali; file locali li avrebbero legati a una specifica istanza del servizio e al suo percorso di deploy.",
              cost: "Bucket, endpoint, credenziali e casi di oggetto mancante diventano responsabilità operative esplicite che il servizio deve rappresentare con chiarezza.",
            },
          ],
        },
        decisions: {
          title: "Regole per un workflow realmente operativo",
          intro: "L’architettura offre una sola fonte di verità sul processo; queste regole la trasformano in un’esperienza che l’operatore può leggere, considerare affidabile e riprendere dopo un problema.",
          items: [
            {
              title: "Mostrare lo stato prima dell’azione",
              body: "La sessione corrente, i pacchetti sorgente e risultanti e la fase del processo restano visibili prima che l’operatore scelga il passaggio successivo. Un’azione priva di questo contesto non viene presentata come progresso.",
              tradeoff: "L’interfaccia deve spiegare gli stati indisponibili, in attesa e falliti invece di ottimizzare soltanto il percorso ideale.",
            },
            {
              title: "Derivare le azioni valide dallo stato del backend",
              body: "L’interfaccia presenta le transizioni supportate dal modello applicativo, mentre il servizio rifiuta quelle non valide. Lo stato locale del browser non diventa mai una seconda autorità sul passaggio successivo.",
              tradeoff: "Lo scambio e l’aggiornamento dello stato devono essere espliciti, ma una schermata obsoleta non può inventare un passaggio valido.",
            },
            {
              title: "Preservare la continuità tra sessione e pacchetti",
              body: "La sessione, i pacchetti sorgente e quelli risultanti restano collegati lungo il percorso in nove fasi. La verifica segue lo stesso viaggio, dalla creazione e associazione fino all’elaborazione e al tracciamento dell’output.",
              tradeoff: "Il modello e l’interfaccia trasportano più contesto di una schermata dedicata a un solo task, ma l’operatore può seguire il legame tra il lavoro e il suo risultato.",
            },
            {
              title: "Rendere visibili errore e nuovo tentativo",
              body: "Uno stato incompleto, in attesa o fallito resta visibile. Se l’azione successiva valida permette di riprovare o proseguire, viene mostrata soltanto dopo la conferma del backend.",
              tradeoff: "Aumentano gli stati e i percorsi di errore da spiegare, ma attesa, fallimento e ripresa restano distinti invece di lasciare l’operatore nell’incertezza.",
            },
          ],
        },
        delivery: {
          title: "Delivery e verifica",
          paragraphs: [
            "La verifica segue i nove passaggi operativi: creare la sessione, collegare i pacchetti sorgente, avviare il workflow, osservare le transizioni valide e seguire i pacchetti in output.",
            "Ho verificato anche il confine di composizione: la nuova route doveva vivere dentro header, footer e navigazione esistenti senza introdurre una seconda shell o spingere lo stato archivistico nei componenti condivisi.",
            "Gli altri casi critici sono ai confini. Il servizio deve rifiutare transizioni non valide, la UI deve mostrare con onestà stati incompleti o in attesa e l’integrazione deve mantenere il processo come fonte dello stato.",
          ],
        },
        result: {
          title: "Il risultato qualitativo",
          paragraphs: [
            "La sezione risultante copre gestione delle sessioni, elaborazione dei pacchetti e controllo del workflow, dall’interfaccia dell’operatore fino al processo Camunda.",
            "Gli operatori hanno un solo luogo in cui capire il lavoro e farlo avanzare. La piattaforma mantiene header, footer, navigazione e convenzioni visive già conosciute.",
            "La piattaforma ottiene una capacità contenuta invece di un’applicazione parallela: nessuna shell duplicata, nessun secondo modello di navigazione e nessuna regola archivistica distribuita tra microfrontend non correlati.",
          ],
        },
        scope:
          "Organizzazione, prodotto, tipologie interne, endpoint, bucket e credenziali sono omessi. Durata approssimativa e lifecycle derivano dal record di progetto.",
      },
      "retail-erp-evolution": {
        category: "Software enterprise",
        cardTitle: "Manutenzione ed evoluzione di un ERP retail",
        title: "Migliorare un ERP retail senza interrompere le operazioni quotidiane",
        summary:
          "Per circa diciannove mesi ho lavorato su SQL Server, .NET Framework 4.8 e un frontend KnockoutJS di un ERP retail operativo: feature, bug, report, due integrazioni con corrieri e modernizzazione della ricezione stock.",
        readMinutes: "14",
        facts: [
          ["Disciplina", "Enterprise product engineering"],
          ["Perimetro", "Database, backend, frontend e integrazioni"],
          ["Consegna", "Circa diciannove mesi"],
          ["Confine", "Caso professionale anonimizzato"],
        ],
        starting: {
          title: "Il punto di partenza",
          paragraphs: [
            "L’ERP web operativo era un monolite su SQL Server, C# e .NET Framework 4.8, Entity Framework, KnockoutJS, JavaScript, jQuery, Bootstrap e Crystal Reports. L’affidabilità era un requisito di prodotto, non una nota di manutenzione.",
            "Il database non aveva un sistema di migrations e non apparteneva soltanto all’applicazione web. Un ERP desktop e un’applicazione cassa VB6 molto più vecchi usavano lo stesso schema, quindi una modifica corretta nel percorso web poteva comunque interrompere il lavoro quotidiano altrove.",
            "Il perimetro comprendeva feature, bug, stored procedure e view, reporting, due integrazioni con corrieri, requisiti, formazione e supporto. Il contatto diretto con il cliente era cruciale per capire l’uso reale del software prima di modificarlo.",
          ],
        },
        constraints: {
          title: "Cosa doveva rispettare il lavoro",
          intro: "Il sistema poteva evolvere soltanto se i percorsi operativi vecchi e nuovi continuavano a concordare:",
          items: [
            "I flussi esistenti dovevano continuare a sostenere il lavoro retail quotidiano.",
            "Le modifiche allo schema SQL Server dovevano essere retrocompatibili perché non esisteva uno storico di migrations capace di coordinare ogni consumer.",
            "L’ERP web .NET Framework e le vecchie applicazioni desktop e cassa VB6 condividevano lo stesso contratto dati.",
            "KnockoutJS, jQuery, regole backend e comportamento del database dovevano cambiare insieme quando cambiava il flusso web.",
            "I requisiti dovevano essere verificati con il cliente in termini operativi prima di diventare codice, report o comportamento d’integrazione.",
            "Due integrazioni esterne con corrieri dovevano restare comprensibili al confine del sistema.",
          ],
        },
        diagnosis: {
          title: "La diagnosi",
          paragraphs: [
            "In un ERP a più livelli, il ritardo o l’errore visibile è spesso l’ultimo anello. Una schermata può essere lenta per la forma della richiesta, il lavoro backend o l’accesso al database. Un problema d’integrazione può apparire come incoerenza frontend.",
            "Il database condiviso cambiava la definizione abituale di dettaglio interno. Tabelle, colonne e stored procedure erano anche contratti con software VB6 che non poteva seguire una moderna sequenza di migrations.",
            "Ho unito il tracing end-to-end alle conversazioni dirette con il cliente. Query e stored procedure SQL Server, regole .NET Framework, schermate KnockoutJS e jQuery, report, scambi con i corrieri e percorso desktop legacy erano parti dello stesso comportamento operativo.",
          ],
        },
        architecture: {
          title: "La vista utile del sistema",
          intro:
            "L’unità utile di cambiamento era l’intero contratto operativo: un’azione nell’interfaccia web KnockoutJS e jQuery, regole .NET Framework 4.8, lavoro sullo schema SQL Server condiviso e i vecchi percorsi desktop e cassa VB6 dipendenti dagli stessi record. Report e corrieri aggiungevano altri confini attorno a quel nucleo.",
          labels: ["OPERATORE WEB", "KNOCKOUT + JQUERY", ".NET FRAMEWORK 4.8", "SQL SERVER CONDIVISO", "ERP + CASSA VB6"],
          caption: "L’ERP web e il vecchio ecosistema VB6 si incontrano in un contratto dati retrocompatibile.",
        },
        technology: {
          title: "Perché la continuità era una scelta architetturale",
          intro:
            "Era l’evoluzione di un ERP operativo, non un’approvazione greenfield del suo stack. La scelta tecnologica corretta consisteva spesso nel preservare un contratto di lavoro e migliorarlo sul posto, invece di rendere nuovo ogni livello nello stesso momento.",
          items: [
            {
              choice: "Conservare C#/.NET Framework e KnockoutJS per cambiamenti incrementali",
              why: "Funzionalità, difetti e flussi quotidiani attraversavano già questi livelli. Lavorare al loro interno permetteva di seguire ogni richiesta lungo il percorso reale e rilasciarla senza sospendere l’operatività.",
              alternative: "Una riscrittura in un unico passaggio di backend e frontend avrebbe richiesto di riscoprire e sostituire il comportamento esistente prima di consegnare miglioramenti operativi più piccoli.",
              cost: "Il lavoro accetta i vincoli dei framework meno recenti, modelli frontend misti e competenze di manutenzione continuative invece di ottenere subito una base moderna e uniforme.",
            },
            {
              choice: "Trattare SQL Server come contratto dati condiviso",
              why: "ERP web, ERP desktop VB6 e applicazione cassa leggevano e scrivevano lo stesso schema. Modifiche SQL compatibili proteggevano applicazioni che non potevano avanzare con ogni release web.",
              alternative: "Migrare database o schema insieme al lavoro web avrebbe presupposto un passaggio simultaneo di tutte le applicazioni, nonostante l’assenza di un sistema di migrazione.",
              cost: "Modifiche additive e strutture transitorie possono restare più a lungo; il design del database deve considerare letture e scritture vecchie oltre al nuovo percorso.",
            },
            {
              choice: "Far evolvere Crystal Reports e i percorsi di reporting esistenti",
              why: "Il reporting faceva già parte del sistema operativo e del suo comportamento su SQL Server. Mantenerlo nel perimetro permetteva di verificare i cambiamenti con lo stesso contratto dati e applicativo.",
              alternative: "Introdurre nello stesso momento una nuova piattaforma di reporting avrebbe aggiunto un’altra migrazione e imposto di tradurre il comportamento dei report mentre applicazione e database stavano ancora cambiando.",
              cost: "La soluzione conserva strumenti di reporting storici e i loro vincoli di progettazione; le modifiche continuano a richiedere competenze specifiche e verifiche tra più livelli.",
            },
            {
              choice: "Consegnare un workflow end-to-end alla volta",
              why: "Una modifica poteva attraversare schermata operatore, regole .NET, comportamento SQL e, quando coinvolti, report, integrazioni e applicazioni preesistenti come un’unica sezione operativa coerente.",
              alternative: "Modernizzare un livello tecnico alla volta avrebbe diviso il comportamento tra percorsi vecchi e nuovi, rimandando la prova del workflow reale fino al completamento di più migrazioni.",
              cost: "Ogni sezione deve essere completata e verificata in tutti i livelli e le applicazioni che tocca; il progresso richiede quindi confini rigorosi invece dell’uniformità visiva di un programma per livelli.",
            },
          ],
        },
        decisions: {
          title: "Regole per cambiare un sistema in uso",
          intro: "La continuità dello stack definiva il perimetro; queste regole hanno mantenuto ogni modifica collegata all’intero percorso operativo e alle persone che lo utilizzano.",
          items: [
            {
              title: "Seguire tutta la richiesta",
              body: "Il lavoro su performance e affidabilità parte da un comportamento che cliente o operatore riescono a descrivere, poi lo segue attraverso stato web, regole backend e lavoro sul database invece di fermarsi al primo sintomo visibile.",
              tradeoff: "Richiede più indagine di una patch al primo componente lento, ma evita di spostare il collo di bottiglia o risolvere un sintomo che il cliente non aveva davvero.",
            },
            {
              title: "Rendere la compatibilità un criterio di accettazione",
              body: "Una modifica viene accettata soltanto dopo aver funzionato nel gestionale web e nei percorsi desktop e cassa che condividono gli stessi dati. Stored procedure, viste, report e scambi con i corrieri entrano nella verifica quando il workflow li attraversa.",
              tradeoff: "La superficie di accettazione è più ampia del componente modificato, ma un successo locale non può trasformarsi in silenzio in un guasto su un altro percorso quotidiano.",
            },
            {
              title: "Definire il completamento nel workflow reale del cliente",
              body: "Le conversazioni con il cliente traducono una richiesta in workflow concreti, casi limite e verifiche di accettazione prima della modifica. La consegna è completa soltanto quando il comportamento risultante si ricollega all’uso quotidiano, non quando un singolo componente funziona in isolamento.",
              tradeoff: "Questa definizione del completamento richiede tempo di coordinamento, ma costa meno che consegnare un’interpretazione tecnicamente coerente e inadatta al processo retail reale.",
            },
            {
              title: "Usare supporto e formazione come feedback di rilascio",
              body: "Le domande emerse durante supporto e formazione mantengono i requisiti legati al modo in cui le persone comprendono e svolgono il lavoro. Quel feedback orienta la successiva correzione o evoluzione circoscritta.",
              tradeoff: "La responsabilità della consegna continua oltre il merge del codice, ma le difficoltà d’uso diventano visibili mentre possono ancora guidare il rilascio seguente.",
            },
          ],
        },
        delivery: {
          title: "Delivery e verifica",
          paragraphs: [
            "Ogni modifica veniva verificata nel proprio livello e nel flusso operativo: stored procedure e view, regole .NET, risposte dei corrieri, Crystal Reports e stato KnockoutJS dovevano concordare.",
            "Il lavoro sul database richiedeva anche una domanda di compatibilità: cosa leggeranno o scriveranno l’ERP e la cassa VB6 dopo questa modifica? Senza migrations, la risposta doveva stare nel design e non poteva essere rimandata all’automazione del rollout.",
            "Il feedback diretto del cliente completava la verifica dei percorsi quotidiani. Una modifica tecnicamente corretta non era finita se rendeva il lavoro abituale più difficile da capire o non corrispondeva più all’operatività descritta da chi usava il sistema.",
          ],
        },
        result: {
          title: "Il risultato qualitativo",
          paragraphs: [
            "Performance, integrazioni e affidabilità quotidiana sono migliorate insieme perché il lavoro ha attraversato i confini in cui questi aspetti si incontravano.",
            "L’ERP web ha continuato a evolvere preservando il comportamento del database condiviso necessario alle vecchie applicazioni desktop e cassa.",
            "La strada pratica non era fingere che un ERP business-critical potesse essere fermato e sostituito in un solo gesto. Era capire il flusso reale con il cliente, introdurre modifiche compatibili e mantenere utile il sistema per tutto il percorso.",
          ],
        },
        scope:
          "Organizzazione, prodotto, utenti, vendor, dati commerciali e KPI sono omessi. Durata approssimativa, tecnologie e due integrazioni derivano dal record di progetto.",
      },
    },
  },
  de: {
    lang: "de",
    locale: "de_CH",
    label: "DE",
    languageName: "Deutsch",
    prefix: "/de",
    ui: {
      skip: "Zum Inhalt springen",
      home: "Fallstudien",
      portfolio: "Studio",
      navigation: "Hauptnavigation",
      languages: "Sprache wählen",
      menuOpen: "Navigation öffnen",
      menuClose: "Navigation schliessen",
      contact: "Projekt besprechen",
      allWork: "Alle Fallstudien",
      readCase: "Fallstudie lesen",
      published: "Veröffentlicht",
      readTime: "Min. Lesezeit",
      contents: "Auf dieser Seite",
      stack: "Technologien",
      sourceNote: "Informationsgrenze",
      socialImageAlt: "Die Wortmarke Ejupi Labs neben der Überschrift «Technische Entscheidungen, erklärt» und einem redaktionellen Entscheidungsdiagramm.",
      footerLine: "Produktsoftware, Cloud-Systeme und Automatisierung aus der Schweiz.",
      rights: "Alle Rechte vorbehalten.",
      notFoundTitle: "Diese Seite ist nicht verfügbar.",
      notFoundBody: "Prüfen Sie die Adresse oder kehren Sie zum Fallstudien-Archiv zurück.",
      notFoundAction: "Alle Fallstudien ansehen",
    },
    index: {
      title: "Technische Entscheidungen, erklärt.",
      description:
        "Fallstudien zu Anforderungen, Entscheidungen, realistischen Alternativen, bewusst akzeptierten Kosten und Nachweisen hinter anonymisierten beruflichen Systemen und Open-Source-Projekten aus Labs.",
      eyebrow: "Engineering-Fallstudien / 01 / 10",
      ctaTitle: "Braucht ein komplexes System einen klareren Weg?",
      ctaBody: "Bringen Sie den schwierigen Teil mit. Gemeinsam klären wir Architektur, Auslieferungspfad und die erste nützliche Version.",
    },
    cases: {
      "ai-workflow-cloud-migration": {
        category: "Cloud-Plattformen",
        cardTitle: "Cloud-Migration einer AI-Workflow-Plattform",
        title: "Eine AI-Workflow-Plattform auf ein wiederholbares Cloud-Fundament stellen",
        summary:
          "In etwa einem Monat überführte ich eine mehrteilige Dokument- und AI-Workflow-Plattform aus einem umgebungsspezifischen On-Premise-Betrieb in wiederverwendbares Terraform, GKE und einen kontrollierten Blue/Red-Releaseweg.",
        readMinutes: "14",
        facts: [
          ["Disziplin", "Cloud Platform Engineering"],
          ["Umfang", "Infrastruktur, Workloads und Releaseweg"],
          ["Lieferzeit", "Etwa ein Monat"],
          ["Grenze", "Anonymisierte berufliche Fallstudie"],
        ],
        starting: {
          title: "Der Ausgangspunkt",
          paragraphs: [
            "Die On-Premise-Plattform verband eine Vue-Oberfläche, zwei Spring-Boot-Dienste, einen Python-Temporal-Worker, Temporal, Keycloak, PostgreSQL und MinIO. Sie verarbeitete Dokumente und AI-gestützte Workflows, doch die Umgebungen hatten keinen gemeinsamen, verlässlichen Setup-Weg.",
            "Nur von einer Cloud-Migration zu sprechen, hätte das Ziel beschrieben, nicht die eigentliche Arbeit. Stateful und stateless Komponenten mussten bewusst verschoben, Demo und Produktion getrennt und der Wechsel zwischen zwei Produktionsslots kontrolliert werden.",
            "Ich zerlegte die Änderung in vier verbundene Grenzen: Workload-Paketierung, verwaltete Daten, Umgebungskonfiguration und Releasekontrolle. So konnte „auf Kubernetes verschieben“ nicht zum gesamten Design werden.",
          ],
        },
        constraints: {
          title: "Was das Design lösen musste",
          intro: "Das neue Plattformmodell musste fünf Dinge sichtbar machen:",
          items: [
            "Vue-, Spring-Boot-, Python-, Temporal- und Keycloak-Workloads brauchten ein gemeinsames Kubernetes-Deployment-Modell.",
            "Die Verantwortlichkeiten von PostgreSQL und MinIO mussten zu Cloud SQL und Cloud Storage wechseln, ohne die Änderung hinter weiteren Containern zu verstecken.",
            "Die wiederverwendbare Infrastruktur musste gemeinsam bleiben, während umgebungsspezifische Werte als prüfbare Eingaben sichtbar blieben.",
            "Demo-Pipeline und Produktionsrelease benötigten unterschiedliche Kontrollen, weil sie unterschiedliche betriebliche Risiken trugen.",
            "Der Produktionsrollout verlangte einen inaktiven Slot, Smoke-Tests und einen ausdrücklichen manuellen Wechsel.",
          ],
        },
        diagnosis: {
          title: "Die Diagnose",
          paragraphs: [
            "Der fragile Teil war kein einzelner Dienst. Es war der Weg vom Quellcode zu einer laufenden Umgebung. Wenn dieser Weg je Umgebung variiert, trägt jede Änderung versteckte Annahmen mit sich.",
            "Ein reines Lift-and-shift hätte diese Annahmen nur an einem neuen Ort reproduziert. PostgreSQL und MinIO im neuen Cluster zu betreiben, hätte zudem Betriebsaufgaben erhalten, die Google Cloud an klareren verwalteten Grenzen übernehmen konnte.",
            "Ich behandelte deshalb Reproduzierbarkeit und Reversibilität als zentrale Anforderungen. Terraform-Module definieren das Google-Cloud-Fundament, Helm paketiert die Kubernetes-Workloads und Umgebungswerte bleiben von den wiederverwendbaren Definitionen getrennt.",
          ],
        },
        architecture: {
          title: "Das resultierende Plattformmodell",
          intro:
            "GitLab CI startet den Produktionsweg, Cloud Build erstellt die auslieferbaren Images und Artifact Registry hält die Version für GKE. Das Deployment erreicht den inaktiven Blue/Red-Slot. Kubernetes-Readiness und Smoke-Test müssen erfolgreich sein, bevor ein Operator den Traffic umschaltet. Cloud SQL und Cloud Storage ersetzen die selbstverwalteten PostgreSQL- und MinIO-Verantwortlichkeiten.",
          labels: ["GITLAB CI", "CLOUD BUILD", "ARTIFACT REGISTRY", "GKE BLUE / RED", "CLOUD SQL + GCS"],
          caption: "Ein Build, Prüfung im inaktiven Slot und ein bewusster Produktionswechsel.",
        },
        technology: {
          title: "Warum diese Technologien zur Migration passten",
          intro:
            "Diese Entscheidungen fielen innerhalb eines bestehenden Produkts und eines festgelegten Google-Cloud-Ziels; sie waren kein Greenfield-Vergleich aller denkbaren Plattformen. Entscheidend war, welche Grenzen genau diesen Workload-Mix wiederholbar und betreibbar machten.",
          items: [
            {
              choice: "GKE als gemeinsame Grenze für die Workloads",
              why: "Die Plattform verband bereits eine Vue-Oberfläche, Spring-Boot-Dienste, einen Python-Worker, Temporal und Keycloak. GKE gab diesen unterschiedlichen Workloads ein gemeinsames Modell für Deployment, Readiness und Blue/Red-Slots, während verwaltete Daten den Cluster verliessen.",
              alternative: "Eine Verteilung auf mehrere Serverless-Produkte hätte verschiedene Ausführungsmodelle in denselben Releaseweg gebracht; dauerhaft laufende VMs hätten mehr hostspezifischen Aufbau und Wartung bewahrt.",
              cost: "Das Team übernimmt die Kubernetes-Betriebsoberfläche, den Cluster-Lebenszyklus und die Pflicht, Ressourcen, Readiness und Upgrades der Workloads ausdrücklich zu pflegen.",
            },
            {
              choice: "Terraform-Module für das Google-Cloud-Fundament",
              why: "Wiederverwendbare Module hielten gemeinsame Infrastrukturdefinitionen zusammen und machten Umgebungsunterschiede zu sichtbaren, prüfbaren Eingaben. Das adressierte direkt den umgebungsspezifischen Aufbau, den die Migration beseitigen sollte.",
              alternative: "Konfiguration in der Konsole oder kopierte Templates hätten die erste Umgebung schneller erzeugt, doch spätere Änderungen wären schwerer prüfbar gewesen und jede Kopie hätte unabhängig abweichen können.",
              cost: "Modulverträge, Provider-State und Versionswechsel verlangen Disziplin; selbst eine kleine Ausnahme muss modelliert werden, statt unbemerkt von Hand korrigiert zu werden.",
            },
            {
              choice: "Helm zur Paketierung der Kubernetes-Workloads",
              why: "Helm lieferte eine Releaseeinheit für zusammengehörige Kubernetes-Ressourcen und einen kontrollierten Ort für Umgebungswerte, ohne die vollständige Workload-Definition für jeden Slot zu kopieren.",
              alternative: "Direkte Kubernetes-Manifeste wären für ein einzelnes Deployment einfacher gewesen. Kopien über Umgebungen und Blue/Red-Slots hinweg hätten gemeinsame Änderungen und beabsichtigte Unterschiede jedoch schwerer unterscheidbar gemacht.",
              cost: "Templates und Werte schaffen eine zusätzliche Ebene; die gerenderte Ausgabe muss geprüft und jede Chart-Änderung so sorgfältig versioniert werden wie Anwendungscode.",
            },
            {
              choice: "Getrennte Verantwortlichkeiten für Cloud Build und GitLab CI",
              why: "Cloud Build erzeugte die Images im Google-Cloud-Pfad, während GitLab CI Produktionsorchestrierung, Prüfung und die ausdrückliche Trafficentscheidung behielt. Die Trennung entsprach den unterschiedlichen Folgen von Artefakterstellung und Release.",
              alternative: "Eine einzige undifferenzierte Deploy-Pipeline wäre leichter zu beschreiben gewesen, hätte aber Demo- und Produktionskontrollen vermischt und Build, Rollout und Trafficwechsel zu einer gekoppelten Aktion gemacht.",
              cost: "Zwei Systeme benötigen Zugangsdaten, Artefaktübergaben und Fehleranalyse über eine Grenze hinweg; ihre Verträge müssen aufeinander abgestimmt bleiben.",
            },
          ],
        },
        decisions: {
          title: "Betriebsregeln für ein umkehrbares Release",
          intro: "Der Stack definiert den Weg; diese Regeln klären, wem State gehört, was als Nachweis gilt und wie Produktion ohne unumkehrbaren Sprung verändert wird.",
          items: [
            {
              title: "Umgebungsunterschiede überprüfbar machen",
              body: "Vor einem Release sind umgebungsspezifische Werte und Verantwortung für State gemeinsam sichtbar, einschliesslich Daten, Backup und Recovery. Ein Unterschied wird zum ausdrücklichen Input oder Übergabepunkt, nicht zur unsichtbaren Korrektur in einer laufenden Umgebung.",
              tradeoff: "Unterschiede und Verantwortung zu prüfen, braucht Vorbereitung, verhindert aber, dass Konfigurationsdrift oder ungeklärte Recovery-Aufgaben erst beim Cutover auftauchen.",
            },
            {
              title: "Den Kandidaten durchgängig prüfen",
              body: "Ein Release wird vom gebauten Image bis in die inaktive Umgebung verfolgt und dort mit Readiness, Infrastruktursignalen und einem Smoke-Test geprüft. Kein einzelnes grünes Signal steht für den gesamten Weg.",
              tradeoff: "Das dauert länger, als einen erfolgreichen Build als Beweis zu akzeptieren; der Smoke-Test bleibt bewusst begrenzt und beansprucht nicht, jeden Geschäftsablauf abzudecken.",
            },
            {
              title: "Artefaktnachweis und Traffic-Hoheit trennen",
              body: "Ein erfolgreicher Build erzeugt einen Kandidaten, gewährt ihm aber keinen Produktionszugang. Dasselbe Artefakt wird im inaktiven Blue/Red-Slot deployt und erprobt, während die Traffic-Umschaltung eine separate Aktion des Operators bleibt.",
              tradeoff: "Diese Governance schafft Übergaben und verlangt, dass beide Slots bereit bleiben, verhindert aber, dass Build-Erfolg mit Release-Freigabe verwechselt wird.",
            },
            {
              title: "Den Cutover ausdrücklich und umkehrbar machen",
              body: "Traffic wechselt erst, wenn die Prüfungen sichtbar sind und ein Operator die Umschaltung freigibt. Der vorherige Slot bleibt der klare Rückweg, statt direkt überschrieben zu werden.",
              tradeoff: "Das Gate schafft eine bewusste Pause, hält aber die letzte Produktionshoheit und den Rückweg sichtbar, wenn die Nachweise unvollständig sind.",
            },
          ],
        },
        delivery: {
          title: "Delivery und Prüfung",
          paragraphs: [
            "Ich ordnete die Arbeit nach Abhängigkeit und Reversibilität: Google-Cloud-Fundament, Workload-Paketierung, ausgelagerte Umgebungswerte, Verlagerung der Datenverantwortung und danach der vollständige Releaseweg vor dem Produktionswechsel.",
            "Demo und Produktion bleiben getrennt. Produktion läuft von GitLab CI über Cloud Build und Artifact Registry in den inaktiven GKE-Slot, statt die aktive Umgebung zu überschreiben.",
            "Kubernetes-Readiness, Google-Cloud-Warnungen und Infrastruktursignale werden mit einem Smoke-Test vor dem Wechsel kombiniert. Das beweist nicht jeden Geschäftsablauf. Es zeigt, dass der Kandidat gesund genug für einen kontrollierten Cutover ist.",
          ],
        },
        result: {
          title: "Das gelieferte Ergebnis",
          paragraphs: [
            "Die Migration ersetzte einen umgebungsspezifischen On-Premise-Weg durch wiederverwendbare Infrastrukturmodule, paketierte Workloads, verwaltete Datendienste und zwei kontrollierte Produktionsslots.",
            "Der nützliche Ausgang ist nicht einfach „läuft auf Google Cloud“. Es ist ein Releaseweg, der vor dem Deployment geprüft, vor dem Trafficwechsel verifiziert und für die nächste Umgebung wiederholt werden kann.",
            "Ich versehe dieses Ergebnis nicht mit einer erfundenen Geschwindigkeits- oder Zuverlässigkeitszahl. Die belegbare Änderung ist strukturell: weniger umgebungsspezifische Annahmen, klare Betriebsverantwortung und eine reversible Produktionsentscheidung.",
          ],
        },
        scope:
          "Organisation, Produkt, Endpunkte, Storage-Konfiguration, Kosten und Volumen sind weggelassen. Ungefähre Dauer, Komponenten und Releasesequenz stammen aus der Projektdokumentation.",
      },
      "archival-workflow-management": {
        category: "Workflow-Software",
        cardTitle: "Verwaltung von Archivierungs-Workflows",
        title: "Ein klarer Arbeitsweg durch einen komplexen Archivierungsprozess",
        summary:
          "In etwa drei Monaten baute ich einen Spring-Boot-Dienst und ein React-Single-SPA-Microfrontend um Camunda, um Archivierungssitzungen, Quellpakete und den Output eines neunstufigen Ablaufs zu steuern.",
        readMinutes: "13",
        facts: [
          ["Disziplin", "Workflow- und Product Engineering"],
          ["Umfang", "Dienst, Microfrontend und Workflow-Grenze"],
          ["Lieferzeit", "Etwa drei Monate"],
          ["Grenze", "Anonymisierte berufliche Fallstudie"],
        ],
        starting: {
          title: "Der Ausgangspunkt",
          paragraphs: [
            "Die Domäne umfasste Archivierungssitzungen, Typen, Organisationscodes, Input- und Output-Storage, Quell- und Ergebnispakete sowie den Workflow-Lebenszyklus. Mitarbeitende brauchten einen praktischen Weg, um diese zusammenhängenden Datensätze zu verstehen.",
            "Die Funktion musste in einer grösseren single-spa-Plattform leben, die bereits Header, Footer, Navigation und wiederverwendbare Microfrontends bereitstellte. Diese Komponenten wiederzuverwenden war ein Hauptziel, keine spätere optische Bereinigung.",
            "Eine eigenständige React-Anwendung hätte die Plattform-Shell dupliziert und einen zweiten Wartungsort für Navigation und Chrome geschaffen. Die nützliche Grenze war eine fokussierte Archivierungserfahrung, welche die bestehende Plattform komponieren konnte.",
          ],
        },
        constraints: {
          title: "Was das Design lösen musste",
          intro: "Die nützliche Grenze lag zwischen Prozessstatus, Benutzeraktion und Host-Plattform:",
          items: [
            "Sitzung, Quellpakete und Output mussten über neun Prozessschritte verständlich bleiben.",
            "Benutzeraktionen mussten sauber auf gültige Prozessübergänge abgebildet werden.",
            "Die neue Oberfläche musste Header, Footer, Navigation und bestehende Komponentenkonventionen wiederverwenden, statt eine parallele Shell auszuliefern.",
            "Das React-single-spa-Microfrontend brauchte einen engen Mount-Punkt und Integrationsvertrag, damit Archivierungsregeln nicht in den Host durchsickerten.",
            "Backend-Regeln, Camunda-Status und Frontend-Aktionen durften nicht zu verschiedenen Interpretationen desselben Workflows werden.",
          ],
        },
        diagnosis: {
          title: "Die Diagnose",
          paragraphs: [
            "Camunda konnte den Prozess koordinieren, aber Orchestrierung allein war noch keine brauchbare Arbeitsoberfläche. Es fehlte eine zusammenhängende Anwendungsgrenze um den Workflow.",
            "Die Host-Plattform hatte Komposition und Chrome bereits gelöst. Diese Teile neu zu bauen, hätte mehr Code erzeugt, ohne den Archivierungsworkflow zu verbessern. Deshalb beschränkte ich das Microfrontend auf die fehlende Domänenoberfläche.",
            "Ich trennte die Verantwortung bewusst: Der Host behält Navigation und gemeinsame Komponenten; Spring Boot besitzt Anwendungsregeln, S3-kompatible Storage-Referenzen und Camunda-Integration; das React-single-spa-Microfrontend zeigt aktuellen Status und gültige Aktionen.",
          ],
        },
        architecture: {
          title: "Der resultierende Anwendungsausschnitt",
          intro:
            "Die bestehende single-spa-Shell bindet das React-Microfrontend in gemeinsamen Header, Footer und Navigation ein. Das Microfrontend liefert nur die Archivierungsoberfläche. Ein fokussierter Spring-Dienst übersetzt Aktionen in Workflow-Operationen und Storage-Referenzen, während Camunda den Prozess von der Sitzungserstellung bis zum Output-Tracking koordiniert.",
          labels: ["BENUTZER", "REACT SINGLE-SPA", "SPRING BOOT API", "CAMUNDA", "S3 INPUT + OUTPUT"],
          caption: "Die Plattform besitzt die Shell; Microfrontend und Dienst besitzen die Grenze des Archivierungsworkflows.",
        },
        technology: {
          title: "Warum diese Grenzen zur Host-Plattform passten",
          intro:
            "Dies war keine Greenfield-Auswahl des Stacks. Shell, Workflow-Engine und Storage-Konventionen gehörten zu einer bestehenden Plattform; die Aufgabe war, eine zusammenhängende Fähigkeit hinzuzufügen, ohne diese Grenzen zu duplizieren oder zu umgehen.",
          items: [
            {
              choice: "Ein fokussierter Spring-Boot-Dienst als Anwendungsgrenze",
              why: "Der Dienst bündelte die Zuständigkeit für Anwendungsregeln, gültige Aktionen, Camunda-Integration und Storage-Referenzen im Backend. React konnte ein Anwendungsmodell nutzen, ohne die Mechanik der Prozess-Engine zu kennen.",
              alternative: "Direkte Camunda-Aufrufe aus dem Browser oder verteilte Archivierungsregeln in gemeinsamen Diensten hätten Orchestrierungsdetails offengelegt und mehrere Auslegungen des gültigen Workflow-Verhaltens geschaffen.",
              cost: "Die zusätzliche API- und Abbildungsschicht muss sich mit dem Prozess weiterentwickeln; Fehler an der Grenze zwischen Dienst und Engine brauchen eine ausdrückliche Behandlung.",
            },
            {
              choice: "Camunda für den neunstufigen Prozess",
              why: "Camunda koordinierte den Workflow bereits. Die Übergänge dort zu belassen, erhielt eine einzige Quelle für den Fortschritt, während der Dienst diesen Status für Mitarbeitende übersetzte.",
              alternative: "Eine eigene Zustandsmaschine, besonders wenn sie hauptsächlich als UI-Status abgebildet wäre, hätte Prozesslogik dupliziert und den Browser mit der Workflow-Engine um die Autorität konkurrieren lassen.",
              cost: "Prozessdefinition und Anwendungsmodell müssen aufeinander abgestimmt bleiben; die Betriebsdiagnose führt sowohl durch den Dienst als auch durch die Engine.",
            },
            {
              choice: "React in der bestehenden single-spa-Komposition",
              why: "Ein klar begrenztes Microfrontend konnte Header, Footer, Navigation und Plattformkonventionen wiederverwenden und nur die Archivierungsroute samt Interaktionsmodell besitzen.",
              alternative: "Eine neue Shell oder eine eigenständige React-Anwendung hätte das Vorhaben über die fehlende Fähigkeit hinaus erweitert und doppelte Navigation sowie doppelten Chrome geschaffen.",
              cost: "Das Microfrontend hängt von einem stabilen Mount- und Integrationsvertrag ab; Änderungen der gemeinsamen Plattform erfordern Koordination statt vollständiger lokaler Kontrolle.",
            },
            {
              choice: "S3-kompatibler Storage für Input- und Output-Pakete",
              why: "Paketinhalte blieben an einer Object-Storage-Grenze, auf die Dienst und Workflow verwiesen. So blieben Archivierungsdatensätze und Verantwortung für binäre Inhalte getrennt.",
              alternative: "Datenbank-Blobs hätten Paketinhalt an den Lebenszyklus relationaler Daten gebunden; lokale Dateien hätten ihn an eine bestimmte Dienstinstanz und deren Deploymentweg gebunden.",
              cost: "Buckets, Endpunkte, Zugangsdaten und fehlende Objekte werden zu ausdrücklichen Betriebsbelangen, die der Dienst nachvollziehbar darstellen muss.",
            },
          ],
        },
        decisions: {
          title: "Betriebsregeln für einen bedienbaren Workflow",
          intro: "Die Architektur liefert eine Quelle der Prozesswahrheit; diese Regeln machen daraus eine Erfahrung, die Mitarbeitende lesen, ihr vertrauen und nach einem Problem fortsetzen können.",
          items: [
            {
              title: "Status vor der Aktion zeigen",
              body: "Die aktuelle Sitzung, ihre Quell- und Ergebnispakete sowie die Prozessphase bleiben sichtbar, bevor Mitarbeitende den nächsten Schritt wählen. Eine Aktion ohne diesen Kontext wird nicht als Fortschritt dargestellt.",
              tradeoff: "Die Oberfläche muss nicht verfügbare, laufende und fehlgeschlagene Zustände erklären, statt nur den Idealfall zu optimieren.",
            },
            {
              title: "Gültige Aktionen aus dem Backend-Status ableiten",
              body: "Die Oberfläche zeigt Übergänge, die das Anwendungsmodell unterstützt, während der Dienst ungültige ablehnt. Lokaler Browser-Status wird nie zu einer zweiten Autorität über den nächsten Schritt.",
              tradeoff: "Statusaustausch und Aktualisierung müssen ausdrücklich behandelt werden, doch eine veraltete Ansicht kann keinen gültigen Workflow-Schritt erfinden.",
            },
            {
              title: "Kontinuität von Sitzung und Paketen bewahren",
              body: "Sitzung, Quellpakete und Ergebnispakete bleiben über den neunstufigen Weg verbunden. Die Prüfung folgt derselben Reise von Erstellung und Zuordnung über die Verarbeitung bis zur Nachverfolgung der Ausgabe.",
              tradeoff: "Modell und Oberfläche tragen mehr Kontext als eine reine Aufgabenansicht, doch Mitarbeitende können den Zusammenhang zwischen Arbeit und Ergebnis verfolgen.",
            },
            {
              title: "Fehler und Wiederholung sichtbar machen",
              body: "Ein unvollständiger, laufender oder fehlgeschlagener Schritt bleibt sichtbar. Erlaubt die nächste gültige Aktion einen neuen Versuch oder die Fortsetzung, erscheint sie erst nach Bestätigung durch das Backend.",
              tradeoff: "Die Oberfläche muss mehr Zustände und Fehlerwege erklären, trennt dafür aber Warten, Fehlschlag und Wiederaufnahme, statt Mitarbeitende raten zu lassen.",
            },
          ],
        },
        delivery: {
          title: "Delivery und Prüfung",
          paragraphs: [
            "Die Prüfung folgt den neun Schritten: Sitzung erstellen, Quellpakete verbinden, Workflow starten, gültige Übergänge beobachten und Ergebnispakete verfolgen.",
            "Ich prüfte auch die Kompositionsgrenze: Die neue Route musste in bestehendem Header, Footer und Navigation leben, ohne eine zweite Shell einzuführen oder Archivierungsstatus in gemeinsame Plattformkomponenten zu schieben.",
            "Die anderen wichtigen Fehlerfälle liegen an den Grenzen. Der Dienst muss ungültige Übergänge ablehnen, die UI unvollständige oder laufende Zustände ehrlich zeigen, und die Prozessintegration muss die Quelle des Workflow-Status bleiben.",
          ],
        },
        result: {
          title: "Das qualitative Ergebnis",
          paragraphs: [
            "Der Anwendungsausschnitt deckt Sitzungsverwaltung, Paketverarbeitung und Workflow-Steuerung von der Oberfläche bis zum Camunda-Prozess ab.",
            "Mitarbeitende haben einen Ort, an dem sie die Arbeit verstehen und voranbringen können. Die Plattform behält Header, Footer, Navigation und bekannte visuelle Konventionen.",
            "Die Plattform erhält eine gekapselte Fähigkeit statt einer parallelen Anwendung: keine doppelte Shell, kein zweites Navigationsmodell und keine über fremde Microfrontends verteilten Archivierungsregeln.",
          ],
        },
        scope:
          "Organisation, Produkt, interne Typen, Endpunkte, Buckets und Zugangsdaten sind weggelassen. Ungefähre Dauer und Lebenszyklus stammen aus der Projektdokumentation.",
      },
      "retail-erp-evolution": {
        category: "Enterprise-Software",
        cardTitle: "Wartung und Weiterentwicklung eines Retail-ERP",
        title: "Ein Retail-ERP verbessern, ohne den täglichen Betrieb zu verlassen",
        summary:
          "Über etwa neunzehn Monate arbeitete ich an SQL Server, .NET Framework 4.8 und einem KnockoutJS-Frontend eines laufenden Retail-ERP: Features, Fehler, Reports, zwei Kuriereinbindungen und Modernisierung des Wareneingangs.",
        readMinutes: "14",
        facts: [
          ["Disziplin", "Enterprise Product Engineering"],
          ["Umfang", "Datenbank, Backend, Frontend und Integrationen"],
          ["Lieferzeit", "Etwa neunzehn Monate"],
          ["Grenze", "Anonymisierte berufliche Fallstudie"],
        ],
        starting: {
          title: "Der Ausgangspunkt",
          paragraphs: [
            "Das laufende Web-ERP war ein Monolith auf SQL Server, C# und .NET Framework 4.8, Entity Framework, KnockoutJS, JavaScript, jQuery, Bootstrap und Crystal Reports. Zuverlässigkeit war eine Produktanforderung, keine Randnotiz der Wartung.",
            "Die Datenbank hatte kein Migrationssystem und gehörte nicht allein der Webanwendung. Ein wesentlich älteres VB6-Desktop-ERP und eine Kassenanwendung nutzten dasselbe Schema. Eine im Web korrekte Änderung konnte deshalb den täglichen Betrieb an anderer Stelle brechen.",
            "Der Umfang reichte von Features, Fehlern, Stored Procedures, Views und Reports bis zu zwei Kuriereinbindungen, Anforderungen, Schulung und Support. Der direkte Austausch mit dem Kunden war entscheidend, um die tatsächliche Nutzung vor einer Änderung zu verstehen.",
          ],
        },
        constraints: {
          title: "Was die Arbeit respektieren musste",
          intro: "Das System konnte sich nur weiterentwickeln, wenn alte und neue Betriebswege weiterhin zusammenpassten:",
          items: [
            "Bestehende Abläufe mussten die tägliche Retail-Arbeit weiter tragen.",
            "Änderungen am SQL-Server-Schema mussten rückwärtskompatibel sein, weil keine Migrationshistorie alle Verbraucher koordinierte.",
            "Das .NET-Framework-Web-ERP und die älteren VB6-Desktop- und Kassenanwendungen teilten denselben Datenvertrag.",
            "KnockoutJS, jQuery, Backend-Regeln und Datenbankverhalten mussten bei Änderungen am Webablauf zusammenpassen.",
            "Anforderungen mussten mit dem Kunden in betrieblicher Sprache geklärt werden, bevor sie zu Code, Reports oder Integrationsverhalten wurden.",
            "Zwei externe Kuriereinbindungen mussten an der Systemgrenze verständlich bleiben.",
          ],
        },
        diagnosis: {
          title: "Die Diagnose",
          paragraphs: [
            "In einem mehrschichtigen ERP ist die sichtbare Verzögerung oder Störung oft nur das letzte Glied. Eine Ansicht kann wegen ihrer Anfrageform, Backend-Arbeit oder eines Datenbankzugriffs langsam sein. Ein Integrationsfehler kann als Frontend-Inkonsistenz erscheinen.",
            "Die gemeinsame Datenbank änderte die übliche Bedeutung eines internen Implementierungsdetails. Tabellen, Spalten und Stored Procedures waren zugleich Verträge mit VB6-Software, die keiner modernen Migrationsfolge folgen konnte.",
            "Ich verband Ende-zu-Ende-Tracing mit direkten Kundengesprächen. SQL-Server-Abfragen und Stored Procedures, .NET-Framework-Regeln, KnockoutJS- und jQuery-Oberflächen, Reports, Kurieraustausch und der alte Desktop-Pfad waren Teile desselben Betriebsverhaltens.",
          ],
        },
        architecture: {
          title: "Die nützliche Systemsicht",
          intro:
            "Die sinnvolle Einheit war der gesamte Betriebsvertrag: eine Aktion in der KnockoutJS- und jQuery-Weboberfläche, Regeln in .NET Framework 4.8, Arbeit am gemeinsamen SQL-Server-Schema und die älteren VB6-Desktop- und Kassenpfade, die von denselben Datensätzen abhingen. Reports und Kurierübergaben bildeten weitere Grenzen um diesen Kern.",
          labels: ["WEB-BENUTZER", "KNOCKOUT + JQUERY", ".NET FRAMEWORK 4.8", "GEMEINSAMER SQL SERVER", "VB6 ERP + KASSE"],
          caption: "Web-ERP und ältere VB6-Anwendungen treffen in einem rückwärtskompatiblen Datenvertrag zusammen.",
        },
        technology: {
          title: "Warum Kontinuität eine Architekturentscheidung war",
          intro:
            "Dies war die Weiterentwicklung eines laufenden ERP, keine Greenfield-Empfehlung seines Stacks. Die richtige Technologieentscheidung bestand oft darin, einen Betriebsvertrag zu erhalten und gezielt zu verbessern, statt jede Schicht gleichzeitig zu ersetzen.",
          items: [
            {
              choice: "C#/.NET Framework und KnockoutJS für schrittweise Änderungen beibehalten",
              why: "Funktionen, Fehler und tägliche Abläufe führten bereits durch diese Schichten. Innerhalb davon zu arbeiten erlaubte, jede Änderung entlang des realen Anfragewegs zu verfolgen und im laufenden Betrieb auszuliefern.",
              alternative: "Eine Big-Bang-Neuentwicklung von Backend und Frontend hätte bestehendes Verhalten vollständig neu erfassen und ersetzen müssen, bevor kleinere betriebliche Verbesserungen die Benutzer erreicht hätten.",
              cost: "Die Arbeit akzeptiert ältere Framework-Grenzen, gemischte Frontend-Muster und fortlaufenden Wartungsbedarf, statt sofort eine saubere moderne Ausgangsbasis zu gewinnen.",
            },
            {
              choice: "SQL Server als gemeinsamen Datenvertrag behandeln",
              why: "Web-ERP, VB6-Desktop-ERP und Kassenanwendung lasen und schrieben dasselbe Schema. Kompatible SQL-Änderungen schützten Verbraucher, die nicht mit jedem Webrelease wechseln konnten.",
              alternative: "Eine neue Datenbank oder ein neues Schema im Rahmen der Webarbeit hätte vorausgesetzt, dass alle Verbraucher trotz fehlenden Migrationssystems gleichzeitig umgestellt werden konnten.",
              cost: "Additive Änderungen und Übergangsstrukturen können länger bestehen bleiben; das Datenbankdesign muss alte Lese- und Schreibwege ebenso berücksichtigen wie den neuen Pfad.",
            },
            {
              choice: "Crystal Reports und bestehende Reportingwege weiterentwickeln",
              why: "Reporting war bereits Teil des Betriebssystems und seines SQL-Server-Verhaltens. Dieser bestehende Pfad erlaubte, Reportänderungen mit demselben Daten- und Anwendungsvertrag zu prüfen.",
              alternative: "Eine neue Reportingplattform zur selben Zeit hätte eine weitere Migration eröffnet und die Übersetzung bestehenden Reportverhaltens verlangt, während Anwendung und Datenbank ebenfalls verändert wurden.",
              cost: "Die Lösung behält ältere Reportingwerkzeuge und ihre Gestaltungsgrenzen; Reportarbeit verlangt weiterhin Spezialwissen und eine Prüfung über mehrere Schichten.",
            },
            {
              choice: "Jeweils einen End-to-End-Ablauf liefern",
              why: "Eine Änderung konnte Bedienoberfläche, .NET-Regeln, SQL-Verhalten und bei Bedarf Reports, Integrationen sowie ältere Anwendungen als einen zusammenhängenden betrieblichen Ausschnitt abdecken.",
              alternative: "Eine Modernisierung Schicht für Schicht hätte Verhalten zwischen alten und neuen Wegen geteilt und den Nachweis des echten Ablaufs bis zum Abschluss mehrerer Migrationen verschoben.",
              cost: "Jeder Ausschnitt muss über alle berührten Schichten und Anwendungen abgeschlossen und geprüft werden; Fortschritt braucht daher klare Grenzen statt der sichtbaren Einheitlichkeit eines schichtweiten Programms.",
            },
          ],
        },
        decisions: {
          title: "Regeln für Änderungen im laufenden Betrieb",
          intro: "Technische Kontinuität setzte den Rahmen; diese Regeln verbanden jede Änderung mit dem gesamten Betriebsweg und dem Feedback der Menschen, die ihn nutzen.",
          items: [
            {
              title: "Den ganzen Anfrageweg verfolgen",
              body: "Performance- und Zuverlässigkeitsarbeit beginnt bei einem Verhalten, das Kunde oder Benutzer beschreiben können, und folgt ihm durch Webstatus, Backend-Regeln und Datenbankarbeit, statt beim ersten sichtbaren Symptom anzuhalten.",
              tradeoff: "Das braucht mehr Untersuchung als ein Patch am ersten langsamen Bauteil, verhindert aber, dass nur der Engpass verschoben oder ein falsches Symptom behoben wird.",
            },
            {
              title: "Kompatibilität zum Abnahmekriterium machen",
              body: "Eine Änderung wird erst abgenommen, wenn sie im Web-ERP und in den älteren Desktop- und Kassenwegen funktioniert, die dieselben Daten nutzen. Stored Procedures, Views, Reports und Kurier-Austausch gehören dazu, sobald der Ablauf sie berührt.",
              tradeoff: "Die Abnahmefläche ist grösser als das bearbeitete Bauteil, doch ein lokaler Erfolg kann nicht unbemerkt einen anderen täglichen Weg beschädigen.",
            },
            {
              title: "Im tatsächlichen Kundenablauf definieren, was fertig ist",
              body: "Kundengespräche übersetzen eine Anforderung vor der Änderung in konkrete Abläufe, Randfälle und Abnahmeprüfungen. Geliefert ist sie erst, wenn das Ergebnis wieder zur täglichen Nutzung passt, nicht wenn eine einzelne Komponente isoliert funktioniert.",
              tradeoff: "Diese Definition von fertig kostet Koordinationszeit, ist aber günstiger als eine technisch stimmige Interpretation, die nicht zum tatsächlichen Retailprozess passt.",
            },
            {
              title: "Support und Schulung als Release-Feedback nutzen",
              body: "Fragen aus Support und Schulung halten Anforderungen mit der Art verbunden, wie Menschen die Arbeit verstehen und ausführen. Dieses Feedback prägt die nächste klar begrenzte Korrektur oder Verbesserung.",
              tradeoff: "Die Verantwortung für Lieferung endet nicht mit dem Merge, doch Verständnishürden werden sichtbar, solange sie das nächste Release noch beeinflussen können.",
            },
          ],
        },
        delivery: {
          title: "Delivery und Prüfung",
          paragraphs: [
            "Jede Änderung wurde in ihrer Schicht und im Betriebsablauf geprüft: Stored Procedures und Views, .NET-Regeln, Kurierantworten, Crystal Reports und KnockoutJS-Status mussten zusammenpassen.",
            "Datenbankarbeit verlangte zusätzlich eine Kompatibilitätsfrage: Was lesen oder schreiben VB6-ERP und Kassenanwendung nach dieser Änderung? Ohne Migrationen musste die Antwort im Design liegen und durfte nicht auf Rollout-Automation verschoben werden.",
            "Direktes Kundenfeedback vervollständigte die Prüfung der täglichen Abläufe. Eine technisch korrekte Änderung war nicht fertig, wenn sie Routinearbeit schwerer verständlich machte oder nicht mehr zu dem von den Benutzern beschriebenen Betrieb passte.",
          ],
        },
        result: {
          title: "Das qualitative Ergebnis",
          paragraphs: [
            "Performance, Integrationen und tägliche Zuverlässigkeit verbesserten sich gemeinsam, weil die Arbeit die Grenzen überquerte, an denen diese Themen zusammenkamen.",
            "Das Web-ERP entwickelte sich weiter und bewahrte zugleich das Verhalten der gemeinsamen Datenbank, auf das die älteren Desktop- und Kassenanwendungen angewiesen waren.",
            "Der praktische Weg war nicht, so zu tun, als liesse sich ein geschäftskritisches ERP in einem sauberen Schritt anhalten und ersetzen. Er bestand darin, den realen Ablauf mit dem Kunden zu verstehen, kompatible Änderungen einzuführen und das System währenddessen nützlich zu halten.",
          ],
        },
        scope:
          "Organisation, Produkt, Benutzer, Anbieter, kommerzielle Daten und KPIs sind weggelassen. Ungefähre Dauer, Technologien und zwei Integrationen stammen aus der Projektdokumentation.",
      },
    },
  },
  fr: {
    lang: "fr",
    locale: "fr_CH",
    label: "FR",
    languageName: "Français",
    prefix: "/fr",
    ui: {
      skip: "Aller au contenu",
      home: "Études de cas",
      portfolio: "Studio",
      navigation: "Navigation principale",
      languages: "Choisir la langue",
      menuOpen: "Ouvrir la navigation",
      menuClose: "Fermer la navigation",
      contact: "Parler d’un projet",
      allWork: "Toutes les études de cas",
      readCase: "Lire l’étude de cas",
      published: "Publié le",
      readTime: "min de lecture",
      contents: "Sur cette page",
      stack: "Technologies",
      sourceNote: "Limite des informations",
      socialImageAlt: "Le mot-symbole Ejupi Labs à côté du titre «Les décisions techniques, expliquées» et d’un schéma éditorial de décision.",
      footerLine: "Logiciels produit, systèmes cloud et automatisation depuis la Suisse.",
      rights: "Tous droits réservés.",
      notFoundTitle: "Cette page n’est pas disponible.",
      notFoundBody: "Vérifiez l’adresse ou revenez aux archives des études de cas.",
      notFoundAction: "Voir toutes les études de cas",
    },
    index: {
      title: "Les décisions techniques, expliquées.",
      description:
        "Des études de cas qui retracent les contraintes, les choix, les alternatives crédibles, les coûts acceptés et les preuves derrière des systèmes professionnels anonymisés et des projets Labs open source.",
      eyebrow: "Études de cas d’ingénierie / 01 / 10",
      ctaTitle: "Un système complexe a besoin d’un parcours plus clair ?",
      ctaBody: "Commençons par la partie difficile. Nous pouvons cadrer ensemble l’architecture, le parcours de livraison et la première version utile.",
    },
    cases: {
      "ai-workflow-cloud-migration": {
        category: "Plateformes cloud",
        cardTitle: "Migration cloud d’une plateforme de workflow IA",
        title: "Installer une plateforme de workflow IA sur une base cloud reproductible",
        summary:
          "En environ un mois, j’ai transféré une plateforme documentaire et de workflows IA depuis un déploiement on-premise propre à chaque environnement vers Terraform, GKE et une livraison blue/red contrôlée.",
        readMinutes: "14",
        facts: [
          ["Discipline", "Ingénierie de plateforme cloud"],
          ["Périmètre", "Infrastructure, workloads et parcours de livraison"],
          ["Livraison", "Environ un mois"],
          ["Frontière", "Cas professionnel anonymisé"],
        ],
        starting: {
          title: "Le point de départ",
          paragraphs: [
            "La plateforme on-premise réunissait une interface Vue, deux services Spring Boot, un worker Python Temporal, Temporal, Keycloak, PostgreSQL et MinIO. Elle traitait l’extraction documentaire et des workflows assistés par l’IA, mais les environnements ne partageaient pas un parcours de mise en place fiable.",
            "Parler uniquement de migration cloud aurait décrit la destination, pas le travail. Il fallait déplacer avec méthode les composants avec et sans état, séparer la démonstration de la production et donner aux opérateurs un basculement contrôlé entre deux slots.",
            "J’ai découpé le changement en quatre frontières liées : packaging des workloads, données managées, configuration des environnements et contrôle des releases. Ainsi, « mettre sur Kubernetes » ne pouvait pas devenir toute la conception.",
          ],
        },
        constraints: {
          title: "Ce que la conception devait résoudre",
          intro: "Le nouveau modèle de plateforme devait rendre cinq éléments explicites :",
          items: [
            "Les workloads Vue, Spring Boot, Python, Temporal et Keycloak devaient partager un même modèle de déploiement Kubernetes.",
            "Les responsabilités de PostgreSQL et MinIO devaient passer à Cloud SQL et Cloud Storage sans masquer ce changement derrière d’autres conteneurs.",
            "L’infrastructure réutilisable devait rester commune, tandis que les valeurs propres à chaque environnement restaient des entrées vérifiables.",
            "La démonstration et la production exigeaient des contrôles différents parce qu’elles portaient des risques opérationnels différents.",
            "Le rollout de production nécessitait un slot inactif, des smoke tests et un basculement manuel explicite.",
          ],
        },
        diagnosis: {
          title: "Le diagnostic",
          paragraphs: [
            "La partie fragile n’était pas un service isolé. C’était le chemin entre le code source et un environnement en fonctionnement. Lorsque ce chemin varie selon l’environnement, chaque modification transporte des hypothèses cachées.",
            "Un simple lift-and-shift aurait reproduit ces hypothèses ailleurs. Exécuter PostgreSQL et MinIO dans le nouveau cluster aurait aussi conservé des responsabilités d’exploitation que Google Cloud pouvait prendre en charge à des frontières managées plus claires.",
            "J’ai donc fait de la reproductibilité et de la réversibilité les exigences centrales. Les modules Terraform définissent la base Google Cloud, Helm package les workloads Kubernetes et les valeurs d’environnement restent séparées des définitions réutilisables.",
          ],
        },
        architecture: {
          title: "Le modèle de plateforme obtenu",
          intro:
            "GitLab CI lance le parcours de production, Cloud Build produit les images déployables et Artifact Registry conserve la version destinée à GKE. Le déploiement vise le slot blue/red inactif. La readiness Kubernetes et le smoke test doivent réussir avant qu’un opérateur déplace le trafic. Cloud SQL et Cloud Storage remplacent les responsabilités PostgreSQL et MinIO autogérées.",
          labels: ["GITLAB CI", "CLOUD BUILD", "ARTIFACT REGISTRY", "GKE BLUE / RED", "CLOUD SQL + GCS"],
          caption: "Un build, une vérification sur le slot inactif, puis un basculement explicite.",
        },
        technology: {
          title: "Pourquoi ces technologies convenaient à la migration",
          intro:
            "Ces décisions s’inscrivaient dans un produit existant et une destination Google Cloud déjà arrêtée ; elles ne constituaient pas un classement greenfield de toutes les plateformes possibles. La vraie question était de trouver les frontières qui rendaient cet ensemble précis de workloads reproductible et exploitable.",
          items: [
            {
              choice: "GKE comme frontière commune des workloads",
              why: "La plateforme réunissait déjà une interface Vue, des services Spring Boot, un worker Python, Temporal et Keycloak. GKE donnait à ces workloads différents un même modèle de déploiement, de readiness et de slots blue/red, tandis que les données managées sortaient du cluster.",
              alternative: "Répartir les composants entre plusieurs produits serverless aurait imposé plusieurs modèles d’exécution au même parcours de release ; des VM persistantes auraient conservé davantage de configuration et de maintenance propres aux hôtes.",
              cost: "L’équipe accepte la surface opérationnelle de Kubernetes, le cycle de vie du cluster et la nécessité de rendre explicites les ressources, la readiness et les mises à niveau des workloads.",
            },
            {
              choice: "Des modules Terraform pour la base Google Cloud",
              why: "Les modules réutilisables regroupaient les définitions communes et exposaient les différences entre environnements sous forme d’entrées visibles et révisables. Cela répondait directement à la configuration propre à chaque environnement que la migration devait supprimer.",
              alternative: "Une configuration en console ou des templates copiés auraient créé plus vite le premier environnement, mais les changements suivants auraient été moins vérifiables et chaque copie aurait pu diverger seule.",
              cost: "Les contrats des modules, l’état Terraform et les changements de version des providers exigent de la discipline ; même une petite exception doit être modélisée plutôt que corrigée manuellement en silence.",
            },
            {
              choice: "Helm pour packager les workloads Kubernetes",
              why: "Helm fournissait une unité de release pour les ressources liées et un emplacement contrôlé pour les valeurs d’environnement, sans copier toute la définition des workloads pour chaque environnement et chaque slot.",
              alternative: "Des manifestes bruts auraient été plus directs pour un déploiement unique, mais leur duplication entre environnements et slots blue/red aurait rendu plus difficiles à distinguer les changements communs et les écarts volontaires.",
              cost: "Templates et valeurs ajoutent de l’indirection ; la sortie rendue doit être inspectée et chaque évolution du chart versionnée avec le même soin que le code applicatif.",
            },
            {
              choice: "Des responsabilités séparées entre Cloud Build et GitLab CI",
              why: "Cloud Build produisait les images dans le parcours Google Cloud, tandis que GitLab CI conservait l’orchestration de production, les vérifications et la décision explicite sur le trafic. Cette séparation reflétait les conséquences différentes de créer un artefact et de le livrer.",
              alternative: "Une pipeline de déploiement unique et indistincte aurait été plus simple à décrire, mais elle aurait confondu les contrôles de démonstration et de production et couplé build, rollout et basculement du trafic.",
              cost: "Deux systèmes impliquent des identifiants, des transferts d’artefacts et un diagnostic des erreurs à travers une frontière ; leurs contrats doivent rester alignés.",
            },
          ],
        },
        decisions: {
          title: "Règles d’exploitation pour une mise en production réversible",
          intro: "Le socle technique définit le parcours ; ces règles précisent qui assume l’état, ce qui constitue une preuve et comment faire évoluer la production sans saut irréversible.",
          items: [
            {
              title: "Rendre les écarts d’environnement vérifiables",
              body: "Avant une release, les valeurs propres à l’environnement et les responsabilités liées à l’état sont visibles ensemble, notamment pour les données, la sauvegarde et la reprise. Un écart devient une entrée ou un passage de relais explicite, pas une correction invisible dans un environnement actif.",
              tradeoff: "Vérifier écarts et responsabilités demande davantage de préparation, mais évite que la dérive de configuration ou une reprise sans responsable n’apparaisse au moment de la bascule.",
            },
            {
              title: "Vérifier le candidat de bout en bout",
              body: "Une release est suivie depuis l’image construite jusqu’à l’environnement inactif, puis contrôlée par la readiness, les signaux d’infrastructure et un smoke test. Aucun voyant vert isolé ne représente tout le parcours.",
              tradeoff: "Cela prend plus de temps que de considérer un build réussi comme une preuve ; le smoke test reste volontairement ciblé et ne prétend pas couvrir tous les parcours métier.",
            },
            {
              title: "Séparer la preuve sur l’artefact de l’autorité sur le trafic",
              body: "Un build réussi produit un candidat, mais ne lui ouvre pas la production. Le même artefact est déployé et éprouvé sur le slot blue/red inactif, tandis que la décision de déplacer le trafic reste une action distincte de l’opérateur.",
              tradeoff: "Cette gouvernance ajoute des passages de relais et exige que les deux slots restent prêts, mais empêche de confondre réussite du build et autorisation de release.",
            },
            {
              title: "Rendre la bascule explicite et réversible",
              body: "Le trafic ne se déplace qu’une fois les contrôles visibles et la bascule approuvée par un opérateur. Le slot précédent reste le chemin de retour clair au lieu d’être écrasé en place.",
              tradeoff: "Ce contrôle introduit une pause volontaire, mais garde visibles l’autorité finale sur la production et le retour arrière lorsque les preuves sont incomplètes.",
            },
          ],
        },
        delivery: {
          title: "Livraison et vérification",
          paragraphs: [
            "J’ai ordonné le travail selon les dépendances et la réversibilité : base Google Cloud, packaging des workloads, externalisation des valeurs d’environnement, déplacement des responsabilités sur les données, puis exercice du parcours de release avant le basculement de production.",
            "La démonstration reste distincte de la production. Cette dernière passe de GitLab CI à Cloud Build et Artifact Registry avant le slot GKE inactif, plutôt que d’écraser l’environnement actif.",
            "La readiness Kubernetes, les alertes Google Cloud et les signaux d’infrastructure sont complétés par un smoke test avant le basculement. Cela ne valide pas chaque parcours métier. Cela établit que le candidat est assez sain pour un cutover contrôlé.",
          ],
        },
        result: {
          title: "Le résultat livré",
          paragraphs: [
            "La migration a remplacé un parcours on-premise propre à chaque environnement par des modules d’infrastructure réutilisables, des workloads packagés, des services de données managés et deux slots de production contrôlés.",
            "Le résultat utile n’est pas simplement « fonctionne sur Google Cloud ». C’est un parcours de release révisable avant le déploiement, vérifiable avant le déplacement du trafic et reproductible pour l’environnement suivant.",
            "Je n’associe pas à ce résultat un pourcentage inventé de vitesse ou de fiabilité. Le changement défendable est structurel : moins d’hypothèses propres aux environnements, des responsabilités opérationnelles explicites et une décision de production réversible.",
          ],
        },
        scope:
          "Organisation, produit, endpoints, configuration du stockage, coûts et volumes sont omis. La durée approximative, les composants et la séquence de livraison proviennent du dossier de projet.",
      },
      "archival-workflow-management": {
        category: "Logiciel de workflow",
        cardTitle: "Gestion d’un workflow d’archivage",
        title: "Offrir un parcours clair dans un workflow d’archivage complexe",
        summary:
          "En environ trois mois, j’ai construit un service Spring Boot et un microfrontend React Single-SPA autour de Camunda pour créer des sessions, faire avancer les paquets sources dans un cycle de neuf étapes et suivre leur sortie.",
        readMinutes: "13",
        facts: [
          ["Discipline", "Ingénierie produit et workflow"],
          ["Périmètre", "Service, microfrontend et frontière workflow"],
          ["Livraison", "Environ trois mois"],
          ["Frontière", "Cas professionnel anonymisé"],
        ],
        starting: {
          title: "Le point de départ",
          paragraphs: [
            "Le domaine couvrait sessions d’archivage, types, codes d’organisation, stockage d’entrée et de sortie, paquets sources, paquets produits et cycle de vie du workflow. Les opérateurs avaient besoin d’un parcours pratique pour comprendre le mouvement de ces éléments.",
            "La fonctionnalité devait vivre dans une plateforme single-spa plus large qui fournissait déjà header, footer, navigation et microfrontends réutilisables. Réutiliser ces composants était un objectif principal, pas une finition visuelle tardive.",
            "Une application React autonome aurait dupliqué la shell de la plateforme et créé un second endroit où maintenir navigation et chrome. La bonne frontière était une expérience d’archivage ciblée que la plateforme existante pouvait composer.",
          ],
        },
        constraints: {
          title: "Ce que la conception devait résoudre",
          intro: "La frontière utile se situait entre l’état du processus, l’action de l’opérateur et la plateforme hôte :",
          items: [
            "La session, les paquets sources et les sorties devaient rester compréhensibles sur neuf étapes.",
            "Les actions de l’opérateur devaient correspondre clairement à des transitions valides.",
            "La nouvelle expérience devait réutiliser header, footer, navigation et conventions des composants existants au lieu de livrer une shell parallèle.",
            "Le microfrontend React single-spa avait besoin d’un point de montage et d’un contrat d’intégration étroits afin que les règles d’archivage ne se dispersent pas dans l’hôte.",
            "Les règles backend, l’état Camunda et les actions frontend ne pouvaient pas devenir des interprétations différentes du même workflow.",
          ],
        },
        diagnosis: {
          title: "Le diagnostic",
          paragraphs: [
            "Camunda pouvait coordonner le processus, mais l’orchestration seule ne constituait pas l’expérience de l’opérateur. Il manquait une frontière applicative cohérente autour du workflow.",
            "La plateforme hôte avait déjà résolu la composition et le chrome. Reconstruire ces parties aurait ajouté du code sans améliorer le workflow d’archivage ; j’ai donc limité le microfrontend à la surface métier manquante.",
            "J’ai séparé les responsabilités : l’hôte conserve navigation et composants partagés ; Spring Boot porte les règles applicatives, les références de stockage compatibles S3 et l’intégration Camunda ; le microfrontend React single-spa présente l’état actuel et les actions valides.",
          ],
        },
        architecture: {
          title: "La tranche applicative obtenue",
          intro:
            "La shell single-spa existante monte le microfrontend React dans son header, son footer et sa navigation partagés. Le microfrontend fournit uniquement la surface d’archivage. Un service Spring ciblé traduit les actions en opérations de workflow et références de stockage, tandis que Camunda coordonne le processus de la création de session au suivi des sorties.",
          labels: ["OPÉRATEUR", "REACT SINGLE-SPA", "API SPRING BOOT", "CAMUNDA", "S3 ENTRÉE + SORTIE"],
          caption: "La plateforme possède la shell ; le microfrontend et le service possèdent la frontière du workflow d’archivage.",
        },
        technology: {
          title: "Pourquoi ces frontières convenaient à la plateforme hôte",
          intro:
            "Il ne s’agissait pas de choisir un stack greenfield. La shell, le moteur de workflow et les conventions de stockage appartenaient à une plateforme existante ; l’enjeu était d’ajouter une capacité cohérente sans dupliquer ni contourner ces frontières.",
          items: [
            {
              choice: "Une frontière applicative ciblée avec Spring Boot",
              why: "Le service regroupait côté backend la responsabilité des règles applicatives, des actions valides, de l’intégration Camunda et des références de stockage. React pouvait consommer un modèle applicatif sans connaître la mécanique du moteur de processus.",
              alternative: "Appeler Camunda directement depuis le navigateur ou disperser les règles d’archivage dans des services partagés aurait exposé les détails d’orchestration et créé plusieurs interprétations du comportement valide.",
              cost: "L’API et la couche de correspondance supplémentaires doivent évoluer avec le processus ; les erreurs à la frontière entre service et moteur demandent un traitement explicite.",
            },
            {
              choice: "Camunda pour le processus en neuf étapes",
              why: "Camunda coordonnait déjà le workflow. Y conserver les transitions maintenait une seule source de l’avancement, tandis que le service traduisait cet état pour les opérateurs.",
              alternative: "Une machine à états sur mesure, surtout représentée principalement par l’état de l’interface, aurait dupliqué la logique du processus et mis le navigateur en concurrence avec le moteur pour l’autorité sur le workflow.",
              cost: "Les définitions du processus et le modèle applicatif doivent rester alignés ; le diagnostic opérationnel traverse à la fois le service et le moteur.",
            },
            {
              choice: "React dans la composition single-spa existante",
              why: "Un microfrontend borné pouvait réutiliser header, footer, navigation et conventions de la plateforme tout en possédant uniquement la route d’archivage et son modèle d’interaction.",
              alternative: "Réécrire la shell ou livrer une application React autonome aurait étendu le projet au-delà de la capacité manquante et créé une navigation ainsi qu’un chrome dupliqués.",
              cost: "Le microfrontend dépend d’un contrat stable de montage et d’intégration ; les évolutions de la plateforme partagée demandent de la coordination plutôt qu’un contrôle entièrement local.",
            },
            {
              choice: "Un stockage compatible S3 pour les paquets d’entrée et de sortie",
              why: "Le contenu des paquets restait à une frontière de stockage objet, référencée par le service et le workflow, ce qui séparait les enregistrements d’archivage de la responsabilité des contenus binaires.",
              alternative: "Des blobs en base auraient lié les paquets au cycle de vie des données relationnelles ; des fichiers locaux les auraient liés à une instance précise du service et à son parcours de déploiement.",
              cost: "Buckets, endpoints, identifiants et cas d’objet manquant deviennent des préoccupations opérationnelles explicites que le service doit représenter avec clarté.",
            },
          ],
        },
        decisions: {
          title: "Règles pour un workflow réellement exploitable",
          intro: "L’architecture fournit une source unique de vérité sur le processus ; ces règles en font une expérience que l’opérateur peut lire, juger fiable et reprendre après un problème.",
          items: [
            {
              title: "Montrer l’état avant de proposer une action",
              body: "La session en cours, ses paquets sources et résultats ainsi que l’étape du processus restent visibles avant que l’opérateur choisisse la suite. Une action privée de ce contexte n’est pas présentée comme un progrès.",
              tradeoff: "L’interface doit expliquer les états indisponibles, en attente et en échec au lieu d’optimiser uniquement le parcours idéal.",
            },
            {
              title: "Dériver les actions valides de l’état du backend",
              body: "L’interface présente les transitions prises en charge par le modèle applicatif, tandis que le service refuse celles qui ne sont pas valides. L’état local du navigateur ne devient jamais une seconde autorité sur la prochaine étape.",
              tradeoff: "Les échanges et le rafraîchissement d’état doivent être explicites, mais un écran périmé ne peut pas inventer une transition valide.",
            },
            {
              title: "Préserver la continuité entre session et paquets",
              body: "La session, les paquets sources et les paquets résultats restent liés tout au long du parcours en neuf étapes. La vérification suit le même chemin, de la création et l’association jusqu’au traitement et au suivi des résultats.",
              tradeoff: "Le modèle et l’interface portent plus de contexte qu’un écran dédié à une seule tâche, mais l’opérateur peut suivre le lien entre le travail et son résultat.",
            },
            {
              title: "Rendre l’échec et la reprise visibles",
              body: "Une étape incomplète, en attente ou en échec reste visible. Si la prochaine action valide permet de réessayer ou de poursuivre, elle apparaît seulement après confirmation du backend.",
              tradeoff: "L’interface doit expliquer davantage d’états et de parcours d’erreur, mais distingue attente, échec et reprise au lieu de laisser l’opérateur deviner.",
            },
          ],
        },
        delivery: {
          title: "Livraison et vérification",
          paragraphs: [
            "La vérification suit les neuf étapes : créer la session, associer les paquets sources, démarrer le workflow, observer les transitions valides et suivre les paquets de sortie.",
            "J’ai aussi vérifié la frontière de composition : la nouvelle route devait vivre dans le header, le footer et la navigation existants, sans introduire une seconde shell ni pousser l’état d’archivage dans les composants partagés.",
            "Les autres cas d’échec importants se trouvent aux frontières. Le service doit refuser les transitions invalides, l’UI montrer honnêtement les états incomplets ou en attente, et l’intégration conserver le processus comme source de vérité.",
          ],
        },
        result: {
          title: "Le résultat qualitatif",
          paragraphs: [
            "La tranche obtenue couvre la gestion des sessions, le traitement des paquets et le contrôle du workflow, depuis l’interface jusqu’au processus Camunda.",
            "Les opérateurs disposent d’un endroit unique pour comprendre le travail et le faire avancer. La plateforme conserve le header, le footer, la navigation et les conventions visuelles déjà connues.",
            "La plateforme gagne une capacité contenue plutôt qu’une application parallèle : aucune shell dupliquée, aucun second modèle de navigation et aucune règle d’archivage dispersée dans des microfrontends sans rapport.",
          ],
        },
        scope:
          "Organisation, produit, types internes, endpoints, buckets et identifiants sont omis. La durée approximative et le cycle proviennent du dossier de projet.",
      },
      "retail-erp-evolution": {
        category: "Logiciel d’entreprise",
        cardTitle: "Maintenance et évolution d’un ERP retail",
        title: "Améliorer un ERP retail sans interrompre les opérations quotidiennes",
        summary:
          "Pendant environ dix-neuf mois, j’ai travaillé sur SQL Server, .NET Framework 4.8 et un frontend KnockoutJS d’un ERP retail actif : fonctionnalités, correctifs, rapports, deux intégrations transporteurs et modernisation de la réception de stock.",
        readMinutes: "14",
        facts: [
          ["Discipline", "Ingénierie produit d’entreprise"],
          ["Périmètre", "Base de données, backend, frontend et intégrations"],
          ["Livraison", "Environ dix-neuf mois"],
          ["Frontière", "Cas professionnel anonymisé"],
        ],
        starting: {
          title: "Le point de départ",
          paragraphs: [
            "L’ERP web opérationnel était un monolithe sur SQL Server, C# et .NET Framework 4.8, Entity Framework, KnockoutJS, JavaScript, jQuery, Bootstrap et Crystal Reports. La fiabilité était une exigence produit, pas une note de maintenance.",
            "Sa base de données n’avait pas de système de migrations et n’appartenait pas uniquement à l’application web. Un ERP desktop et une application de caisse VB6 beaucoup plus anciens utilisaient le même schéma ; un changement correct sur le web pouvait donc interrompre le travail quotidien ailleurs.",
            "Le périmètre couvrait fonctionnalités, bugs, procédures stockées, vues, reporting, deux intégrations transporteurs, exigences, formation et support. Le contact direct avec le client était essentiel pour comprendre l’usage réel du logiciel avant de le modifier.",
          ],
        },
        constraints: {
          title: "Ce que le travail devait respecter",
          intro: "Le système ne pouvait évoluer que si les anciens et nouveaux parcours opérationnels continuaient de s’accorder :",
          items: [
            "Les workflows existants devaient continuer à soutenir le travail retail quotidien.",
            "Les modifications du schéma SQL Server devaient être rétrocompatibles, car aucun historique de migrations ne coordonnait tous les consommateurs.",
            "L’ERP web .NET Framework et les anciennes applications desktop et caisse VB6 partageaient le même contrat de données.",
            "KnockoutJS, jQuery, règles backend et comportement de la base devaient évoluer ensemble lorsque le parcours web changeait.",
            "Les exigences devaient être validées avec le client en termes opérationnels avant de devenir code, rapports ou comportement d’intégration.",
            "Deux intégrations externes avec des transporteurs devaient rester compréhensibles à la frontière du système.",
          ],
        },
        diagnosis: {
          title: "Le diagnostic",
          paragraphs: [
            "Dans un ERP en couches, le ralentissement ou l’échec visible n’est souvent que le dernier maillon. Un écran peut être lent à cause de la forme de sa requête, du traitement backend ou d’un accès aux données. Un problème d’intégration peut apparaître comme une incohérence frontend.",
            "La base partagée changeait la définition habituelle d’un détail d’implémentation interne. Tables, colonnes et procédures stockées étaient aussi des contrats avec du logiciel VB6 incapable de suivre une séquence moderne de migrations.",
            "J’ai associé le traçage de bout en bout aux échanges directs avec le client. Requêtes et procédures SQL Server, règles .NET Framework, écrans KnockoutJS et jQuery, rapports, échanges transporteurs et ancien parcours desktop faisaient partie d’un même comportement opérationnel.",
          ],
        },
        architecture: {
          title: "La vue utile du système",
          intro:
            "L’unité pertinente était tout le contrat opérationnel : une action dans l’interface web KnockoutJS et jQuery, les règles .NET Framework 4.8, le travail sur le schéma SQL Server partagé et les anciens parcours desktop et caisse VB6 dépendant des mêmes données. Rapports et échanges transporteurs ajoutaient d’autres frontières autour de ce noyau.",
          labels: ["OPÉRATEUR WEB", "KNOCKOUT + JQUERY", ".NET FRAMEWORK 4.8", "SQL SERVER PARTAGÉ", "ERP + CAISSE VB6"],
          caption: "L’ERP web et l’ancien parc VB6 se rencontrent dans un contrat de données rétrocompatible.",
        },
        technology: {
          title: "Pourquoi la continuité était un choix d’architecture",
          intro:
            "Il s’agissait de faire évoluer un ERP en production, pas de recommander son stack pour un projet greenfield. Le bon choix technologique consistait souvent à préserver un contrat opérationnel et à l’améliorer en place plutôt qu’à renouveler toutes les couches simultanément.",
          items: [
            {
              choice: "Conserver C#/.NET Framework et KnockoutJS pour évoluer progressivement",
              why: "Fonctionnalités, défauts et parcours quotidiens traversaient déjà ces couches. Travailler dans ce cadre permettait de suivre chaque changement sur le chemin réel de la requête et de le livrer sans suspendre l’exploitation.",
              alternative: "Une réécriture big-bang du backend et du frontend aurait exigé de redécouvrir et remplacer tout le comportement existant avant que des améliorations opérationnelles plus petites atteignent les utilisateurs.",
              cost: "Le travail accepte les contraintes de frameworks plus anciens, des modèles frontend mixtes et un besoin durable de compétences de maintenance au lieu d’obtenir immédiatement une base moderne uniforme.",
            },
            {
              choice: "Traiter SQL Server comme le contrat de données partagé",
              why: "L’ERP web, l’ERP desktop VB6 et l’application de caisse lisaient et écrivaient le même schéma. Des changements SQL compatibles protégeaient les consommateurs qui ne pouvaient pas avancer à chaque release web.",
              alternative: "Migrer la base ou le schéma avec l’application web aurait supposé que tous les consommateurs puissent basculer ensemble malgré l’absence d’un système de migrations.",
              cost: "Des évolutions additives et des structures transitoires peuvent subsister plus longtemps ; la conception doit tenir compte des anciennes lectures et écritures autant que du nouveau parcours.",
            },
            {
              choice: "Faire évoluer Crystal Reports et les parcours de reporting existants",
              why: "Le reporting appartenait déjà au système opérationnel et à son comportement SQL Server. Conserver ce parcours dans le périmètre permettait de vérifier les rapports avec le même contrat de données et d’application.",
              alternative: "Introduire simultanément une nouvelle plateforme de reporting aurait ajouté une autre migration et imposé de traduire le comportement des rapports pendant que l’application et la base changeaient aussi.",
              cost: "La solution conserve un outil de reporting historique et ses contraintes de conception ; les changements continuent d’exiger des compétences spécifiques et une vérification entre plusieurs couches.",
            },
            {
              choice: "Livrer un parcours de bout en bout à la fois",
              why: "Une modification pouvait couvrir l’écran opérateur, les règles .NET, le comportement SQL et, si nécessaire, rapports, intégrations et anciennes applications comme une tranche opérationnelle cohérente.",
              alternative: "Moderniser une couche technique à la fois aurait partagé le comportement entre anciens et nouveaux parcours, repoussant la preuve du workflow réel jusqu’à l’achèvement de plusieurs migrations.",
              cost: "Chaque tranche doit être terminée et vérifiée dans toutes les couches et applications qu’elle touche ; le progrès exige donc des frontières rigoureuses plutôt que l’uniformité visible d’un programme par couches.",
            },
          ],
        },
        decisions: {
          title: "Règles pour faire évoluer un système en activité",
          intro: "La continuité technique fixait le cadre ; ces règles reliaient chaque changement au parcours opérationnel complet et aux retours des personnes qui l’utilisent.",
          items: [
            {
              title: "Suivre toute la requête",
              body: "Le travail sur la performance et la fiabilité part d’un comportement que le client ou l’opérateur peut décrire, puis le suit à travers l’état web, les règles backend et le travail en base au lieu de s’arrêter au premier symptôme visible.",
              tradeoff: "Cela demande plus d’enquête qu’un correctif sur le premier composant lent, mais évite de déplacer le goulot ou de corriger un symptôme que le client ne rencontrait pas réellement.",
            },
            {
              title: "Faire de la compatibilité un critère d’acceptation",
              body: "Une modification n’est acceptée qu’après avoir fonctionné dans l’ERP web et dans les anciens parcours desktop et caisse qui partagent les mêmes données. Procédures stockées, vues, rapports et échanges avec les transporteurs rejoignent ce contrôle lorsque le workflow les traverse.",
              tradeoff: "La surface d’acceptation dépasse le composant modifié, mais une réussite locale ne peut pas devenir silencieusement une panne dans un autre parcours quotidien.",
            },
            {
              title: "Définir « terminé » dans le parcours réel du client",
              body: "Les échanges avec le client traduisent une demande en parcours concrets, cas limites et vérifications d’acceptation avant la modification. La livraison est terminée seulement lorsque le résultat rejoint l’usage quotidien, pas lorsqu’un composant fonctionne isolément.",
              tradeoff: "Cette définition de « terminé » demande du temps de coordination, mais coûte moins cher qu’une interprétation techniquement cohérente qui ne correspond pas au processus retail réel.",
            },
            {
              title: "Utiliser le support et la formation comme retours de release",
              body: "Les questions issues du support et de la formation maintiennent les exigences liées à la façon dont les personnes comprennent et accomplissent leur travail. Ces retours orientent la correction ou l’amélioration ciblée suivante.",
              tradeoff: "La responsabilité de livraison se poursuit au-delà du merge, mais les difficultés d’usage deviennent visibles tant qu’elles peuvent encore guider la release suivante.",
            },
          ],
        },
        delivery: {
          title: "Livraison et vérification",
          paragraphs: [
            "Chaque changement était vérifié dans sa couche et dans le parcours opérationnel : procédures stockées et vues, règles .NET, réponses des transporteurs, Crystal Reports et état KnockoutJS devaient s’accorder.",
            "Le travail sur la base exigeait aussi une question de compatibilité : que liront ou écriront l’ERP et la caisse VB6 après cette modification ? Sans migrations, la réponse devait se trouver dans la conception et ne pouvait pas être reportée sur l’automatisation du rollout.",
            "Le retour direct du client complétait la vérification des parcours quotidiens. Un changement techniquement correct n’était pas terminé s’il rendait le travail courant moins compréhensible ou ne correspondait plus à l’opération décrite par les utilisateurs.",
          ],
        },
        result: {
          title: "Le résultat qualitatif",
          paragraphs: [
            "Performances, intégrations et fiabilité quotidienne ont progressé ensemble parce que le travail a traversé les frontières où ces sujets se rejoignaient.",
            "L’ERP web a continué d’évoluer tout en préservant le comportement de la base partagée dont dépendaient les anciennes applications desktop et caisse.",
            "La voie pragmatique n’était pas de prétendre qu’un ERP critique pouvait être arrêté et remplacé d’un seul geste. Elle consistait à comprendre le workflow réel avec le client, introduire des changements compatibles et garder le système utile pendant tout le processus.",
          ],
        },
        scope:
          "Organisation, produit, utilisateurs, fournisseurs, données commerciales et KPI sont omis. Durée approximative, technologies et deux intégrations proviennent du dossier de projet.",
      },
    },
  },
};

assertDefinitionCatalog(caseDefinitions, {
  localeOrder,
  protectedLegacySlugs,
});

const rawCasesByLocale = {
  en: { ...locales.en.cases, ...labsCases },
  it: { ...locales.it.cases, ...labsLocales.it },
  de: { ...locales.de.cases, ...labsLocales.de },
  fr: { ...locales.fr.cases, ...labsLocales.fr },
};

const completeCasesByLocale = assertRawLocaleCatalog({
  definitions: caseDefinitions,
  localeOrder,
  rawCasesByLocale,
  allowedInheritedPathsByKind: {
    labs: ["cardTitle", "readMinutes"],
  },
});

for (const localeKey of localeOrder) {
  locales[localeKey].cases = completeCasesByLocale[localeKey];
}
