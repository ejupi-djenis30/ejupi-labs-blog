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
    updated: "2026-07-24",
    projectUrl: "https://ejupi-djenis30.github.io/careeros-local/",
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
    updated: "2026-07-24",
    projectUrl: "https://ejupi-djenis30.github.io/PsychologistRustBot/",
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
    updated: "2026-07-24",
    projectUrl: "https://ejupi-djenis30.github.io/DjenisAiAgent/",
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
    updated: "2026-07-24",
    projectUrl: "https://ejupi-djenis30.github.io/Dig/",
    stack: ["Node.js", "TCP", "Gopher", "PWA"],
  },
  {
    slug: "integradraw",
    number: "08",
    diagram: "integradraw",
    kind: "labs",
    categoryKey: "computational-mathematics",
    availableLocales: ["en", "it", "de", "fr"],
    published: "2026-07-24",
    updated: "2026-07-24",
    projectUrl: "https://ejupi-djenis30.github.io/IntegraDraw/",
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
    updated: "2026-07-24",
    projectUrl: "https://ejupi-djenis30.github.io/vector-placement-operations/",
    stack: ["JavaScript", "Local storage", "Playwright", "Static web"],
  },
];

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
      portfolio: "Ejupi Labs",
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
      footerLine: "Software, systems and product engineering from Switzerland.",
      rights: "All rights reserved.",
      notFoundTitle: "This page is not here.",
      notFoundBody: "The address may have changed. The case-study index is a good place to restart.",
      notFoundAction: "Go to the case studies",
    },
    index: {
      title: "Engineering decisions, shown in context.",
      description:
        "Nine detailed case studies: three anonymised professional systems and six open-source Labs projects. Each one explains the constraints, the decisions, what was built and where the evidence stops.",
      eyebrow: "Engineering case studies / 01—09",
      introTitle: "Work worth explaining",
      introBody:
        "A stack list tells you very little. This archive separates professional work from Labs projects, then follows the decisions, verification and limits behind each system.",
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
      ctaTitle: "Have a system that needs a clearer path forward?",
      ctaBody: "Bring the difficult part. We can work through the architecture, delivery plan and first useful release together.",
    },
    cases: {
      "ai-workflow-cloud-migration": {
        category: "Cloud platforms",
        cardTitle: "AI workflow platform cloud migration",
        title: "Moving an AI workflow platform to a repeatable cloud foundation",
        summary:
          "In roughly one month, I moved a multi-component document and AI-workflow platform from an environment-specific on-premise setup to reusable Terraform, GKE and a controlled blue/red delivery path on Google Cloud.",
        readMinutes: "10",
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
          ],
        },
        constraints: {
          title: "What the design had to solve",
          intro: "The new platform model needed to make four things explicit:",
          items: [
            "Vue, Spring Boot, Python, Temporal and Keycloak workloads needed one Kubernetes deployment model.",
            "PostgreSQL and MinIO data responsibilities had to move to Cloud SQL and Cloud Storage without hiding the change behind containers.",
            "A demonstration pipeline and the production release path needed different risk controls.",
            "Production rollout required an inactive slot, smoke verification and an explicit manual switch.",
          ],
        },
        diagnosis: {
          title: "The diagnosis",
          paragraphs: [
            "The fragile part was not a single service. It was the path from source code to a running environment. When that path varies by environment, every change carries hidden assumptions.",
            "I treated reproducibility and reversibility as the central requirements. Terraform modules define the Google Cloud foundation, Helm packages the Kubernetes workloads, and environment values stay separate from the reusable definitions.",
          ],
        },
        architecture: {
          title: "The resulting platform model",
          intro:
            "For production, GitLab CI hands the build to Cloud Build, publishes images in Artifact Registry and deploys to the inactive GKE slot. Kubernetes readiness and a smoke test must pass before an operator switches traffic. Cloud SQL and Cloud Storage replace self-managed PostgreSQL and MinIO responsibilities.",
          labels: ["GITLAB CI", "CLOUD BUILD", "ARTIFACT REGISTRY", "GKE BLUE / RED", "CLOUD SQL + GCS"],
          caption: "Build once, verify the inactive slot, then make the production switch explicit.",
        },
        decisions: {
          title: "Decisions that mattered",
          intro: "The migration became dependable because the boundaries were deliberate.",
          items: [
            {
              title: "Reuse modules, vary inputs",
              body: "Reusable Terraform keeps the foundation consistent. Environment-specific values stay visible as inputs instead of turning into copied infrastructure.",
              tradeoff: "This asks for stricter module contracts, which is exactly where the discipline belongs.",
            },
            {
              title: "Move state to managed boundaries",
              body: "Cloud SQL takes the PostgreSQL role and Cloud Storage replaces MinIO object storage, while application workloads move to GKE.",
              tradeoff: "The migration gains operational clarity but must account for provider-specific behaviour and data-transfer sequencing.",
            },
            {
              title: "Switch only after verification",
              body: "Production deploys to an inactive blue/red slot. Readiness signals and smoke tests run before a human makes the traffic switch.",
              tradeoff: "The manual gate is slower than blind continuous deployment, but it keeps the final production decision visible.",
            },
          ],
        },
        delivery: {
          title: "Delivery and verification",
          paragraphs: [
            "The demonstration path and production path stay distinct. Production moves from GitLab CI through Cloud Build and Artifact Registry to the inactive GKE environment instead of deploying directly over the live slot.",
            "Verification combines Kubernetes readiness, Google Cloud alerts and infrastructure signals with a smoke test before the switch. This does not prove every business workflow; it proves the release candidate is healthy enough for the controlled cutover.",
          ],
        },
        result: {
          title: "The delivered result",
          paragraphs: [
            "The migration replaced an on-premise, environment-specific route with reusable infrastructure modules, packaged workloads, managed data services and two controlled production slots.",
            "The useful outcome is not simply “running on Google Cloud.” It is a release path that can be reviewed before deployment, checked before traffic moves and repeated for the next environment.",
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
        readMinutes: "9",
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
            "The feature also had to live inside a larger enterprise platform. It could not become a separate product with its own rules. It needed a focused boundary that fitted the surrounding system.",
          ],
        },
        constraints: {
          title: "What the design had to solve",
          intro: "The useful boundary sat between process state and operator action:",
          items: [
            "A session, its source packages and resulting output packages needed to stay understandable across a nine-step lifecycle.",
            "Operator actions had to map cleanly to valid process transitions.",
            "Backend rules and frontend state could not drift into separate interpretations.",
            "The Single-SPA microfrontend had to integrate with the host platform without spreading archival rules across it.",
          ],
        },
        diagnosis: {
          title: "The diagnosis",
          paragraphs: [
            "Camunda could coordinate the process, but orchestration alone was not the operator experience. The missing layer was a coherent application boundary around the workflow.",
            "I separated the concerns: the Spring Boot service owns application rules, S3-compatible storage references and Camunda integration; the React Single-SPA microfrontend presents current state and valid actions.",
          ],
        },
        architecture: {
          title: "The resulting application slice",
          intro:
            "The microfrontend gives operators a focused surface. The Spring service translates application actions into workflow operations and storage references, while Camunda coordinates the process from session creation through output tracking.",
          labels: ["OPERATOR", "REACT SINGLE-SPA", "SPRING BOOT API", "CAMUNDA", "S3 INPUT + OUTPUT"],
          caption: "Application state, process state and package storage meet at one explicit service boundary.",
        },
        decisions: {
          title: "Decisions that mattered",
          intro: "The design stays useful by keeping each responsibility in one place.",
          items: [
            {
              title: "Put the workflow behind an application service",
              body: "The React client talks to a focused Spring API rather than encoding process mechanics in the browser.",
              tradeoff: "The service adds a boundary to maintain, but it prevents workflow details from leaking into every screen.",
            },
            {
              title: "Make state visible before action",
              body: "The interface centres the current session, its packages and the workflow state so an operator can see what is happening before choosing the next step.",
              tradeoff: "The UI must represent unavailable and in-progress states, not only the happy path.",
            },
            {
              title: "Keep the feature narrow",
              body: "A microfrontend contains the archival experience while allowing it to fit inside the wider enterprise platform.",
              tradeoff: "That independence depends on a disciplined integration contract with the host application.",
            },
          ],
        },
        delivery: {
          title: "Delivery and verification",
          paragraphs: [
            "Verification follows the same nine-step route an operator uses: create a session, attach source packages, start the workflow, observe valid transitions and track output packages when processing completes.",
            "The important failure cases sit at the boundaries. The service needs to reject invalid transitions, the UI needs to show incomplete or pending state honestly, and the process integration needs to remain the source of workflow truth.",
          ],
        },
        result: {
          title: "The qualitative result",
          paragraphs: [
            "The resulting slice covers session handling, package processing and workflow control from the operator interface through to the Camunda process.",
            "Operators get one place to understand the work and move it forward. The wider platform gets a contained feature instead of archival logic spread across unrelated screens and services.",
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
        readMinutes: "10",
        facts: [
          ["Discipline", "Enterprise product engineering"],
          ["Scope", "Database, backend, frontend and integrations"],
          ["Delivery", "Approximately nineteen months"],
          ["Boundary", "Anonymised professional case"],
        ],
        starting: {
          title: "The starting point",
          paragraphs: [
            "The ERP was a live retail monolith built on SQL Server, C# and .NET Framework 4.8, Entity Framework, KnockoutJS, JavaScript, jQuery, Bootstrap and Crystal Reports. Reliability was a product requirement, not a maintenance footnote.",
            "The work covered new features, defects, stored procedures and views, reporting, two external courier integrations, requirements, training and support. A separate stock-receipt tool also moved toward .NET Core and multi-format ingestion.",
          ],
        },
        constraints: {
          title: "What the work had to respect",
          intro: "An operational ERP leaves little room for careless change:",
          items: [
            "Existing workflows had to keep serving day-to-day retail work.",
            "Database, backend and frontend behaviour needed to change together when the contract changed.",
            "Two external courier integrations had to remain understandable at the system boundary.",
            "Performance work had to address the real path through the application, not one isolated symptom.",
          ],
        },
        diagnosis: {
          title: "The diagnosis",
          paragraphs: [
            "In a layered ERP, the visible delay or failure is often only the last link in the chain. A screen can be slow because of its request shape, backend work or a database access pattern. An integration issue can surface as a frontend inconsistency.",
            "I worked through that full path across three application layers. SQL Server queries and stored procedures, .NET Framework rules, KnockoutJS screens, reports and courier exchanges were treated as parts of one operational behaviour.",
          ],
        },
        architecture: {
          title: "The working system view",
          intro:
            "The useful unit of change was the end-to-end request: an operator action in KnockoutJS, application rules in .NET Framework 4.8, data work in SQL Server, reporting through Crystal Reports and exchanges at courier boundaries.",
          labels: ["OPERATOR", "KNOCKOUTJS", ".NET FRAMEWORK 4.8", "SQL SERVER", "REPORTS + COURIERS"],
          caption: "Follow the operational path through three application layers and its external boundaries.",
        },
        decisions: {
          title: "Decisions that mattered",
          intro: "The work favoured controlled evolution over a dramatic rewrite.",
          items: [
            {
              title: "Trace the whole request path",
              body: "Performance and reliability work starts at the user-visible behaviour and follows it through the backend to the database.",
              tradeoff: "This takes more investigation than patching the first slow component, but it avoids shifting the bottleneck.",
            },
            {
              title: "Change contracts deliberately",
              body: "When data or backend behaviour changes, the frontend and integrations need an explicit, compatible contract.",
              tradeoff: "Compatibility work can make a change less dramatic, but it protects the operations already running on the system.",
            },
            {
              title: "Improve in releasable slices",
              body: "Focused changes are easier to reason about in a business-critical system and make the effect of each release clearer.",
              tradeoff: "Incremental delivery demands patience and careful boundaries; it also keeps risk visible.",
            },
          ],
        },
        delivery: {
          title: "Delivery and verification",
          paragraphs: [
            "Each change was checked at its layer and again through the operational workflow it supported. Stored procedures and views, backend rules, courier responses, reports and frontend state needed to agree.",
            "That end-to-end check matters most around everyday paths. A technically correct change is not finished if it makes routine work harder to understand or less dependable.",
          ],
        },
        result: {
          title: "The qualitative result",
          paragraphs: [
            "Performance, integrations and daily reliability improved together because the work crossed the boundaries where those concerns met.",
            "The system continued to evolve without pretending that a business-critical ERP could be paused and replaced in one clean move. The practical route was to understand it, improve it and keep it useful throughout.",
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
      portfolio: "Ejupi Labs",
      navigation: "Navigazione principale",
      languages: "Scegli la lingua",
      menuOpen: "Apri la navigazione",
      menuClose: "Chiudi la navigazione",
      contact: "Parliamo del progetto",
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
      footerLine: "Software, sistemi e product engineering dalla Svizzera.",
      rights: "Tutti i diritti riservati.",
      notFoundTitle: "Questa pagina non c’è.",
      notFoundBody: "L’indirizzo potrebbe essere cambiato. Puoi ripartire dall’indice dei case study.",
      notFoundAction: "Vai ai case study",
    },
    index: {
      title: "Decisioni tecniche, spiegate nel loro contesto.",
      description:
        "Nove case study concreti: tre sistemi professionali anonimizzati e sei progetti open source di Labs. Ogni caso spiega i vincoli, le decisioni, ciò che è stato costruito e fin dove arrivano le prove.",
      eyebrow: "Case study di engineering / 01—09",
      introTitle: "Lavoro che vale la pena spiegare",
      introBody:
        "Un elenco di tecnologie dice poco. L’archivio separa lavoro professionale e progetti Labs, poi segue decisioni, verifiche e limiti di ogni sistema.",
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
      ctaTitle: "Hai un sistema che ha bisogno di una direzione più chiara?",
      ctaBody: "Partiamo dalla parte difficile. Possiamo definire insieme architettura, piano di consegna e prima release utile.",
    },
    cases: {
      "ai-workflow-cloud-migration": {
        category: "Piattaforme cloud",
        cardTitle: "Migrazione cloud di una piattaforma AI",
        title: "Portare una piattaforma AI su una base cloud ripetibile",
        summary:
          "In circa un mese ho portato una piattaforma multicomponente per documenti e workflow AI da un assetto on-premise specifico per ambiente a Terraform riutilizzabile, GKE e un rilascio blue/red controllato su Google Cloud.",
        readMinutes: "10",
        facts: [
          ["Disciplina", "Cloud platform engineering"],
          ["Perimetro", "Infrastruttura, workload e percorso di rilascio"],
          ["Consegna", "Circa un mese"],
          ["Confine", "Caso professionale anonimizzato"],
        ],
        starting: {
          title: "Il punto di partenza",
          paragraphs: [
            "La piattaforma on-premise riuniva Vue, due servizi Spring Boot, un worker Python Temporal, Temporal, Keycloak, PostgreSQL e MinIO per l’estrazione documentale e workflow assistiti dall’AI.",
            "Definirla soltanto una migrazione cloud avrebbe descritto la destinazione, non il lavoro. Il punto era sostituire infrastruttura e passaggi una tantum con un modello leggibile, verificabile e ripetibile.",
          ],
        },
        constraints: {
          title: "Cosa doveva risolvere il nuovo modello",
          intro: "Il disegno della piattaforma doveva rendere espliciti quattro aspetti:",
          items: [
            "Vue, Spring Boot, Python, Temporal e Keycloak dovevano condividere un modello Kubernetes.",
            "PostgreSQL e MinIO dovevano passare a Cloud SQL e Cloud Storage con responsabilità esplicite.",
            "La pipeline dimostrativa e il rilascio di produzione richiedevano controlli diversi.",
            "La produzione doveva usare uno slot inattivo, smoke test e switch manuale.",
          ],
        },
        diagnosis: {
          title: "La diagnosi",
          paragraphs: [
            "La parte fragile non era un singolo servizio. Era il percorso dal codice sorgente a un ambiente funzionante. Quando quel percorso cambia da un ambiente all’altro, ogni modifica porta con sé ipotesi nascoste.",
            "Ho trattato la riproducibilità come requisito centrale. Definizioni infrastrutturali, workload del cluster e valori d’ambiente dovevano avere responsabilità separate, pur passando dallo stesso percorso di delivery.",
          ],
        },
        architecture: {
          title: "Il modello di piattaforma risultante",
          intro:
            "In produzione GitLab CI passa la build a Cloud Build, pubblica le immagini in Artifact Registry e distribuisce sullo slot GKE inattivo. Readiness Kubernetes e smoke test precedono lo switch manuale; Cloud SQL e Cloud Storage sostituiscono PostgreSQL e MinIO autogestiti.",
          labels: ["GITLAB CI", "CLOUD BUILD", "ARTIFACT REGISTRY", "GKE BLUE / RED", "CLOUD SQL + GCS"],
          caption: "Build unica, verifica sullo slot inattivo e switch di produzione esplicito.",
        },
        decisions: {
          title: "Le decisioni importanti",
          intro: "La migrazione è diventata affidabile grazie a confini intenzionali.",
          items: [
            {
              title: "Riutilizzare i moduli, variare gli input",
              body: "Terraform riutilizzabile mantiene coerente la base. I valori specifici restano input visibili, invece di trasformarsi in copie dell’infrastruttura.",
              tradeoff: "Questo richiede contratti più rigidi tra i moduli. È esattamente dove serve disciplina.",
            },
            {
              title: "Un solo modello runtime per i workload",
              body: "GKE offre ai componenti un obiettivo di deploy coerente e permette di ragionare insieme sulla configurazione runtime.",
              tradeoff: "Un modello condiviso richiede comunque responsabilità chiare per namespace, configurazione e rollout.",
            },
            {
              title: "Usare i servizi gestiti con criterio",
              body: "I servizi gestiti di Google Cloud sottraggono ai workload responsabilità di piattaforma quando il confine è utile.",
              tradeoff: "La maggiore operabilità introduce scelte legate al provider, che devono restare esplicite nell’architettura.",
            },
          ],
        },
        delivery: {
          title: "Delivery e verifica",
          paragraphs: [
            "La pipeline dimostrativa resta distinta da quella di produzione. Quest’ultima passa da GitLab CI a Cloud Build e Artifact Registry prima di raggiungere lo slot GKE inattivo.",
            "La verifica combina readiness Kubernetes, alert e segnali GCP con uno smoke test prima dello switch. Non prova ogni flusso di business, ma rende controllato il cutover.",
          ],
        },
        result: {
          title: "Il risultato qualitativo",
          paragraphs: [
            "Infrastruttura e delivery seguono ora un unico percorso ripetibile e verificabile. La piattaforma può essere trattata come un sistema, non come una raccolta di eccezioni ambientali.",
            "Il risultato più utile non è soltanto l’esecuzione su Google Cloud. È il fatto che il percorso verso un ambiente funzionante sia codificato, revisionabile e coerente.",
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
        readMinutes: "9",
        facts: [
          ["Disciplina", "Workflow e product engineering"],
          ["Perimetro", "Servizio, microfrontend e confine workflow"],
          ["Consegna", "Circa tre mesi"],
          ["Confine", "Caso professionale anonimizzato"],
        ],
        starting: {
          title: "Il punto di partenza",
          paragraphs: [
            "Il dominio comprendeva sessioni, tipologie, codici ente, storage input/output, pacchetti sorgente, pacchetti risultanti e lifecycle del workflow.",
            "La funzionalità doveva vivere dentro una piattaforma enterprise più ampia. Non poteva diventare un prodotto separato con regole proprie. Serviva un confine mirato che rispettasse il sistema circostante.",
          ],
        },
        constraints: {
          title: "Cosa doveva risolvere il design",
          intro: "Il confine utile si trovava tra stato del processo e azione dell’operatore:",
          items: [
            "Sessione, pacchetti sorgente e output dovevano restare comprensibili lungo nove passaggi.",
            "Le azioni dell’operatore dovevano corrispondere a transizioni valide.",
            "Regole backend e stato frontend non potevano divergere in interpretazioni diverse.",
            "Il microfrontend Single-SPA doveva integrarsi senza disperdere la propria logica nella piattaforma host.",
          ],
        },
        diagnosis: {
          title: "La diagnosi",
          paragraphs: [
            "Camunda poteva coordinare il processo, ma l’orchestrazione da sola non costituiva l’esperienza operativa. Mancava un confine applicativo coerente attorno al workflow.",
            "Ho separato le responsabilità: il servizio Spring gestisce le regole applicative e l’integrazione di processo; il microfrontend React presenta lo stato corrente e le azioni valide.",
          ],
        },
        architecture: {
          title: "La sezione applicativa risultante",
          intro:
            "Il microfrontend offre una superficie mirata. Spring Boot traduce le azioni in operazioni Camunda e riferimenti storage S3-compatible, dal setup della sessione al tracking dell’output.",
          labels: ["OPERATORE", "REACT SINGLE-SPA", "API SPRING BOOT", "CAMUNDA", "S3 INPUT + OUTPUT"],
          caption: "Stato applicativo, processo e storage si incontrano in un confine esplicito.",
        },
        decisions: {
          title: "Le decisioni importanti",
          intro: "Il design resta utile perché ogni responsabilità ha un posto preciso.",
          items: [
            {
              title: "Mettere il workflow dietro un servizio",
              body: "Il client React parla con una API Spring mirata, invece di codificare nel browser i meccanismi del processo.",
              tradeoff: "Il servizio aggiunge un confine da mantenere, ma impedisce ai dettagli del workflow di invadere ogni schermata.",
            },
            {
              title: "Mostrare lo stato prima dell’azione",
              body: "L’interfaccia mette al centro la sessione corrente, i pacchetti e lo stato del processo, così l’operatore capisce cosa succede prima di agire.",
              tradeoff: "La UI deve rappresentare anche stati indisponibili e in corso, non solo il percorso ideale.",
            },
            {
              title: "Mantenere stretto il perimetro",
              body: "Il microfrontend contiene l’esperienza archivistica e allo stesso tempo si inserisce nella piattaforma enterprise.",
              tradeoff: "Questa indipendenza dipende da un contratto d’integrazione disciplinato con l’applicazione host.",
            },
          ],
        },
        delivery: {
          title: "Delivery e verifica",
          paragraphs: [
            "La verifica segue i nove passaggi operativi: creare la sessione, collegare i pacchetti sorgente, avviare il workflow, osservare le transizioni valide e seguire i pacchetti in output.",
            "I casi critici sono ai confini. Il servizio deve rifiutare transizioni non valide, la UI deve mostrare con onestà stati incompleti o in attesa e l’integrazione deve mantenere il processo come fonte dello stato.",
          ],
        },
        result: {
          title: "Il risultato qualitativo",
          paragraphs: [
            "La sezione risultante copre gestione delle sessioni, elaborazione dei pacchetti e controllo del workflow, dall’interfaccia dell’operatore fino al processo Camunda.",
            "Gli operatori hanno un solo luogo in cui capire il lavoro e farlo avanzare. La piattaforma più ampia riceve una funzionalità contenuta, non logica archivistica dispersa tra schermate e servizi.",
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
        readMinutes: "10",
        facts: [
          ["Disciplina", "Enterprise product engineering"],
          ["Perimetro", "Database, backend, frontend e integrazioni"],
          ["Consegna", "Circa diciannove mesi"],
          ["Confine", "Caso professionale anonimizzato"],
        ],
        starting: {
          title: "Il punto di partenza",
          paragraphs: [
            "Il monolite operativo usava SQL Server, C#/.NET Framework 4.8, Entity Framework, KnockoutJS, JavaScript, jQuery, Bootstrap e Crystal Reports. Ogni modifica doveva preservare il lavoro quotidiano.",
            "Il perimetro includeva feature, bug, stored procedure e view, reporting, due integrazioni esterne con corrieri, requisiti, formazione, supporto e l’evoluzione di uno strumento di ricezione stock verso .NET Core e ingestion multi-formato.",
          ],
        },
        constraints: {
          title: "Cosa doveva rispettare il lavoro",
          intro: "Un ERP operativo lascia poco spazio a modifiche avventate:",
          items: [
            "I flussi esistenti dovevano continuare a sostenere il lavoro retail quotidiano.",
            "Database, backend e frontend dovevano cambiare insieme quando cambiava il contratto.",
            "Due integrazioni esterne con corrieri dovevano restare comprensibili al confine del sistema.",
            "Il lavoro sulle prestazioni doveva seguire il percorso reale, non un sintomo isolato.",
          ],
        },
        diagnosis: {
          title: "La diagnosi",
          paragraphs: [
            "In un ERP a più livelli, il ritardo o l’errore visibile è spesso l’ultimo anello. Una schermata può essere lenta per la forma della richiesta, il lavoro backend o l’accesso al database. Un problema d’integrazione può apparire come incoerenza frontend.",
            "Ho lavorato sull’intero percorso attraverso tre livelli applicativi: query e stored procedure SQL Server, regole .NET Framework, schermate KnockoutJS, report e scambi con i corrieri.",
          ],
        },
        architecture: {
          title: "La vista utile del sistema",
          intro:
            "L’unità utile di cambiamento era il percorso end-to-end: azione in KnockoutJS, regole .NET Framework 4.8, dati SQL Server, reporting Crystal Reports e scambi ai confini esterni.",
          labels: ["OPERATORE", "KNOCKOUTJS", ".NET FRAMEWORK 4.8", "SQL SERVER", "REPORT + CORRIERI"],
          caption: "Seguire il flusso operativo attraverso tre livelli e i suoi confini esterni.",
        },
        decisions: {
          title: "Le decisioni importanti",
          intro: "Il lavoro ha privilegiato un’evoluzione controllata rispetto a una riscrittura spettacolare.",
          items: [
            {
              title: "Seguire tutta la richiesta",
              body: "Il lavoro su performance e affidabilità parte dal comportamento visibile e lo segue attraverso backend e database.",
              tradeoff: "Richiede più indagine di una patch al primo componente lento, ma evita di spostare il collo di bottiglia.",
            },
            {
              title: "Cambiare i contratti con attenzione",
              body: "Quando cambiano dati o comportamento backend, frontend e integrazioni hanno bisogno di un contratto esplicito e compatibile.",
              tradeoff: "La compatibilità rende il cambiamento meno appariscente, ma protegge le operazioni già basate sul sistema.",
            },
            {
              title: "Migliorare in sezioni rilasciabili",
              body: "Modifiche mirate sono più semplici da capire in un sistema business-critical e rendono più chiaro l’effetto di ogni release.",
              tradeoff: "La consegna incrementale richiede pazienza e confini precisi; in cambio mantiene visibile il rischio.",
            },
          ],
        },
        delivery: {
          title: "Delivery e verifica",
          paragraphs: [
            "Ogni modifica veniva verificata nel proprio livello e nel flusso operativo: stored procedure e view, regole backend, risposte dei corrieri, report e stato frontend dovevano concordare.",
            "La verifica end-to-end conta soprattutto nei percorsi quotidiani. Una modifica tecnicamente corretta non è finita se rende il lavoro abituale più difficile da capire o meno affidabile.",
          ],
        },
        result: {
          title: "Il risultato qualitativo",
          paragraphs: [
            "Performance, integrazioni e affidabilità quotidiana sono migliorate insieme perché il lavoro ha attraversato i confini in cui questi aspetti si incontravano.",
            "Il sistema ha continuato a evolvere senza fingere che un ERP business-critical potesse essere fermato e sostituito in un solo gesto. La strada pratica era capirlo, migliorarlo e mantenerlo utile.",
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
      portfolio: "Ejupi Labs",
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
      footerLine: "Software-, System- und Produktentwicklung aus der Schweiz.",
      rights: "Alle Rechte vorbehalten.",
      notFoundTitle: "Diese Seite gibt es nicht.",
      notFoundBody: "Die Adresse hat sich möglicherweise geändert. Der Fallstudien-Index ist ein guter Neustart.",
      notFoundAction: "Zu den Fallstudien",
    },
    index: {
      title: "Technische Entscheidungen, im Zusammenhang gezeigt.",
      description:
        "Neun konkrete Fallstudien: drei anonymisierte berufliche Systeme und sechs Open-Source-Projekte aus Labs. Jede zeigt die Rahmenbedingungen, die Entscheidungen, das gebaute Ergebnis und die Grenzen der Belege.",
      eyebrow: "Engineering-Fallstudien / 01—09",
      introTitle: "Arbeit, die eine Erklärung verdient",
      introBody:
        "Eine Technologieliste sagt wenig aus. Das Archiv trennt berufliche Arbeit und Labs-Projekte und folgt dann Entscheidungen, Prüfungen und Grenzen jedes Systems.",
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
      ctaTitle: "Braucht Ihr System einen klareren Weg nach vorn?",
      ctaBody: "Bringen Sie den schwierigen Teil mit. Gemeinsam klären wir Architektur, Lieferplan und die erste nützliche Version.",
    },
    cases: {
      "ai-workflow-cloud-migration": {
        category: "Cloud-Plattformen",
        cardTitle: "Cloud-Migration einer AI-Workflow-Plattform",
        title: "Eine AI-Workflow-Plattform auf ein wiederholbares Cloud-Fundament stellen",
        summary:
          "In etwa einem Monat überführte ich eine mehrteilige Dokument- und AI-Workflow-Plattform aus einem umgebungsspezifischen On-Premise-Betrieb in wiederverwendbares Terraform, GKE und einen kontrollierten Blue/Red-Releaseweg.",
        readMinutes: "10",
        facts: [
          ["Disziplin", "Cloud Platform Engineering"],
          ["Umfang", "Infrastruktur, Workloads und Releaseweg"],
          ["Lieferzeit", "Etwa ein Monat"],
          ["Grenze", "Anonymisierte berufliche Fallstudie"],
        ],
        starting: {
          title: "Der Ausgangspunkt",
          paragraphs: [
            "Die On-Premise-Plattform verband Vue, zwei Spring-Boot-Dienste, einen Python-Temporal-Worker, Temporal, Keycloak, PostgreSQL und MinIO für Dokumentextraktion und AI-gestützte Workflows.",
            "Nur von einer Cloud-Migration zu sprechen, hätte das Ziel beschrieben, nicht die eigentliche Arbeit. Entscheidend war, einmalige Infrastruktur und Abläufe durch ein Modell zu ersetzen, das lesbar, prüfbar und wiederholbar ist.",
          ],
        },
        constraints: {
          title: "Was das Design lösen musste",
          intro: "Das neue Plattformmodell musste vier Dinge sichtbar machen:",
          items: [
            "Vue, Spring Boot, Python, Temporal und Keycloak brauchten ein gemeinsames Kubernetes-Modell.",
            "PostgreSQL und MinIO mussten mit klaren Verantwortlichkeiten zu Cloud SQL und Cloud Storage wechseln.",
            "Demo-Pipeline und Produktionsrelease benötigten unterschiedliche Risikokontrollen.",
            "Produktion verlangte einen inaktiven Slot, Smoke-Test und einen manuellen Switch.",
          ],
        },
        diagnosis: {
          title: "Die Diagnose",
          paragraphs: [
            "Der fragile Teil war kein einzelner Dienst. Es war der Weg vom Quellcode zu einer laufenden Umgebung. Wenn dieser Weg je Umgebung variiert, trägt jede Änderung versteckte Annahmen mit sich.",
            "Ich behandelte Reproduzierbarkeit als zentrale Anforderung. Infrastrukturdefinitionen, Cluster-Workloads und Umgebungswerte brauchten getrennte Verantwortlichkeiten, sollten aber denselben Delivery-Weg durchlaufen.",
          ],
        },
        architecture: {
          title: "Das resultierende Plattformmodell",
          intro:
            "GitLab CI übergibt den Produktionsbuild an Cloud Build, veröffentlicht Images in Artifact Registry und deployt in den inaktiven GKE-Slot. Kubernetes-Readiness und Smoke-Test gehen dem manuellen Switch voraus; Cloud SQL und Cloud Storage ersetzen selbstverwaltetes PostgreSQL und MinIO.",
          labels: ["GITLAB CI", "CLOUD BUILD", "ARTIFACT REGISTRY", "GKE BLUE / RED", "CLOUD SQL + GCS"],
          caption: "Ein Build, Prüfung im inaktiven Slot und ein bewusster Produktionswechsel.",
        },
        decisions: {
          title: "Entscheidungen, die zählten",
          intro: "Die Migration wurde durch bewusst gesetzte Grenzen verlässlich.",
          items: [
            {
              title: "Module wiederverwenden, Eingaben variieren",
              body: "Wiederverwendbares Terraform hält das Fundament konsistent. Umgebungsspezifische Werte bleiben sichtbare Eingaben, statt zu kopierter Infrastruktur zu werden.",
              tradeoff: "Das verlangt strengere Modulverträge. Genau dort ist diese Disziplin sinnvoll.",
            },
            {
              title: "Ein Laufzeitmodell für alle Workloads",
              body: "GKE gibt den Anwendungskomponenten ein einheitliches Deployment-Ziel und macht ihre Laufzeitkonfiguration gemeinsam verständlich.",
              tradeoff: "Ein gemeinsames Clustermodell braucht weiterhin klare Verantwortung für Namespaces, Konfiguration und Rollouts.",
            },
            {
              title: "Managed Services gezielt einsetzen",
              body: "Verwaltete Google-Cloud-Dienste nehmen den eigenen Workloads Plattformaufgaben ab, wo diese Grenze nützlich ist.",
              tradeoff: "Der einfachere Betrieb bringt providerspezifische Entscheidungen mit, die in der Architektur sichtbar bleiben müssen.",
            },
          ],
        },
        delivery: {
          title: "Delivery und Prüfung",
          paragraphs: [
            "Demo und Produktion bleiben getrennt. Produktion läuft von GitLab CI über Cloud Build und Artifact Registry in den inaktiven GKE-Slot.",
            "Kubernetes-Readiness, GCP-Warnungen und Infrastruktursignale werden mit einem Smoke-Test vor dem Switch kombiniert. Das prüft nicht jeden Geschäftsablauf, macht den Cutover aber kontrollierbar.",
          ],
        },
        result: {
          title: "Das qualitative Ergebnis",
          paragraphs: [
            "Infrastruktur und Delivery folgen nun einem wiederholbaren, nachvollziehbaren Weg. Die Plattform lässt sich als System besprechen, nicht als Sammlung von Umgebungsausnahmen.",
            "Das wichtigste Ergebnis ist nicht allein, dass das System auf Google Cloud läuft. Der Weg zu einer laufenden Umgebung ist codiert, prüfbar und konsistent.",
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
        readMinutes: "9",
        facts: [
          ["Disziplin", "Workflow- und Product Engineering"],
          ["Umfang", "Dienst, Microfrontend und Workflow-Grenze"],
          ["Lieferzeit", "Etwa drei Monate"],
          ["Grenze", "Anonymisierte berufliche Fallstudie"],
        ],
        starting: {
          title: "Der Ausgangspunkt",
          paragraphs: [
            "Die Domäne umfasste Sitzungen, Typen, Organisationscodes, Input- und Output-Storage, Quell- und Ergebnispakete sowie den Workflow-Lebenszyklus.",
            "Die Funktion musste in einer grösseren Enterprise-Plattform leben. Sie durfte kein separates Produkt mit eigenen Regeln werden, sondern brauchte eine fokussierte Grenze, die zum umgebenden System passte.",
          ],
        },
        constraints: {
          title: "Was das Design lösen musste",
          intro: "Die nützliche Grenze lag zwischen Prozessstatus und Benutzeraktion:",
          items: [
            "Sitzung, Quellpakete und Output mussten über neun Prozessschritte verständlich bleiben.",
            "Benutzeraktionen mussten sauber auf gültige Prozessübergänge abgebildet werden.",
            "Backend-Regeln und Frontend-Status durften nicht auseinanderlaufen.",
            "Das Single-SPA-Microfrontend musste sich integrieren, ohne seine Logik über die Host-Plattform zu verteilen.",
          ],
        },
        diagnosis: {
          title: "Die Diagnose",
          paragraphs: [
            "Camunda konnte den Prozess koordinieren, aber Orchestrierung allein war noch keine brauchbare Arbeitsoberfläche. Es fehlte eine zusammenhängende Anwendungsgrenze um den Workflow.",
            "Ich trennte die Verantwortlichkeiten: Der Spring-Dienst besitzt die anwendungsnahen Regeln und die Prozessintegration. Das React-Microfrontend zeigt den aktuellen Status und die daraus gültigen Aktionen.",
          ],
        },
        architecture: {
          title: "Der resultierende Anwendungsausschnitt",
          intro:
            "Das Microfrontend bietet eine fokussierte Oberfläche. Spring Boot übersetzt Aktionen in Camunda-Operationen und S3-kompatible Storage-Referenzen, von der Sitzungserstellung bis zum Output-Tracking.",
          labels: ["BENUTZER", "REACT SINGLE-SPA", "SPRING BOOT API", "CAMUNDA", "S3 INPUT + OUTPUT"],
          caption: "Anwendungsstatus, Prozess und Storage treffen an einer klaren Grenze zusammen.",
        },
        decisions: {
          title: "Entscheidungen, die zählten",
          intro: "Das Design bleibt nützlich, weil jede Verantwortung einen klaren Ort hat.",
          items: [
            {
              title: "Den Workflow hinter einen Dienst stellen",
              body: "Der React-Client spricht mit einer fokussierten Spring-API, statt Prozessmechanik im Browser abzubilden.",
              tradeoff: "Der Dienst ist eine zusätzliche Grenze, verhindert aber, dass Workflow-Details in jede Ansicht durchsickern.",
            },
            {
              title: "Status vor Aktion sichtbar machen",
              body: "Die Oberfläche stellt aktuelle Sitzung, Pakete und Prozessstatus ins Zentrum. So ist vor dem nächsten Schritt klar, was gerade geschieht.",
              tradeoff: "Die UI muss auch nicht verfügbare und laufende Zustände ehrlich darstellen, nicht nur den Idealfall.",
            },
            {
              title: "Den Funktionsumfang eng halten",
              body: "Ein Microfrontend kapselt die Archivierungsoberfläche und lässt sie zugleich in die grössere Plattform passen.",
              tradeoff: "Diese Eigenständigkeit hängt von einem klaren Integrationsvertrag mit der Host-Anwendung ab.",
            },
          ],
        },
        delivery: {
          title: "Delivery und Prüfung",
          paragraphs: [
            "Die Prüfung folgt den neun Schritten: Sitzung erstellen, Quellpakete verbinden, Workflow starten, gültige Übergänge beobachten und Ergebnispakete verfolgen.",
            "Die wichtigen Fehlerfälle liegen an den Grenzen. Der Dienst muss ungültige Übergänge ablehnen, die UI unvollständige oder laufende Zustände ehrlich zeigen, und die Prozessintegration muss die Quelle des Workflow-Status bleiben.",
          ],
        },
        result: {
          title: "Das qualitative Ergebnis",
          paragraphs: [
            "Der Anwendungsausschnitt deckt Sitzungsverwaltung, Paketverarbeitung und Workflow-Steuerung von der Oberfläche bis zum Camunda-Prozess ab.",
            "Mitarbeitende haben einen Ort, an dem sie die Arbeit verstehen und voranbringen können. Die grössere Plattform erhält eine gekapselte Funktion statt verteilter Archivierungslogik.",
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
        readMinutes: "10",
        facts: [
          ["Disziplin", "Enterprise Product Engineering"],
          ["Umfang", "Datenbank, Backend, Frontend und Integrationen"],
          ["Lieferzeit", "Etwa neunzehn Monate"],
          ["Grenze", "Anonymisierte berufliche Fallstudie"],
        ],
        starting: {
          title: "Der Ausgangspunkt",
          paragraphs: [
            "Der operative Monolith nutzte SQL Server, C#/.NET Framework 4.8, Entity Framework, KnockoutJS, JavaScript, jQuery, Bootstrap und Crystal Reports. Änderungen mussten den täglichen Betrieb schützen.",
            "Der Umfang reichte von Features, Fehlern, Stored Procedures, Views und Reports über zwei externe Kuriereinbindungen bis zu Anforderungen, Schulung, Support und einer .NET-Core-Modernisierung für mehrformatigen Wareneingang.",
          ],
        },
        constraints: {
          title: "Was die Arbeit respektieren musste",
          intro: "Ein operatives ERP lässt wenig Raum für unbedachte Änderungen:",
          items: [
            "Bestehende Abläufe mussten die tägliche Retail-Arbeit weiter tragen.",
            "Datenbank, Backend und Frontend mussten bei Vertragsänderungen zusammenpassen.",
            "Zwei externe Kuriereinbindungen mussten an der Systemgrenze verständlich bleiben.",
            "Performance-Arbeit musste dem realen Anwendungspfad folgen, nicht nur einem isolierten Symptom.",
          ],
        },
        diagnosis: {
          title: "Die Diagnose",
          paragraphs: [
            "In einem mehrschichtigen ERP ist die sichtbare Verzögerung oder Störung oft nur das letzte Glied. Eine Ansicht kann wegen ihrer Anfrageform, Backend-Arbeit oder eines Datenbankzugriffs langsam sein. Ein Integrationsfehler kann als Frontend-Inkonsistenz erscheinen.",
            "Ich arbeitete durch drei Anwendungsschichten: SQL-Server-Abfragen und Stored Procedures, .NET-Framework-Regeln, KnockoutJS-Ansichten, Reports und Kurieraustausch.",
          ],
        },
        architecture: {
          title: "Die nützliche Systemsicht",
          intro:
            "Die sinnvolle Einheit war der Ende-zu-Ende-Pfad: KnockoutJS-Aktion, Regeln in .NET Framework 4.8, SQL-Server-Datenarbeit, Crystal Reports und externe Übergaben.",
          labels: ["BENUTZER", "KNOCKOUTJS", ".NET FRAMEWORK 4.8", "SQL SERVER", "REPORTS + KURIERE"],
          caption: "Dem Betriebspfad durch drei Schichten und seine externen Grenzen folgen.",
        },
        decisions: {
          title: "Entscheidungen, die zählten",
          intro: "Die Arbeit setzte auf kontrollierte Weiterentwicklung statt auf eine dramatische Neuentwicklung.",
          items: [
            {
              title: "Den ganzen Anfrageweg verfolgen",
              body: "Performance- und Zuverlässigkeitsarbeit beginnt beim sichtbaren Verhalten und folgt ihm durch Backend und Datenbank.",
              tradeoff: "Das braucht mehr Untersuchung als ein Patch am ersten langsamen Bauteil, verschiebt dafür aber nicht nur den Engpass.",
            },
            {
              title: "Verträge bewusst ändern",
              body: "Wenn sich Daten oder Backend-Verhalten ändern, brauchen Frontend und Integrationen einen expliziten, kompatiblen Vertrag.",
              tradeoff: "Kompatibilitätsarbeit wirkt weniger spektakulär, schützt aber die bereits laufenden Geschäftsabläufe.",
            },
            {
              title: "In auslieferbaren Schritten verbessern",
              body: "Fokussierte Änderungen sind in einem geschäftskritischen System leichter verständlich und machen die Wirkung jeder Version sichtbarer.",
              tradeoff: "Schrittweise Lieferung verlangt Geduld und klare Grenzen. Dafür bleibt das Risiko erkennbar.",
            },
          ],
        },
        delivery: {
          title: "Delivery und Prüfung",
          paragraphs: [
            "Jede Änderung wurde in ihrer Schicht und im Betriebsablauf geprüft: Stored Procedures, Backend-Regeln, Kurierantworten, Reports und Frontend-Status mussten zusammenpassen.",
            "Diese Ende-zu-Ende-Prüfung zählt besonders bei täglichen Abläufen. Eine technisch korrekte Änderung ist nicht fertig, wenn sie Routinearbeit schwerer verständlich oder weniger verlässlich macht.",
          ],
        },
        result: {
          title: "Das qualitative Ergebnis",
          paragraphs: [
            "Performance, Integrationen und tägliche Zuverlässigkeit verbesserten sich gemeinsam, weil die Arbeit die Grenzen überquerte, an denen diese Themen zusammenkamen.",
            "Das System entwickelte sich weiter, ohne so zu tun, als liesse sich ein geschäftskritisches ERP in einem sauberen Schritt anhalten und ersetzen. Der praktische Weg war: verstehen, verbessern und dabei nützlich halten.",
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
      portfolio: "Ejupi Labs",
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
      footerLine: "Ingénierie logicielle, systèmes et produit depuis la Suisse.",
      rights: "Tous droits réservés.",
      notFoundTitle: "Cette page n’existe pas.",
      notFoundBody: "L’adresse a peut-être changé. L’index des études de cas est un bon point de départ.",
      notFoundAction: "Voir les études de cas",
    },
    index: {
      title: "Les décisions techniques, avec leur contexte.",
      description:
        "Neuf études de cas concrètes : trois systèmes professionnels anonymisés et six projets open source de Labs. Chacune explique les contraintes, les décisions, ce qui a été construit et les limites des preuves.",
      eyebrow: "Études de cas d’ingénierie / 01—09",
      introTitle: "Un travail qui mérite d’être expliqué",
      introBody:
        "Une liste de technologies dit peu de choses. L’archive sépare le travail professionnel des projets Labs, puis suit les décisions, la vérification et les limites de chaque système.",
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
      ctaTitle: "Votre système a besoin d’une direction plus claire ?",
      ctaBody: "Commençons par la partie difficile. Nous pouvons cadrer ensemble l’architecture, le plan de livraison et la première version utile.",
    },
    cases: {
      "ai-workflow-cloud-migration": {
        category: "Plateformes cloud",
        cardTitle: "Migration cloud d’une plateforme de workflow IA",
        title: "Installer une plateforme de workflow IA sur une base cloud reproductible",
        summary:
          "En environ un mois, j’ai transféré une plateforme documentaire et de workflows IA depuis un déploiement on-premise propre à chaque environnement vers Terraform, GKE et une livraison blue/red contrôlée.",
        readMinutes: "10",
        facts: [
          ["Discipline", "Ingénierie de plateforme cloud"],
          ["Périmètre", "Infrastructure, workloads et parcours de livraison"],
          ["Livraison", "Environ un mois"],
          ["Frontière", "Cas professionnel anonymisé"],
        ],
        starting: {
          title: "Le point de départ",
          paragraphs: [
            "La plateforme on-premise réunissait Vue, deux services Spring Boot, un worker Python Temporal, Temporal, Keycloak, PostgreSQL et MinIO pour l’extraction documentaire et des workflows assistés par l’IA.",
            "Parler uniquement de migration cloud aurait décrit la destination, pas le travail. Il fallait remplacer une infrastructure et des étapes ponctuelles par un modèle lisible, vérifiable et reproductible.",
          ],
        },
        constraints: {
          title: "Ce que la conception devait résoudre",
          intro: "Le nouveau modèle de plateforme devait rendre quatre éléments explicites :",
          items: [
            "Vue, Spring Boot, Python, Temporal et Keycloak devaient partager un modèle Kubernetes.",
            "PostgreSQL et MinIO devaient passer à Cloud SQL et Cloud Storage avec des responsabilités explicites.",
            "La démonstration et la production exigeaient des contrôles de risque différents.",
            "La production devait utiliser un slot inactif, un smoke test et un basculement manuel.",
          ],
        },
        diagnosis: {
          title: "Le diagnostic",
          paragraphs: [
            "La partie fragile n’était pas un service isolé. C’était le chemin entre le code source et un environnement en fonctionnement. Lorsque ce chemin varie selon l’environnement, chaque modification transporte des hypothèses cachées.",
            "J’ai fait de la reproductibilité l’exigence centrale. Les définitions d’infrastructure, les workloads du cluster et les valeurs d’environnement devaient avoir des responsabilités séparées, tout en suivant la même voie de livraison.",
          ],
        },
        architecture: {
          title: "Le modèle de plateforme obtenu",
          intro:
            "GitLab CI transmet le build de production à Cloud Build, publie les images dans Artifact Registry et déploie sur le slot GKE inactif. Readiness Kubernetes et smoke test précèdent le basculement manuel ; Cloud SQL et Cloud Storage remplacent PostgreSQL et MinIO autogérés.",
          labels: ["GITLAB CI", "CLOUD BUILD", "ARTIFACT REGISTRY", "GKE BLUE / RED", "CLOUD SQL + GCS"],
          caption: "Un build, une vérification sur le slot inactif, puis un basculement explicite.",
        },
        decisions: {
          title: "Les décisions importantes",
          intro: "La migration est devenue fiable grâce à des frontières assumées.",
          items: [
            {
              title: "Réutiliser les modules, varier les entrées",
              body: "Terraform réutilisable maintient une base cohérente. Les valeurs propres à chaque environnement restent des entrées visibles plutôt que des copies d’infrastructure.",
              tradeoff: "Cette approche impose des contrats de modules plus stricts. C’est précisément là que la rigueur est utile.",
            },
            {
              title: "Un modèle d’exécution commun",
              body: "GKE donne aux composants applicatifs une cible de déploiement cohérente et permet de raisonner ensemble sur leur configuration d’exécution.",
              tradeoff: "Un modèle de cluster partagé exige toujours une responsabilité claire pour les namespaces, la configuration et les déploiements.",
            },
            {
              title: "Choisir les services managés",
              body: "Les services managés Google Cloud retirent aux workloads certaines responsabilités de plateforme lorsque cette frontière est pertinente.",
              tradeoff: "Le gain opérationnel s’accompagne de choix propres au fournisseur, qui doivent rester visibles dans l’architecture.",
            },
          ],
        },
        delivery: {
          title: "Livraison et vérification",
          paragraphs: [
            "La démonstration reste distincte de la production. Cette dernière passe de GitLab CI à Cloud Build et Artifact Registry avant le slot GKE inactif.",
            "Readiness Kubernetes, alertes et signaux GCP sont complétés par un smoke test avant le basculement. Cela ne valide pas tous les parcours métier, mais rend le cutover contrôlable.",
          ],
        },
        result: {
          title: "Le résultat qualitatif",
          paragraphs: [
            "L’infrastructure et la livraison suivent désormais un chemin reproductible et traçable. La plateforme peut être abordée comme un système, pas comme une collection d’exceptions propres aux environnements.",
            "Le résultat le plus utile n’est pas seulement l’exécution sur Google Cloud. Le chemin vers un environnement fonctionnel est codifié, vérifiable et cohérent.",
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
        readMinutes: "9",
        facts: [
          ["Discipline", "Ingénierie produit et workflow"],
          ["Périmètre", "Service, microfrontend et frontière workflow"],
          ["Livraison", "Environ trois mois"],
          ["Frontière", "Cas professionnel anonymisé"],
        ],
        starting: {
          title: "Le point de départ",
          paragraphs: [
            "Le domaine couvrait sessions, types, codes d’organisation, stockage d’entrée et de sortie, paquets sources, paquets produits et cycle de vie du workflow.",
            "La fonctionnalité devait aussi vivre dans une plateforme d’entreprise plus large. Elle ne pouvait pas devenir un produit séparé avec ses propres règles. Il lui fallait une frontière ciblée, compatible avec le système environnant.",
          ],
        },
        constraints: {
          title: "Ce que la conception devait résoudre",
          intro: "La frontière utile se situait entre l’état du processus et l’action de l’opérateur :",
          items: [
            "La session, les paquets sources et les sorties devaient rester compréhensibles sur neuf étapes.",
            "Les actions de l’opérateur devaient correspondre clairement à des transitions valides.",
            "Les règles backend et l’état frontend ne pouvaient pas devenir deux interprétations différentes.",
            "Le microfrontend Single-SPA devait s’intégrer sans disperser sa logique dans la plateforme hôte.",
          ],
        },
        diagnosis: {
          title: "Le diagnostic",
          paragraphs: [
            "Camunda pouvait coordonner le processus, mais l’orchestration seule ne constituait pas l’expérience de l’opérateur. Il manquait une frontière applicative cohérente autour du workflow.",
            "J’ai séparé les responsabilités : le service Spring porte les règles applicatives et l’intégration du processus ; le microfrontend React présente l’état actuel et les actions qui en découlent.",
          ],
        },
        architecture: {
          title: "La tranche applicative obtenue",
          intro:
            "Le microfrontend offre une surface ciblée. Spring Boot traduit les actions en opérations Camunda et références de stockage compatibles S3, depuis la création de session jusqu’au suivi des sorties.",
          labels: ["OPÉRATEUR", "REACT SINGLE-SPA", "API SPRING BOOT", "CAMUNDA", "S3 ENTRÉE + SORTIE"],
          caption: "État applicatif, processus et stockage se rejoignent à une frontière explicite.",
        },
        decisions: {
          title: "Les décisions importantes",
          intro: "La conception reste utile parce que chaque responsabilité a une place nette.",
          items: [
            {
              title: "Placer le workflow derrière un service",
              body: "Le client React parle à une API Spring ciblée au lieu d’encoder les mécanismes du processus dans le navigateur.",
              tradeoff: "Le service ajoute une frontière à maintenir, mais empêche les détails du workflow d’envahir chaque écran.",
            },
            {
              title: "Montrer l’état avant l’action",
              body: "L’interface place la session, ses paquets et l’état du processus au centre, afin que l’opérateur comprenne la situation avant d’agir.",
              tradeoff: "L’UI doit représenter les états indisponibles ou en cours, pas seulement le parcours idéal.",
            },
            {
              title: "Garder un périmètre resserré",
              body: "Un microfrontend contient l’expérience d’archivage tout en l’intégrant à la plateforme d’entreprise.",
              tradeoff: "Cette indépendance dépend d’un contrat d’intégration rigoureux avec l’application hôte.",
            },
          ],
        },
        delivery: {
          title: "Livraison et vérification",
          paragraphs: [
            "La vérification suit les neuf étapes : créer la session, associer les paquets sources, démarrer le workflow, observer les transitions valides et suivre les paquets de sortie.",
            "Les cas d’échec importants se trouvent aux frontières. Le service doit refuser les transitions invalides, l’UI montrer honnêtement les états incomplets ou en attente, et l’intégration conserver le processus comme source de vérité.",
          ],
        },
        result: {
          title: "Le résultat qualitatif",
          paragraphs: [
            "La tranche obtenue couvre la gestion des sessions, le traitement des paquets et le contrôle du workflow, depuis l’interface jusqu’au processus Camunda.",
            "Les opérateurs disposent d’un endroit unique pour comprendre le travail et le faire avancer. La plateforme reçoit une fonctionnalité contenue, plutôt qu’une logique d’archivage dispersée.",
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
        readMinutes: "10",
        facts: [
          ["Discipline", "Ingénierie produit d’entreprise"],
          ["Périmètre", "Base de données, backend, frontend et intégrations"],
          ["Livraison", "Environ dix-neuf mois"],
          ["Frontière", "Cas professionnel anonymisé"],
        ],
        starting: {
          title: "Le point de départ",
          paragraphs: [
            "Le monolithe opérationnel utilisait SQL Server, C#/.NET Framework 4.8, Entity Framework, KnockoutJS, JavaScript, jQuery, Bootstrap et Crystal Reports. Chaque changement devait préserver le travail quotidien.",
            "Le périmètre couvrait fonctionnalités, bugs, procédures stockées, vues, reporting, deux intégrations transporteurs, exigences, formation, support et évolution d’un outil de réception vers .NET Core et l’ingestion multi-format.",
          ],
        },
        constraints: {
          title: "Ce que le travail devait respecter",
          intro: "Un ERP opérationnel laisse peu de place aux changements imprudents :",
          items: [
            "Les workflows existants devaient continuer à soutenir le travail retail quotidien.",
            "Base de données, backend et frontend devaient évoluer ensemble lorsque le contrat changeait.",
            "Deux intégrations externes avec des transporteurs devaient rester compréhensibles à la frontière du système.",
            "Le travail de performance devait suivre le parcours réel, pas un symptôme isolé.",
          ],
        },
        diagnosis: {
          title: "Le diagnostic",
          paragraphs: [
            "Dans un ERP en couches, le ralentissement ou l’échec visible n’est souvent que le dernier maillon. Un écran peut être lent à cause de la forme de sa requête, du traitement backend ou d’un accès aux données. Un problème d’intégration peut apparaître comme une incohérence frontend.",
            "J’ai suivi ce parcours sur trois couches : requêtes et procédures SQL Server, règles .NET Framework, écrans KnockoutJS, rapports et échanges avec les transporteurs.",
          ],
        },
        architecture: {
          title: "La vue utile du système",
          intro:
            "L’unité pertinente était le parcours complet : action KnockoutJS, règles .NET Framework 4.8, données SQL Server, rapports Crystal Reports et échanges externes.",
          labels: ["OPÉRATEUR", "KNOCKOUTJS", ".NET FRAMEWORK 4.8", "SQL SERVER", "RAPPORTS + TRANSPORT"],
          caption: "Suivre le parcours opérationnel sur trois couches et ses frontières externes.",
        },
        decisions: {
          title: "Les décisions importantes",
          intro: "Le travail a privilégié une évolution contrôlée plutôt qu’une réécriture spectaculaire.",
          items: [
            {
              title: "Suivre toute la requête",
              body: "Le travail sur la performance et la fiabilité part du comportement visible et le suit à travers le backend jusqu’à la base de données.",
              tradeoff: "Cela demande plus d’enquête qu’un correctif sur le premier composant lent, mais évite de simplement déplacer le goulot d’étranglement.",
            },
            {
              title: "Modifier les contrats avec soin",
              body: "Lorsque les données ou le comportement backend changent, le frontend et les intégrations ont besoin d’un contrat explicite et compatible.",
              tradeoff: "Le travail de compatibilité rend le changement moins spectaculaire, mais protège les opérations qui dépendent déjà du système.",
            },
            {
              title: "Améliorer par tranches livrables",
              body: "Des changements ciblés sont plus faciles à comprendre dans un système critique et rendent l’effet de chaque version plus clair.",
              tradeoff: "La livraison progressive exige de la patience et des frontières précises. Elle garde aussi le risque visible.",
            },
          ],
        },
        delivery: {
          title: "Livraison et vérification",
          paragraphs: [
            "Chaque changement était vérifié dans sa couche et dans le parcours opérationnel : procédures et vues, règles backend, réponses des transporteurs, rapports et état frontend devaient s’accorder.",
            "Cette vérification de bout en bout compte surtout sur les parcours quotidiens. Un changement techniquement correct n’est pas terminé s’il rend le travail courant moins compréhensible ou moins fiable.",
          ],
        },
        result: {
          title: "Le résultat qualitatif",
          paragraphs: [
            "Performances, intégrations et fiabilité quotidienne ont progressé ensemble parce que le travail a traversé les frontières où ces sujets se rejoignaient.",
            "Le système a continué d’évoluer sans prétendre qu’un ERP critique pouvait être arrêté et remplacé d’un seul geste. La voie pragmatique consistait à le comprendre, l’améliorer et le garder utile pendant tout le processus.",
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
