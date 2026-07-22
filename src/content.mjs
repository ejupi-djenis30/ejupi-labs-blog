export const site = {
  name: "Ejupi Labs",
  section: "Case Studies",
  url: "https://blog.ejupilabs.com",
  portfolioUrl: "https://ejupilabs.com",
  author: "Djenis Ejupi",
  published: "2026-07-22",
};

export const localeOrder = ["en", "it", "de", "fr"];

export const caseDefinitions = [
  {
    slug: "ai-workflow-cloud-migration",
    number: "01",
    diagram: "cloud",
    stack: ["GCP", "GKE", "Terraform", "Kubernetes", "GitLab CI/CD"],
  },
  {
    slug: "archival-workflow-management",
    number: "02",
    diagram: "workflow",
    stack: ["Java", "Spring Boot", "React", "Camunda"],
  },
  {
    slug: "retail-erp-evolution",
    number: "03",
    diagram: "erp",
    stack: ["C#", ".NET", "SQL Server", "JavaScript"],
  },
];

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
        "Three close accounts of systems I worked on: what was brittle, what I changed and what became easier to run. Company names stay private. The technical scope does not.",
      eyebrow: "Engineering case studies / 01—03",
      introTitle: "Work worth explaining",
      introBody:
        "A stack list tells you very little. These case studies focus on the decisions behind the code, the constraints around them and the result that could be supported in day-to-day use.",
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
          "A multi-component document-processing platform relied on environment-specific deployments. I moved its infrastructure and delivery model to reusable Terraform, GKE and managed Google Cloud services.",
        readMinutes: "8",
        facts: [
          ["Discipline", "Cloud platform engineering"],
          ["Scope", "Infrastructure and delivery model"],
          ["Platform", "Google Cloud"],
          ["Context", "Professional engineering work"],
        ],
        starting: {
          title: "The starting point",
          paragraphs: [
            "The platform was a set of connected components for document processing and AI-assisted workflows. Its environments did not share one dependable setup path. A deployment that worked in one place could still be difficult to reproduce in the next.",
            "Calling this a cloud migration would only describe the destination. The real job was to replace one-off infrastructure and delivery steps with a model that could be read, reviewed and repeated.",
          ],
        },
        constraints: {
          title: "What the design had to solve",
          intro: "The new platform model needed to make four things explicit:",
          items: [
            "Multiple application components had to follow the same delivery logic.",
            "Environment differences needed to be configuration, not undocumented setup work.",
            "Infrastructure changes had to be visible before they reached a live environment.",
            "Application workloads and managed cloud services needed a clear operational boundary.",
          ],
        },
        diagnosis: {
          title: "The diagnosis",
          paragraphs: [
            "The fragile part was not a single service. It was the path from source code to a running environment. When that path varies by environment, every change carries hidden assumptions.",
            "I treated reproducibility as the central requirement. Infrastructure definitions, cluster workloads and environment values needed separate responsibilities, while still moving through one delivery path.",
          ],
        },
        architecture: {
          title: "The resulting platform model",
          intro:
            "GitLab CI/CD provides the delivery path. Terraform defines the Google Cloud foundation, GKE provides the workload layer, and managed services handle platform concerns that do not belong inside the application containers.",
          labels: ["SOURCE", "CI / CD", "TERRAFORM", "GKE", "MANAGED SERVICES"],
          caption: "One versioned path from change to running platform.",
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
              title: "Give workloads one runtime model",
              body: "GKE gives the application components a consistent deployment target and makes their runtime configuration easier to reason about together.",
              tradeoff: "A shared cluster model still needs clear ownership for namespaces, configuration and rollout behaviour.",
            },
            {
              title: "Use managed services on purpose",
              body: "Managed Google Cloud services take platform responsibilities out of custom workloads where that boundary is useful.",
              tradeoff: "The gain in operability comes with provider-specific choices that need to remain explicit in the architecture.",
            },
          ],
        },
        delivery: {
          title: "Delivery and verification",
          paragraphs: [
            "The delivery model puts infrastructure and workload changes on an inspectable route through GitLab CI/CD. Terraform makes the intended cloud state reviewable; the GKE deployment model gives application components a common target.",
            "Verification follows the same boundary: first the infrastructure definition, then the platform resources, then the workloads that run on them. That sequence makes failures easier to locate than an environment-specific deployment script.",
          ],
        },
        result: {
          title: "The qualitative result",
          paragraphs: [
            "Infrastructure and delivery now follow one repeatable, auditable path. The platform can be discussed as a system rather than as a collection of environment exceptions.",
            "The most useful outcome is not that the system runs on Google Cloud. It is that the route to a running environment is encoded, reviewable and consistent.",
          ],
        },
        scope:
          "This case study covers the platform architecture and delivery work. The organisation, workload volumes, costs and commercial details are intentionally omitted.",
      },
      "archival-workflow-management": {
        category: "Workflow software",
        cardTitle: "Archival workflow management",
        title: "Giving operators one clear route through a complex archival workflow",
        summary:
          "I built a Spring service and React microfrontend around a Camunda process so operators could manage archival sessions, packages and workflow state in one focused slice.",
        readMinutes: "7",
        facts: [
          ["Discipline", "Workflow and product engineering"],
          ["Scope", "Service and microfrontend"],
          ["Process", "Camunda orchestration"],
          ["Context", "Professional engineering work"],
        ],
        starting: {
          title: "The starting point",
          paragraphs: [
            "Archival work was governed by a process, but operators still needed a practical way to manage the things moving through it: sessions, packages and changing workflow state.",
            "The feature also had to live inside a larger enterprise platform. It could not become a separate product with its own rules. It needed a focused boundary that fitted the surrounding system.",
          ],
        },
        constraints: {
          title: "What the design had to solve",
          intro: "The useful boundary sat between process state and operator action:",
          items: [
            "A session and its packages needed to stay understandable as the workflow advanced.",
            "Operator actions had to map cleanly to valid process transitions.",
            "Backend rules and frontend state could not drift into separate interpretations.",
            "The feature had to integrate with the host platform without spreading its logic across it.",
          ],
        },
        diagnosis: {
          title: "The diagnosis",
          paragraphs: [
            "Camunda could coordinate the process, but orchestration alone was not the operator experience. The missing layer was a coherent application boundary around the workflow.",
            "I separated the concerns: the Spring service owns the application-facing rules and process integration; the React microfrontend presents the current state and the actions that are valid from it.",
          ],
        },
        architecture: {
          title: "The resulting application slice",
          intro:
            "The microfrontend gives operators a focused surface. The Spring service translates application actions into workflow operations, while Camunda coordinates the process that moves sessions and packages forward.",
          labels: ["OPERATOR", "REACT UI", "SPRING SERVICE", "CAMUNDA", "SESSIONS + PACKAGES"],
          caption: "A clear boundary between user action, application rules and process state.",
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
            "The feature can be checked across the same route an operator uses: create or open a session, inspect its packages, perform an allowed action and confirm that the workflow state returns coherently to the interface.",
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
          "This case study describes the service, microfrontend and workflow boundary. The organisation, archival domain details and commercial context remain private.",
      },
      "retail-erp-evolution": {
        category: "Enterprise software",
        cardTitle: "Retail ERP maintenance and evolution",
        title: "Improving a retail ERP without stepping outside daily operations",
        summary:
          "I worked across SQL Server, .NET and the frontend of a business-critical retail ERP, improving performance, integrations and day-to-day reliability as one connected system.",
        readMinutes: "7",
        facts: [
          ["Discipline", "Enterprise product engineering"],
          ["Scope", "Database, backend and frontend"],
          ["System", "Business-critical retail ERP"],
          ["Context", "Professional engineering work"],
        ],
        starting: {
          title: "The starting point",
          paragraphs: [
            "The ERP supported daily retail operations. That made reliability a product requirement, not a maintenance footnote. Changes had to improve the system while preserving the work people already depended on.",
            "Performance, integrations and interface behaviour were connected. Treating one layer in isolation would only move a problem somewhere else in the request path.",
          ],
        },
        constraints: {
          title: "What the work had to respect",
          intro: "An operational ERP leaves little room for careless change:",
          items: [
            "Existing workflows had to keep serving day-to-day retail work.",
            "Database, backend and frontend behaviour needed to change together when the contract changed.",
            "Integrations had to remain understandable at the system boundary.",
            "Performance work had to address the real path through the application, not one isolated symptom.",
          ],
        },
        diagnosis: {
          title: "The diagnosis",
          paragraphs: [
            "In a layered ERP, the visible delay or failure is often only the last link in the chain. A screen can be slow because of its request shape, backend work or a database access pattern. An integration issue can surface as a frontend inconsistency.",
            "I worked through that full path. SQL Server, .NET services and the browser interface were treated as parts of one behaviour, with the integration boundary included in the same reasoning.",
          ],
        },
        architecture: {
          title: "The working system view",
          intro:
            "The useful unit of change was the end-to-end request: an operator action in the frontend, application rules in .NET, data work in SQL Server and any exchange at the integration boundary.",
          labels: ["OPERATOR", "FRONTEND", ".NET", "SQL SERVER", "INTEGRATIONS"],
          caption: "Follow the behaviour across layers instead of optimising a layer in isolation.",
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
            "Each change can be checked at the layer where it is made and again through the user-visible workflow it supports. Database behaviour, backend rules, integration responses and frontend state need to agree.",
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
          "This case study covers cross-layer engineering in a retail ERP. The organisation, users, commercial data and operational figures are intentionally omitted.",
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
        "Tre racconti ravvicinati di sistemi su cui ho lavorato: cosa non reggeva, cosa ho cambiato e cosa è diventato più semplice da gestire. I nomi delle aziende restano privati. Il lavoro tecnico no.",
      eyebrow: "Case study di engineering / 01—03",
      introTitle: "Lavoro che vale la pena spiegare",
      introBody:
        "Un elenco di tecnologie dice poco. Questi case study parlano delle decisioni dietro al codice, dei vincoli reali e del risultato da sostenere nell’uso quotidiano.",
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
          "Una piattaforma di elaborazione documentale composta da più componenti dipendeva da deploy specifici per ambiente. Ho trasferito infrastruttura e modello di delivery su Terraform riutilizzabile, GKE e servizi gestiti di Google Cloud.",
        readMinutes: "8",
        facts: [
          ["Disciplina", "Cloud platform engineering"],
          ["Perimetro", "Infrastruttura e modello di delivery"],
          ["Piattaforma", "Google Cloud"],
          ["Contesto", "Lavoro di engineering professionale"],
        ],
        starting: {
          title: "Il punto di partenza",
          paragraphs: [
            "La piattaforma riuniva più componenti per elaborare documenti e sostenere workflow assistiti dall’AI. Gli ambienti non condividevano un unico percorso di configurazione affidabile. Un deploy corretto in un ambiente poteva essere difficile da riprodurre nel successivo.",
            "Definirla soltanto una migrazione cloud avrebbe descritto la destinazione, non il lavoro. Il punto era sostituire infrastruttura e passaggi una tantum con un modello leggibile, verificabile e ripetibile.",
          ],
        },
        constraints: {
          title: "Cosa doveva risolvere il nuovo modello",
          intro: "Il disegno della piattaforma doveva rendere espliciti quattro aspetti:",
          items: [
            "Più componenti applicativi dovevano seguire la stessa logica di delivery.",
            "Le differenze tra ambienti dovevano diventare configurazione, non lavoro manuale non documentato.",
            "Le modifiche infrastrutturali dovevano essere visibili prima di arrivare su un ambiente attivo.",
            "Workload applicativi e servizi cloud gestiti avevano bisogno di un confine operativo chiaro.",
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
            "GitLab CI/CD fornisce il percorso di delivery. Terraform definisce la base Google Cloud, GKE ospita i workload e i servizi gestiti coprono le responsabilità di piattaforma che non appartengono ai container applicativi.",
          labels: ["CODICE", "CI / CD", "TERRAFORM", "GKE", "SERVIZI GESTITI"],
          caption: "Un solo percorso versionato dalla modifica alla piattaforma in esecuzione.",
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
            "Il modello mette modifiche infrastrutturali e workload su un percorso ispezionabile in GitLab CI/CD. Terraform rende verificabile lo stato cloud desiderato; il modello GKE offre ai componenti un obiettivo comune.",
            "La verifica segue lo stesso confine: prima la definizione infrastrutturale, poi le risorse di piattaforma, infine i workload. Questa sequenza rende più semplice localizzare un errore rispetto a uno script diverso per ogni ambiente.",
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
          "Il case study riguarda architettura di piattaforma e delivery. Organizzazione, volumi di lavoro, costi e dettagli commerciali non vengono riportati.",
      },
      "archival-workflow-management": {
        category: "Software di workflow",
        cardTitle: "Gestione di workflow archivistici",
        title: "Un percorso chiaro per gestire un workflow archivistico complesso",
        summary:
          "Ho costruito un servizio Spring e un microfrontend React attorno a un processo Camunda, così gli operatori potevano gestire sessioni, pacchetti e stato del workflow in un unico spazio mirato.",
        readMinutes: "7",
        facts: [
          ["Disciplina", "Workflow e product engineering"],
          ["Perimetro", "Servizio e microfrontend"],
          ["Processo", "Orchestrazione Camunda"],
          ["Contesto", "Lavoro di engineering professionale"],
        ],
        starting: {
          title: "Il punto di partenza",
          paragraphs: [
            "Il lavoro archivistico era governato da un processo, ma agli operatori serviva comunque un modo pratico per gestire ciò che vi passava: sessioni, pacchetti e stato del workflow.",
            "La funzionalità doveva vivere dentro una piattaforma enterprise più ampia. Non poteva diventare un prodotto separato con regole proprie. Serviva un confine mirato che rispettasse il sistema circostante.",
          ],
        },
        constraints: {
          title: "Cosa doveva risolvere il design",
          intro: "Il confine utile si trovava tra stato del processo e azione dell’operatore:",
          items: [
            "Una sessione e i suoi pacchetti dovevano restare comprensibili durante l’avanzamento.",
            "Le azioni dell’operatore dovevano corrispondere a transizioni valide.",
            "Regole backend e stato frontend non potevano divergere in interpretazioni diverse.",
            "La funzionalità doveva integrarsi senza disperdere la propria logica nella piattaforma host.",
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
            "Il microfrontend offre agli operatori una superficie mirata. Il servizio Spring traduce le azioni in operazioni di workflow, mentre Camunda coordina il processo che fa avanzare sessioni e pacchetti.",
          labels: ["OPERATORE", "UI REACT", "SERVIZIO SPRING", "CAMUNDA", "SESSIONI + PACCHETTI"],
          caption: "Un confine chiaro tra azione utente, regole applicative e stato del processo.",
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
            "La funzionalità si verifica lungo lo stesso percorso dell’operatore: creare o aprire una sessione, controllare i pacchetti, eseguire un’azione ammessa e confermare che lo stato torni coerente nell’interfaccia.",
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
          "Il case study descrive servizio, microfrontend e confine del workflow. Organizzazione, dettagli del dominio archivistico e contesto commerciale restano privati.",
      },
      "retail-erp-evolution": {
        category: "Software enterprise",
        cardTitle: "Manutenzione ed evoluzione di un ERP retail",
        title: "Migliorare un ERP retail senza interrompere le operazioni quotidiane",
        summary:
          "Ho lavorato su SQL Server, .NET e frontend di un ERP retail business-critical, migliorando performance, integrazioni e affidabilità quotidiana come parti dello stesso sistema.",
        readMinutes: "7",
        facts: [
          ["Disciplina", "Enterprise product engineering"],
          ["Perimetro", "Database, backend e frontend"],
          ["Sistema", "ERP retail business-critical"],
          ["Contesto", "Lavoro di engineering professionale"],
        ],
        starting: {
          title: "Il punto di partenza",
          paragraphs: [
            "L’ERP sosteneva le operazioni retail quotidiane. L’affidabilità era quindi un requisito di prodotto, non una nota di manutenzione. Ogni modifica doveva migliorare il sistema senza danneggiare il lavoro già in corso.",
            "Prestazioni, integrazioni e comportamento dell’interfaccia erano collegati. Intervenire su un solo livello avrebbe soltanto spostato il problema lungo il percorso della richiesta.",
          ],
        },
        constraints: {
          title: "Cosa doveva rispettare il lavoro",
          intro: "Un ERP operativo lascia poco spazio a modifiche avventate:",
          items: [
            "I flussi esistenti dovevano continuare a sostenere il lavoro retail quotidiano.",
            "Database, backend e frontend dovevano cambiare insieme quando cambiava il contratto.",
            "Le integrazioni dovevano restare comprensibili al confine del sistema.",
            "Il lavoro sulle prestazioni doveva seguire il percorso reale, non un sintomo isolato.",
          ],
        },
        diagnosis: {
          title: "La diagnosi",
          paragraphs: [
            "In un ERP a più livelli, il ritardo o l’errore visibile è spesso l’ultimo anello. Una schermata può essere lenta per la forma della richiesta, il lavoro backend o l’accesso al database. Un problema d’integrazione può apparire come incoerenza frontend.",
            "Ho lavorato sull’intero percorso. SQL Server, servizi .NET e interfaccia browser sono stati trattati come parti dello stesso comportamento, includendo anche il confine d’integrazione.",
          ],
        },
        architecture: {
          title: "La vista utile del sistema",
          intro:
            "L’unità utile di cambiamento era la richiesta end-to-end: un’azione dell’operatore nel frontend, le regole applicative in .NET, il lavoro dati in SQL Server e lo scambio al confine d’integrazione.",
          labels: ["OPERATORE", "FRONTEND", ".NET", "SQL SERVER", "INTEGRAZIONI"],
          caption: "Seguire il comportamento tra i livelli invece di ottimizzare un livello isolato.",
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
            "Ogni modifica può essere verificata nel livello in cui nasce e di nuovo nel flusso utente che sostiene. Comportamento del database, regole backend, risposte delle integrazioni e stato frontend devono concordare.",
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
          "Il case study riguarda engineering cross-layer in un ERP retail. Organizzazione, utenti, dati commerciali e valori operativi non vengono riportati.",
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
        "Drei genaue Berichte über Systeme, an denen ich gearbeitet habe: Was nicht stabil war, was ich geändert habe und was sich danach einfacher betreiben liess. Unternehmensnamen bleiben vertraulich. Der technische Umfang nicht.",
      eyebrow: "Engineering-Fallstudien / 01—03",
      introTitle: "Arbeit, die eine Erklärung verdient",
      introBody:
        "Eine Liste von Technologien sagt wenig aus. Diese Fallstudien zeigen die Entscheidungen hinter dem Code, die realen Einschränkungen und das Ergebnis im täglichen Betrieb.",
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
          "Eine mehrteilige Plattform zur Dokumentverarbeitung hing von umgebungsspezifischen Deployments ab. Ich überführte Infrastruktur und Delivery-Modell auf wiederverwendbares Terraform, GKE und verwaltete Google-Cloud-Dienste.",
        readMinutes: "8",
        facts: [
          ["Disziplin", "Cloud Platform Engineering"],
          ["Umfang", "Infrastruktur und Delivery-Modell"],
          ["Plattform", "Google Cloud"],
          ["Kontext", "Professionelle Engineering-Arbeit"],
        ],
        starting: {
          title: "Der Ausgangspunkt",
          paragraphs: [
            "Die Plattform bestand aus verbundenen Komponenten für Dokumentverarbeitung und AI-gestützte Workflows. Ihre Umgebungen teilten keinen einzigen verlässlichen Einrichtungsweg. Ein Deployment konnte an einem Ort funktionieren und am nächsten schwer reproduzierbar sein.",
            "Nur von einer Cloud-Migration zu sprechen, hätte das Ziel beschrieben, nicht die eigentliche Arbeit. Entscheidend war, einmalige Infrastruktur und Abläufe durch ein Modell zu ersetzen, das lesbar, prüfbar und wiederholbar ist.",
          ],
        },
        constraints: {
          title: "Was das Design lösen musste",
          intro: "Das neue Plattformmodell musste vier Dinge sichtbar machen:",
          items: [
            "Mehrere Anwendungskomponenten mussten derselben Delivery-Logik folgen.",
            "Unterschiede zwischen Umgebungen mussten Konfiguration sein, keine undokumentierte Handarbeit.",
            "Infrastrukturänderungen mussten vor einer aktiven Umgebung prüfbar sein.",
            "Anwendungs-Workloads und verwaltete Cloud-Dienste brauchten eine klare Betriebsgrenze.",
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
            "GitLab CI/CD bildet den Delivery-Weg. Terraform definiert das Google-Cloud-Fundament, GKE die Workload-Schicht, und verwaltete Dienste übernehmen Plattformaufgaben, die nicht in Anwendungscontainer gehören.",
          labels: ["QUELLCODE", "CI / CD", "TERRAFORM", "GKE", "MANAGED SERVICES"],
          caption: "Ein versionierter Weg von der Änderung bis zur laufenden Plattform.",
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
            "Das Delivery-Modell führt Infrastruktur- und Workload-Änderungen über einen prüfbaren Weg in GitLab CI/CD. Terraform macht den gewünschten Cloud-Zustand sichtbar; das GKE-Modell gibt den Komponenten ein gemeinsames Ziel.",
            "Die Prüfung folgt derselben Grenze: zuerst die Infrastrukturdefinition, dann die Plattformressourcen und schliesslich die darauf laufenden Workloads. Fehler lassen sich so leichter eingrenzen als mit einem eigenen Deployment-Skript pro Umgebung.",
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
          "Diese Fallstudie behandelt Plattformarchitektur und Delivery. Organisation, Workload-Mengen, Kosten und kommerzielle Details bleiben bewusst unerwähnt.",
      },
      "archival-workflow-management": {
        category: "Workflow-Software",
        cardTitle: "Verwaltung von Archivierungs-Workflows",
        title: "Ein klarer Arbeitsweg durch einen komplexen Archivierungsprozess",
        summary:
          "Ich baute einen Spring-Dienst und ein React-Microfrontend um einen Camunda-Prozess, damit Mitarbeitende Sitzungen, Pakete und Workflow-Status in einem fokussierten Bereich verwalten konnten.",
        readMinutes: "7",
        facts: [
          ["Disziplin", "Workflow- und Product Engineering"],
          ["Umfang", "Dienst und Microfrontend"],
          ["Prozess", "Camunda-Orchestrierung"],
          ["Kontext", "Professionelle Engineering-Arbeit"],
        ],
        starting: {
          title: "Der Ausgangspunkt",
          paragraphs: [
            "Die Archivierungsarbeit folgte einem Prozess. Trotzdem brauchten die Mitarbeitenden einen praktischen Weg, um die darin bewegten Dinge zu verwalten: Sitzungen, Pakete und den wechselnden Workflow-Status.",
            "Die Funktion musste in einer grösseren Enterprise-Plattform leben. Sie durfte kein separates Produkt mit eigenen Regeln werden, sondern brauchte eine fokussierte Grenze, die zum umgebenden System passte.",
          ],
        },
        constraints: {
          title: "Was das Design lösen musste",
          intro: "Die nützliche Grenze lag zwischen Prozessstatus und Benutzeraktion:",
          items: [
            "Eine Sitzung und ihre Pakete mussten während des Prozessfortschritts verständlich bleiben.",
            "Benutzeraktionen mussten sauber auf gültige Prozessübergänge abgebildet werden.",
            "Backend-Regeln und Frontend-Status durften nicht auseinanderlaufen.",
            "Die Funktion musste sich integrieren, ohne ihre Logik über die Host-Plattform zu verteilen.",
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
            "Das Microfrontend bietet eine fokussierte Oberfläche. Der Spring-Dienst übersetzt Anwendungsaktionen in Workflow-Operationen, während Camunda den Prozess für Sitzungen und Pakete koordiniert.",
          labels: ["BENUTZER", "REACT UI", "SPRING SERVICE", "CAMUNDA", "SITZUNGEN + PAKETE"],
          caption: "Eine klare Grenze zwischen Benutzeraktion, Anwendungsregeln und Prozessstatus.",
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
            "Die Funktion lässt sich entlang desselben Wegs prüfen, den ein Benutzer nimmt: Sitzung öffnen oder erstellen, Pakete ansehen, eine erlaubte Aktion ausführen und den konsistenten Workflow-Status in der Oberfläche bestätigen.",
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
          "Diese Fallstudie beschreibt Dienst, Microfrontend und Workflow-Grenze. Organisation, fachliche Archivdetails und kommerzieller Kontext bleiben privat.",
      },
      "retail-erp-evolution": {
        category: "Enterprise-Software",
        cardTitle: "Wartung und Weiterentwicklung eines Retail-ERP",
        title: "Ein Retail-ERP verbessern, ohne den täglichen Betrieb zu verlassen",
        summary:
          "Ich arbeitete über SQL Server, .NET und das Frontend eines geschäftskritischen Retail-ERP hinweg und verbesserte Performance, Integrationen und tägliche Zuverlässigkeit als zusammenhängendes System.",
        readMinutes: "7",
        facts: [
          ["Disziplin", "Enterprise Product Engineering"],
          ["Umfang", "Datenbank, Backend und Frontend"],
          ["System", "Geschäftskritisches Retail-ERP"],
          ["Kontext", "Professionelle Engineering-Arbeit"],
        ],
        starting: {
          title: "Der Ausgangspunkt",
          paragraphs: [
            "Das ERP unterstützte den täglichen Retail-Betrieb. Zuverlässigkeit war deshalb eine Produktanforderung, keine Randnotiz der Wartung. Änderungen mussten das System verbessern und zugleich bestehende Arbeit schützen.",
            "Performance, Integrationen und Oberflächenverhalten hingen zusammen. Nur eine Schicht zu behandeln hätte das Problem lediglich an eine andere Stelle im Anfrageweg verschoben.",
          ],
        },
        constraints: {
          title: "Was die Arbeit respektieren musste",
          intro: "Ein operatives ERP lässt wenig Raum für unbedachte Änderungen:",
          items: [
            "Bestehende Abläufe mussten die tägliche Retail-Arbeit weiter tragen.",
            "Datenbank, Backend und Frontend mussten bei Vertragsänderungen zusammenpassen.",
            "Integrationen mussten an der Systemgrenze verständlich bleiben.",
            "Performance-Arbeit musste dem realen Anwendungspfad folgen, nicht nur einem isolierten Symptom.",
          ],
        },
        diagnosis: {
          title: "Die Diagnose",
          paragraphs: [
            "In einem mehrschichtigen ERP ist die sichtbare Verzögerung oder Störung oft nur das letzte Glied. Eine Ansicht kann wegen ihrer Anfrageform, Backend-Arbeit oder eines Datenbankzugriffs langsam sein. Ein Integrationsfehler kann als Frontend-Inkonsistenz erscheinen.",
            "Ich arbeitete durch diesen gesamten Pfad. SQL Server, .NET-Dienste und Browser-Oberfläche wurden als Teile desselben Verhaltens behandelt, einschliesslich der Integrationsgrenze.",
          ],
        },
        architecture: {
          title: "Die nützliche Systemsicht",
          intro:
            "Die sinnvolle Änderungseinheit war die Ende-zu-Ende-Anfrage: eine Benutzeraktion im Frontend, Anwendungsregeln in .NET, Datenarbeit in SQL Server und der Austausch an der Integrationsgrenze.",
          labels: ["BENUTZER", "FRONTEND", ".NET", "SQL SERVER", "INTEGRATIONEN"],
          caption: "Dem Verhalten durch alle Schichten folgen, statt eine Schicht isoliert zu optimieren.",
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
            "Jede Änderung lässt sich in ihrer eigenen Schicht und erneut im unterstützten Benutzerablauf prüfen. Datenbankverhalten, Backend-Regeln, Integrationsantworten und Frontend-Status müssen übereinstimmen.",
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
          "Diese Fallstudie behandelt schichtübergreifende Entwicklung in einem Retail-ERP. Organisation, Benutzer, kommerzielle Daten und Betriebskennzahlen bleiben bewusst unerwähnt.",
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
        "Trois récits précis de systèmes sur lesquels j’ai travaillé : ce qui était fragile, ce que j’ai changé et ce qui est devenu plus simple à exploiter. Les noms des entreprises restent confidentiels. Le périmètre technique, non.",
      eyebrow: "Études de cas d’ingénierie / 01—03",
      introTitle: "Un travail qui mérite d’être expliqué",
      introBody:
        "Une liste de technologies dit peu de choses. Ces études de cas présentent les décisions derrière le code, les contraintes réelles et le résultat à maintenir au quotidien.",
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
          "Une plateforme de traitement documentaire composée de plusieurs éléments dépendait de déploiements propres à chaque environnement. J’ai transféré son infrastructure et son modèle de livraison vers Terraform réutilisable, GKE et des services managés Google Cloud.",
        readMinutes: "8",
        facts: [
          ["Discipline", "Ingénierie de plateforme cloud"],
          ["Périmètre", "Infrastructure et modèle de livraison"],
          ["Plateforme", "Google Cloud"],
          ["Contexte", "Travail d’ingénierie professionnel"],
        ],
        starting: {
          title: "Le point de départ",
          paragraphs: [
            "La plateforme réunissait plusieurs composants pour le traitement documentaire et des workflows assistés par l’IA. Ses environnements ne partageaient pas une voie de configuration fiable. Un déploiement correct à un endroit pouvait rester difficile à reproduire ailleurs.",
            "Parler uniquement de migration cloud aurait décrit la destination, pas le travail. Il fallait remplacer une infrastructure et des étapes ponctuelles par un modèle lisible, vérifiable et reproductible.",
          ],
        },
        constraints: {
          title: "Ce que la conception devait résoudre",
          intro: "Le nouveau modèle de plateforme devait rendre quatre éléments explicites :",
          items: [
            "Plusieurs composants applicatifs devaient suivre la même logique de livraison.",
            "Les différences entre environnements devaient devenir de la configuration, pas du travail manuel non documenté.",
            "Les changements d’infrastructure devaient être visibles avant d’atteindre un environnement actif.",
            "Les workloads applicatifs et les services cloud managés avaient besoin d’une frontière opérationnelle claire.",
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
            "GitLab CI/CD fournit le chemin de livraison. Terraform définit la base Google Cloud, GKE porte la couche de workloads et les services managés prennent en charge les responsabilités de plateforme qui n’appartiennent pas aux conteneurs applicatifs.",
          labels: ["SOURCE", "CI / CD", "TERRAFORM", "GKE", "SERVICES MANAGÉS"],
          caption: "Un chemin versionné entre la modification et la plateforme en fonctionnement.",
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
            "Le modèle place les changements d’infrastructure et de workloads sur une voie inspectable dans GitLab CI/CD. Terraform rend l’état cloud attendu vérifiable ; le modèle GKE donne une cible commune aux composants.",
            "La vérification suit la même frontière : d’abord la définition d’infrastructure, puis les ressources de plateforme, enfin les workloads. Cette séquence facilite la localisation d’un échec par rapport à un script différent pour chaque environnement.",
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
          "Cette étude de cas couvre l’architecture de plateforme et la livraison. L’organisation, les volumes de travail, les coûts et les détails commerciaux sont volontairement omis.",
      },
      "archival-workflow-management": {
        category: "Logiciel de workflow",
        cardTitle: "Gestion d’un workflow d’archivage",
        title: "Offrir un parcours clair dans un workflow d’archivage complexe",
        summary:
          "J’ai construit un service Spring et un microfrontend React autour d’un processus Camunda afin que les opérateurs puissent gérer sessions, paquets et état du workflow dans un espace ciblé.",
        readMinutes: "7",
        facts: [
          ["Discipline", "Ingénierie produit et workflow"],
          ["Périmètre", "Service et microfrontend"],
          ["Processus", "Orchestration Camunda"],
          ["Contexte", "Travail d’ingénierie professionnel"],
        ],
        starting: {
          title: "Le point de départ",
          paragraphs: [
            "Le travail d’archivage suivait un processus, mais les opérateurs avaient toujours besoin d’un moyen pratique de gérer ce qui le traversait : les sessions, les paquets et l’état évolutif du workflow.",
            "La fonctionnalité devait aussi vivre dans une plateforme d’entreprise plus large. Elle ne pouvait pas devenir un produit séparé avec ses propres règles. Il lui fallait une frontière ciblée, compatible avec le système environnant.",
          ],
        },
        constraints: {
          title: "Ce que la conception devait résoudre",
          intro: "La frontière utile se situait entre l’état du processus et l’action de l’opérateur :",
          items: [
            "Une session et ses paquets devaient rester compréhensibles pendant l’avancement du workflow.",
            "Les actions de l’opérateur devaient correspondre clairement à des transitions valides.",
            "Les règles backend et l’état frontend ne pouvaient pas devenir deux interprétations différentes.",
            "La fonctionnalité devait s’intégrer sans disperser sa logique dans la plateforme hôte.",
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
            "Le microfrontend offre une surface ciblée aux opérateurs. Le service Spring traduit les actions en opérations de workflow, tandis que Camunda coordonne le processus qui fait avancer sessions et paquets.",
          labels: ["OPÉRATEUR", "UI REACT", "SERVICE SPRING", "CAMUNDA", "SESSIONS + PAQUETS"],
          caption: "Une frontière claire entre action utilisateur, règles applicatives et état du processus.",
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
            "La fonctionnalité se vérifie le long du même parcours que l’opérateur : créer ou ouvrir une session, examiner ses paquets, exécuter une action permise et confirmer que l’état revient de manière cohérente dans l’interface.",
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
          "Cette étude de cas décrit le service, le microfrontend et la frontière du workflow. L’organisation, les détails du domaine archivistique et le contexte commercial restent privés.",
      },
      "retail-erp-evolution": {
        category: "Logiciel d’entreprise",
        cardTitle: "Maintenance et évolution d’un ERP retail",
        title: "Améliorer un ERP retail sans interrompre les opérations quotidiennes",
        summary:
          "J’ai travaillé sur SQL Server, .NET et le frontend d’un ERP retail critique, en améliorant performances, intégrations et fiabilité quotidienne comme un seul système.",
        readMinutes: "7",
        facts: [
          ["Discipline", "Ingénierie produit d’entreprise"],
          ["Périmètre", "Base de données, backend et frontend"],
          ["Système", "ERP retail critique"],
          ["Contexte", "Travail d’ingénierie professionnel"],
        ],
        starting: {
          title: "Le point de départ",
          paragraphs: [
            "L’ERP soutenait les opérations retail quotidiennes. La fiabilité était donc une exigence produit, pas une note de maintenance. Chaque changement devait améliorer le système tout en préservant le travail existant.",
            "Les performances, les intégrations et le comportement de l’interface étaient liés. Traiter une couche isolément n’aurait fait que déplacer le problème ailleurs dans le parcours de la requête.",
          ],
        },
        constraints: {
          title: "Ce que le travail devait respecter",
          intro: "Un ERP opérationnel laisse peu de place aux changements imprudents :",
          items: [
            "Les workflows existants devaient continuer à soutenir le travail retail quotidien.",
            "Base de données, backend et frontend devaient évoluer ensemble lorsque le contrat changeait.",
            "Les intégrations devaient rester compréhensibles à la frontière du système.",
            "Le travail de performance devait suivre le parcours réel, pas un symptôme isolé.",
          ],
        },
        diagnosis: {
          title: "Le diagnostic",
          paragraphs: [
            "Dans un ERP en couches, le ralentissement ou l’échec visible n’est souvent que le dernier maillon. Un écran peut être lent à cause de la forme de sa requête, du traitement backend ou d’un accès aux données. Un problème d’intégration peut apparaître comme une incohérence frontend.",
            "J’ai travaillé sur ce parcours complet. SQL Server, les services .NET et l’interface web ont été traités comme les éléments d’un même comportement, y compris la frontière d’intégration.",
          ],
        },
        architecture: {
          title: "La vue utile du système",
          intro:
            "L’unité de changement pertinente était la requête de bout en bout : une action dans le frontend, les règles applicatives en .NET, le travail de données dans SQL Server et l’échange à la frontière d’intégration.",
          labels: ["OPÉRATEUR", "FRONTEND", ".NET", "SQL SERVER", "INTÉGRATIONS"],
          caption: "Suivre le comportement entre les couches plutôt que d’optimiser une couche isolée.",
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
            "Chaque changement peut être vérifié dans sa couche, puis dans le parcours utilisateur qu’il soutient. Le comportement de la base de données, les règles backend, les réponses d’intégration et l’état frontend doivent s’accorder.",
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
          "Cette étude de cas couvre l’ingénierie entre les couches d’un ERP retail. L’organisation, les utilisateurs, les données commerciales et les chiffres opérationnels sont volontairement omis.",
      },
    },
  },
};
