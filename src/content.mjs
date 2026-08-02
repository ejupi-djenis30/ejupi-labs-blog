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
    updated: "2026-07-24",
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
    updated: "2026-07-24",
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
    updated: "2026-07-24",
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
    updated: "2026-07-25",
    projectUrl: "https://ejupi-djenis30.github.io/careeros-local/",
    sourceRef: "v1.6.0",
    sourceUrl: "https://github.com/ejupi-djenis30/careeros-local/commit/cd4ae45ba5580a4b4bbea94755a8db3f3e62533e",
    verifiedAt: "2026-07-25",
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
    updated: "2026-07-25",
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
    updated: "2026-07-25",
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
    updated: "2026-07-26",
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
    updated: "2026-07-25",
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
    updated: "2026-07-26",
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
    updated: "2026-07-26",
    projectUrl: "https://ejupi-djenis30.github.io/jdoor/",
    sourceRef: "v1.0.0",
    sourceUrl: "https://github.com/NobodyToListen/JDoor/commit/ac94dd82cdff17551826b7254165d123190aeec7",
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
      articleLabel: "Anonymised case study",
      published: "Published",
      readTime: "min read",
      contents: "On this page",
      stack: "Technology",
      next: "Next case study",
      back: "Back to all case studies",
      sourceNote: "Evidence boundary",
      socialImageAlt: "Ejupi Labs wordmark beside the headline “Engineering work, explained” and an editorial system diagram.",
      footerLine: "Product software, cloud systems and automation from Switzerland.",
      rights: "All rights reserved.",
      notFoundTitle: "This page is not available.",
      notFoundBody: "Check the address or return to the case-study archive.",
      notFoundAction: "Browse all case studies",
    },
    index: {
      title: "Engineering work, explained.",
      description:
        "Case studies tracing the constraints, decisions and evidence behind anonymised professional systems and open-source Labs projects.",
      eyebrow: "Engineering case studies / 01 / 10",
      introTitle: "The decisions behind the systems",
      introBody:
        "These case studies separate professional work from Labs projects and make the constraints, trade-offs, evidence and limits explicit.",
      principles: [
        {
          number: "P01",
          title: "No invented metrics",
          body: "When an exact figure is confidential or unavailable, I describe the technical change instead of manufacturing a percentage.",
        },
        {
          number: "P02",
          title: "Decisions before tools",
          body: "The technology matters, but only after the problem and the trade-off are clear.",
        },
        {
          number: "P03",
          title: "Names withheld, work intact",
          body: "Organisations and commercial details are omitted. The engineering scope is kept specific.",
        },
      ],
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
        readMinutes: "12",
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
        decisions: {
          title: "Decisions that mattered",
          intro: "Each choice removes one class of hidden difference, even when the safer option asks for more explicit work.",
          items: [
            {
              title: "Reuse modules, vary inputs",
              body: "Reusable Terraform keeps the foundation consistent while environment-specific values stay visible as inputs. Copying whole stacks per environment would have made the first setup quicker but allowed them to drift silently.",
              tradeoff: "The module boundary needs stricter contracts and review, but the differences now live in one place where operators can see them.",
            },
            {
              title: "Move state to managed boundaries",
              body: "Cloud SQL takes the PostgreSQL role and Cloud Storage replaces MinIO object storage. Keeping both inside GKE would have looked more like the old installation, but it would also have carried its backup, availability and maintenance burden into the cluster.",
              tradeoff: "Managed services make ownership clearer, but the migration must account for provider-specific behaviour and deliberate data-transfer sequencing.",
            },
            {
              title: "Separate demonstration from production",
              body: "The demonstration path proves the packaged system without pretending it has the same consequence as a production release. Production keeps its own build, registry, verification and traffic controls.",
              tradeoff: "Two paths create more pipeline work than one universal deploy command, but they stop convenience settings from becoming production policy.",
            },
            {
              title: "Switch only after verification",
              body: "Production deploys to an inactive blue/red slot. Readiness signals and smoke tests run there before a human moves traffic, instead of updating the active environment in place.",
              tradeoff: "The manual gate is slower than blind continuous deployment, but rollback and final production authority remain visible.",
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
        readMinutes: "11",
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
        decisions: {
          title: "Decisions that mattered",
          intro: "The design avoids solving composition twice and keeps workflow authority outside the browser.",
          items: [
            {
              title: "Put the workflow behind an application service",
              body: "The React client talks to a focused Spring API rather than calling Camunda directly or encoding process mechanics in the browser.",
              tradeoff: "The service adds a boundary to maintain, but it gives workflow rules one testable owner and prevents them from leaking into every screen.",
            },
            {
              title: "Reuse the platform shell",
              body: "The single-spa host keeps the header, footer, navigation and shared component conventions. The archival microfrontend contributes only the new workflow experience instead of presenting itself as a separate application.",
              tradeoff: "Reuse reduces duplicated chrome, but it requires a stable integration contract and coordination when shared platform components change.",
            },
            {
              title: "Make state visible before action",
              body: "The interface centres the current session, its packages and the workflow state so an operator can understand what is happening before choosing a valid next step.",
              tradeoff: "The UI must represent unavailable, pending and failed states instead of optimistically showing only the happy path.",
            },
            {
              title: "Keep one interpretation of progress",
              body: "The service maps Camunda state into an application model consumed by the microfrontend. The host platform does not acquire a second copy of the archival lifecycle.",
              tradeoff: "The mapping needs care whenever the process changes, but it prevents workflow meaning from diverging across shell, browser and engine.",
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
        readMinutes: "12",
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
        decisions: {
          title: "Decisions that mattered",
          intro: "The work favoured evidence from the real operation, compatible contracts and releasable change over a dramatic rewrite.",
          items: [
            {
              title: "Trace the whole request path",
              body: "Performance and reliability work starts at the behaviour the client or operator can describe, then follows it through KnockoutJS and jQuery, the .NET backend and SQL Server.",
              tradeoff: "This takes more investigation than patching the first slow component, but it avoids moving the bottleneck or fixing a symptom the client did not actually have.",
            },
            {
              title: "Treat the database as a shared contract",
              body: "With no migration system and VB6 consumers on the same database, schema work had to preserve existing reads and writes. An additive or compatible change was safer than assuming every application could move in lockstep.",
              tradeoff: "Backward compatibility can leave transitional structures in place longer, but it protects the desktop and till workflows that cannot be upgraded as part of every web release.",
            },
            {
              title: "Improve in releasable slices",
              body: "Focused changes are easier to reason about in a business-critical system than a simultaneous rewrite of the web stack, database and legacy desktop estate.",
              tradeoff: "Incremental delivery demands patience and careful boundaries, but each release keeps its compatibility risk visible.",
            },
            {
              title: "Keep the client in the reasoning loop",
              body: "Direct conversations turned requests into concrete workflows, edge cases and acceptance checks before I changed reports, integrations or daily screens.",
              tradeoff: "The feedback loop takes coordination time, but it is cheaper than implementing a technically coherent interpretation that does not fit the real retail process.",
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
      articleLabel: "Case study anonimizzato",
      published: "Pubblicato",
      readTime: "min di lettura",
      contents: "In questa pagina",
      stack: "Tecnologie",
      next: "Case study successivo",
      back: "Torna ai case study",
      sourceNote: "Limiti delle informazioni",
      socialImageAlt: "Il wordmark Ejupi Labs accanto al titolo «Progetti di ingegneria, spiegati» e a un diagramma editoriale di sistema.",
      footerLine: "Software di prodotto, sistemi cloud e automazione dalla Svizzera.",
      rights: "Tutti i diritti riservati.",
      notFoundTitle: "Questa pagina non è disponibile.",
      notFoundBody: "Controlla l’indirizzo oppure torna all’archivio dei case study.",
      notFoundAction: "Vedi tutti i case study",
    },
    index: {
      title: "Progetti di ingegneria, spiegati.",
      description:
        "Case study che ricostruiscono vincoli, decisioni ed evidenze dietro sistemi professionali anonimizzati e progetti Labs open source.",
      eyebrow: "Case study di engineering / 01 / 10",
      introTitle: "Le decisioni dietro i sistemi",
      introBody:
        "I case study separano lavoro professionale e progetti Labs e rendono espliciti vincoli, compromessi, evidenze e limiti.",
      principles: [
        {
          number: "P01",
          title: "Nessun numero inventato",
          body: "Quando un dato preciso è riservato o non disponibile, descrivo il cambiamento tecnico invece di costruire una percentuale.",
        },
        {
          number: "P02",
          title: "Prima le decisioni, poi gli strumenti",
          body: "La tecnologia conta, ma soltanto dopo aver chiarito il problema e il compromesso.",
        },
        {
          number: "P03",
          title: "Nomi omessi, lavoro intatto",
          body: "Le organizzazioni e i dettagli commerciali non compaiono. Il perimetro tecnico resta specifico.",
        },
      ],
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
        readMinutes: "12",
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
        decisions: {
          title: "Le decisioni importanti",
          intro: "Ogni scelta elimina una classe di differenze nascoste, anche quando l’opzione più sicura richiede più lavoro esplicito.",
          items: [
            {
              title: "Riutilizzare i moduli, variare gli input",
              body: "Terraform riutilizzabile mantiene coerente la base, mentre i valori specifici restano input visibili. Copiare interi stack per ambiente avrebbe velocizzato il primo setup, ma avrebbe permesso loro di divergere in silenzio.",
              tradeoff: "Il confine dei moduli richiede contratti e revisioni più rigorosi, ma le differenze ora vivono in un punto in cui gli operatori possono vederle.",
            },
            {
              title: "Portare lo stato su confini gestiti",
              body: "Cloud SQL assume il ruolo di PostgreSQL e Cloud Storage sostituisce MinIO. Mantenerli entrambi dentro GKE sarebbe stato più simile all’installazione precedente, ma avrebbe trasferito nel cluster anche backup, disponibilità e manutenzione.",
              tradeoff: "I servizi gestiti rendono più chiara la responsabilità operativa, ma la migrazione deve considerare il comportamento del provider e una sequenza intenzionale per il trasferimento dei dati.",
            },
            {
              title: "Separare dimostrazione e produzione",
              body: "Il percorso dimostrativo prova il sistema impacchettato senza fingere di avere le stesse conseguenze di un rilascio produttivo. La produzione conserva build, registry, verifiche e controllo del traffico propri.",
              tradeoff: "Due percorsi richiedono più lavoro di pipeline rispetto a un comando universale, ma impediscono che impostazioni di comodo diventino policy di produzione.",
            },
            {
              title: "Fare lo switch solo dopo la verifica",
              body: "La produzione viene distribuita sullo slot blue/red inattivo. Segnali di readiness e smoke test vengono eseguiti lì prima che una persona sposti il traffico, invece di aggiornare l’ambiente attivo in place.",
              tradeoff: "Il gate manuale è più lento di un deploy continuo cieco, ma rollback e autorità finale sulla produzione restano visibili.",
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
        readMinutes: "11",
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
        decisions: {
          title: "Le decisioni importanti",
          intro: "Il design evita di risolvere due volte la composizione e mantiene l’autorità del workflow fuori dal browser.",
          items: [
            {
              title: "Mettere il workflow dietro un servizio",
              body: "Il client React parla con una API Spring mirata invece di chiamare direttamente Camunda o codificare nel browser i meccanismi del processo.",
              tradeoff: "Il servizio aggiunge un confine da mantenere, ma assegna alle regole del workflow un proprietario testabile e impedisce loro di invadere ogni schermata.",
            },
            {
              title: "Riutilizzare la shell della piattaforma",
              body: "L’host single-spa conserva header, footer, navigazione e convenzioni dei componenti condivisi. Il microfrontend archivistico contribuisce soltanto la nuova esperienza invece di presentarsi come applicazione separata.",
              tradeoff: "Il riuso riduce il chrome duplicato, ma richiede un contratto d’integrazione stabile e coordinamento quando cambiano i componenti condivisi.",
            },
            {
              title: "Mostrare lo stato prima dell’azione",
              body: "L’interfaccia mette al centro la sessione corrente, i pacchetti e lo stato del processo, così l’operatore capisce cosa sta accadendo prima di scegliere un passaggio valido.",
              tradeoff: "La UI deve rappresentare stati indisponibili, in attesa e falliti invece di mostrare in modo ottimistico soltanto il percorso ideale.",
            },
            {
              title: "Mantenere una sola interpretazione del progresso",
              body: "Il servizio traduce lo stato Camunda in un modello applicativo consumato dal microfrontend. La piattaforma host non acquisisce una seconda copia del lifecycle archivistico.",
              tradeoff: "La mappatura richiede attenzione quando cambia il processo, ma impedisce al significato del workflow di divergere tra shell, browser e motore.",
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
        readMinutes: "12",
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
        decisions: {
          title: "Le decisioni importanti",
          intro: "Il lavoro ha privilegiato evidenze dall’operatività reale, contratti compatibili e cambiamenti rilasciabili rispetto a una riscrittura spettacolare.",
          items: [
            {
              title: "Seguire tutta la richiesta",
              body: "Il lavoro su performance e affidabilità parte dal comportamento che cliente o operatore riescono a descrivere, poi lo segue attraverso KnockoutJS e jQuery, backend .NET e SQL Server.",
              tradeoff: "Richiede più indagine di una patch al primo componente lento, ma evita di spostare il collo di bottiglia o risolvere un sintomo che il cliente non aveva davvero.",
            },
            {
              title: "Trattare il database come contratto condiviso",
              body: "Senza migrations e con consumer VB6 sullo stesso database, le modifiche allo schema dovevano preservare letture e scritture esistenti. Un cambiamento additivo o compatibile era più sicuro che presumere un avanzamento simultaneo di tutte le applicazioni.",
              tradeoff: "La retrocompatibilità può mantenere più a lungo strutture transitorie, ma protegge i flussi desktop e cassa che non possono essere aggiornati con ogni release web.",
            },
            {
              title: "Migliorare in sezioni rilasciabili",
              body: "Modifiche mirate sono più semplici da comprendere in un sistema business-critical rispetto a una riscrittura simultanea di stack web, database e applicazioni desktop legacy.",
              tradeoff: "La consegna incrementale richiede pazienza e confini precisi, ma mantiene visibile il rischio di compatibilità di ogni release.",
            },
            {
              title: "Tenere il cliente nel ragionamento",
              body: "Le conversazioni dirette trasformavano le richieste in workflow concreti, casi limite e verifiche di accettazione prima di cambiare report, integrazioni o schermate quotidiane.",
              tradeoff: "Il feedback richiede tempo di coordinamento, ma costa meno che implementare un’interpretazione tecnicamente coerente e inadatta al processo retail reale.",
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
      articleLabel: "Anonymisierte Fallstudie",
      published: "Veröffentlicht",
      readTime: "Min. Lesezeit",
      contents: "Auf dieser Seite",
      stack: "Technologien",
      next: "Nächste Fallstudie",
      back: "Zurück zu allen Fallstudien",
      sourceNote: "Informationsgrenze",
      socialImageAlt: "Die Wortmarke Ejupi Labs neben der Überschrift «Engineering-Arbeit, erklärt» und einem redaktionellen Systemdiagramm.",
      footerLine: "Produktsoftware, Cloud-Systeme und Automatisierung aus der Schweiz.",
      rights: "Alle Rechte vorbehalten.",
      notFoundTitle: "Diese Seite ist nicht verfügbar.",
      notFoundBody: "Prüfen Sie die Adresse oder kehren Sie zum Fallstudien-Archiv zurück.",
      notFoundAction: "Alle Fallstudien ansehen",
    },
    index: {
      title: "Engineering-Arbeit, erklärt.",
      description:
        "Fallstudien zu Anforderungen, Entscheidungen und Nachweisen hinter anonymisierten beruflichen Systemen und Open-Source-Projekten aus Labs.",
      eyebrow: "Engineering-Fallstudien / 01 / 10",
      introTitle: "Die Entscheidungen hinter den Systemen",
      introBody:
        "Die Fallstudien trennen berufliche Arbeit von Labs-Projekten und machen Anforderungen, Abwägungen, Nachweise und Grenzen sichtbar.",
      principles: [
        {
          number: "P01",
          title: "Keine erfundenen Kennzahlen",
          body: "Wenn eine genaue Zahl vertraulich oder nicht verfügbar ist, beschreibe ich die technische Veränderung, statt eine Prozentzahl zu erfinden.",
        },
        {
          number: "P02",
          title: "Entscheidungen vor Werkzeugen",
          body: "Technologie zählt, aber erst nachdem Problem und Abwägung klar sind.",
        },
        {
          number: "P03",
          title: "Namen weggelassen, Arbeit erhalten",
          body: "Organisationen und kommerzielle Details fehlen bewusst. Der technische Umfang bleibt konkret.",
        },
      ],
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
        readMinutes: "12",
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
        decisions: {
          title: "Entscheidungen, die zählten",
          intro: "Jede Entscheidung entfernt eine Klasse versteckter Unterschiede, auch wenn die sicherere Option mehr ausdrückliche Arbeit verlangt.",
          items: [
            {
              title: "Module wiederverwenden, Eingaben variieren",
              body: "Wiederverwendbares Terraform hält das Fundament konsistent, während umgebungsspezifische Werte sichtbar bleiben. Ganze Stacks je Umgebung zu kopieren, hätte den ersten Aufbau beschleunigt, aber stille Abweichungen ermöglicht.",
              tradeoff: "Die Modulgrenze verlangt strengere Verträge und Reviews, doch Unterschiede liegen nun an einem Ort, an dem Operatoren sie sehen können.",
            },
            {
              title: "State an verwaltete Grenzen verschieben",
              body: "Cloud SQL übernimmt die PostgreSQL-Rolle und Cloud Storage ersetzt MinIO. Beide in GKE zu betreiben, hätte der alten Installation ähnlicher gesehen, aber auch Backup, Verfügbarkeit und Wartung in den Cluster mitgenommen.",
              tradeoff: "Managed Services klären die Verantwortung, doch die Migration muss providerspezifisches Verhalten und eine bewusste Reihenfolge der Datenübertragung berücksichtigen.",
            },
            {
              title: "Demo und Produktion trennen",
              body: "Der Demo-Weg prüft das paketierte System, ohne so zu tun, als hätte er dieselben Folgen wie ein Produktionsrelease. Produktion behält ihren eigenen Build-, Registry-, Prüf- und Traffic-Weg.",
              tradeoff: "Zwei Wege bedeuten mehr Pipeline-Arbeit als ein universeller Deploy-Befehl, verhindern aber, dass bequeme Demo-Einstellungen zur Produktionspolitik werden.",
            },
            {
              title: "Erst nach der Prüfung umschalten",
              body: "Produktion wird in den inaktiven Blue/Red-Slot deployt. Readiness-Signale und Smoke-Tests laufen dort, bevor ein Mensch den Traffic verschiebt, statt die aktive Umgebung direkt zu aktualisieren.",
              tradeoff: "Das manuelle Gate ist langsamer als blindes Continuous Deployment, hält aber Rollback und endgültige Produktionshoheit sichtbar.",
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
        readMinutes: "11",
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
        decisions: {
          title: "Entscheidungen, die zählten",
          intro: "Das Design löst Komposition nicht zweimal und hält die Workflow-Autorität ausserhalb des Browsers.",
          items: [
            {
              title: "Den Workflow hinter einen Dienst stellen",
              body: "Der React-Client spricht mit einer fokussierten Spring-API, statt Camunda direkt aufzurufen oder Prozessmechanik im Browser abzubilden.",
              tradeoff: "Der Dienst ist eine zusätzliche Grenze, gibt den Workflow-Regeln aber einen testbaren Eigentümer und verhindert, dass sie in jede Ansicht durchsickern.",
            },
            {
              title: "Die Plattform-Shell wiederverwenden",
              body: "Der single-spa-Host behält Header, Footer, Navigation und gemeinsame Komponentenkonventionen. Das Archivierungs-Microfrontend ergänzt nur die neue Erfahrung, statt als separate Anwendung aufzutreten.",
              tradeoff: "Wiederverwendung reduziert doppelten Chrome, verlangt aber einen stabilen Integrationsvertrag und Koordination bei Änderungen gemeinsamer Komponenten.",
            },
            {
              title: "Status vor Aktion sichtbar machen",
              body: "Die Oberfläche stellt aktuelle Sitzung, Pakete und Prozessstatus ins Zentrum. So verstehen Mitarbeitende vor dem nächsten gültigen Schritt, was gerade geschieht.",
              tradeoff: "Die UI muss nicht verfügbare, laufende und fehlgeschlagene Zustände ehrlich darstellen, statt nur den Idealfall zu zeigen.",
            },
            {
              title: "Nur eine Interpretation des Fortschritts",
              body: "Der Dienst übersetzt den Camunda-Status in ein Anwendungsmodell für das Microfrontend. Die Host-Plattform erhält keine zweite Kopie des Archivierungslebenszyklus.",
              tradeoff: "Die Abbildung braucht bei Prozessänderungen Sorgfalt, verhindert aber unterschiedliche Workflow-Bedeutungen in Shell, Browser und Engine.",
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
        readMinutes: "12",
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
        decisions: {
          title: "Entscheidungen, die zählten",
          intro: "Die Arbeit setzte auf Erkenntnisse aus dem realen Betrieb, kompatible Verträge und auslieferbare Änderungen statt auf eine dramatische Neuentwicklung.",
          items: [
            {
              title: "Den ganzen Anfrageweg verfolgen",
              body: "Performance- und Zuverlässigkeitsarbeit beginnt beim Verhalten, das Kunde oder Benutzer beschreiben können, und folgt ihm durch KnockoutJS und jQuery, .NET-Backend und SQL Server.",
              tradeoff: "Das braucht mehr Untersuchung als ein Patch am ersten langsamen Bauteil, verhindert aber, dass nur der Engpass verschoben oder ein falsches Symptom behoben wird.",
            },
            {
              title: "Die Datenbank als gemeinsamen Vertrag behandeln",
              body: "Ohne Migrationen und mit VB6-Verbrauchern auf derselben Datenbank mussten Schemaänderungen bestehende Lese- und Schreibwege erhalten. Eine additive oder kompatible Änderung war sicherer als die Annahme, alle Anwendungen könnten gleichzeitig wechseln.",
              tradeoff: "Rückwärtskompatibilität kann Übergangsstrukturen länger erhalten, schützt aber Desktop- und Kassenabläufe, die nicht mit jedem Webrelease aktualisiert werden können.",
            },
            {
              title: "In auslieferbaren Schritten verbessern",
              body: "Fokussierte Änderungen sind in einem geschäftskritischen System verständlicher als eine gleichzeitige Neuentwicklung von Webstack, Datenbank und altem Desktopbestand.",
              tradeoff: "Schrittweise Lieferung verlangt Geduld und klare Grenzen, hält dafür aber das Kompatibilitätsrisiko jeder Version sichtbar.",
            },
            {
              title: "Den Kunden im Denkprozess halten",
              body: "Direkte Gespräche machten aus Anforderungen konkrete Abläufe, Randfälle und Abnahmekriterien, bevor ich Reports, Integrationen oder tägliche Oberflächen änderte.",
              tradeoff: "Die Feedbackschleife kostet Koordinationszeit, ist aber günstiger als eine technisch stimmige Interpretation, die nicht zum tatsächlichen Retailprozess passt.",
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
      articleLabel: "Étude de cas anonymisée",
      published: "Publié le",
      readTime: "min de lecture",
      contents: "Sur cette page",
      stack: "Technologies",
      next: "Étude de cas suivante",
      back: "Retour aux études de cas",
      sourceNote: "Limite des informations",
      socialImageAlt: "Le mot-symbole Ejupi Labs à côté du titre «Le travail d’ingénierie, expliqué» et d’un schéma éditorial de système.",
      footerLine: "Logiciels produit, systèmes cloud et automatisation depuis la Suisse.",
      rights: "Tous droits réservés.",
      notFoundTitle: "Cette page n’est pas disponible.",
      notFoundBody: "Vérifiez l’adresse ou revenez aux archives des études de cas.",
      notFoundAction: "Voir toutes les études de cas",
    },
    index: {
      title: "Le travail d’ingénierie, expliqué.",
      description:
        "Des études de cas qui retracent les contraintes, les décisions et les preuves derrière des systèmes professionnels anonymisés et des projets Labs open source.",
      eyebrow: "Études de cas d’ingénierie / 01 / 10",
      introTitle: "Les décisions derrière les systèmes",
      introBody:
        "Les études distinguent le travail professionnel des projets Labs et rendent explicites les contraintes, les arbitrages, les preuves et les limites.",
      principles: [
        {
          number: "P01",
          title: "Aucun chiffre inventé",
          body: "Lorsqu’une mesure exacte est confidentielle ou indisponible, je décris le changement technique au lieu de fabriquer un pourcentage.",
        },
        {
          number: "P02",
          title: "Les décisions avant les outils",
          body: "La technologie compte, mais seulement après avoir clarifié le problème et le compromis.",
        },
        {
          number: "P03",
          title: "Les noms disparaissent, pas le travail",
          body: "Les organisations et les détails commerciaux sont omis. Le périmètre d’ingénierie reste précis.",
        },
      ],
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
        readMinutes: "12",
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
        decisions: {
          title: "Les décisions importantes",
          intro: "Chaque décision supprime une catégorie de différences cachées, même lorsque l’option la plus sûre demande davantage de travail explicite.",
          items: [
            {
              title: "Réutiliser les modules, varier les entrées",
              body: "Terraform réutilisable maintient une base cohérente tandis que les valeurs propres à chaque environnement restent visibles. Copier des stacks entières aurait accéléré le premier setup, mais permis leur divergence silencieuse.",
              tradeoff: "La frontière des modules demande des contrats et des revues plus stricts, mais les différences vivent désormais à un endroit visible pour les opérateurs.",
            },
            {
              title: "Déplacer l’état vers des frontières managées",
              body: "Cloud SQL reprend le rôle de PostgreSQL et Cloud Storage remplace MinIO. Les conserver dans GKE aurait ressemblé davantage à l’installation précédente, mais aurait aussi déplacé sauvegarde, disponibilité et maintenance dans le cluster.",
              tradeoff: "Les services managés clarifient les responsabilités, mais la migration doit tenir compte du comportement propre au fournisseur et d’un séquencement volontaire du transfert des données.",
            },
            {
              title: "Séparer démonstration et production",
              body: "Le parcours de démonstration éprouve le système packagé sans prétendre avoir les mêmes conséquences qu’une release de production. La production conserve ses propres build, registry, vérifications et contrôle du trafic.",
              tradeoff: "Deux parcours demandent plus de travail de pipeline qu’une commande de déploiement universelle, mais empêchent les réglages pratiques de devenir une politique de production.",
            },
            {
              title: "Basculer seulement après vérification",
              body: "La production est déployée sur le slot blue/red inactif. Les signaux de readiness et les smoke tests s’y exécutent avant qu’une personne déplace le trafic, plutôt que de mettre à jour l’environnement actif en place.",
              tradeoff: "Le contrôle manuel est plus lent qu’un déploiement continu aveugle, mais le rollback et l’autorité finale sur la production restent visibles.",
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
        readMinutes: "11",
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
        decisions: {
          title: "Les décisions importantes",
          intro: "La conception évite de résoudre deux fois la composition et maintient l’autorité du workflow hors du navigateur.",
          items: [
            {
              title: "Placer le workflow derrière un service",
              body: "Le client React parle à une API Spring ciblée au lieu d’appeler directement Camunda ou d’encoder les mécanismes du processus dans le navigateur.",
              tradeoff: "Le service ajoute une frontière à maintenir, mais donne aux règles du workflow un propriétaire testable et les empêche d’envahir chaque écran.",
            },
            {
              title: "Réutiliser la shell de la plateforme",
              body: "L’hôte single-spa conserve header, footer, navigation et conventions des composants partagés. Le microfrontend d’archivage apporte seulement la nouvelle expérience au lieu de se présenter comme une application séparée.",
              tradeoff: "La réutilisation réduit le chrome dupliqué, mais exige un contrat d’intégration stable et de la coordination lorsque les composants partagés évoluent.",
            },
            {
              title: "Montrer l’état avant l’action",
              body: "L’interface place la session, ses paquets et l’état du processus au centre afin que l’opérateur comprenne la situation avant de choisir une prochaine étape valide.",
              tradeoff: "L’UI doit représenter les états indisponibles, en attente ou en échec au lieu d’afficher uniquement un parcours idéal.",
            },
            {
              title: "Conserver une seule interprétation de l’avancement",
              body: "Le service traduit l’état Camunda en un modèle applicatif consommé par le microfrontend. La plateforme hôte n’acquiert pas une seconde copie du cycle d’archivage.",
              tradeoff: "Cette correspondance demande de l’attention lorsque le processus change, mais évite une divergence de sens entre shell, navigateur et moteur.",
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
        readMinutes: "12",
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
        decisions: {
          title: "Les décisions importantes",
          intro: "Le travail a privilégié les faits issus de l’opération réelle, les contrats compatibles et les changements livrables plutôt qu’une réécriture spectaculaire.",
          items: [
            {
              title: "Suivre toute la requête",
              body: "Le travail sur la performance et la fiabilité part du comportement que le client ou l’opérateur peut décrire, puis le suit à travers KnockoutJS et jQuery, le backend .NET et SQL Server.",
              tradeoff: "Cela demande plus d’enquête qu’un correctif sur le premier composant lent, mais évite de déplacer le goulot ou de corriger un symptôme que le client ne rencontrait pas réellement.",
            },
            {
              title: "Traiter la base comme un contrat partagé",
              body: "Sans migrations et avec des consommateurs VB6 sur la même base, les changements de schéma devaient préserver les lectures et écritures existantes. Une évolution additive ou compatible était plus sûre que de supposer que toutes les applications pouvaient avancer ensemble.",
              tradeoff: "La rétrocompatibilité peut conserver plus longtemps des structures de transition, mais elle protège les parcours desktop et caisse qui ne peuvent pas être mis à niveau à chaque release web.",
            },
            {
              title: "Améliorer par tranches livrables",
              body: "Des changements ciblés sont plus faciles à comprendre dans un système critique qu’une réécriture simultanée du stack web, de la base et du parc desktop historique.",
              tradeoff: "La livraison progressive exige de la patience et des frontières précises, mais garde visible le risque de compatibilité de chaque version.",
            },
            {
              title: "Garder le client dans le raisonnement",
              body: "Les échanges directs transformaient les demandes en parcours concrets, cas limites et vérifications d’acceptation avant de modifier rapports, intégrations ou écrans quotidiens.",
              tradeoff: "Cette boucle demande du temps de coordination, mais coûte moins cher qu’une interprétation techniquement cohérente qui ne correspond pas au processus retail réel.",
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
