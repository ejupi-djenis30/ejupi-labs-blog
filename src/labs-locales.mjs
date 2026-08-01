import { labsCases } from "./labs-content.mjs";

const localize = (slug, copy) => {
  if (!labsCases[slug]) {
    throw new Error(`Unknown Labs case-study slug: ${slug}.`);
  }
  return copy;
};

export const labsLocales = {
  it: {
    "careeros-local": localize("careeros-local", {
      category: "Prodotto local-first",
      title: "Costruire uno spazio di lavoro privato per la carriera basato sui fatti, non su affermazioni generate",
      summary:
        "CareerOS Local trasforma un CV esistente in un archivio professionale privato e revisionato, poi usa un LLM locale obbligatorio per matching e coaching. Tauri, FastAPI e SQLite mantengono sul dispositivo fatti, bozze e accesso per gli agenti.",
      readMinutes: "14",
      facts: [
        ["Prodotto", "Utility desktop open source"],
        ["Ruolo", "Prodotto, architettura e implementazione"],
        ["Confine di fiducia", "Dispositivo locale per impostazione predefinita"],
        ["Stato", "v1.10.0 rilasciata dal commit 6fa804e dopo le verifiche native e Agent Access"],
      ],
      evidence: {
        title: "Registro delle evidenze",
        intro: "Il repository documenta questi controlli e limiti riproducibili:",
        items: [
          ["Backend", "La suite della release v1.10.0 ha superato 1.573 test backend; 4 sono stati saltati come previsto. La copertura complessiva ha raggiunto l’81,28%, rami inclusi."],
          ["Frontend + shell", "Passano 396 test frontend in 70 file. L’albero delle feature già integrato ha superato anche tutti i 17 test Rust, Clippy con il lockfile Cargo applicato e i controlli della supply chain."],
          ["Importazione dal CV", "Un nuovo vault può creare il profilo revisionato minimo prima di importare un CV. I fatti estratti restano da confermare e l’interfaccia porta direttamente alla revisione."],
          ["Dossier revisionati", "SQLite conserva una bozza di lavoro limitata per ogni candidatura. L’archivio v6 include le bozze e continua a ispezionare e ripristinare i formati dalla v1 alla v5."],
          ["Accesso agenti", "L’app desktop rilascia autorizzazioni con ambiti e revoca per sette operazioni in sola lettura esposte dalla CLI e dal server MCP. La release include entrambi i comandi in un wheel Python installabile, mostra il token bearer una volta sola e ne conserva soltanto il digest."],
        ],
      },
      starting: {
        title: "Il problema di prodotto",
        paragraphs: [
          "Le informazioni professionali tendono a disperdersi tra vecchi CV, portali di lavoro, appunti e sistemi di candidatura. Gli strumenti AI generici aggiungono un altro problema: una risposta ben scritta può perdere il legame con il fatto che la sostiene.",
          "Il primo avvio parte da dove si trovano già molte persone: un CV esistente. CareerOS crea prima il profilo revisionato minimo, importa il documento localmente entro limiti precisi e lascia ogni dato estratto in attesa di conferma. L’utente arriva alla revisione dei fatti, non a un account creato a metà o a un errore senza spiegazione.",
        ],
      },
      constraints: {
        title: "Ciò che il sistema deve proteggere",
        intro: "L’architettura segue quattro vincoli di prodotto:",
        items: [
          "I dati professionali privati, i documenti generati e le analisi restano sul dispositivo.",
          "Il matching e il coaching basati su LLM richiedono un runtime locale approvato; non esiste un fallback verso modelli cloud.",
          "I suggerimenti generati non possono sostituire silenziosamente i dati di origine o la loro cronologia.",
          "Backup, esportazione e cancellazione devono includere in modo coerente sia i dati strutturati sia gli artefatti locali.",
        ],
      },
      diagnosis: {
        title: "La scelta progettuale",
        paragraphs: [
          "La parte difficile non era aggiungere una chat. Era costruire un confine tra evidenze, stato deterministico dei flussi e interpretazione del modello. Questi tre elementi hanno modalità di errore diverse e non dovrebbero condividere una struttura dati vaga.",
          "Li ho separati in un archivio professionale, registri riproducibili di preparazione e candidatura e pipeline di analisi locale validate tramite schema. L’interfaccia può mostrare da dove proviene una conclusione e quale correzione appartiene al dato di origine.",
        ],
      },
      architecture: {
        title: "Un runtime locale supervisionato",
        intro:
          "Tauri gestisce l’app desktop e supervisiona un sidecar FastAPI su loopback. React offre lo spazio di lavoro, SQLite e gli artefatti locali conservano il registro persistente, mentre un runtime gestito compatibile con llama.cpp esegue l’analisi LLM obbligatoria senza diventare un livello di persistenza.",
        labels: ["TAURI + REACT", "FASTAPI", "ARCHIVIO SQLITE", "LLM LOCALE", "DOCUMENTI + OFFERTE"],
        caption: "Evidenze e stato dei flussi restano persistenti; l’inferenza locale riceve un contesto esplicito per ogni attività.",
      },
      technology: {
        title: "Perché queste tecnologie",
        intro: "Ogni componente mantiene il prodotto locale, verificabile e abbastanza semplice da distribuire.",
        items: [
          { choice: "Tauri per la shell desktop.", why: "È adatto a un’app locale che deve integrare finestre native, file e supervisione dei servizi senza incorporare un intero browser.", alternative: "Electron avrebbe ampliato peso e superficie del runtime; una soluzione solo browser non potrebbe governare con la stessa affidabilità sidecar e artefatti locali.", cost: "Accetto un confine Rust in più e un packaging specifico per ogni piattaforma." },
          { choice: "Un sidecar FastAPI per i servizi applicativi.", why: "Mantiene in Python i flussi di documenti e analisi, ma li espone alla shell tramite una API loopback stretta e verificabile.", alternative: "Riscrivere tutto in Rust avrebbe duplicato l’ecosistema Python; spostare la logica nel browser avrebbe indebolito il controllo sul dato locale.", cost: "Questo significa avviare, monitorare e versionare un secondo processo." },
          { choice: "SQLite come archivio versionato.", why: "Transazioni, migrazioni e un singolo file si adattano a uno spazio di lavoro personale posseduto localmente, non a un servizio condiviso ospitato.", alternative: "Un database server locale aggiungerebbe processo e credenziali da amministrare; un archivio cloud introdurrebbe rete e confine del fornitore. Nessuno dei due risponde a un requisito di servizio condiviso previsto dal progetto.", cost: "La contropartita è una concorrenza limitata, oltre alla responsabilità di progettare migrazioni e backup locali." },
          { choice: "Un runtime locale compatibile con llama.cpp.", why: "L’analisi resta entro il confine dichiarato del dispositivo e può essere vincolata a modelli e attività approvati.", alternative: "Una API LLM cloud trasferirebbe dati professionali fuori dal dispositivo e renderebbe privacy e comportamento dipendenti da un servizio remoto.", cost: "In cambio, la prima configurazione richiede tempo e l’esperienza dipende dall’hardware e dai modelli supportati." },
        ],
      },
      decisions: {
        title: "Le scelte che lo rendono uno strumento vero",
        intro: "Il lavoro utile avviene prima e dopo la chiamata al modello.",
        items: [
          {
            title: "Creare il registro prima di importare il CV",
            body: "Il primo avvio crea un profilo revisionato minimo e solo dopo esegue un’importazione locale con limiti definiti. I dati estratti restano candidati finché l’utente non li verifica, quindi il CV accelera la configurazione senza diventare una verità indiscutibile.",
            tradeoff: "L’onboarding richiede un passaggio esplicito di revisione, ma un’estrazione parziale o fallita non lascia il vault in uno stato ambiguo.",
          },
          {
            title: "Pubblicare esattamente la bozza revisionata",
            body: "Ogni candidatura possiede una bozza di lavoro revisionata in SQLite. I conflitti di autosalvataggio mantengono intatto il modulo visibile e la pubblicazione consuma soltanto la revisione salvata, nella stessa transazione che registra l’evento immutabile del dossier.",
            tradeoff: "Il percorso di scrittura deve gestire revisioni e conflitti, ma un autosalvataggio tardivo non può pubblicare contenuto diverso da quello controllato.",
          },
          {
            title: "Dare agli agenti un accesso separato e in sola lettura",
            body: "Agent Access chiede all’utente autenticato di scegliere gli ambiti e autenticarsi di nuovo prima di mostrare il token bearer una sola volta. Le autorizzazioni scadono e sono revocabili; la CLI installabile e il server MCP espongono su stdio un insieme chiuso di strumenti in sola lettura, non prompt liberi o API remote di scrittura.",
            tradeoff: "L’utente deve comunque configurare il client dell’agente e un client esterno può trasmettere i dati letti. Il contratto ristretto rende utile l’automazione senza condividere la sessione desktop.",
          },
        ],
      },
      delivery: {
        title: "Come viene verificato il prodotto",
        paragraphs: [
          "I controlli della release v1.10.0 hanno superato 1.573 test backend; 4 sono stati saltati come previsto. La copertura complessiva ha raggiunto l’81,28%, rami inclusi. Si aggiungono 396 test frontend superati in 70 file e tutti i 17 test Rust passati dall’albero di release. Le suite di migrazione e archivio coprono lo schema delle bozze, il formato v6 e il ripristino dalla v1 alla v5.",
          "CI protetta, CodeQL e controlli dei container sono verdi sul commit esatto della release. Una prova generale senza pubblicazione e il workflow del tag firmato hanno assemblato e verificato sei pacchetti nativi. Gli stessi byte del wheel Agent Access sono stati provati su Linux, macOS e Windows con Python 3.12 e Python 3.13 prima della pubblicazione.",
        ],
      },
      result: {
        title: "Cosa esiste oggi",
        paragraphs: [
          "La release v1.10.0 è una utility desktop funzionante con configurazione dal CV, Career Vault, ricerca guidata, Job Library revisionata, una timeline per opportunità, studio per il CV, bozze dossier persistenti, archivio v6 e analisi locale obbligatoria.",
          "L’app desktop autenticata ora gestisce le autorizzazioni per sette operazioni in sola lettura esposte tramite una CLI e un server MCP su stdio, entrambi inclusi nel wheel di release e autenticati con token bearer. Codex, Claude Code e script shell possono consultare una vista volutamente ridotta di un solo account autorizzato, ma non possono modificare il vault, invocare prompt liberi o aprire un trasporto remoto.",
          "Non sostiene che un LLM possa decidere una carriera. Il modello aiuta a interpretare un insieme di evidenze di proprietà dell’utente; l’utente conserva il registro, la fonte e la decisione finale.",
        ],
      },
      scope:
        "Questo case study descrive la release immutabile v1.10.0 al commit 6fa804e. Il tag firmato e i 25 artefatti pubblicati seguono una prova generale senza pubblicazione su sei piattaforme native e sei combinazioni sistema operativo/Python per Agent Access. Non afferma risultati occupazionali, accuratezza del modello su dati privati né supporto per ogni modello locale e ogni macchina.",
    }),
    "eliza-lab": localize("eliza-lab", {
      category: "Machine learning",
      title: "Trasformare un prototipo di chatbot rischioso in un esperimento ML open-set verificabile",
      summary:
        "ELIZA Lab è una pipeline di machine learning in Rust per addestrare, calibrare e analizzare localmente un classificatore di intenti. Sostituisce l’equivoco presupposto di un bot terapeutico con un esperimento riproducibile, non clinico e capace di astenersi.",
      readMinutes: "14",
      facts: [
        ["Prodotto", "Pipeline ML didattica e laboratorio nel browser"],
        ["Ruolo", "Protocollo ML, implementazione Rust e riprogettazione della sicurezza"],
        ["Dati", "Fixture sintetiche versionate"],
        ["Stato", "Release immutabile v1.6.0 con 20 artefatti attestati"],
      ],
      evidence: {
        title: "Registro delle evidenze",
        intro: "Gli artefatti verificati mostrano insieme il risultato di selezione, il test congelato e i casi deboli:",
        items: [
          ["Protocollo di selezione", "385 righe di training e sviluppo in 77 famiglie attraversano 11 fold esterni e 5 interni per gruppi, per un totale di 506 modelli addestrati."],
          ["Risultato di selezione", "L’accuracy out-of-fold è 62,597% e il macro-F1 62,640%; l’intervallo al 95% per famiglia dell’accuracy è 57,143–68,571%."],
          ["Test ID congelato", "Accuratezza dell’82,857% e macro-F1 dell’82,278% su 70 righe sintetiche in inglese."],
          ["Risultato open-set", "La policy congelata copre il 62,857% delle righe ID e l’11,11% delle righe OOD; l’AUROC OOD è 0,80278 e l’FPR al 95% di TPR è 0,7778."],
          ["Debolezza nota", "La fixture di contrasto da 28 righe raggiunge un’accuratezza per coppia del 42,86%; il progetto non nasconde questo limite."],
        ],
      },
      starting: {
        title: "Il problema dell’idea originale",
        paragraphs: [
          "Il repository era nato come bot Telegram “psicologo”. Conservava conversazioni sensibili e presentava risposte generate come qualcosa di più vicino all’assistenza di quanto il software potesse sostenere.",
          "Ho mantenuto la domanda ingegneristica utile, cioè come un piccolo classificatore testuale apprende e fallisce, ma ho rimosso account, trascrizioni, diagnosi e affermazioni terapeutiche. Il nuovo progetto rende visibili modello, suddivisione dei dati, policy di calibrazione e confine di sicurezza.",
        ],
      },
      constraints: {
        title: "Ciò che serve a un esperimento credibile",
        intro: "La riprogettazione doveva rendere più difficili da nascondere la contaminazione della valutazione e l’incertezza:",
        items: [
          "I prompt correlati devono restare raggruppati, così le parafrasi non possono passare tra le partizioni di training e test.",
          "Calibrazione, selezione della policy, test in-distribution e test out-of-distribution richiedono ruoli dati separati.",
          "Evidenze deboli devono produrre un’astensione, non un’etichetta forzatamente sicura.",
          "Le implementazioni browser e Rust devono verificare lo stesso artefatto versionato e lo stesso contratto di inferenza.",
        ],
      },
      diagnosis: {
        title: "Dall’accuratezza della demo a un protocollo",
        paragraphs: [
          "Un singolo punteggio train/test non avrebbe risposto alle domande importanti. Non avrebbe mostrato se famiglie di prompt simili attraversavano la divisione, se le soglie venivano tarate sui dati finali di test o cosa accade fuori dal dominio di training.",
          "Il protocollo v3 congela quindi partizioni consapevoli dei gruppi e separa fitting del modello, calibrazione delle probabilità, selezione della policy di astensione e valutazione finale. I tipi Rust impediscono ai set di test finali di entrare nelle API di selezione.",
        ],
      },
      architecture: {
        title: "La pipeline open-set",
        intro:
          "Una validazione TSV rigorosa alimenta una divisione deterministica consapevole dei gruppi. Un vocabolario TF-IDF costruito solo sul training e una regressione logistica multinomiale producono probabilità; il temperature scaling le calibra e una policy selezionata separatamente decide se il modello deve astenersi.",
        labels: ["DATI SINTETICI", "DIVISIONE PER GRUPPI", "TF-IDF + LOGREG", "CALIBRAZIONE", "ASTENSIONE + TRACCIA"],
        caption: "Training, calibrazione, selezione della policy e valutazione finale restano distinti.",
      },
      technology: {
        title: "Perché queste tecnologie",
        intro: "Lo stack privilegia un esperimento riproducibile e ispezionabile rispetto alla massima capacità apparente.",
        items: [
          { choice: "Rust per pipeline e CLI.", why: "Tipi, build bloccate e un binario portabile rendono espliciti i ruoli dei dati e riproducibili i percorsi di verifica.", alternative: "Un notebook o una pipeline solo Python favorirebbero l’esplorazione, ma lascerebbero più stato implicito e maggiore deriva dell’ambiente.", cost: "Accettiamo più lavoro di implementazione e un ecosistema ML meno ampio." },
          { choice: "TF-IDF con regressione logistica multinomiale.", why: "È proporzionata a un corpus sintetico piccolo e permette di ispezionare pesi, margini e calibrazione.", alternative: "Un transformer sarebbe più opaco, costoso e sovradimensionato rispetto alle evidenze disponibili.", cost: "Accettiamo una comprensione semantica e una copertura linguistica limitate." },
          { choice: "Un protocollo annidato consapevole dei gruppi.", why: "Tiene unite le famiglie di prompt e separa scelta del modello, calibrazione e test finale.", alternative: "Una divisione casuale lascerebbe filtrare parafrasi correlate e produrrebbe metriche ingannevolmente ottimistiche.", cost: "Accettiamo 506 addestramenti, più contabilità sperimentale e intervalli di incertezza visibili." },
          { choice: "Astensione calibrata.", why: "Un sistema open-set deve poter rifiutare evidenze deboli o fuori distribuzione invece di simulare certezza.", alternative: "Forzare sempre una classe produrrebbe una risposta anche quando nessuna etichetta è sostenuta dai dati.", cost: "Accettiamo copertura inferiore, selezione delle soglie più complessa e nessuna pretesa che l’astensione elimini il rischio." },
        ],
      },
      decisions: {
        title: "Le scelte che mantengono onesto il risultato",
        intro: "Il progetto considera il protocollo di valutazione parte integrante del software.",
        items: [
          {
            title: "Limitare le conclusioni ai dati sintetici",
            body: "Risultati, intervalli ed errori descrivono esclusivamente le fixture sintetiche versionate dell’esperimento. Non vengono estesi a conversazioni reali, contesti clinici o copertura linguistica generale.",
            tradeoff: "La conclusione è più stretta e meno spettacolare, ma resta proporzionata alle evidenze effettivamente osservate.",
          },
          {
            title: "Pubblicare l’intero percorso di selezione",
            body: "Bundle, piano delle partizioni, probabilità out-of-fold, assegnazioni dei fold e graduatoria dei candidati vengono congelati e collegati tramite SHA-256, così il risultato scelto può essere ricostruito.",
            tradeoff: "L’artefatto è più impegnativo da produrre e revisionare, ma impedisce che una sola metrica finale nasconda il percorso di selezione.",
          },
          {
            title: "Spiegare il margine reale",
            body: "Le predizioni espongono probabilità, confidenza, margine tra le prime due classi e contributi delle feature che ricostruiscono la differenza tra i logit vincenti.",
            tradeoff: "L’attribuzione delle feature spiega il calcolo di questo modello lineare; non spiega il significato o l’intento umano.",
          },
        ],
      },
      delivery: {
        title: "Controlli di riproduzione e rilascio",
        paragraphs: [
          "Modello, policy, metriche e piano delle partizioni vivono in un bundle collegato tramite SHA-256. La CLI può ricostruire il bundle, verificare ogni contratto ed eseguire inferenza batch limitata. Una precisione di reporting dichiarata mantiene il bundle v3 identico byte per byte tra i target di rilascio supportati.",
          "Il codice Rust e quello browser eseguono fixture di parità sullo stesso modello. Un report di selezione separato e vincolato tramite SHA-256 pubblica ogni probabilità out-of-fold, assegnazione ai fold e posizione dei candidati; il browser ricalcola le metriche e si blocca se cambiano byte o aggregati.",
        ],
      },
      result: {
        title: "Cosa dimostra il progetto",
        paragraphs: [
          "ELIZA Lab dimostra un flusso completo per un piccolo modello: selezione annidata per gruppi, calibrazione, scelta della policy open-set, test congelato, verifica degli artefatti e inferenza locale.",
          "Non è un terapeuta, un rilevatore di crisi o un modello linguistico di produzione. Il suo valore sta nella possibilità di ispezionare l’esperimento e riprodurre il risultato, invece di fidarsi di una demo opaca.",
        ],
      },
      scope:
        "Questo case study descrive la release immutabile v1.6.0 al commit cacd4448. Il tag firmato e i 20 artefatti attestati coprono Linux x64, Windows x64, macOS Intel e Apple Silicon. Il corpus sintetico non dimostra validità clinica, ampia copertura linguistica o idoneità alla produzione.",
    }),
    "dig-gopher-explorer": localize("dig-gopher-explorer", {
      category: "Strumenti per protocolli",
      title: "Trasformare Gopher in uno strumento locale controllato e ispezionabile",
      summary:
        "DIG 3.2.0 apre risorse Gopher reali dalla CLI, da un ambiente locale nel browser e da un’app Android autonoma. La PWA conserva offline un contenuto di prova verificato; il traffico live del browser passa sempre dal gateway sulla stessa origine.",
      readMinutes: "13",
      facts: [
        ["Prodotto", "CLI Gopher, explorer locale, PWA offline e app Android"],
        ["Protocollo", "Richieste, menu e testo RFC 1436; URL e ricerca RFC 4266"],
        ["Sicurezza", "Policy fail-closed sulle destinazioni con DNS pinning"],
        ["Stato", "Versione open source v3.2.0 con licenza MIT"],
      ],
      evidence: {
        title: "Registro delle evidenze",
        intro: "Le affermazioni sulla v3.2.0 sono legate a controlli eseguibili e limiti visibili:",
        items: [
          ["Verifica", "Il sorgente controllato supera 102 test Node.js e 15 flussi browser tra Chromium e WebKit mobile, con uno skip intenzionalmente specifico per piattaforma."],
          ["Android", "L’app Capacitor 8 supporta Android 7/API 24 e successivi, usa il target API 36 e apre connessioni TCP native senza caricare il sito hosted."],
          ["Policy di rete", "La modalità hosted richiede un token, rifiuta un hostname se anche una sola risposta DNS non è pubblica e si connette soltanto all’indirizzo già validato."],
          ["Integrità dell’output", "La CLI scrive in un file temporaneo nella stessa cartella e rende visibile il percorso finale con un’operazione atomica; i byte binari non vengono mai stampati in un terminale interattivo."],
          ["Confine offline", "La PWA memorizza shell statica e fixture verificata, mai le risposte API. Il ritorno online riprende soltanto una sessione gateway che era già live."],
        ],
      },
      starting: {
        title: "La distanza tra uno schema del protocollo e un client utile",
        paragraphs: [
          "L’interfaccia precedente poteva illustrare un menu Gopher, ma non provava le parti importanti: come un selector diventa byte su un socket, dove termina il framing del testo o cosa accade se un server remoto si blocca, dichiara un tipo errato o restituisce dati binari.",
          "La versione 3.2.0 mantiene il percorso Node.js limitato per CLI e gateway e aggiunge un trasporto Android nativo per l’uso mobile diretto. L’edizione browser è installabile e sicura offline, ma Pages resta su fixture perché JavaScript non può creare il socket TCP grezzo richiesto da Gopher.",
        ],
      },
      constraints: {
        title: "Regole che l’implementazione non può confondere",
        intro: "Il protocollo è semplice; il confine di fiducia non lo è:",
        items: [
          "Il parsing RFC 4266 deve conservare selector e query, mentre framing RFC 1436, terminatori del testo, dot-stuffing e tipi binari mantengono regole distinte sulla rete e nell’output.",
          "Ogni operazione di rete deve avere scadenza totale, timeout di inattività, limite della richiesta, limite della risposta e tetto alle voci di menu.",
          "Le richieste hosted devono bloccarsi su risposte DNS private, loopback o miste e devono connettersi all’indirizzo validato senza risolvere di nuovo il nome.",
          "Il testo non attendibile non deve controllare il terminale e le risposte binarie non possono essere decodificate o stampate come testo.",
        ],
      },
      diagnosis: {
        title: "Un gateway locale, non un proxy aperto",
        paragraphs: [
          "Mettere un proxy HTTP aperto a Internet dietro l’explorer renderebbe la pagina comoda e creerebbe contemporaneamente un servizio SSRF. DIG mantiene invece il gateway vicino all’utente, accetta chiamate API soltanto dalla propria origine browser e non concede accesso CORS ad altri siti.",
          "La modalità hosted è esplicita, non dedotta. Richiede un token, blocca le destinazioni private e vincola il risultato DNS validato alla connessione TCP. L’accesso locale a indirizzi privati esiste soltanto dietro un flag esplicito e un avviso visibile.",
        ],
      },
      architecture: {
        title: "Due trasporti limitati, quattro superfici oneste",
        intro:
          "CLI ed explorer locale condividono policy, TCP vincolato e parser Node.js. Android applica gli stessi limiti di destinazione pubblica e risposta nel trasporto nativo, poi passa byte tipizzati all’explorer incluso nell’APK. PWA e Pages restano sulla fixture offline se manca un gateway autenticato.",
        labels: ["URL + QUERY", "POLICY DESTINAZIONE", "TCP NODE / ANDROID", "PARSER RFC", "CLI + EXPLORER"],
        caption: "Ogni interfaccia dichiara se i byte arrivano da TCP diretto, gateway same-origin o fixture offline.",
      },
      technology: {
        title: "Perché queste tecnologie",
        intro: "Lo stack rende possibile Gopher nel browser senza trasformare il progetto in un proxy pubblico.",
        items: [
          { choice: "Un gateway TCP locale in Node.js.", why: "Il browser non può aprire socket Gopher grezzi; il gateway applica risoluzione, policy di destinazione, timeout e limiti di dimensione prima della connessione.", alternative: "Un proxy generico o remoto offrirebbe una superficie SSRF e di relay molto più ampia del protocollo necessario.", cost: "Accettiamo un processo Node locale e nessuna pretesa di supportare protocolli arbitrari." },
          { choice: "Endpoint live same-origin e limitati.", why: "L’explorer può usare il gateway sotto la stessa origine mantenendo richieste e risposte entro contratti stretti.", alternative: "Un proxy pubblico cross-origin potrebbe essere abusato per scansioni, accesso a reti private o traffico non previsto.", cost: "Accettiamo che il sito pubblico mostri solo fixture e che l’accesso live richieda l’installazione locale." },
          { choice: "Preservare i byte fino al confine di presentazione.", why: "Gopher trasporta testo, menu e dati binari; conservare i byte evita di alterare download o terminatori del protocollo.", alternative: "Decodificare tutto in anticipo imporrebbe un charset, potrebbe corrompere payload binari e confondere contenuto con trasporto.", cost: "Accettiamo buffer, metadati di tipo e limiti espliciti più laboriosi da gestire." },
          { choice: "Un trasporto Capacitor nativo su Android.", why: "L’explorer pacchettizzato apre connessioni TCP limitate e mantiene gli asset dell’interfaccia nell’APK, con una policy che non consente override verso reti private.", alternative: "Incorporare il sito hosted manterrebbe la dipendenza dal gateway; installare una PWA non concede al browser l’accesso ai socket grezzi.", cost: "Accettiamo un confine Kotlin, SDK e firma Android, oltre ai test di parità con la policy Node.js." },
        ],
      },
      decisions: {
        title: "Scelte che rendono visibile il confine",
        intro: "Ogni superficie dichiara con chiarezza cosa può raggiungere e cosa conserva.",
        items: [
          {
            title: "Risolvere una volta e connettersi a ciò che è stato verificato",
            body: "La policy hosted rifiuta l’intero hostname se una risposta DNS non è pubblica. Una risoluzione valida restituisce l’indirizzo esatto usato dal client TCP, chiudendo il consueto divario tra controllo e connessione.",
            tradeoff: "Il rifiuto delle risposte miste può bloccare configurazioni DNS insolite ma legittime; è più sicuro che indovinare quale risposta intendesse usare un attaccante.",
          },
          {
            title: "Dichiarare quando l’explorer è una dimostrazione",
            body: "La modalità pubblica segnala che naviga soltanto fixture incluse. L’accesso Gopher live appare come modalità distinta e richiede il gateway locale o un gateway hosted attivato esplicitamente.",
            tradeoff: "Pages non offre la comodità di aprire risorse reali, ma l’utente non confonde una demo statica con un client connesso.",
          },
          {
            title: "Rendere atomico il completamento dei download",
            body: "La CLI scrive nella cartella di destinazione su un file temporaneo, quindi espone il percorso finale soltanto dopo il completamento riuscito; errori o interruzioni non lasciano un download apparentemente valido.",
            tradeoff: "Servono spazio temporaneo e un passaggio finale di commit, ma gli strumenti a valle non osservano file parziali come risultati completi.",
          },
        ],
      },
      delivery: {
        title: "Come viene verificata la v3.2.0",
        paragraphs: [
          "I 102 test Node.js coprono parsing RFC, fixture TCP, policy di rete, contratto HTTP, output atomico, stato PWA, bundle Android e regole di rilascio. Quindici flussi Playwright verificano Chromium e WebKit mobile, compresi navigazione live e ripristino offline.",
          "La CI Android compila e analizza il progetto nativo, esegue i test unitari e verifica gli asset inclusi. Il gate controlla inoltre archivi deterministici, audit delle dipendenze, smoke test del container e contratto dell’APK firmato.",
        ],
      },
      result: {
        title: "Cosa funziona oggi",
        paragraphs: [
          "Dal terminale o dall’app Android si possono recuperare menu, testi, ricerche e tipi binari reali. L’explorer locale aggiunge cronologia, preferiti, ricerca, ispezione raw, export JSON e download tramite il gateway; la PWA installata mantiene la fixture disponibile offline.",
          "DIG non trasforma Gopher in HTTP. Il traffico verso un server Gopher resta in chiaro, Pages non recupera risorse live e Gopher+, TLS, sessioni Telnet e crawling ricorsivo rimangono fuori dal contratto supportato.",
        ],
      },
      scope:
        "Questo case study descrive la v3.2.0 verificata: framing RFC 1436, URL e ricerca RFC 4266, tipi binari comuni, trasporti TCP limitati in Node.js e Android, gateway same-origin e PWA offline su fixture. Il traffico Gopher resta non autenticato e non cifrato.",
    }),
    integradraw: localize("integradraw", {
      category: "Matematica computazionale",
      title: "Mantenere coerenti due strumenti di integrazione numerica con un unico corpus condiviso",
      summary:
        "IntegraDraw è un ambiente Java desktop e TypeScript Canvas per confrontare somme dei punti medi e trapezoidali con un riferimento Simpson. Entrambi i runtime condividono casi numerici versionati e tolleranze esplicite.",
      readMinutes: "11",
      facts: [
        ["Prodotto", "Ambiente visuale per il calcolo infinitesimale"],
        ["Ruolo", "Ricostruzione cross-runtime e release engineering"],
        ["Runtime", "Desktop Java 17 e web TypeScript"],
        ["Stato", "Applicazione web funzionante e JAR eseguibile"],
      ],
      evidence: {
        title: "Registro delle evidenze",
        intro: "Il contratto numerico è abbastanza piccolo da poter essere elencato:",
        items: [
          ["Corpus golden", "Sei casi di integrali, tre casi di espressioni non valide e sette casi di validazione nello schema versione 1."],
          ["Verifica", "22 dichiarazioni di test JUnit e 80 TypeScript nel rilascio sottoposto ad audit."],
          ["Riferimento", "Il confronto Simpson composito nel browser usa 8.192 sottointervalli."],
          ["Limite", "Il riferimento non è esatto; discontinuità ed espressioni non finite possono essere rifiutate e i limiti dei runtime differiscono intenzionalmente."],
        ],
      },
      starting: {
        title: "Il problema della coerenza",
        paragraphs: [
          "Uno strumento didattico numerico può sembrare convincente mentre due implementazioni divergono silenziosamente sul numero di intervalli, sull’area con segno o sulle funzioni non valide. IntegraDraw aveva una storia desktop in Java e necessitava di una versione browser moderna, senza trasformarsi in due calcolatori scollegati.",
          "La ricostruzione rende esplicito il contratto matematico: esattamente il numero di intervalli richiesto, risultati con segno, errore di approssimazione visibile e rifiuto chiaro degli input non finiti.",
        ],
      },
      constraints: {
        title: "Su cosa devono concordare i due runtime",
        intro: "L’interfaccia è utile soltanto se le regole numeriche restano stabili:",
        items: [
          "I metodi del punto medio e dei trapezi usano esattamente il numero di segmenti inserito dall’utente.",
          "L’area negativa resta negativa, invece di essere convertita silenziosamente in area geometrica.",
          "Il valore di confronto è indicato come riferimento Simpson, mai come risultato simbolico esatto.",
          "Il parser delle espressioni nel browser non deve usare eval o Function.",
        ],
      },
      diagnosis: {
        title: "Un contratto al di sopra dell’implementazione",
        paragraphs: [
          "Condividere codice sorgente tra Java e TypeScript creerebbe un ponte scomodo tra i runtime senza dimostrare molto. Condividere il comportamento atteso è il confine più utile.",
          "Ho introdotto un corpus golden versionato usato da JUnit e Vitest. Tolleranze e limiti specifici dei runtime restano espliciti, così una divergenza non può sparire dietro un generico helper di uguaglianza approssimata.",
        ],
      },
      architecture: {
        title: "Due interfacce, un unico riferimento numerico",
        intro:
          "L’applicazione Java racchiude un’interfaccia Swing e il core numerico in un JAR eseguibile. L’applicazione web usa un parser di espressioni senza dipendenze, routine di integrazione TypeScript e un grafico Canvas responsive. Entrambe si verificano sul corpus condiviso.",
        labels: ["FUNZIONE UTENTE", "PARSER SICURO", "CORE NUMERICO", "CORPUS GOLDEN", "UI JAVA + CANVAS"],
        caption: "Le implementazioni restano separate; il contratto numerico osservabile è condiviso.",
      },
      technology: {
        title: "Perché queste tecnologie",
        intro: "Le scelte mantengono autonome le due applicazioni e condividono soltanto ciò che deve davvero coincidere.",
        items: [
          { choice: "Implementazioni Java e TypeScript separate.", why: "Ogni interfaccia usa il proprio runtime naturale mentre un contratto esterno confronta lo stesso comportamento numerico.", alternative: "Un bridge tra linguaggi o la condivisione artificiale del sorgente aggiungerebbero accoppiamento senza dimostrare la parità osservabile.", cost: "Accettiamo di mantenere due implementazioni degli algoritmi." },
          { choice: "Un parser matematico limitato.", why: "Offre le espressioni necessarie all’ambiente mantenendo grammatica, funzioni e fallimenti controllabili.", alternative: "eval o Function eseguirebbero JavaScript arbitrario e renderebbero il confine di sicurezza non verificabile.", cost: "Accettiamo una lingua più piccola, funzioni enumerate ed errori espliciti per input non supportati." },
          { choice: "Canvas per il grafico web.", why: "Permette un tracciato responsive, leggero e senza dipendenze con controllo diretto di scala e pixel.", alternative: "Una libreria di grafici o un grande albero SVG introdurrebbero dipendenze e complessità DOM non necessarie per una sola curva.", cost: "Accettiamo di implementare assi, scaling, ridisegno e supporti di accessibilità attorno al Canvas." },
          { choice: "Un corpus golden condiviso.", why: "Casi e tolleranze versionati confrontano l’output reale dei due runtime indipendenti.", alternative: "Condividere codice non sarebbe naturale tra Java e TypeScript e potrebbe propagare lo stesso errore in entrambe le interfacce.", cost: "Accettiamo di curare casi, tolleranze e versioni; il corpus resta un test, non una prova formale." },
        ],
      },
      decisions: {
        title: "Le scelte che migliorano la chiarezza matematica",
        intro: "L’ambiente chiama l’approssimazione con il suo nome.",
        items: [
          {
            title: "Conservare il segno dell’integrale",
            body: "I metodi del punto medio e dei trapezi restituiscono area orientata: invertire i limiti o integrare una funzione negativa mantiene un risultato negativo invece di convertirlo in area geometrica.",
            tradeoff: "Il valore può sorprendere chi si aspetta sempre un’area positiva, ma rispetta il significato matematico dell’integrale definito.",
          },
          {
            title: "Dare al riferimento il nome corretto",
            body: "Il confronto web usa la regola composita di Simpson con 8.192 sottointervalli e lo definisce riferimento, non risultato esatto.",
            tradeoff: "Alcune funzioni discontinue o non finite vengono rifiutate; il progetto non è un sistema di dimostrazione simbolica.",
          },
          {
            title: "Rispettare esattamente la partizione richiesta",
            body: "Valore numerico e grafico usano il numero di segmenti inserito dall’utente. Nessun runtime aumenta, riduce o adatta silenziosamente la discretizzazione.",
            tradeoff: "Scelte molto grossolane producono approssimazioni visibilmente grossolane; il prodotto le mostra invece di correggerle di nascosto.",
          },
        ],
      },
      delivery: {
        title: "Distribuire entrambe le applicazioni",
        paragraphs: [
          "La CI compila Java 17, esegue JUnit, crea e sottopone a smoke test il JAR eseguibile, quindi verifica i tipi, testa e compila l’applicazione TypeScript. I candidati al rilascio includono anche il bundle web e gli SBOM di entrambi i runtime.",
          "La pubblicazione confronta build indipendenti, valida gli inventari delle dipendenze e controlla manifesti SHA-256 e attestazioni GitHub prima di rendere visibile un rilascio stabile.",
        ],
      },
      result: {
        title: "Cosa rende visibile l’ambiente",
        paragraphs: [
          "Gli utenti possono cambiare funzione, intervallo e numero di segmenti, quindi vedere come le stime del punto medio e dei trapezi si rapportano alla curva tracciata e al riferimento Simpson.",
          "Le applicazioni desktop e web restano utili autonomamente, mentre il corpus condiviso offre ai maintainer un solo punto in cui verificare il comportamento numerico promesso.",
        ],
      },
      scope:
        "IntegraDraw è uno strumento didattico esplorativo. Non offre integrazione simbolica, dimostrazioni, gestione garantita delle discontinuità né risultati esatti per funzioni arbitrarie.",
    }),
    "vector-placement-operations": localize("vector-placement-operations", {
      category: "Software gestionale scolastico",
      title: "Progettare un sistema per i tirocini che la scuola possa gestire in autonomia",
      summary:
        "VECTOR 3.3.0 è un sistema white-label per i tirocini che ogni scuola può eseguire sulla propria infrastruttura. Regole di programma versionate governano il completamento, la copertura di coorte evidenzia i vuoti di pianificazione e una coda per ruolo trasforma il lavoro scaduto in azioni concrete.",
      readMinutes: "14",
      facts: [
        ["Prodotto", "Gestione white-label dei tirocini in self-hosting"],
        ["Ruolo", "Prodotto, architettura e implementazione clean-room"],
        ["Distribuzione", "Una scuola per installazione"],
        ["Stato", "Versione open source 3.3.0 con licenza MIT"],
      ],
      evidence: {
        title: "Registro delle evidenze",
        intro: "Il repository della versione 3.3.0 lega le promesse del prodotto a controlli concreti:",
        items: [
          ["Policy di programma", "I coordinatori pubblicano versioni immutabili con ore obiettivo, numero minimo di check-in ed evidenze richieste. I tirocini esistenti mantengono la versione assegnata."],
          ["Copertura della coorte", "La vista per periodo distingue studenti coperti, senza tirocinio e con sovrapposizioni, offrendo la creazione precompilata di un tirocinio per chi è scoperto."],
          ["Coda operativa", "Evidenze scadute, ore da verificare, date dei tirocini e tutor mancanti rispettano ruolo e fuso orario della scuola, con paginazione stabile e riservata."],
          ["Sessioni", "Il server chiude le sessioni inattive e il bootstrap di produzione termina prima di aprire il listener finché il segreto amministratore monouso non viene rimosso."],
          ["Verifica", "Il sorgente controllato esegue 89 controlli Node.js, con uno skip specifico per piattaforma su Windows, e 22 flussi Playwright con verifiche dedicate a 320 px per workspace e presentazione. Build indipendenti su Ubuntu e Windows controllano la riproducibilità."],
        ],
      },
      starting: {
        title: "Il problema operativo",
        paragraphs: [
          "Gestire i tirocini non significa soltanto mostrare una dashboard. Una scuola deve coordinare coorti, studenti, aziende ospitanti, tutor, date, ore, check-in ed evidenze firmate. Ruoli diversi devono vedere parti diverse dello stesso record, e una correzione non deve cancellare ciò che è successo prima.",
          "La precedente implementazione accademica non poteva essere riutilizzata come base di prodotto. Ho ricostruito VECTOR da zero, prendendo come riferimento soltanto il dominio dei tirocini. Nel nuovo repository non sono entrati codice legacy, dati personali, nomi o risorse grafiche del progetto precedente.",
        ],
      },
      constraints: {
        title: "Cosa deve garantire un sistema gestito dalla scuola",
        intro: "L’architettura parte da quattro vincoli pratici:",
        items: [
          "Ogni installazione appartiene a una sola scuola, che controlla database, identità visiva, backup e distribuzione.",
          "Permessi e ambito dei tutor devono essere applicati dal server prima di selezionare, contare o esportare i record.",
          "Ogni tirocinio conserva la versione del programma che ne ha definito ore, check-in ed evidenze; le correzioni mantengono il record operativo originale.",
          "Import, export, retention e ripristino devono essere limitati, verificabili e ripetibili in sicurezza dopo un errore.",
        ],
      },
      diagnosis: {
        title: "Definire prima il confine di proprietà",
        paragraphs: [
          "Spostare più stato nel browser avrebbe comunque lasciato irrisolte le domande difficili. Avrebbe potuto nascondere i controlli di ruolo nell’interfaccia, caricare l’intera scuola in memoria e trattare un campo modificato come se il valore precedente non fosse mai esistito.",
          "VECTOR assegna ogni installazione a una scuola invece di costruire un servizio condiviso multi-tenant. La responsabilità operativa è chiara e backup, retention e personalizzazione white-label restano più semplici da controllare. Il progetto distribuisce software, non una piattaforma cloud gestita.",
        ],
      },
      architecture: {
        title: "Un server compatto con confini espliciti",
        intro:
          "L’ambiente web comunica con un’API Express che gestisce autenticazione, ruoli, versioni di programma e transizioni. SQLite conserva i record della scuola in WAL. I cursori AES-GCM legano copertura e attenzione a scuola, ruolo, filtri e posizioni stabili senza rivelarne il contenuto.",
        labels: ["AMBIENTE WEB", "POLICY LAYER EXPRESS", "VERSIONI PROGRAMMA", "SQLITE WAL", "AUDIT + RIPRISTINO"],
        caption: "Il server decide cosa un operatore può vedere e modificare; il browser presenta quella decisione.",
      },
      technology: {
        title: "Perché queste tecnologie",
        intro: "Lo stack è dimensionato per una scuola che possiede e gestisce la propria installazione.",
        items: [
          { choice: "Una sola scuola per installazione.", why: "Proprietà dei dati, ruoli, white label, backup e ripristino restano entro un confine istituzionale chiaro.", alternative: "Un SaaS multi-tenant richiederebbe isolamento tra clienti, billing, operazioni centrali e garanzie di conformità che non appartengono al prodotto.", cost: "Accettiamo che ogni scuola gestisca aggiornamenti, capacità e backup della propria istanza." },
          { choice: "Express come livello server.", why: "Autenticazione, ruoli, perimetro e transizioni vengono applicati prima che i dati raggiungano il browser.", alternative: "Un’app solo browser lascerebbe regole e dati sul client, che non può imporre autorizzazioni affidabili.", cost: "Accettiamo di distribuire e mantenere un servizio server esposto alla rete dell’istituto." },
          { choice: "SQLite in modalità WAL.", why: "Transazioni, portabilità e snapshot a file singolo sono proporzionati al carico di una singola scuola.", alternative: "PostgreSQL o un database cloud aggiungerebbero servizio, credenziali e amministrazione senza una scala multi-tenant dimostrata.", cost: "Accettiamo limiti di scrittura concorrente e nessuna alta disponibilità automatica." },
          { choice: "Docker con strumenti espliciti di backup e ripristino.", why: "L’istituto ottiene un’installazione riproducibile e un percorso di recupero verificabile sulla propria infrastruttura.", alternative: "Una piattaforma gestita semplificherebbe le operazioni, ma sposterebbe controllo e dipendenza verso un fornitore.", cost: "Accettiamo che l’operatore monitori storage, provi i ripristini e pianifichi gli aggiornamenti." },
        ],
      },
      decisions: {
        title: "Le scelte che rendono più sicuro il lavoro quotidiano",
        intro: "Il prodotto preferisce regole visibili a uno stato nascosto ma comodo.",
        items: [
          {
            title: "Versionare le regole, non soltanto il tirocinio",
            body: "Una versione di programma pubblicata è immutabile. Le nuove regole valgono per le nuove assegnazioni; un tirocinio esistente conserva ore obiettivo, check-in minimi ed evidenze con cui è iniziato.",
            tradeoff: "Una correzione richiede una nuova versione e i tirocini ancora intatti possono essere riassegnati solo in modo esplicito. Il completamento non cambia retroattivamente.",
          },
          {
            title: "Mostrare i vuoti prima che diventino eccezioni",
            body: "La copertura viene calcolata per coorte e periodo, distinguendo assegnazione valida, assenza e sovrapposizione. Da una riga scoperta si avvia un tirocinio precompilato senza perdere il contesto.",
            tradeoff: "È una vista operativa limitata, non un motore generico di report. Proprio per questo il risultato resta azionabile e corretto per ruolo.",
          },
          {
            title: "Derivare l’attenzione dai record già posseduti",
            body: "La coda deriva il lavoro dovuto da evidenze, ore, date e assegnazioni dei tutor invece di mantenere un secondo elenco. Il server applica il ruolo prima di conteggio e paginazione.",
            tradeoff: "La coda non conserva promemoria arbitrari: resta coerente con il record del tirocinio ed evita una seconda fonte di verità.",
          },
        ],
      },
      delivery: {
        title: "Self-hosting e ripristino",
        paragraphs: [
          "Ogni scuola può impostare nome, colori, logo e contatti di supporto, con revisioni che proteggono le modifiche simultanee. L’immagine Docker usa un utente non privilegiato e supporta un filesystem root in sola lettura. I comandi di health e doctor segnalano problemi di configurazione e storage prima dell’uso normale.",
          "Gli strumenti di backup creano uno snapshot SQLite privato, lo ispezionano senza avviare l’applicazione, lo ripristinano tramite manutenzione controllata e compattano i dati quando serve. La pipeline crea due volte il pacchetto sorgente, ne verifica inventario e commit, cerca segreti e prova installazione e accettazione dall’artefatto estratto.",
        ],
      },
      result: {
        title: "Cosa supporta VECTOR oggi",
        paragraphs: [
          "Una scuola può pubblicare regole di programma, controllare la copertura della coorte, creare tirocini dai vuoti di pianificazione e lavorare una coda di attenzione per ruolo. Lo stesso record conserva ore, check-in, storia delle evidenze, audit, import atomico, export filtrato e retention governata.",
          "VECTOR è software open source in self-hosting. Non è un SaaS gestito e non dichiara certificazioni di conformità, alta disponibilità o SSO. Per un’istituzione che ne abbia bisogno, questi aspetti restano lavoro di prodotto e di distribuzione.",
        ],
      },
      scope:
        "Questo case study descrive l’architettura rilasciata nella v3.3.0 al commit 0a99a9f e i controlli di self-hosting. GitHub Pages è un tour del prodotto; l’applicazione operativa parte dal pacchetto server. Non sono rappresentati dati scolastici reali, integrazioni istituzionali o risultati.",
    }),
    "jdoor-security-lab": localize("jdoor-security-lab", {
      category: "Assistenza remota sicura",
      title: "Trasformare un prototipo scolastico di controllo remoto in assistenza basata sul consenso",
      summary:
        "JDoor nasce nel 2022 come progetto scolastico di networking co-creato da Djenis e un collaboratore. In seguito Djenis ne ha ricostruito il modello di sicurezza, il ciclo di sessione, la UX, i test e il percorso di rilascio come JDoor Assist: uno strumento desktop visibile e view-only per impostazione predefinita, destinato al supporto autorizzato su reti locali fidate.",
      readMinutes: "12",
      facts: [
        ["Prodotto", "Assistenza remota LAN basata sul consenso"],
        ["Origine", "Progetto scolastico del 2022 co-creato da Djenis e un collaboratore"],
        ["Modernizzazione", "Sicurezza, UX di prodotto, test e release engineering di Djenis"],
        ["Stato", "Snapshot sorgente v1.0.0 versionato sotto GPL-3.0"],
      ],
      evidence: {
        title: "Registro delle evidenze",
        intro: "Il repository v1.0.0 rende verificabili questi controlli e limiti:",
        items: [
          [
            "Sicurezza della sessione",
            "L’host crea un certificato P-256 effimero, condivide il suo pin SHA-256 esatto insieme a un token casuale monouso da 128 bit e richiede un’approvazione locale visibile prima dell’ingresso del viewer.",
          ],
          [
            "Confine del protocollo",
            "Un protocollo binario versionato valida direzione, tipo, dimensioni, UTF-8 e grandezza dei payload. Entra un solo viewer alla volta, i frame sono limitati e l’input remoto viene ignorato finché l’host non abilita il controllo.",
          ],
          [
            "Gate di verifica",
            "Il gate Maven Wrapper esegue la suite JUnit, le soglie JaCoCo e i controlli Spotless, poi produce un JAR eseguibile con dipendenze e una SBOM CycloneDX. L’integrazione copre token non valido, avvio view-only, streaming, permessi e rilascio dell’input.",
          ],
          [
            "Limite",
            "JDoor Assist opera direttamente in LAN sul display primario. Non offre relay, account, attraversamento NAT, trasferimento file o accesso non presidiato; le app image community documentate non sono ancora firmate.",
          ],
        ],
      },
      starting: {
        title: "Conservare l’origine, cambiare il modello di fiducia",
        paragraphs: [
          "JDoor originale era un progetto scolastico del 2022 che Djenis ha realizzato con un collaboratore. Dimostrava networking Java, cattura dello schermo e input remoto. Questa origine condivisa resta nella storia del progetto: il lavoro successivo non presenta il prototipo scolastico come opera individuale.",
          "Una dimostrazione non è ancora un prodotto di assistenza. Il vecchio design trattava una connessione in ingresso come canale di controllo, senza pairing autenticato forte, stato view-only o ciclo completo per tasti bloccati, errori delle socket e arresto. La modernizzazione è quindi partita restringendo ciò che l’applicazione può fare.",
        ],
      },
      constraints: {
        title: "Regole per l’assistenza autorizzata",
        intro: "Il prodotto ricostruito segue quattro vincoli non negoziabili:",
        items: [
          "Ogni sessione serve esclusivamente a un supporto autorizzato e avviato da entrambe le persone: l’host resta visibile, approva localmente ogni viewer e non espone mai accesso non presidiato o in background.",
          "Il percorso di rete può essere osservato o modificato, quindi il viewer deve autenticare il certificato effimero esatto e presentare il token monouso a breve scadenza ricevuto fuori banda.",
          "Visione dello schermo e controllo remoto sono permessi distinti; il controllo parte disabilitato, l’host può revocarlo subito e revoca o disconnessione rilasciano tasti e pulsanti tracciati.",
          "L’input di protocollo non è fidato: messaggi, immagini, timeout, worker e cleanup richiedono limiti espliciti, regole direzionali e chiusura deterministica.",
        ],
      },
      diagnosis: {
        title: "Assistenza remota, non amministrazione remota",
        paragraphs: [
          "La scelta centrale non era nascondere o ampliare il vecchio percorso di controllo. Era sostituirlo con un confine di prodotto che rende il consenso visibile ed elimina dal design persistenza, esecuzione di shell e accesso non presidiato.",
          "Per la modernizzazione, Djenis ha separato identità TLS e pairing, protocollo framed, stato di sessione, cattura, policy di input, audit e presentazione Swing. Autenticazione, approvazione, visione e controllo diventano stati distinti, non effetti collaterali dell’apertura di una socket.",
        ],
      },
      architecture: {
        title: "Una sessione costruita attorno al consenso esplicito",
        intro:
          "L’interfaccia host crea un’identità effimera e un link monouso. Il viewer fissa quel certificato, presenta il token e attende l’approvazione locale. Solo dopo il canale limitato trasporta i frame; mouse e tastiera vengono applicati soltanto mentre la sessione host attiva possiede un permesso di controllo esplicito.",
        labels: ["UI HOST", "SESSIONE + CONSENSO", "TLS CON PIN", "PROTOCOLLO LIMITATO", "UI VIEWER"],
        caption: "I frame raggiungono un solo viewer approvato; l’input torna indietro soltanto durante il permesso visibile dell’host.",
      },
      technology: {
        title: "Perché queste tecnologie",
        intro: "Ogni scelta restringe JDoor all’assistenza temporanea e visibile prevista dal suo modello di fiducia.",
        items: [
          { choice: "Java e Swing per l’app desktop.", why: "Conservano il codebase e usano direttamente AWT per cattura, input e interfacce native su Java 21.", alternative: "Una riscrittura web o Electron non eliminerebbe il bisogno di privilegi desktop e allargherebbe la superficie del runtime.", cost: "Accettiamo distribuzione Java, permessi specifici del sistema operativo e un’interfaccia meno vicina alle convenzioni web." },
          { choice: "Connessione diretta su LAN fidata.", why: "È proporzionata a una sessione tra un host presente e un solo helper senza infrastruttura centrale.", alternative: "Relay e account abiliterebbero Internet e NAT traversal, ma introdurrebbero segreti centrali, abuso, identità e operazioni di servizio.", cost: "Accettiamo che i dispositivi debbano condividere una rete fidata o un percorso privato predisposto." },
          { choice: "TLS effimero con pin e token monouso.", why: "L’invito autentica l’endpoint esatto per quella sessione senza creare un’identità persistente o un database di account.", alternative: "Password e identità durature richiederebbero storage, recupero, rotazione e revoca oltre il perimetro del progetto.", cost: "Accettiamo lo scambio out-of-band del link, il confronto del codice e una nuova identità TLS a ogni avvio host." },
          { choice: "Un protocollo binario stretto e limitato.", why: "Trasporta soltanto frame, heartbeat, stato dei permessi e input autorizzato con tipi e dimensioni verificabili.", alternative: "Uno stack general-purpose come RDP o VNC offrirebbe interoperabilità. Per rispettare questo modello di fiducia, però, dovremmo limitarne o disattivarne funzioni più ampie come clipboard, trasferimento file e accesso non presidiato.", cost: "Accettiamo meno funzioni, nessuna compatibilità universale e la manutenzione diretta di codec e test." },
        ],
      },
      decisions: {
        title: "Le decisioni che hanno cambiato il prodotto",
        intro: "Ogni scelta rimuove un privilegio implicito del prototipo originale.",
        items: [
          {
            title: "Approvare una persona visibile",
            body: "Prima di entrare, il viewer resta in attesa mentre l’host vede nome dichiarato, indirizzo e codice di verifica e decide localmente se accettare quella persona.",
            tradeoff: "L’host deve essere presente e riconoscere il richiedente; l’ingresso non può diventare automatico o invisibile.",
          },
          {
            title: "Separare visione e controllo",
            body: "L’approvazione apre soltanto una sessione view-only. Il controllo di mouse e tastiera richiede un’autorizzazione successiva, esplicita e revocabile assegnata dall’host alla sessione corrente.",
            tradeoff: "L’helper non ottiene subito il controllo e l’host deve concederlo deliberatamente; è il costo di mantenere visibile il minimo privilegio.",
          },
          {
            title: "Azzerare deterministicamente lo stato dell’input",
            body: "Revoca, perdita del focus, disconnessione e arresto rilasciano i tasti e i pulsanti remoti tracciati, così uno stato incompleto non sopravvive alla sessione.",
            tradeoff: "Il ciclo di vita deve gestire più percorsi di cleanup e testare ogni uscita, ma evita input bloccati o ancora attivi dopo la perdita del permesso.",
          },
        ],
      },
      delivery: {
        title: "Dal codice scolastico a un rilascio verificabile",
        paragraphs: [
          "Il progetto Java 21 usa Maven Wrapper, test di integrazione JUnit, JaCoCo e Spotless. L’applicazione shaded viene provata attraverso la CLI, mentre il repository documenta architettura, privacy, ipotesi di minaccia, segnalazione di sicurezza e regole per i contributi.",
          "La CI verifica Linux e Windows, CodeQL esegue analisi statica pianificata e i job di rilascio creano app image jpackage per Windows, macOS e Linux con checksum, inventario CycloneDX e attestazioni di provenienza. Il progetto dichiara chiaramente che i pacchetti community non sono ancora firmati dalle piattaforme.",
        ],
      },
      result: {
        title: "Cos’è oggi JDoor Assist",
        paragraphs: [
          "JDoor Assist è un’applicazione desktop funzionante con flussi launcher, host e viewer; link monouso a scadenza; pin del certificato; approvazione locale; streaming view-only; permesso di controllo esplicito; cleanup dell’input; audit del ciclo di vita e comandi visibili di disconnessione.",
          "Il prototipo del 2022 resta attribuito come lavoro co-creato con un collaboratore. La modernizzazione successiva di sicurezza, prodotto, UX, test e rilascio è il contributo di Djenis, e il risultato resta limitato all’assistenza visibile tra persone autorizzate su una rete locale fidata.",
        ],
      },
      scope:
        "Questo case study descrive lo snapshot sorgente v1.0.0 verificato e il comportamento direct-LAN documentato. JDoor Assist è destinato soltanto a supporto autorizzato e visibile: non è un relay internet, uno strumento di amministrazione non presidiata né una certificazione di sicurezza indipendente. Non promette attraversamento NAT, cattura multi-display, firma delle piattaforme o protezione dopo la compromissione di uno dei due endpoint.",
    }),
  },
  de: {
    "careeros-local": localize("careeros-local", {
      category: "Local-first-Produkt",
      title: "Ein privater Karriere-Arbeitsbereich, der auf Belegen statt auf generierten Behauptungen beruht",
      summary: "CareerOS Local macht aus einem vorhandenen Lebenslauf einen privaten, revisionsgeführten Karrieredatensatz und nutzt danach verpflichtende lokale LLM-Analysen für Matching und Coaching. Tauri, FastAPI und SQLite halten Fakten, Entwürfe und Agentenzugriffe auf dem Gerät.",
      readMinutes: "14",
      facts: [["Produkt", "Open-Source-Desktop-Utility"], ["Rolle", "Produkt, Architektur und Implementierung"], ["Vertrauensgrenze", "Standardmäßig das lokale Gerät"], ["Status", "v1.10.0 aus Commit 6fa804e nach nativer und Agent-Access-Prüfung veröffentlicht"]],
      evidence: { title: "Evidenzprotokoll", intro: "Das aktuelle Repository dokumentiert diese reproduzierbaren Prüfungen und Grenzen:", items: [
        ["Backend", "In der Release-Suite für v1.10.0 bestanden 1.573 Backend-Tests; 4 wurden erwartungsgemäß übersprungen. Die Gesamtabdeckung betrug 81,28 %, Verzweigungen eingeschlossen."],
        ["Frontend + Shell", "Alle 396 Frontend-Tests in 70 Dateien bestehen. Der bereits integrierte Feature-Stand bestand außerdem alle 17 Rust-Tests, Clippy mit erzwungener Cargo-Lockdatei und seine Supply-Chain-Prüfungen."],
        ["Lebenslauf-Import", "Ein neuer Tresor kann vor dem Import den kleinsten revisionsgeführten Profildatensatz anlegen. Extrahierte Fakten bleiben unbestätigt und die Oberfläche führt direkt zur Prüfung."],
        ["Revisionsgeführte Dossiers", "SQLite hält pro Bewerbung genau einen begrenzten Arbeitsentwurf. Archiv v6 nimmt diese Entwürfe mit und kann die Formate v1 bis v5 weiterhin prüfen und wiederherstellen."],
        ["Agentenzugriff", "Die Desktop-App erteilt begrenzte, widerrufbare Berechtigungen für sieben schreibgeschützte Operationen über CLI und MCP-Server. Das Release liefert beide Befehle als installierbares Python-Wheel, zeigt das Bearer-Token einmal und speichert nur dessen Digest."],
      ]},
      starting: { title: "Das Produktproblem", paragraphs: [
        "Karriereinformationen verteilen sich häufig auf alte Lebensläufe, Jobportale, Notizen und Bewerbungsplattformen. Allgemeine AI-Werkzeuge schaffen ein weiteres Problem: Eine überzeugend formulierte Antwort kann den Bezug zu dem Fakt verlieren, der sie stützt.",
        "Der erste Start setzt dort an, wo viele Menschen bereits stehen: bei einem vorhandenen Lebenslauf. CareerOS legt zuerst den kleinsten gültigen und revisionsgeführten Profildatensatz an, importiert das Dokument lokal innerhalb fester Grenzen und lässt jeden extrahierten Eintrag unbestätigt. Danach landet der Benutzer direkt in der Faktenprüfung, nicht in einem halbfertigen Konto oder bei einem unerklärten Fehler.",
      ]},
      constraints: { title: "Was das System schützen muss", intro: "Die Architektur folgt vier Produktvorgaben:", items: [
        "Private Karrieredaten, generierte Dokumente und Analysen bleiben auf dem Gerät.",
        "LLM-gestütztes Matching und Coaching erfordern eine freigegebene lokale Laufzeit; es gibt keinen Rückfall auf ein Cloud-Modell.",
        "Generierte Vorschläge dürfen Quelldaten oder deren Revisionsverlauf nicht stillschweigend ersetzen.",
        "Backups, Exporte und Löschung müssen strukturierte Datensätze und lokale Artefakte gemeinsam und konsistent erfassen.",
      ]},
      diagnosis: { title: "Die Designentscheidung", paragraphs: [
        "Die schwierige Aufgabe war nicht, ein Chatfenster hinzuzufügen. Sie bestand darin, Belege, deterministischen Workflow-Zustand und Modellinterpretation sauber zu trennen. Diese drei Bereiche haben unterschiedliche Fehlerbilder und gehören nicht in eine unscharfe Datenstruktur.",
        "Ich habe sie in einen Karriere-Tresor, reproduzierbare Bereitschafts- und Bewerbungsdatensätze sowie schemageprüfte lokale Analyse-Pipelines getrennt. Die Oberfläche kann dadurch zeigen, woher eine Schlussfolgerung stammt und welche Korrektur in den Quelldatensatz gehört.",
      ]},
      architecture: { title: "Eine überwachte lokale Laufzeit", intro: "Tauri betreibt die Desktop-Shell und überwacht einen FastAPI-Sidecar auf der Loopback-Schnittstelle. React stellt den Arbeitsbereich bereit, SQLite und lokale Artefakte speichern den dauerhaften Datensatz, und eine verwaltete llama.cpp-kompatible Laufzeit führt die verpflichtende LLM-Analyse aus, ohne selbst zur Speicherschicht zu werden.", labels: ["TAURI + REACT", "FASTAPI", "SQLITE-TRESOR", "LOKALES LLM", "DOKUMENTE + STELLEN"], caption: "Belege und Workflow-Zustand bleiben dauerhaft gespeichert; die lokale Inferenz erhält einen ausdrücklich begrenzten Aufgabenkontext." },
      technology: {
        title: "Warum diese Technologien",
        intro: "Jede Komponente hält das Produkt lokal, prüfbar und mit vertretbarem Aufwand auslieferbar.",
        items: [
          { choice: "Tauri als Desktop-Shell.", why: "Es passt zu einer lokalen Anwendung, die native Fenster, Dateien und die Überwachung von Diensten integrieren muss, ohne einen vollständigen Browser mitzuliefern.", alternative: "Electron würde Gewicht und Laufzeitoberfläche vergrößern; eine reine Browser-Lösung könnte Sidecar und lokale Artefakte nicht ebenso zuverlässig steuern.", cost: "Dafür nehme ich eine zusätzliche Rust-Grenze und plattformspezifische Paketierung in Kauf." },
          { choice: "Ein FastAPI-Sidecar für die Anwendungsdienste.", why: "Dokument- und Analyseabläufe bleiben in Python, werden der Shell aber über eine enge, prüfbare Loopback-API bereitgestellt.", alternative: "Alles in Rust neu zu schreiben würde das Python-Ökosystem nachbauen; Logik im Browser würde die Kontrolle über lokale Daten schwächen.", cost: "Damit muss ich einen zweiten Prozess starten, überwachen und versionieren." },
          { choice: "SQLite als versionierter Datenspeicher.", why: "Transaktionen, Migrationen und eine einzelne Datei passen zu einem lokal verwalteten persönlichen Arbeitsbereich statt zu einem gemeinsam gehosteten Dienst.", alternative: "Ein lokaler Datenbankserver brächte einen zusätzlichen Administrationsprozess und Zugangsdaten mit sich; ein Cloud-Speicher eine Netzwerk- und Anbietergrenze. Für einen gemeinsam genutzten Dienst besteht im Projektumfang jedoch keine Anforderung, die eine der beiden Optionen lösen würde.", cost: "Die Kehrseite sind begrenzte Parallelität und die Verantwortung für lokale Migrationen und Sicherungen." },
          { choice: "Eine lokale, mit llama.cpp kompatible Laufzeit.", why: "Die Analyse bleibt innerhalb der erklärten Gerätegrenze und lässt sich auf freigegebene Modelle und Aufgaben beschränken.", alternative: "Eine Cloud-LLM-API würde Karrieredaten vom Gerät übertragen und Datenschutz sowie Verhalten von einem entfernten Dienst abhängig machen.", cost: "Das verlangt Ersteinrichtung, passende Hardware und Geduld bei lokaler Latenz; nicht jedes Modell wird unterstützt." },
        ],
      },
      decisions: { title: "Entscheidungen, die daraus ein echtes Werkzeug machen", intro: "Die nützliche Arbeit geschieht vor und nach dem Modellaufruf.", items: [
        { title: "Den Datensatz vor dem Lebenslauf-Import anlegen", body: "Der erste Start erzeugt einen minimalen revisionsgeführten Profildatensatz und führt erst danach einen begrenzten lokalen Import aus. Extrahierte Fakten bleiben Kandidaten, bis der Benutzer sie prüft. Der Lebenslauf beschleunigt damit die Einrichtung, ohne zur ungeprüften Wahrheit zu werden.", tradeoff: "Das Onboarding braucht einen ausdrücklichen Prüfschritt. Dafür hinterlässt eine fehlgeschlagene oder unvollständige Extraktion keinen mehrdeutigen Tresorzustand." },
        { title: "Genau den geprüften Dossierentwurf veröffentlichen", body: "Jede Bewerbung besitzt einen revisionsgeführten Arbeitsentwurf in SQLite. Autosave-Konflikte lassen das sichtbare Formular unverändert. Die Veröffentlichung verbraucht nur die exakt gespeicherte Revision, und zwar in derselben Transaktion wie das unveränderliche Dossierereignis.", tradeoff: "Der Schreibpfad muss Revisionen und Konflikte behandeln. Dafür kann ein verspätetes Autosave keinen anderen Inhalt als den geprüften veröffentlichen." },
        { title: "Agenten einen getrennten Lesezugang geben", body: "Agent Access lässt den angemeldeten Benutzer Geltungsbereiche wählen und verlangt vor der einmaligen Ausgabe eines Bearer-Tokens eine erneute Anmeldung. Berechtigungen laufen ab und sind widerrufbar. Die installierbare CLI und der MCP-Server stellen über stdio einen geschlossenen Satz schreibgeschützter Werkzeuge bereit, keine freien Prompts oder entfernte Schreib-API.", tradeoff: "Der Benutzer muss den Agent-Client weiterhin einrichten, und ein externer Client kann gelesene Daten übertragen. Der enge Vertrag ermöglicht nützliche Automatisierung, ohne die Desktop-Sitzung zu teilen." },
      ]},
      delivery: { title: "Wie das Produkt verifiziert wird", paragraphs: [
        "In den Release-Prüfungen für v1.10.0 bestanden 1.573 Backend-Tests; 4 wurden erwartungsgemäß übersprungen. Die Gesamtabdeckung betrug 81,28 %, Verzweigungen eingeschlossen. Hinzu kamen 396 bestandene Frontend-Tests in 70 Dateien und alle 17 Rust-Tests des Release-Stands. Migrations- und Archiv-Suites decken das Entwurfsschema, Archiv v6 und die Wiederherstellung der Formate v1 bis v5 ab.",
        "Protected-Branch-CI, CodeQL und Containerprüfungen sind am exakten Release-Commit grün. Ein Probelauf ohne Veröffentlichung und der Workflow des signierten Tags haben sechs native Pakete aufgebaut und geprüft. Dieselben Bytes des Agent-Access-Wheels wurden vor der Veröffentlichung unter Linux, macOS und Windows mit Python 3.12 und Python 3.13 getestet.",
      ]},
      result: { title: "Was heute vorhanden ist", paragraphs: [
        "Das Release v1.10.0 ist eine funktionsfähige Desktop-Utility mit Einrichtung aus dem Lebenslauf, Career Vault, geführter Suche, revisionsgeführter Job Library, einer Zeitleiste pro Opportunity, Lebenslauf-Studio, dauerhaften Dossierentwürfen, Archiv v6 und verpflichtender lokaler Analyse.",
        "Die authentifizierte Desktop-App verwaltet nun Berechtigungen für sieben schreibgeschützte Operationen, die eine per Bearer-Token authentifizierte CLI und ein MCP-Server über stdio bereitstellen. Beide Befehle sind im Release-Wheel enthalten. Codex, Claude Code und Shell-Skripte können eine bewusst kleine Ansicht eines autorisierten Kontos lesen, aber weder den Tresor ändern noch freie Prompts aufrufen oder einen entfernten Transport öffnen.",
        "Das Produkt behauptet nicht, ein LLM könne eine Karriere entscheiden. Das Modell hilft, einen eigenen Belegbestand auszuwerten; Datensatz, Quelle und letzte Entscheidung bleiben beim Benutzer.",
      ]},
      scope: "Diese Fallstudie beschreibt das unveränderliche Release v1.10.0 am Commit 6fa804e. Der signierte Tag und 25 veröffentlichte Artefakte folgen einem Probelauf ohne Veröffentlichung auf sechs nativen Zielplattformen und sechs Agent-Access-Kombinationen aus Betriebssystem und Python. Sie behauptet weder Beschäftigungsergebnisse noch Modellgenauigkeit auf privaten Benutzerdaten oder Unterstützung für jedes lokale Modell und jede Maschine.",
    }),
    "eliza-lab": localize("eliza-lab", {
      category: "Machine Learning",
      title: "Aus einem riskanten Chatbot-Prototyp wird ein prüfbares Open-Set-ML-Experiment",
      summary: "ELIZA Lab ist eine Rust-Pipeline zum lokalen Trainieren, Kalibrieren und Untersuchen eines Intent-Klassifikators. Sie ersetzt die irreführende Idee eines Therapie-Bots durch ein reproduzierbares, nicht klinisches Experiment, das sich enthalten kann.",
      readMinutes: "14",
      facts: [["Produkt", "Lernorientierte ML-Pipeline und Browser-Labor"], ["Rolle", "ML-Protokoll, Rust-Implementierung und Sicherheitsneugestaltung"], ["Daten", "Versionierte synthetische Fixtures"], ["Status", "Unveränderliches Release v1.6.0 mit 20 attestierten Artefakten"]],
      evidence: { title: "Evidenzprotokoll", intro: "Die geprüften Artefakte zeigen Auswahlresultat, eingefrorenen Test und Schwachstellen gemeinsam:", items: [
        ["Auswahlprotokoll", "385 Trainings- und Entwicklungszeilen in 77 Familien durchlaufen 11 äußere und 5 innere Gruppen-Folds; dabei werden 506 Modelle trainiert."],
        ["Auswahlergebnis", "Die Out-of-Fold-Accuracy beträgt 62,597% und der Macro-F1 62,640%; das familiengeclusterte 95%-Intervall der Accuracy reicht von 57,143 bis 68,571%."],
        ["Eingefrorener ID-Test", "82,857% Accuracy und 82,278% Macro-F1 auf 70 synthetischen englischen Zeilen."],
        ["Open-Set-Ergebnis", "Die eingefrorene Policy deckt 62,857% der ID- und 11,11% der OOD-Zeilen ab; die OOD AUROC beträgt 0,80278 und die FPR bei 95% TPR 0,7778."],
        ["Bekannte Schwäche", "Die Kontrast-Fixture mit 28 Zeilen erreicht 42,86% Paar-Accuracy; das Projekt verschweigt dieses Scheitern nicht."],
      ]},
      starting: { title: "Das Problem der ursprünglichen Idee", paragraphs: [
        "Das Repository begann als Telegram-„Psychologen“-Bot. Es speicherte sensible Gespräche und stellte generierte Antworten als etwas dar, das einer Betreuung näherkam, als es die Software rechtfertigen konnte.",
        "Eine nützliche technische Frage blieb: Wie lernt ein kleiner Textklassifikator, und wo scheitert er? Konten, Transkripte, Diagnosen und therapeutische Aussagen habe ich entfernt. Das neue Projekt macht Modell, Datenteilung, Kalibrierungsrichtlinie und Sicherheitsgrenze sichtbar.",
      ]},
      constraints: { title: "Was ein glaubwürdiges Experiment braucht", intro: "Die Neugestaltung musste Evaluationslecks und Unsicherheit schwerer zu verbergen machen:", items: [
        "Verwandte Prompts müssen gruppiert bleiben, damit Paraphrasen nicht zwischen Training und Test wechseln.",
        "Kalibrierung, Richtlinienwahl, In-Distribution-Test und Out-of-Distribution-Test benötigen getrennte Datenrollen.",
        "Schwache Evidenz muss zur Enthaltung führen statt zu einem erzwungen sicheren Label.",
        "Browser- und Rust-Implementierung müssen dasselbe versionierte Artefakt und denselben Inferenzvertrag prüfen.",
      ]},
      diagnosis: { title: "Von Demo-Accuracy zu einem Protokoll", paragraphs: [
        "Ein einzelner Train/Test-Wert beantwortet die wichtigen Fragen nicht. Er zeigt weder, ob ähnliche Prompt-Familien die Teilung überqueren, noch ob Schwellen am finalen Testdatensatz abgestimmt wurden oder was außerhalb des Trainingsbereichs geschieht.",
        "Das v3-Protokoll friert deshalb gruppenbewusste Partitionen ein und trennt Modell-Fitting, Wahrscheinlichkeitskalibrierung, Auswahl der Enthaltungsrichtlinie und finale Evaluation. Rust-Typen halten finale Testsätze aus den Auswahl-APIs heraus.",
      ]},
      architecture: { title: "Die Open-Set-Pipeline", intro: "Strikte TSV-Validierung speist eine deterministische, gruppenbewusste Teilung. Ein ausschließlich auf Trainingsdaten aufgebautes TF-IDF-Vokabular und multinomiale logistische Regression erzeugen Wahrscheinlichkeiten, Temperature Scaling kalibriert sie, und eine separat gewählte Richtlinie entscheidet über die Enthaltung.", labels: ["SYNTHETISCHE DATEN", "GRUPPIERTE TEILUNG", "TF-IDF + LOGREG", "KALIBRIERUNG", "ENTHALTUNG + TRACE"], caption: "Training, Kalibrierung, Richtlinienwahl und finale Evaluation bleiben getrennt." },
      technology: {
        title: "Warum diese Technologien",
        intro: "Der Stack stellt ein reproduzierbares, überprüfbares Experiment über die größtmögliche scheinbare Modellleistung.",
        items: [
          { choice: "Rust für Pipeline und CLI.", why: "Typen, festgeschriebene Builds und ein portables Binärprogramm machen Datenrollen ausdrücklich und Prüfpfade reproduzierbar.", alternative: "Ein Notebook oder eine reine Python-Pipeline wären explorativer, ließen aber mehr impliziten Zustand und stärkere Umgebungsdrift zu.", cost: "Wir nehmen höheren Implementierungsaufwand und ein kleineres ML-Ökosystem in Kauf." },
          { choice: "TF-IDF mit multinomialer logistischer Regression.", why: "Das Verfahren ist für einen kleinen synthetischen Korpus angemessen und macht Gewichte, Margins und Kalibrierung einsehbar.", alternative: "Ein Transformer wäre undurchsichtiger, teurer und für die vorhandene Evidenz überdimensioniert.", cost: "Wir nehmen begrenztes semantisches Verständnis und begrenzte Sprachabdeckung in Kauf." },
          { choice: "Ein gruppenbewusstes, verschachteltes Protokoll.", why: "Es hält Prompt-Familien zusammen und trennt Modellwahl, Kalibrierung und finalen Test.", alternative: "Eine Zufallsteilung ließe verwandte Paraphrasen durchsickern und erzeugte irreführend optimistische Kennzahlen.", cost: "Wir nehmen 506 Trainingsläufe, zusätzliche Versuchsbuchführung und sichtbare Unsicherheitsintervalle in Kauf." },
          { choice: "Kalibrierte Enthaltung.", why: "Ein Open-Set-System muss schwache oder verteilungsfremde Evidenz ablehnen können, statt Sicherheit vorzutäuschen.", alternative: "Eine erzwungene Klasse würde auch dann eine Antwort liefern, wenn die Daten keines der Labels stützen.", cost: "Wir nehmen geringere Abdeckung, anspruchsvollere Schwellenwahl und keine Behauptung in Kauf, Enthaltung beseitige das Risiko." },
        ],
      },
      decisions: { title: "Entscheidungen für ein ehrliches Ergebnis", intro: "Das Projekt behandelt das Evaluationsprotokoll als Teil der Software.", items: [
        { title: "Aussagen auf synthetische Daten begrenzen", body: "Ergebnisse, Intervalle und Fehler beschreiben ausschließlich die versionierten synthetischen Fixtures des Experiments. Sie werden nicht auf reale Gespräche, klinische Kontexte oder allgemeine Sprachabdeckung übertragen.", tradeoff: "Die Aussage ist enger und weniger spektakulär, bleibt aber der tatsächlich beobachteten Evidenz angemessen." },
        { title: "Den vollständigen Auswahlpfad veröffentlichen", body: "Bundle, Partitionsplan, Out-of-Fold-Wahrscheinlichkeiten, Fold-Zuordnungen und Kandidatenrangfolge werden eingefroren und per SHA-256 verknüpft, sodass sich das ausgewählte Ergebnis rekonstruieren lässt.", tradeoff: "Das Artefakt ist aufwendiger zu erzeugen und zu prüfen, verhindert aber, dass eine einzige finale Kennzahl den Auswahlpfad verbirgt." },
        { title: "Die tatsächliche Margin erklären", body: "Vorhersagen zeigen Wahrscheinlichkeiten, Konfidenz, Top-Two-Margin und Merkmalsbeiträge, die die Differenz der führenden Logits rekonstruieren.", tradeoff: "Die Merkmalsattribution erklärt die Berechnung dieses linearen Modells, nicht menschliche Bedeutung oder Absicht." },
      ]},
      delivery: { title: "Reproduktions- und Release-Prüfungen", paragraphs: [
        "Modell, Richtlinie, Metriken und Teilungsplan liegen in einem durch SHA-256 verknüpften Bundle. Die CLI kann es neu aufbauen, alle Verträge prüfen und begrenzte Batch-Inferenz ausführen. Eine festgelegte Berichtspräzision hält das v3-Bundle auf unterstützten Release-Zielen bytegleich.",
        "Rust- und Browser-Code führen Paritäts-Fixtures gegen dasselbe Modell aus. Ein separater, per SHA-256 gebundener Auswahlbericht veröffentlicht jede Out-of-Fold-Wahrscheinlichkeit, Fold-Zuordnung und Kandidatenrangfolge; der Browser berechnet die Metriken neu und schließt bei veränderten Bytes oder Aggregaten.",
      ]},
      result: { title: "Was das Projekt zeigt", paragraphs: [
        "ELIZA Lab zeigt einen vollständigen Ablauf für ein kleines Modell: verschachtelte gruppenbewusste Auswahl, Kalibrierung, Open-Set-Richtlinienwahl, eingefrorene Tests, Artefaktprüfung und lokale Inferenz.",
        "Es ist weder Therapeut noch Krisenerkennung oder produktives Sprachmodell. Sein Wert liegt darin, dass Lernende das Experiment prüfen und das Ergebnis reproduzieren können, statt einer Black-Box-Demo zu vertrauen.",
      ]},
      scope: "Diese Fallstudie beschreibt das unveränderliche Release v1.6.0 am Commit cacd4448. Der signierte Tag und 20 attestierte Artefakte decken Linux x64, Windows x64, macOS Intel und Apple Silicon ab. Der synthetische Korpus belegt weder klinische Validität noch breite Sprachabdeckung oder Produktionsreife.",
    }),
    "dig-gopher-explorer": localize("dig-gopher-explorer", {
      category: "Protokollwerkzeuge",
      title: "Gopher als klar begrenzte, prüfbare lokale Arbeitsumgebung",
      summary:
        "DIG 3.2.0 öffnet echte Gopher-Ressourcen über CLI, lokale Browser-Arbeitsumgebung und eigenständige Android-App. Die PWA hält ein geprüftes Fixture offline bereit; Live-Verkehr im Browser läuft weiterhin über das Same-Origin-Gateway.",
      readMinutes: "13",
      facts: [
        ["Produkt", "Gopher-CLI, lokaler Explorer, Offline-PWA und Android-App"],
        ["Protokoll", "RFC-1436-Anfragen, Menüs und Text; RFC-4266-URLs und Suche"],
        ["Sicherheit", "Fail-closed-Zielrichtlinie mit DNS-Pinning"],
        ["Status", "Open-Source-Version 3.2.0 unter der MIT-Lizenz"],
      ],
      evidence: {
        title: "Evidenzprotokoll",
        intro: "Die Aussagen zu Version 3.2.0 sind an ausführbare Prüfungen und sichtbare Grenzen gebunden:",
        items: [
          ["Verifikation", "Der geprüfte Quellstand besteht 102 Node.js-Tests und 15 Browserabläufe in Chromium und mobilem WebKit; ein Skip ist bewusst plattformspezifisch."],
          ["Android", "Die Capacitor-8-App unterstützt Android 7/API 24 und neuer, zielt auf API 36 und verwendet direkten nativen TCP-Transport statt die gehostete Site zu laden."],
          ["Netzrichtlinie", "Der Hosted-Modus verlangt ein Zugriffstoken, verwirft einen Hostnamen, sobald eine DNS-Antwort nicht öffentlich ist, und verbindet sich nur mit der bereits geprüften Adresse."],
          ["Ausgabeintegrität", "Die CLI schreibt über eine temporäre Datei im selben Verzeichnis und macht den Zielpfad atomar sichtbar; binäre Bytes gelangen nie in ein interaktives Terminal."],
          ["Offline-Grenze", "Die PWA speichert statische Shell und geprüftes Fixture, nie API-Antworten. Nach der Rückkehr ins Netz wird nur eine zuvor aktive Gateway-Sitzung fortgesetzt."],
        ],
      },
      starting: {
        title: "Der Abstand zwischen Protokollskizze und brauchbarem Client",
        paragraphs: [
          "Die frühere Oberfläche konnte ein Gopher-Menü veranschaulichen, belegte aber nicht die entscheidenden Teile: wie ein Selector als Bytes auf dem Socket landet, wo Text-Framing endet oder was geschieht, wenn ein Server hängt, einen falschen Typ meldet oder Binärdaten zurückgibt.",
          "Version 3.2.0 behält den begrenzten Node.js-Pfad für CLI und Gateway und ergänzt nativen Android-Transport für direkte mobile Nutzung. Die Browserausgabe ist installierbar und offline-sicher; Pages bleibt auf Fixtures beschränkt, weil Browser-JavaScript keine rohen TCP-Sockets öffnen kann.",
        ],
      },
      constraints: {
        title: "Regeln, die die Implementierung nicht verwischen darf",
        intro: "Das Protokoll ist einfach; die Vertrauensgrenze ist es nicht:",
        items: [
          "Die RFC-4266-Auswertung muss Selector und Suche erhalten, während RFC-1436-Framing, Textabschluss, Dot-Stuffing und Binärtypen getrennte Übertragungs- und Ausgaberegeln behalten.",
          "Jeder Netzwerkzugriff benötigt Gesamtfrist, Idle-Timeout, Anfragegrenze, Antwortgrenze und eine Obergrenze für Menüeinträge.",
          "Gehostete Abrufe müssen bei privaten, Loopback- oder gemischten DNS-Antworten geschlossen scheitern und sich ohne erneute Auflösung mit der geprüften Adresse verbinden.",
          "Nicht vertrauenswürdiger Text darf das Terminal nicht steuern, und Binärantworten dürfen weder dekodiert noch wie Text ausgegeben werden.",
        ],
      },
      diagnosis: {
        title: "Ein lokales Gateway, kein offener Proxy",
        paragraphs: [
          "Ein frei erreichbarer HTTP-Proxy hinter dem Explorer wäre bequem und gleichzeitig ein SSRF-Dienst. DIG hält das Gateway deshalb beim Benutzer, akzeptiert API-Aufrufe nur von seiner eigenen Browser-Origin und gewährt anderen Sites keinen CORS-Zugriff.",
          "Der Hosted-Modus wird ausdrücklich gewählt. Er verlangt ein Token, blockiert private Ziele und bindet das geprüfte DNS-Ergebnis an die TCP-Verbindung. Lokaler Zugriff auf private Adressen existiert nur hinter einem ausdrücklichen Flag und einer sichtbaren Warnung.",
        ],
      },
      architecture: {
        title: "Zwei begrenzte Transporte, vier ehrliche Oberflächen",
        intro:
          "CLI und lokaler Explorer teilen Node.js-Zielrichtlinie, gepinntes TCP und Parser. Android setzt dieselben öffentlichen Ziel- und Antwortgrenzen nativ um und reicht typisierte Bytes an den paketierten Explorer. PWA und Pages bleiben ohne authentifiziertes Gateway beim Offline-Fixture.",
        labels: ["URL + SUCHE", "ZIELRICHTLINIE", "NODE / ANDROID TCP", "RFC-PARSER", "CLI + EXPLORER"],
        caption: "Jede Oberfläche nennt, ob ihre Bytes aus direktem TCP, Same-Origin-Gateway oder Offline-Fixture stammen.",
      },
      technology: {
        title: "Warum diese Technologien",
        intro: "Der Stack bringt Gopher in den Browser, ohne das Projekt in einen öffentlichen Proxy zu verwandeln.",
        items: [
          { choice: "Ein lokales TCP-Gateway in Node.js.", why: "Der Browser kann keine rohen Gopher-Sockets öffnen; das Gateway wendet Auflösung, Zielrichtlinie, Timeouts und Größenlimits vor der Verbindung an.", alternative: "Ein allgemeiner oder entfernter Proxy böte eine weit größere SSRF- und Relay-Oberfläche, als das Protokoll benötigt.", cost: "Wir nehmen einen lokalen Node-Prozess und den bewussten Verzicht auf beliebige Protokolle in Kauf." },
          { choice: "Begrenzte Live-Endpunkte unter derselben Origin.", why: "Der Explorer kann das Gateway unter derselben Herkunft nutzen, während Anfragen und Antworten engen Verträgen folgen.", alternative: "Ein öffentlicher Cross-Origin-Proxy könnte für Scans, Zugriffe auf private Netze oder nicht vorgesehenen Verkehr missbraucht werden.", cost: "Wir nehmen in Kauf, dass die öffentliche Site nur Fixtures zeigt und Live-Zugriff eine lokale Installation erfordert." },
          { choice: "Bytes bis zur Darstellungsgrenze unverändert bewahren.", why: "Gopher überträgt Text, Menüs und Binärdaten; unveränderte Bytes verhindern beschädigte Downloads oder Protokollterminatoren.", alternative: "Alles vorab zu dekodieren würde einen Zeichensatz erzwingen, Binärdaten beschädigen und Inhalt mit Transport verwechseln können.", cost: "Wir nehmen aufwendigere Puffer, Typmetadaten und ausdrückliche Grenzen in Kauf." },
          { choice: "Nativer Capacitor-Transport auf Android.", why: "Der paketierte Explorer öffnet begrenzte TCP-Verbindungen und hält seine UI-Assets im APK; die Richtlinie bietet keinen Override für private Netze.", alternative: "Eine eingebettete Hosted-Site bliebe vom Gateway abhängig, und eine installierte PWA erhält keine rohen Socket-Rechte.", cost: "Wir nehmen eine Kotlin-Grenze, Android-SDK, Signierung und Paritätstests mit der Node.js-Richtlinie in Kauf." },
        ],
      },
      decisions: {
        title: "Entscheidungen, die die Grenze sichtbar machen",
        intro: "Jede Oberfläche sagt klar, was sie erreichen und was sie speichern kann.",
        items: [
          {
            title: "Einmal auflösen und genau das geprüfte Ziel verwenden",
            body: "Die Hosted-Richtlinie verwirft den gesamten Hostnamen, sobald eine DNS-Antwort nicht öffentlich ist. Eine erfolgreiche Auflösung gibt exakt die Adresse zurück, die der TCP-Client verwendet, und schließt damit die Lücke zwischen Prüfung und Verbindung.",
            tradeoff: "Die strikte Ablehnung gemischter Antworten kann ungewöhnliche, legitime DNS-Konfigurationen blockieren; sie ist sicherer, als die Absicht eines Angreifers zu erraten.",
          },
          {
            title: "Demo- und Live-Modus sichtbar unterscheiden",
            body: "Der öffentliche Modus kennzeichnet, dass er ausschließlich mit enthaltenen Fixtures navigiert. Live-Gopher erscheint als eigener Modus und benötigt das lokale oder bewusst betriebene Hosted-Gateway.",
            tradeoff: "Pages öffnet keine echten Ressourcen, aber Benutzer verwechseln eine statische Demo nicht mit einem verbundenen Client.",
          },
          {
            title: "Downloads atomar abschließen",
            body: "Die CLI schreibt im Zielverzeichnis in eine temporäre Datei und macht den endgültigen Pfad erst nach erfolgreichem Abschluss sichtbar; Fehler oder Abbruch hinterlassen keinen scheinbar gültigen Download.",
            tradeoff: "Dafür sind temporärer Speicher und ein finaler Commit-Schritt nötig, doch Verbraucher sehen Teildateien nicht als vollständige Ergebnisse.",
          },
        ],
      },
      delivery: {
        title: "Wie Version 3.2.0 geprüft wird",
        paragraphs: [
          "Die 102 Node.js-Tests decken RFC-Parsing, TCP-Fixtures, Netzrichtlinie, HTTP-Vertrag, atomare Ausgabe, PWA-Zustand, Android-Bundle und Release-Verträge ab. 15 Playwright-Abläufe prüfen Chromium und mobiles WebKit einschließlich Live-Navigation und Offline-Erholung.",
          "Android CI kompiliert und lintet das native Projekt, führt Unit-Tests aus und prüft die paketierten Assets. Das Gate kontrolliert außerdem deterministische Archive, Abhängigkeiten, Container-Smoke-Test und den Vertrag des signierten APK.",
        ],
      },
      result: {
        title: "Was heute funktioniert",
        paragraphs: [
          "Im Terminal oder in der Android-App lassen sich reale Menüs, Texte, Suche und gängige Binärtypen abrufen. Der lokale Browser ergänzt Verlauf, Lesezeichen, Suche, Rohdatenprüfung, JSON-Export und Download über das Gateway; die installierte PWA hält das Fixture offline bereit.",
          "DIG macht aus Gopher kein HTTP. Der Verkehr zum Gopher-Server bleibt unverschlüsselt, Pages ruft keine Live-Ressourcen ab, und Gopher+, TLS, Telnet-Sitzungen sowie rekursives Crawling bleiben außerhalb des unterstützten Vertrags.",
        ],
      },
      scope:
        "Diese Fallstudie beschreibt Version 3.2.0: RFC-1436-Framing, RFC-4266-URLs und Suche, Binärtypen, begrenzte TCP-Transporte in Node.js und Android, Same-Origin-Gateway und Offline-PWA mit Fixture. Gopher bleibt nicht authentifiziert und unverschlüsselt.",
    }),
    integradraw: localize("integradraw", {
      category: "Computergestützte Mathematik",
      title: "Zwei Werkzeuge für numerische Integration mit einem gemeinsamen Korpus konsistent halten",
      summary: "IntegraDraw ist eine Java-Desktop- und TypeScript-Canvas-Umgebung zum Vergleich von Mittelpunkt- und Trapezsummen mit einer Simpson-Referenz. Beide Laufzeiten teilen versionierte numerische Fälle und ausdrückliche Toleranzen.",
      readMinutes: "11",
      facts: [["Produkt", "Visuelle Analysis-Umgebung"], ["Rolle", "Laufzeitübergreifender Neuaufbau und Release Engineering"], ["Laufzeiten", "Java 17 Desktop und TypeScript Web"], ["Status", "Funktionsfähige Web-App und ausführbares JAR"]],
      evidence: { title: "Evidenzprotokoll", intro: "Der numerische Vertrag ist klein genug, um ihn vollständig aufzuzählen:", items: [
        ["Golden-Korpus", "Sechs Integralfälle, drei Fälle ungültiger Ausdrücke und sieben Validierungsfälle unter Schemaversion 1."],
        ["Verifikation", "22 JUnit- und 80 TypeScript-Testdeklarationen im auditierten Release."],
        ["Referenz", "Der zusammengesetzte Simpson-Vergleich im Browser verwendet 8.192 Teilintervalle."],
        ["Grenze", "Die Referenz ist nicht exakt; Unstetigkeiten und nicht endliche Ausdrücke können abgelehnt werden, und Laufzeitgrenzen unterscheiden sich absichtlich."],
      ]},
      starting: { title: "Das Konsistenzproblem", paragraphs: [
        "Ein numerisches Lernwerkzeug kann überzeugend wirken, obwohl zwei Implementierungen bei Intervallzahl, vorzeichenbehafteter Fläche oder ungültigen Funktionen unbemerkt voneinander abweichen. IntegraDraw hatte eine Java-Desktop-Vergangenheit und brauchte eine moderne Browserausgabe, ohne zu zwei getrennten Rechnern zu werden.",
        "Der Neuaufbau macht den mathematischen Vertrag sichtbar: genau die verlangte Intervallzahl, vorzeichenbehaftete Ergebnisse, sichtbarer Näherungsfehler und klare Ablehnung nicht endlicher Eingaben.",
      ]},
      constraints: { title: "Worin beide Laufzeiten übereinstimmen müssen", intro: "Die Oberfläche ist nur nützlich, wenn die numerischen Regeln stabil bleiben:", items: [
        "Mittelpunkt- und Trapezmethode verwenden genau die vom Benutzer eingegebene Segmentzahl.",
        "Negative Fläche bleibt negativ und wird nicht stillschweigend in geometrische Fläche umgewandelt.",
        "Der Vergleichswert heißt Simpson-Referenz, niemals exaktes symbolisches Ergebnis.",
        "Der Ausdrucksparser im Browser darf weder eval noch Function verwenden.",
      ]},
      diagnosis: { title: "Ein Vertrag oberhalb der Implementierung", paragraphs: [
        "Gemeinsamer Quellcode für Java und TypeScript würde eine unhandliche Laufzeitbrücke schaffen, ohne viel zu beweisen. Erwartetes Verhalten zu teilen ist die sinnvollere Grenze.",
        "Ich habe einen versionierten Golden-Korpus eingeführt, den JUnit und Vitest verwenden. Laufzeitspezifische Toleranzen und Grenzen bleiben sichtbar, damit Abweichungen nicht hinter einem großzügigen Gleichheits-Helper verschwinden.",
      ]},
      architecture: { title: "Zwei Oberflächen, ein numerischer Datensatz", intro: "Die Java-Anwendung verpackt eine Swing-Oberfläche und den numerischen Kern als ausführbares JAR. Die Webanwendung verwendet einen abhängigkeitfreien Ausdrucksparser, TypeScript-Integrationsroutinen und einen responsiven Canvas-Plot. Beide prüfen sich gegen den gemeinsamen Korpus.", labels: ["BENUTZERFUNKTION", "SICHERER PARSER", "NUMERISCHER KERN", "GOLDEN-KORPUS", "JAVA + CANVAS UI"], caption: "Die Implementierungen bleiben getrennt; ihr beobachtbarer numerischer Vertrag ist gemeinsam." },
      technology: {
        title: "Warum diese Technologien",
        intro: "Die Entscheidungen halten beide Anwendungen eigenständig und teilen nur, was wirklich übereinstimmen muss.",
        items: [
          { choice: "Getrennte Implementierungen in Java und TypeScript.", why: "Jede Oberfläche nutzt ihre natürliche Laufzeit, während ein externer Vertrag dasselbe numerische Verhalten vergleicht.", alternative: "Eine Sprachbrücke oder künstlich geteilter Quellcode würden Kopplung schaffen, ohne beobachtbare Parität zu belegen.", cost: "Wir nehmen die Pflege zweier Implementierungen der Algorithmen in Kauf." },
          { choice: "Ein begrenzter Mathematikparser.", why: "Er bietet die benötigten Ausdrücke und hält Grammatik, Funktionen und Fehler kontrollierbar.", alternative: "eval oder Function würden beliebiges JavaScript ausführen und die Sicherheitsgrenze unprüfbar machen.", cost: "Wir nehmen eine kleinere Sprache, aufgezählte Funktionen und ausdrückliche Fehler für nicht unterstützte Eingaben in Kauf." },
          { choice: "Canvas für den Webplot.", why: "Es ermöglicht eine responsive, leichte Darstellung ohne Abhängigkeiten und mit direkter Kontrolle über Maßstab und Pixel.", alternative: "Eine Diagrammbibliothek oder ein großer SVG-Baum würden Abhängigkeiten und unnötige DOM-Komplexität für eine einzelne Kurve einführen.", cost: "Wir nehmen die eigene Umsetzung von Achsen, Skalierung, Neuzeichnen und Accessibility-Unterstützung rund um Canvas in Kauf." },
          { choice: "Ein gemeinsamer Golden-Korpus.", why: "Versionierte Fälle und Toleranzen vergleichen die tatsächlichen Ausgaben zweier unabhängiger Laufzeiten.", alternative: "Gemeinsamer Code wäre zwischen Java und TypeScript unnatürlich und könnte denselben Fehler in beide Oberflächen tragen.", cost: "Wir nehmen die Pflege von Fällen, Toleranzen und Versionen in Kauf; der Korpus bleibt ein Test, kein formaler Beweis." },
        ],
      },
      decisions: { title: "Entscheidungen für mathematische Klarheit", intro: "Die Umgebung bezeichnet Näherung als Näherung.", items: [
        { title: "Das Vorzeichen des Integrals erhalten", body: "Mittelpunkt- und Trapezmethode liefern orientierte Fläche: Umgekehrte Grenzen oder eine negative Funktion bleiben negativ, statt in geometrische Fläche umgedeutet zu werden.", tradeoff: "Das Ergebnis kann überraschen, wenn stets positive Fläche erwartet wird, entspricht aber der mathematischen Bedeutung des bestimmten Integrals." },
        { title: "Die Referenz korrekt benennen", body: "Der Webvergleich verwendet die zusammengesetzte Simpson-Regel mit 8.192 Teilintervallen und nennt sie Referenz statt exaktes Ergebnis.", tradeoff: "Einige unstetige oder nicht endliche Funktionen werden abgelehnt; das Projekt ist kein symbolisches Beweissystem." },
        { title: "Die angeforderte Partition exakt einhalten", body: "Numerischer Wert und Plot verwenden die vom Benutzer eingegebene Segmentzahl. Keine Laufzeit erhöht, senkt oder passt die Diskretisierung stillschweigend an.", tradeoff: "Eine sehr grobe Wahl erzeugt eine sichtbar grobe Näherung; das Produkt zeigt sie, statt sie im Hintergrund zu korrigieren." },
      ]},
      delivery: { title: "Beide Anwendungen paketieren", paragraphs: [
        "CI kompiliert Java 17, führt JUnit aus, paketiert und prüft das ausführbare JAR per Smoke-Test und typprüft, testet und baut anschließend die TypeScript-Anwendung. Release-Kandidaten enthalten außerdem Web-Bundle und SBOMs beider Laufzeiten.",
        "Vor einem sichtbaren stabilen Release vergleicht die Veröffentlichung unabhängige Builds, validiert Abhängigkeitsinventare und prüft SHA-256-Manifeste sowie GitHub-Attestierungen.",
      ]},
      result: { title: "Was die Umgebung sichtbar macht", paragraphs: [
        "Benutzer können Funktion, Intervall und Segmentzahl ändern und sehen, wie Mittelpunkt- und Trapezschätzungen zur gezeichneten Kurve und Simpson-Referenz stehen.",
        "Desktop- und Webanwendung bleiben unabhängig nützlich; der gemeinsame Korpus gibt Maintainern einen zentralen Ort für die Prüfung des versprochenen numerischen Verhaltens.",
      ]},
      scope: "IntegraDraw ist ein exploratives Lernwerkzeug. Es bietet weder symbolische Integration noch Beweise, garantierte Behandlung von Unstetigkeiten oder ein exaktes Ergebnis für beliebige Funktionen.",
    }),
    "vector-placement-operations": localize("vector-placement-operations", {
      category: "Schulische Betriebssoftware",
      title: "Ein selbst betriebenes Praktikumssystem entwickeln, das der Schule gehört",
      summary: "VECTOR 3.3.0 ist ein White-Label-System für Praktikumsabläufe auf der Infrastruktur einer Schule. Versionierte Programmregeln steuern den Abschluss, Kohortenabdeckung zeigt Planungslücken und eine rollenbezogene Aufgabenliste macht überfällige Arbeit zu konkreten nächsten Schritten.",
      readMinutes: "14",
      facts: [["Produkt", "Selbst betriebene White-Label-Praktikumsverwaltung"], ["Rolle", "Clean-Room-Produkt, Architektur und Implementierung"], ["Betrieb", "Eine Schule pro Installation"], ["Status", "Open-Source-Version 3.3.0 unter der MIT-Lizenz"]],
      evidence: { title: "Evidenzprotokoll", intro: "Das Repository der Version 3.3.0 verknüpft seine Produktversprechen mit konkreten Kontrollen:", items: [
        ["Programmrichtlinie", "Koordinatoren veröffentlichen unveränderliche Versionen mit Zielstunden, Mindestzahl an Check-ins und Nachweispflichten. Bestehende Einsätze behalten ihre zugewiesene Version."],
        ["Kohortenabdeckung", "Die Periodenansicht trennt abgedeckte Schüler, Schüler ohne Einsatz und Überschneidungskonflikte und startet für eine Lücke einen vorausgefüllten Einsatz."],
        ["Operative Aufgabenliste", "Überfällige Nachweise, ausstehende Stundenprüfungen, Einsatztermine und fehlende Tutorzuweisungen folgen Rolle und Schulzeitzone mit vertraulicher stabiler Seitennavigation."],
        ["Sitzungen", "Der Server beendet inaktive Sitzungen. Der Produktions-Bootstrap öffnet keinen Listener, bis das einmalige Administratorgeheimnis entfernt wurde."],
        ["Verifikation", "Der geprüfte Quellstand führt 89 Node.js-Prüfungen mit einem plattformspezifischen Skip unter Windows sowie 22 Playwright-Abläufe mit eigenen 320-Pixel-Prüfungen für Arbeitsbereich und Produktdarstellung aus. Unabhängige Builds unter Ubuntu und Windows prüfen die Reproduzierbarkeit."],
      ]},
      starting: { title: "Das operative Problem", paragraphs: [
        "Praktikumsverwaltung ist mehr als ein Dashboard. Eine Schule koordiniert Kohorten, Schüler, Betriebe, Tutoren, Termine, Stunden, Check-ins und unterschriebene Nachweise. Unterschiedliche Rollen benötigen unterschiedliche Ausschnitte desselben Datensatzes, und eine Korrektur darf den früheren Stand nicht auslöschen.",
        "Die frühere akademische Implementierung eignete sich nicht als Produktbasis. Ich habe VECTOR von Grund auf neu gebaut und nur den Praktikumsbereich als fachliche Referenz verwendet. Weder Legacy-Code noch personenbezogene Datensätze, Namen oder Assets gelangten in das neue Repository.",
      ]},
      constraints: { title: "Was ein schuleigenes System gewährleisten muss", intro: "Die Architektur beginnt mit vier praktischen Vorgaben:", items: [
        "Jede Installation gehört zu genau einer Schule, die Datenbank, Erscheinungsbild, Sicherungen und Betrieb kontrolliert.",
        "Berechtigungen und Tutorenzuständigkeit müssen auf dem Server greifen, bevor Datensätze ausgewählt, gezählt oder exportiert werden.",
        "Jeder Einsatz behält die Programmversion, die Stunden, Check-ins und Nachweise festlegte; Korrekturen erhalten den ursprünglichen operativen Datensatz.",
        "Import, Export, Aufbewahrung und Wiederherstellung müssen begrenzt, prüfbar und nach einem Fehler sicher wiederholbar sein.",
      ]},
      diagnosis: { title: "Zuerst die Eigentumsgrenze festlegen", paragraphs: [
        "Mehr Zustand im Browser hätte die schwierigen Fragen offengelassen. Rollenprüfungen könnten in der Oberfläche verborgen bleiben, die gesamte Schule könnte in den Speicher geladen und ein geändertes Feld so behandelt werden, als hätte der frühere Wert nie existiert.",
        "VECTOR verwendet eine Schule pro Installation, statt einen gemeinsamen mandantenfähigen Dienst aufzubauen. Die operative Verantwortung bleibt eindeutig; Sicherung, Aufbewahrung und White-Label-Konfiguration lassen sich leichter nachvollziehen. Das Projekt liefert Software aus, keine verwaltete Cloud-Plattform.",
      ]},
      architecture: { title: "Ein kompakter Server mit klaren Grenzen", intro: "Der Browser spricht mit einer Express-API, die Anmeldung, Rollen, Programmversionen und Zustandswechsel verwaltet. SQLite speichert die Schuldaten im WAL-Modus. AES-GCM-Cursor binden Abdeckung und Aufgabenliste an Schule, Rolle, Filter und stabile Positionen, ohne ihren Inhalt offenzulegen.", labels: ["BROWSER-ARBEITSBEREICH", "EXPRESS POLICY LAYER", "PROGRAMMVERSIONEN", "SQLITE WAL", "AUDIT + WIEDERHERSTELLUNG"], caption: "Der Server entscheidet, was ein Operator sehen und ändern darf; der Browser stellt diese Entscheidung dar." },
      technology: {
        title: "Warum diese Technologien",
        intro: "Der Stack ist für eine Schule dimensioniert, die ihre eigene Installation besitzt und betreibt.",
        items: [
          { choice: "Eine Schule pro Installation.", why: "Datenhoheit, Rollen, White Label, Sicherung und Wiederherstellung bleiben innerhalb einer klaren institutionellen Grenze.", alternative: "Ein mandantenfähiges SaaS bräuchte Kundentrennung, Abrechnung, zentralen Betrieb und Compliance-Zusagen, die nicht zum Produkt gehören.", cost: "Wir nehmen in Kauf, dass jede Schule Updates, Kapazität und Sicherungen ihrer Instanz selbst verwaltet." },
          { choice: "Express als Serverschicht.", why: "Authentifizierung, Rollen, Zuständigkeit und Zustandswechsel greifen, bevor Daten den Browser erreichen.", alternative: "Eine reine Browser-Anwendung ließe Regeln und Daten beim Client, der Berechtigungen nicht verlässlich durchsetzen kann.", cost: "Wir nehmen Betrieb und Wartung eines Serverdienstes im Netz der Institution in Kauf." },
          { choice: "SQLite im WAL-Modus mit Migrationen.", why: "Transaktionen, Portabilität und Snapshots einer einzelnen Datei passen zur Last einer einzelnen Schule.", alternative: "PostgreSQL oder eine Cloud-Datenbank würden Dienst, Zugangsdaten und Administration ohne belegte Multi-Tenant-Skalierung hinzufügen.", cost: "Wir nehmen Grenzen bei parallelen Schreibvorgängen und fehlende automatische Hochverfügbarkeit in Kauf." },
          { choice: "Docker mit ausdrücklichen Werkzeugen für Sicherung und Wiederherstellung.", why: "Die Institution erhält eine reproduzierbare Installation und einen prüfbaren Wiederherstellungsweg auf eigener Infrastruktur.", alternative: "Eine verwaltete Plattform vereinfachte den Betrieb, verlagerte Kontrolle und Abhängigkeit aber zu einem Anbieter.", cost: "Wir nehmen in Kauf, dass der Operator Speicher überwacht, Wiederherstellungen testet und Updates plant." },
        ],
      },
      decisions: { title: "Entscheidungen für einen sichereren Arbeitsalltag", intro: "Das Produkt bevorzugt sichtbare Regeln gegenüber bequemem, verborgenem Zustand.", items: [
        { title: "Regeln versionieren, nicht nur den Einsatz", body: "Eine veröffentlichte Programmversion ist unveränderlich. Neue Regeln gelten für neue Zuweisungen; ein bestehender Einsatz behält Zielstunden, Check-in-Minimum und Nachweise seines Starts.", tradeoff: "Eine Korrektur braucht eine neue Version, und unberührte Einsätze werden nur ausdrücklich neu zugewiesen. Der Abschluss ändert sich nicht rückwirkend." },
        { title: "Planungslücken vor Ausnahmen zeigen", body: "Die Abdeckung wird je Kohorte und Zeitraum berechnet und unterscheidet gültige Zuweisung, fehlende Zuweisung und Überschneidung. Eine Lücke startet einen vorausgefüllten Einsatz im gleichen Kontext.", tradeoff: "Die Ansicht ist bewusst operativ begrenzt und kein allgemeines Berichtssystem. Dadurch bleibt das Ergebnis handlungsnah und rollenkorrekt." },
        { title: "Aufmerksamkeit aus vorhandenen Datensätzen ableiten", body: "Die Queue leitet fällige Arbeit aus Nachweisen, Stunden, Terminen und Tutorzuweisungen ab, statt eine zweite Aufgabenliste zu pflegen. Der Server wendet die Rolle vor Zählung und Paging an.", tradeoff: "Beliebige Erinnerungen gehören nicht in die Queue. Sie bleibt mit dem Einsatzdatensatz konsistent und vermeidet eine zweite Wahrheitsquelle." },
      ]},
      delivery: { title: "Self-Hosting und Wiederherstellung", paragraphs: [
        "Schulen können Name, Farben, Logo und Supportdaten mit Revisionsschutz für gleichzeitige Änderungen festlegen. Das Docker-Image läuft als unprivilegierter Benutzer und unterstützt ein schreibgeschütztes Root-Dateisystem. Health- und Doctor-Befehle zeigen Konfigurations- und Speicherprobleme vor dem normalen Betrieb.",
        "Die Backup-Werkzeuge erstellen einen privaten SQLite-Snapshot, prüfen ihn ohne Anwendungsstart, stellen ihn über einen geschützten Wartungspfad wieder her und verdichten die Datenbank bei Bedarf. Die Release-Automatisierung baut das Quellpaket zweimal, prüft Inventar und Commit, sucht nach Geheimnissen, installiert aus dem entpackten Artefakt und führt dort die Abnahme aus.",
      ]},
      result: { title: "Was VECTOR heute unterstützt", paragraphs: [
        "Eine Schule kann Programmregeln veröffentlichen, Kohortenabdeckung prüfen, Einsätze aus Planungslücken erstellen und eine rollenbezogene Aufgabenliste abarbeiten. Derselbe Datensatz trägt Stunden, Check-ins, Nachweishistorie, Audit, atomaren Import, gefilterten Export und geregelte Aufbewahrung.",
        "VECTOR ist selbst betriebene Open-Source-Software. Es ist kein verwaltetes SaaS und beansprucht weder Compliance-Zertifizierung noch Hochverfügbarkeit oder SSO. Für Institutionen mit solchen Anforderungen bleiben diese Punkte Produkt- und Betriebsarbeit.",
      ]},
      scope: "Diese Fallstudie beschreibt die veröffentlichte Architektur von Version 3.3.0 am Commit 0a99a9f und ihre Self-Hosting-Kontrollen. GitHub Pages ist eine Produkttour; die operative Anwendung läuft aus dem Serverpaket. Reale Schuldaten, institutionelle Integrationen und Ergebnisse werden nicht dargestellt.",
    }),
    "jdoor-security-lab": localize("jdoor-security-lab", {
      category: "Sichere Fernunterstützung",
      title: "Einen schulischen Fernsteuerungsprototyp in zustimmungsbasierte Unterstützung verwandeln",
      summary:
        "JDoor begann 2022 als gemeinsam von Djenis und einer mitwirkenden Person entwickeltes Schulprojekt zum Thema Netzwerke. Später baute Djenis Sicherheitsmodell, Sitzungslebenszyklus, Produkt-UX, Tests und Release-Weg als JDoor Assist neu auf: ein sichtbares Desktop-Werkzeug, das standardmäßig nur Ansicht erlaubt und für autorisierte Hilfe in vertrauenswürdigen lokalen Netzen gedacht ist.",
      readMinutes: "12",
      facts: [
        ["Produkt", "Zustimmungsbasierte Fernunterstützung im LAN"],
        ["Ursprung", "2022 von Djenis und einer mitwirkenden Person gemeinsam entwickeltes Schulprojekt"],
        ["Modernisierung", "Sicherheit, Produkt-UX, Tests und Release Engineering durch Djenis"],
        ["Status", "Versionierter v1.0.0-Quellstand unter GPL-3.0"],
      ],
      evidence: {
        title: "Evidenzprotokoll",
        intro: "Das v1.0.0-Repository macht diese Kontrollen und Grenzen prüfbar:",
        items: [
          [
            "Sitzungssicherheit",
            "Der Host erzeugt ein kurzlebiges P-256-Zertifikat, teilt dessen exakten SHA-256-Pin zusammen mit einem zufälligen einmaligen 128-Bit-Token und verlangt eine sichtbare lokale Freigabe, bevor ein Viewer die Sitzung betritt.",
          ],
          [
            "Protokollgrenze",
            "Ein versioniertes Binärprotokoll prüft Richtung, Typ, Abmessungen, UTF-8 und Nutzlastgröße. Es wird jeweils nur ein Viewer zugelassen, Frames sind begrenzt und entfernte Eingaben werden ignoriert, bis der Host die Steuerung freigibt.",
          ],
          [
            "Prüfgate",
            "Das Maven-Wrapper-Gate führt die JUnit-Suite, JaCoCo-Schwellen und Spotless-Prüfungen aus und baut danach ein ausführbares Shaded JAR sowie eine CycloneDX-SBOM. Die Integration deckt ungültige Token, Nur-Ansicht-Start, Streaming, Berechtigungswechsel und Eingabefreigabe ab.",
          ],
          [
            "Grenze",
            "JDoor Assist arbeitet direkt im LAN mit dem primären Bildschirm. Es bietet weder Relay noch Konten, NAT-Traversal, Dateiübertragung oder unbeaufsichtigten Zugriff; die dokumentierten Community-App-Images sind derzeit nicht signiert.",
          ],
        ],
      },
      starting: {
        title: "Den Ursprung bewahren, das Vertrauensmodell ändern",
        paragraphs: [
          "Das ursprüngliche JDoor war ein Schulprojekt von 2022, das Djenis mit einer mitwirkenden Person entwickelte. Es demonstrierte Java-Netzwerkprogrammierung, Bildschirmaufnahme und entfernte Eingaben. Dieser gemeinsame Ursprung bleibt Teil der Projektdokumentation; die spätere Arbeit stellt den Unterrichtsprototyp nicht als Einzelarbeit dar.",
          "Eine Demonstration ist noch kein Support-Produkt. Der alte Entwurf behandelte eine eingehende Verbindung als Steuerkanal, ohne stark authentifizierte Kopplung, Nur-Ansicht-Zustand oder vollständigen Lebenszyklus für hängen gebliebene Tasten, Socketfehler und Herunterfahren. Die Modernisierung begann deshalb damit, die erlaubten Fähigkeiten einzuschränken.",
        ],
      },
      constraints: {
        title: "Regeln für autorisierte Unterstützung",
        intro: "Das neu aufgebaute Produkt folgt vier nicht verhandelbaren Vorgaben:",
        items: [
          "Jede Sitzung dient ausschließlich autorisierter, von beiden Personen eingeleiteter Hilfe: Der Host bleibt sichtbar, genehmigt jeden Viewer lokal und stellt niemals unbeaufsichtigten oder versteckten Hintergrundzugriff bereit.",
          "Der Netzwerkpfad kann beobachtet oder verändert werden; deshalb muss der Viewer das exakte kurzlebige Zertifikat authentifizieren und das außerhalb des Netzes erhaltene, kurz gültige Einmal-Token vorlegen.",
          "Bildansicht und Fernsteuerung sind getrennte Berechtigungen; die Steuerung beginnt deaktiviert, der Host kann sie sofort entziehen und Widerruf oder Trennung geben verfolgte Tasten und Maustasten frei.",
          "Protokolleingaben sind nicht vertrauenswürdig: Nachrichten, Bilder, Timeouts, Worker und Cleanup benötigen ausdrückliche Grenzen, Richtungsregeln und deterministisches Schließen.",
        ],
      },
      diagnosis: {
        title: "Fernunterstützung statt Fernadministration",
        paragraphs: [
          "Die zentrale Entscheidung bestand nicht darin, den alten Steuerpfad zu verstecken oder auszubauen. Er wurde durch eine Produktgrenze ersetzt, die Zustimmung sichtbar macht und Persistenz, Shell-Ausführung sowie unbeaufsichtigten Zugriff aus dem Entwurf entfernt.",
          "Für die Modernisierung trennte Djenis TLS-Identität und Pairing, gerahmtes Protokoll, Sitzungszustand, Aufnahme, Eingaberichtlinie, Audit-Ereignisse und Swing-Oberfläche. Authentifizierung, Genehmigung, Ansicht und Steuerung sind damit getrennte Zustände statt Nebenwirkungen eines geöffneten Sockets.",
        ],
      },
      architecture: {
        title: "Eine Sitzung rund um ausdrückliche Zustimmung",
        intro:
          "Die Host-Oberfläche erzeugt eine kurzlebige Identität und einen Einmal-Link. Der Viewer pinnt dieses Zertifikat, übermittelt das Token und wartet auf die lokale Genehmigung. Erst danach trägt der begrenzte Kanal Bildschirmframes; Maus- und Tastaturnachrichten werden nur angewendet, solange die aktive Host-Sitzung eine ausdrückliche Steuerfreigabe besitzt.",
        labels: ["HOST-UI", "ZUSTIMMUNGSSITZUNG", "GEPINNTES TLS", "BEGRENZTER WIRE", "VIEWER-UI"],
        caption: "Frames erreichen einen genehmigten Viewer; Eingaben fließen nur während der sichtbaren Steuerfreigabe des Hosts zurück.",
      },
      technology: {
        title: "Warum diese Technologien",
        intro: "Jede Entscheidung begrenzt JDoor auf die vorübergehende, sichtbare Unterstützung seines Vertrauensmodells.",
        items: [
          { choice: "Java und Swing für die Desktop-Anwendung.", why: "Sie bewahren die Codebasis und nutzen AWT unter Java 21 direkt für Aufnahme, Eingabe und native Oberflächen.", alternative: "Eine Web- oder Electron-Neuentwicklung beseitigte die nötigen Desktop-Rechte nicht und vergrößerte die Laufzeitoberfläche.", cost: "Wir nehmen Java-Auslieferung, betriebssystemspezifische Berechtigungen und eine weniger webtypische Oberfläche in Kauf." },
          { choice: "Direkte Verbindung im vertrauenswürdigen LAN.", why: "Sie passt zu einer Sitzung zwischen einem anwesenden Host und genau einem Helfer ohne zentrale Infrastruktur.", alternative: "Relay und Konten ermöglichten Internetzugriff und NAT-Traversal, führten aber zentrale Geheimnisse, Missbrauchsrisiken, Identitäten und Dienstbetrieb ein.", cost: "Wir nehmen in Kauf, dass beide Geräte ein vertrauenswürdiges Netz oder einen vorbereiteten privaten Pfad teilen müssen." },
          { choice: "Kurzlebiges TLS mit Pin und Einmal-Token.", why: "Die Einladung authentifiziert genau den Endpunkt dieser Sitzung, ohne dauerhafte Identität oder Kontodatenbank anzulegen.", alternative: "Dauerhafte Passwörter und Identitäten verlangten Speicherung, Wiederherstellung, Rotation und Widerruf außerhalb des Projektumfangs.", cost: "Wir nehmen die Übertragung des Links außerhalb der Sitzung, den Codevergleich und eine neue TLS-Identität bei jedem Host-Start in Kauf." },
          { choice: "Ein enges, begrenztes Binärprotokoll.", why: "Es überträgt nur Frames, Heartbeats, Berechtigungszustand und autorisierte Eingaben mit prüfbaren Typen und Größen.", alternative: "Ein universeller Stack wie RDP oder VNC böte Interoperabilität, müsste aber weitergehende Funktionen wie Zwischenablage, Dateiübertragung und unbeaufsichtigten Zugriff begrenzen oder deaktivieren, um diesem Vertrauensmodell zu entsprechen.", cost: "Wir nehmen weniger Funktionen, keine universelle Kompatibilität und die eigene Pflege von Codec und Tests in Kauf." },
        ],
      },
      decisions: {
        title: "Entscheidungen, die das Produkt verändert haben",
        intro: "Jede Entscheidung entfernt ein implizites Privileg des ursprünglichen Prototyps.",
        items: [
          {
            title: "Eine sichtbare Person genehmigen",
            body: "Vor dem Beitritt wartet der Viewer, während der Host den angegebenen Namen, die Adresse und den Prüfcode sieht und lokal entscheidet, ob er diese Person zulässt.",
            tradeoff: "Der Host muss anwesend sein und den Anfragenden erkennen; der Beitritt kann weder automatisch noch unsichtbar werden.",
          },
          {
            title: "Ansicht und Steuerung getrennt freigeben",
            body: "Die Genehmigung öffnet nur einen Nur-Ansicht-Stream. Maus- und Tastatursteuerung verlangt eine spätere, ausdrückliche und widerrufbare Freigabe des Hosts für die aktuelle Sitzung.",
            tradeoff: "Der Helfer erhält nicht sofort Steuerung und der Host muss sie bewusst erteilen; das hält das sichtbare Mindestprivileg aufrecht.",
          },
          {
            title: "Eingabezustand deterministisch bereinigen",
            body: "Widerruf, Fokusverlust, Trennung und Herunterfahren geben alle verfolgten entfernten Tasten und Maustasten frei, damit kein unvollständiger Zustand die Sitzung überdauert.",
            tradeoff: "Der Lebenszyklus muss mehrere Cleanup-Pfade behandeln und jeden Ausgang testen, verhindert dafür aber blockierte oder nach Berechtigungsverlust weiter aktive Eingaben.",
          },
        ],
      },
      delivery: {
        title: "Vom Schulcode zum prüfbaren Release",
        paragraphs: [
          "Das Java-21-Projekt nutzt Maven Wrapper, JUnit-Integrationstests, JaCoCo und Spotless. Die Shaded-Anwendung wird über ihre CLI geprüft; daneben dokumentiert das Repository Architektur, Datenschutz, Bedrohungsannahmen, Sicherheitsmeldungen und Beitragserwartungen.",
          "CI prüft Linux- und Windows-Pfade, CodeQL führt geplante statische Analysen aus und Release-Jobs erzeugen jpackage-App-Images für Windows, macOS und Linux mit Prüfsummen, CycloneDX-Inventar und Provenienz-Attestierungen. Das Projekt erklärt ausdrücklich, dass Community-Pakete noch nicht plattformsigniert sind.",
        ],
      },
      result: {
        title: "Was JDoor Assist heute ist",
        paragraphs: [
          "JDoor Assist ist eine funktionsfähige Desktop-Anwendung mit Launcher-, Host- und Viewer-Abläufen, ablaufendem Einmal-Link, Zertifikat-Pinning, lokaler Genehmigung, Nur-Ansicht-Streaming, ausdrücklicher Steuerfreigabe, Eingabe-Cleanup, Lebenszyklus-Audit und sichtbaren Trennfunktionen.",
          "Der Prototyp von 2022 bleibt als gemeinsam mit einer mitwirkenden Person geschaffenes Werk ausgewiesen. Die spätere Modernisierung von Sicherheit, Produkt, UX, Tests und Release ist Djenis’ Beitrag; ihr Ergebnis bleibt bewusst auf sichtbare Hilfe zwischen autorisierten Personen in einem vertrauenswürdigen lokalen Netz begrenzt.",
        ],
      },
      scope:
        "Diese Fallstudie beschreibt den geprüften v1.0.0-Quellstand und das dokumentierte direkte LAN-Verhalten. JDoor Assist ist ausschließlich für autorisierte, sichtbare Unterstützung bestimmt; es ist weder Internet-Relay noch Werkzeug für unbeaufsichtigte Administration oder eine unabhängige Sicherheitszertifizierung. NAT-Traversal, Mehrbildschirmaufnahme, Plattformsignierung und Schutz nach Kompromittierung eines Endpunkts werden nicht versprochen.",
    }),
  },
  fr: {
    "careeros-local": localize("careeros-local", {
      category: "Produit local-first",
      title: "Construire un espace de travail privé pour sa carrière, fondé sur des preuves plutôt que sur des affirmations générées",
      summary: "CareerOS Local transforme un CV existant en dossier professionnel privé et révisionné, puis utilise un LLM local obligatoire pour le matching et le coaching. Tauri, FastAPI et SQLite gardent les faits, les brouillons et l’accès des agents sur l’appareil.",
      readMinutes: "14",
      facts: [["Produit", "Utilitaire de bureau open source"], ["Rôle", "Produit, architecture et implémentation"], ["Périmètre de confiance", "Appareil local par défaut"], ["État", "v1.10.0 publiée depuis le commit 6fa804e après vérification native et Agent Access"]],
      evidence: { title: "Registre des preuves", intro: "Le dépôt actuel consigne ces vérifications et limites reproductibles :", items: [
        ["Backend", "La suite de publication de la v1.10.0 réussit 1 573 tests backend ; 4 sont ignorés comme prévu. La couverture globale atteint 81,28 %, branches comprises."],
        ["Frontend + shell", "Les 396 tests frontend répartis dans 70 fichiers réussissent. L’arbre des fonctionnalités déjà intégré a aussi réussi les 17 tests Rust, Clippy avec le fichier de verrouillage Cargo imposé et les contrôles de supply chain."],
        ["Import depuis le CV", "Un nouveau coffre peut créer son profil révisionné minimal avant l’import du CV. Les faits extraits restent non confirmés et l’interface conduit directement à leur relecture."],
        ["Dossiers révisionnés", "SQLite conserve un brouillon de travail borné par candidature. L’archive v6 transporte ces brouillons et continue d’inspecter et de restaurer les formats v1 à v5."],
        ["Accès des agents", "L’application de bureau délivre des autorisations limitées et révocables pour sept opérations en lecture seule exposées par la CLI et le serveur MCP. La version fournit les deux commandes dans un wheel Python installable, affiche une fois le jeton bearer et ne conserve que son condensat."],
      ]},
      starting: { title: "Le problème produit", paragraphs: [
        "Les informations professionnelles se dispersent souvent entre d’anciens CV, des plateformes d’emploi, des notes et des portails de candidature. Les outils AI génériques ajoutent un risque : une réponse soignée peut perdre le lien avec le fait qui la justifie.",
        "Le premier démarrage part de ce que beaucoup de personnes possèdent déjà : un CV. CareerOS crée d’abord le plus petit profil valide et révisionné, importe le document localement dans des limites fixes et laisse chaque fait extrait non confirmé. L’utilisateur arrive directement à la relecture des faits, pas dans un compte à moitié créé ni face à une erreur inexpliquée.",
      ]},
      constraints: { title: "Ce que le système doit protéger", intro: "L’architecture suit quatre contraintes produit :", items: [
        "Les données professionnelles privées, les documents générés et les analyses restent sur l’appareil.",
        "Le matching et le coaching assistés par LLM exigent un runtime local approuvé ; aucun modèle cloud ne sert de solution de repli.",
        "Les suggestions générées ne peuvent pas remplacer silencieusement les faits sources ni leur historique.",
        "Sauvegardes, exports et effacement doivent couvrir ensemble les données structurées et les artefacts locaux.",
      ]},
      diagnosis: { title: "La décision de conception", paragraphs: [
        "La difficulté n’était pas d’ajouter une fenêtre de chat. Il fallait séparer les preuves, l’état déterministe des workflows et l’interprétation du modèle. Ces trois domaines ne présentent pas les mêmes défaillances et ne doivent pas partager une structure de données vague.",
        "Je les ai répartis entre un coffre de carrière, des registres reproductibles de préparation et de candidature, et des pipelines d’analyse locale validés par schéma. L’interface peut montrer l’origine d’une conclusion et la correction qui appartient au fait source.",
      ]},
      architecture: { title: "Un runtime local supervisé", intro: "Tauri gère l’application de bureau et supervise un sidecar FastAPI sur loopback. React fournit l’espace de travail, SQLite et les artefacts locaux conservent le registre durable, tandis qu’un runtime géré compatible avec llama.cpp exécute l’analyse LLM obligatoire sans devenir une couche de stockage.", labels: ["TAURI + REACT", "FASTAPI", "COFFRE SQLITE", "LLM LOCAL", "DOCUMENTS + OFFRES"], caption: "Les preuves et l’état des workflows restent durables ; l’inférence locale reçoit un contexte de tâche explicite." },
      technology: {
        title: "Pourquoi ces technologies",
        intro: "Chaque composant garde le produit local, vérifiable et raisonnablement simple à distribuer.",
        items: [
          { choice: "Tauri comme shell de bureau.", why: "Il convient à une application locale qui doit intégrer fenêtres natives, fichiers et supervision de services sans embarquer un navigateur complet.", alternative: "Electron alourdirait le produit et sa surface d’exécution ; une solution uniquement web ne piloterait pas le sidecar et les artefacts locaux avec la même fiabilité.", cost: "J’accepte une frontière Rust supplémentaire et un packaging propre à chaque plateforme." },
          { choice: "Un sidecar FastAPI pour les services applicatifs.", why: "Les workflows documentaires et analytiques restent en Python, tout en étant exposés au shell par une API loopback étroite et vérifiable.", alternative: "Tout réécrire en Rust dupliquerait l’écosystème Python ; placer la logique dans le navigateur affaiblirait le contrôle sur les données locales.", cost: "Je dois donc démarrer, superviser et versionner un second processus." },
          { choice: "SQLite comme registre versionné.", why: "Transactions, migrations et fichier unique correspondent à un espace de travail personnel possédé localement, et non à un service partagé hébergé.", alternative: "Un serveur de base local ajouterait un processus d’administration et des identifiants ; un stockage cloud introduirait le réseau et la frontière du fournisseur. Aucun ne répond à un besoin de service partagé présent dans le périmètre.", cost: "La contrepartie tient à une concurrence limitée et à la responsabilité des migrations et sauvegardes locales." },
          { choice: "Un runtime local compatible avec llama.cpp.", why: "L’analyse reste dans la frontière déclarée de l’appareil et peut être limitée aux modèles et tâches approuvés.", alternative: "Une API LLM cloud transférerait les données professionnelles hors de l’appareil et ferait dépendre confidentialité et comportement d’un service distant.", cost: "En échange, la première configuration prend du temps et l’expérience dépend du matériel et des modèles pris en charge." },
        ],
      },
      decisions: { title: "Les choix qui en font un véritable utilitaire", intro: "Le travail utile se déroule avant et après l’appel au modèle.", items: [
        { title: "Créer le registre avant d’importer le CV", body: "Le premier démarrage crée un profil révisionné minimal, puis lance un import local borné. Les faits extraits restent des candidats jusqu’à leur validation. Le CV accélère donc la configuration sans devenir une vérité incontestable.", tradeoff: "L’onboarding exige une relecture explicite, mais une extraction incomplète ou en échec ne laisse pas le coffre dans un état ambigu." },
        { title: "Publier exactement le brouillon relu", body: "Chaque candidature possède un brouillon de travail révisionné dans SQLite. Les conflits d’enregistrement automatique préservent le formulaire visible. La publication ne consomme que la révision enregistrée exacte, dans la même transaction que l’événement immuable du dossier.", tradeoff: "Le chemin d’écriture doit gérer les révisions et les conflits, mais un enregistrement tardif ne peut pas publier un contenu différent de celui qui a été relu." },
        { title: "Donner aux agents une porte séparée en lecture seule", body: "Agent Access demande à l’utilisateur connecté de choisir les périmètres et de s’authentifier à nouveau avant d’afficher une seule fois le jeton bearer. Les autorisations expirent et restent révocables. La CLI installable et le serveur MCP exposent sur stdio un ensemble fermé d’outils en lecture seule, sans prompt libre ni API distante d’écriture.", tradeoff: "L’utilisateur doit encore configurer son client agent, et un client externe peut transmettre les données lues. Ce contrat étroit rend l’automatisation utile sans partager la session de bureau." },
      ]},
      delivery: { title: "Comment le produit est vérifié", paragraphs: [
        "Les contrôles de la version v1.10.0 ont réussi 1 573 tests backend ; 4 sont ignorés comme prévu. La couverture globale atteint 81,28 %, branches comprises. S’y ajoutent 396 tests frontend réussis dans 70 fichiers et les 17 tests Rust de l’arbre de publication. Les suites de migration et d’archive couvrent le schéma des brouillons, le format v6 et la restauration des formats v1 à v5.",
        "La CI de la branche protégée, CodeQL et les contrôles des conteneurs sont au vert sur le commit exact de publication. Une répétition sans publication et le workflow du tag signé ont assemblé et vérifié six paquets natifs. Les mêmes octets du wheel Agent Access ont été testés sous Linux, macOS et Windows avec Python 3.12 et Python 3.13 avant publication.",
      ]},
      result: { title: "Ce qui existe aujourd’hui", paragraphs: [
        "La version v1.10.0 est un utilitaire de bureau fonctionnel avec démarrage depuis un CV, Career Vault, recherche guidée, Job Library révisionnée, une timeline par opportunité, studio de CV, brouillons de dossier persistants, archive v6 et analyse locale obligatoire.",
        "L’application de bureau authentifiée gère maintenant les autorisations de sept opérations en lecture seule exposées par une CLI et un serveur MCP sur stdio, tous deux livrés dans le wheel de publication et authentifiés par jeton bearer. Codex, Claude Code et les scripts shell peuvent consulter une vue volontairement réduite d’un compte autorisé, mais ne peuvent ni modifier le coffre, ni invoquer de prompts libres, ni ouvrir de transport distant.",
        "Il ne prétend pas qu’un LLM puisse décider d’une carrière. Le modèle aide à interpréter un ensemble de preuves maîtrisé ; l’utilisateur conserve le registre, les sources et la décision finale.",
      ]},
      scope: "Cette étude de cas décrit la version immuable v1.10.0 au commit 6fa804e. Le tag signé et les 25 artefacts publiés suivent une répétition sans publication sur six plateformes natives et six combinaisons système/Python pour Agent Access. Elle ne revendique ni résultats professionnels, ni précision du modèle sur des données privées, ni prise en charge de tous les modèles locaux et de toutes les machines.",
    }),
    "eliza-lab": localize("eliza-lab", {
      category: "Machine learning",
      title: "Transformer un prototype de chatbot risqué en expérience ML open-set vérifiable",
      summary: "ELIZA Lab est un pipeline Rust pour entraîner, calibrer et examiner localement un classificateur d’intentions. Il remplace la prémisse trompeuse d’un bot thérapeutique par une expérience reproductible, non clinique et capable de s’abstenir.",
      readMinutes: "14",
      facts: [["Produit", "Pipeline ML pédagogique et laboratoire web"], ["Rôle", "Protocole ML, implémentation Rust et refonte de la sécurité"], ["Données", "Fixtures synthétiques versionnées"], ["État", "Version immuable v1.6.0 avec 20 artefacts attestés"]],
      evidence: { title: "Registre des preuves", intro: "Les artefacts vérifiés présentent ensemble le résultat de sélection, le test gelé et les cas faibles :", items: [
        ["Protocole de sélection", "385 lignes d’entraînement et de développement réparties en 77 familles passent par 11 folds externes et 5 internes groupés, soit 506 modèles ajustés."],
        ["Résultat de sélection", "L’exactitude out-of-fold est de 62,597 % et le macro-F1 de 62,640 % ; l’intervalle à 95 % par famille pour l’exactitude va de 57,143 à 68,571 %."],
        ["Test ID gelé", "Exactitude de 82,857 % et macro-F1 de 82,278 % sur 70 lignes synthétiques en anglais."],
        ["Résultat open-set", "La politique gelée couvre 62,857 % des lignes ID et 11,11 % des lignes OOD ; l’AUROC OOD est de 0.80278 et le FPR à 95 % de TPR de 0.7778."],
        ["Faiblesse connue", "La fixture de contraste de 28 lignes atteint 42,86 % d’exactitude par paire ; le projet ne masque pas cet échec."],
      ]},
      starting: { title: "Le problème de la prémisse initiale", paragraphs: [
        "Le dépôt a commencé comme bot Telegram « psychologue ». Il conservait des conversations sensibles et présentait ses réponses générées comme plus proches d’un soin que le logiciel ne pouvait le justifier.",
        "J’ai gardé une question technique utile : comment un petit classificateur apprend-il, et où échoue-t-il ? J’ai supprimé les comptes, les transcriptions, les diagnostics et les allégations thérapeutiques. Le nouveau projet expose le modèle, la partition des données, la politique de calibration et la limite de sécurité.",
      ]},
      constraints: { title: "Ce qu’exige une expérience crédible", intro: "La refonte devait rendre les fuites d’évaluation et l’incertitude plus difficiles à cacher :", items: [
        "Les prompts apparentés restent groupés pour empêcher les paraphrases de passer entre entraînement et test.",
        "Calibration, sélection de politique, test in-distribution et test out-of-distribution ont des rôles de données séparés.",
        "Une preuve faible doit produire une abstention, pas une étiquette forcée.",
        "Les implémentations web et Rust vérifient le même artefact versionné et le même contrat d’inférence.",
      ]},
      diagnosis: { title: "De l’exactitude d’une démo à un protocole", paragraphs: [
        "Un seul score train/test ne répond pas aux questions essentielles : familles de prompts traversant la partition, seuils réglés sur le test final ou comportement hors du domaine d’entraînement.",
        "Le protocole v3 gèle donc des partitions conscientes des groupes et sépare entraînement, calibration, sélection de la politique d’abstention et évaluation finale. Les types Rust excluent les tests finaux des API de sélection.",
      ]},
      architecture: { title: "Le pipeline open-set", intro: "Une validation TSV stricte alimente une partition déterministe par groupes. Un vocabulaire TF-IDF limité à l’entraînement et une régression logistique multinomiale produisent les probabilités ; le temperature scaling les calibre, puis une politique choisie séparément décide de l’abstention.", labels: ["DONNÉES SYNTHÉTIQUES", "PARTITION GROUPÉE", "TF-IDF + LOGREG", "CALIBRATION", "ABSTENTION + TRACE"], caption: "Entraînement, calibration, sélection de politique et évaluation finale restent distincts." },
      technology: {
        title: "Pourquoi ces technologies",
        intro: "La stack privilégie une expérience reproductible et inspectable plutôt qu’une capacité apparente maximale.",
        items: [
          { choice: "Rust pour le pipeline et la CLI.", why: "Les types, les builds verrouillés et un binaire portable rendent les rôles des données explicites et les parcours de vérification reproductibles.", alternative: "Un notebook ou un pipeline uniquement Python faciliteraient l’exploration, mais laisseraient davantage d’état implicite et de dérive d’environnement.", cost: "Nous acceptons un effort d’implémentation supérieur et un écosystème ML moins vaste." },
          { choice: "TF-IDF avec régression logistique multinomiale.", why: "Cette approche est proportionnée à un petit corpus synthétique et permet d’inspecter poids, marges et calibration.", alternative: "Un transformer serait plus opaque, plus coûteux et surdimensionné au regard des preuves disponibles.", cost: "Nous acceptons une compréhension sémantique et une couverture linguistique limitées." },
          { choice: "Un protocole imbriqué conscient des groupes.", why: "Il garde les familles de prompts ensemble et sépare choix du modèle, calibration et test final.", alternative: "Une partition aléatoire laisserait passer des paraphrases apparentées et produirait des métriques artificiellement optimistes.", cost: "Nous acceptons 506 entraînements, davantage de suivi expérimental et des intervalles d’incertitude visibles." },
          { choice: "Une abstention calibrée.", why: "Un système open-set doit pouvoir refuser une preuve faible ou hors distribution au lieu de simuler la certitude.", alternative: "Forcer une classe fournirait une réponse même lorsqu’aucune étiquette n’est étayée par les données.", cost: "Nous acceptons une couverture moindre, un choix de seuil plus complexe et ne prétendons pas que l’abstention supprime le risque." },
        ],
      },
      decisions: { title: "Les choix qui préservent l’honnêteté du résultat", intro: "Le protocole d’évaluation fait partie du logiciel.", items: [
        { title: "Limiter les conclusions aux données synthétiques", body: "Résultats, intervalles et erreurs décrivent exclusivement les fixtures synthétiques versionnées de l’expérience. Ils ne sont pas étendus aux conversations réelles, aux contextes cliniques ni à une couverture linguistique générale.", tradeoff: "La conclusion est plus étroite et moins spectaculaire, mais reste proportionnée aux preuves effectivement observées." },
        { title: "Publier tout le parcours de sélection", body: "Bundle, plan des partitions, probabilités out-of-fold, affectations des folds et classement des candidats sont gelés et reliés par SHA-256 afin que le résultat retenu puisse être reconstruit.", tradeoff: "L’artefact demande davantage de travail à produire et à relire, mais empêche une seule métrique finale de masquer le parcours de sélection." },
        { title: "Expliquer la marge réelle", body: "Les prédictions exposent probabilités, confiance, marge des deux premières classes et contributions reconstruisant l’écart des logits gagnants.", tradeoff: "Cette attribution explique le calcul du modèle linéaire, pas le sens ou l’intention humaine." },
      ]},
      delivery: { title: "Vérifications de reproduction et de publication", paragraphs: [
        "Modèle, politique, métriques et plan de partition résident dans un bundle lié par SHA-256. La CLI peut le reconstruire, vérifier les contrats et exécuter une inférence batch bornée. Une précision de reporting déclarée maintient le bundle v3 identique octet pour octet sur les cibles prises en charge.",
        "Rust et le navigateur exécutent des fixtures de parité sur le même modèle. Un rapport de sélection séparé, lié par SHA-256, publie chaque probabilité out-of-fold, affectation de fold et rang de candidat ; le navigateur recalcule ses métriques et échoue si les octets ou les agrégats changent.",
      ]},
      result: { title: "Ce que démontre le projet", paragraphs: [
        "ELIZA Lab démontre un workflow complet pour petit modèle : sélection imbriquée par groupes, calibration, choix de politique open-set, test gelé, vérification d’artefact et inférence locale.",
        "Ce n’est ni un thérapeute, ni un détecteur de crise, ni un modèle de langage de production. Sa valeur tient à une expérience inspectable et reproductible plutôt qu’à une démo opaque.",
      ]},
      scope: "Cette étude de cas décrit la version immuable v1.6.0 au commit cacd4448. Le tag signé et les 20 artefacts attestés couvrent Linux x64, Windows x64, macOS Intel et Apple Silicon. Le corpus synthétique n’établit ni validité clinique, ni large couverture linguistique, ni aptitude à la production.",
    }),
    "dig-gopher-explorer": localize("dig-gopher-explorer", {
      category: "Outils de protocole",
      title: "Faire de Gopher un outil local borné et inspectable",
      summary:
        "DIG 3.2.0 ouvre de vraies ressources Gopher depuis une CLI, un atelier web local et une application Android autonome. La PWA garde une fixture vérifiée hors ligne ; le trafic web réel passe toujours par la passerelle same-origin.",
      readMinutes: "13",
      facts: [
        ["Produit", "CLI Gopher, explorateur local, PWA hors ligne et app Android"],
        ["Protocole", "Requêtes, menus et texte RFC 1436 ; URL et recherche RFC 4266"],
        ["Sécurité", "Politique de destination restrictive avec DNS pinning"],
        ["État", "Version open source 3.2.0 sous licence MIT"],
      ],
      evidence: {
        title: "Registre des preuves",
        intro: "Les affirmations sur la version 3.2.0 reposent sur des contrôles exécutables et des limites visibles :",
        items: [
          ["Vérification", "Le code source vérifié passe 102 tests Node.js et 15 parcours web sous Chromium et WebKit mobile ; un test est volontairement ignoré sur la plateforme où il ne s’applique pas."],
          ["Android", "L’application Capacitor 8 prend en charge Android 7/API 24 et plus, cible l’API 36 et utilise un transport TCP natif direct au lieu de charger le site hébergé."],
          ["Politique réseau", "Le mode hébergé exige un jeton d’accès, refuse un nom d’hôte dès qu’une réponse DNS n’est pas publique et se connecte uniquement à l’adresse déjà validée."],
          ["Intégrité des sorties", "La CLI écrit dans un fichier temporaire du même répertoire puis rend le chemin final visible de façon atomique ; aucun octet binaire n’est imprimé dans un terminal interactif."],
          ["Frontière hors ligne", "La PWA met en cache l’interface statique et le contenu de démonstration vérifié, jamais les réponses API. Au retour de la connexion, elle ne reprend qu’une session de passerelle auparavant active."],
        ],
      },
      starting: {
        title: "L’écart entre un schéma de protocole et un client utile",
        paragraphs: [
          "L’ancienne interface pouvait illustrer un menu Gopher, mais pas prouver l’essentiel : comment un selector devient des octets sur un socket, où se termine le framing du texte ou ce qui se passe lorsqu’un serveur distant se bloque, annonce un mauvais type ou renvoie du binaire.",
          "La version 3.2.0 conserve le chemin Node.js borné de la CLI et de la passerelle, puis ajoute un transport Android natif pour l’usage mobile direct. L’édition web est installable et sûre hors ligne ; Pages reste sur fixtures car le navigateur ne peut pas ouvrir de socket TCP brut.",
        ],
      },
      constraints: {
        title: "Les règles que l’implémentation ne peut pas brouiller",
        intro: "Le protocole est simple ; sa frontière de confiance ne l’est pas :",
        items: [
          "Le traitement RFC 4266 doit préserver selector et recherche, tandis que framing RFC 1436, fin de texte, dot-stuffing et types binaires gardent des règles distinctes sur le réseau et en sortie.",
          "Toute opération réseau doit avoir une échéance totale, un délai d’inactivité, une limite de requête, une limite de réponse et un plafond d’entrées de menu.",
          "Les accès hébergés doivent refuser les réponses DNS privées, loopback ou mixtes, puis se connecter à l’adresse validée sans résoudre le nom une seconde fois.",
          "Un texte non fiable ne doit pas piloter le terminal, et une réponse binaire ne doit être ni décodée ni imprimée comme du texte.",
        ],
      },
      diagnosis: {
        title: "Une passerelle locale, pas un proxy ouvert",
        paragraphs: [
          "Placer un proxy HTTP ouvert à Internet derrière l’explorateur rendrait la page pratique tout en créant un service SSRF. DIG garde donc la passerelle près de l’utilisateur, n’accepte les appels API que depuis sa propre origine web et n’accorde aucun accès CORS aux autres sites.",
          "Le mode hébergé se choisit explicitement. Il exige un jeton, bloque les destinations privées et lie le résultat DNS validé à la connexion TCP. L’accès local aux adresses privées n’existe que derrière une option explicite et un avertissement visible.",
        ],
      },
      architecture: {
        title: "Deux transports bornés, quatre surfaces honnêtes",
        intro:
          "CLI et explorateur local partagent politique, TCP épinglé et parser Node.js. Android applique nativement les mêmes limites de destination publique et de réponse, puis remet des octets typés à l’explorateur embarqué. PWA et Pages restent sur la fixture sans passerelle authentifiée.",
        labels: ["URL + RECHERCHE", "POLITIQUE CIBLE", "TCP NODE / ANDROID", "PARSER RFC", "CLI + EXPLORATEUR"],
        caption: "Chaque surface dit si ses octets viennent du TCP direct, de la passerelle same-origin ou de la fixture hors ligne.",
      },
      technology: {
        title: "Pourquoi ces technologies",
        intro: "La stack rend Gopher accessible dans le navigateur sans transformer le projet en proxy public.",
        items: [
          { choice: "Une passerelle TCP locale en Node.js.", why: "Le navigateur ne peut pas ouvrir de socket Gopher brut ; la passerelle applique résolution, politique de destination, délais et limites de taille avant la connexion.", alternative: "Un proxy générique ou distant offrirait une surface SSRF et de relais bien plus large que ne l’exige le protocole.", cost: "Nous acceptons un processus Node local et renonçons explicitement à prendre en charge des protocoles arbitraires." },
          { choice: "Des endpoints connectés, bornés et same-origin.", why: "L’explorateur utilise la passerelle sous la même origine, avec des requêtes et réponses maintenues dans des contrats étroits.", alternative: "Un proxy public cross-origin pourrait servir au scan, à l’accès aux réseaux privés ou à du trafic imprévu.", cost: "Nous acceptons que le site public n’affiche que des fixtures et que l’accès connecté exige l’installation locale." },
          { choice: "Préserver les octets jusqu’à la frontière de présentation.", why: "Gopher transporte texte, menus et données binaires ; garder les octets intacts évite d’altérer téléchargements ou terminateurs du protocole.", alternative: "Tout décoder en amont imposerait un jeu de caractères, pourrait corrompre les payloads binaires et confondre contenu et transport.", cost: "Nous acceptons des buffers, métadonnées de type et limites explicites plus exigeants à gérer." },
          { choice: "Un transport Capacitor natif sous Android.", why: "L’explorateur embarqué ouvre des connexions TCP bornées et conserve ses assets dans l’APK ; sa politique ne propose aucun contournement vers les réseaux privés.", alternative: "Embarquer le site hébergé laisserait la dépendance à la passerelle, et installer une PWA ne donne pas accès aux sockets bruts.", cost: "Nous acceptons une frontière Kotlin, le SDK, la signature Android et des tests de parité avec la politique Node.js." },
        ],
      },
      decisions: {
        title: "Les choix qui rendent la frontière visible",
        intro: "Chaque surface indique clairement ce qu’elle peut atteindre et ce qu’elle conserve.",
        items: [
          {
            title: "Résoudre une fois, puis joindre la cible contrôlée",
            body: "La politique hébergée rejette tout le nom d’hôte dès qu’une réponse DNS n’est pas publique. Une résolution valide fournit exactement l’adresse utilisée par le client TCP, ce qui ferme l’écart habituel entre contrôle et connexion.",
            tradeoff: "Le rejet strict des réponses mixtes peut bloquer une configuration DNS inhabituelle mais légitime ; il est plus sûr que de deviner la réponse voulue par un attaquant.",
          },
          {
            title: "Distinguer visiblement démonstration et mode connecté",
            body: "Le mode public indique qu’il navigue uniquement dans les fixtures incluses. L’accès Gopher réel apparaît comme un mode distinct et exige la passerelle locale ou une passerelle hébergée volontairement.",
            tradeoff: "Pages n’ouvre pas de ressources réelles, mais l’utilisateur ne confond pas une démonstration statique avec un client connecté.",
          },
          {
            title: "Achever les téléchargements atomiquement",
            body: "La CLI écrit dans un fichier temporaire du dossier cible, puis ne rend le chemin final visible qu’après une fin réussie ; erreur ou interruption ne laisse aucun téléchargement partiel apparemment valide.",
            tradeoff: "Il faut de l’espace temporaire et une étape finale de commit, mais les outils en aval ne voient pas un fichier partiel comme un résultat complet.",
          },
        ],
      },
      delivery: {
        title: "Comment la version 3.2.0 est vérifiée",
        paragraphs: [
          "Les 102 tests Node.js couvrent parsing RFC, fixtures TCP, politique réseau, contrat HTTP, sortie atomique, état PWA, bundle Android et contrats de publication. Quinze parcours Playwright vérifient Chromium et WebKit mobile, dont navigation réelle et reprise hors ligne.",
          "La CI Android compile et analyse le projet natif, exécute ses tests et vérifie les assets embarqués. Le contrôle couvre aussi archives déterministes, audit des dépendances, smoke test du conteneur et contrat de l’APK signé.",
        ],
      },
      result: {
        title: "Ce qui fonctionne aujourd’hui",
        paragraphs: [
          "Dans le terminal ou l’application Android, on peut récupérer menus, textes, recherches et types binaires réels. L’explorateur local ajoute historique, favoris, recherche, inspection brute, export JSON et téléchargement via la passerelle ; la PWA installée garde la fixture hors ligne.",
          "DIG ne transforme pas Gopher en HTTP. Le trafic vers le serveur Gopher reste en clair, Pages ne récupère aucune ressource réelle, et Gopher+, TLS, les sessions Telnet ainsi que le crawling récursif restent hors du contrat pris en charge.",
        ],
      },
      scope:
        "Cette étude décrit la version 3.2.0 vérifiée : framing RFC 1436, URL et recherche RFC 4266, types binaires, transports TCP bornés en Node.js et Android, passerelle same-origin et PWA hors ligne sur fixture. Gopher reste non authentifié et non chiffré.",
    }),
    integradraw: localize("integradraw", {
      category: "Mathématiques computationnelles", title: "Maintenir deux outils d’intégration numérique cohérents grâce à un corpus partagé", summary: "IntegraDraw est un atelier Java desktop et TypeScript Canvas qui compare sommes des milieux et des trapèzes à une référence Simpson. Les deux runtimes partagent des cas versionnés et des tolérances explicites.",
      readMinutes: "11",
      facts: [["Produit", "Atelier visuel de calcul"], ["Rôle", "Refonte multi-runtime et release engineering"], ["Runtimes", "Java 17 desktop et TypeScript web"], ["État", "Application web fonctionnelle et JAR exécutable"]],
      evidence: { title: "Registre des preuves", intro: "Le contrat numérique est assez petit pour être énuméré :", items: [["Corpus golden", "Six cas d’intégrales, trois expressions invalides et sept cas de validation sous le schéma version 1."], ["Vérification", "22 déclarations JUnit et 80 TypeScript dans la version auditée."], ["Référence", "La comparaison Simpson composite du navigateur utilise 8 192 sous-intervalles."], ["Limite", "La référence n’est pas exacte ; discontinuités et expressions non finies peuvent être rejetées et les limites des runtimes diffèrent volontairement."]] },
      starting: { title: "Le problème de cohérence", paragraphs: ["Un outil numérique peut sembler convaincant alors que deux implémentations divergent sur le nombre d’intervalles, l’aire signée ou les fonctions invalides. IntegraDraw avait un passé Java et devait gagner une édition web sans devenir deux calculatrices distinctes.", "La refonte explicite le contrat : nombre exact d’intervalles demandé, résultats signés, erreur visible et rejet clair des entrées non finies."] },
      constraints: { title: "Ce sur quoi les runtimes doivent s’accorder", intro: "L’interface n’est utile que si les règles restent stables :", items: ["Les méthodes du milieu et des trapèzes utilisent exactement le nombre de segments saisi.", "Une aire négative reste négative.", "La valeur de comparaison est une référence Simpson, jamais un résultat symbolique exact.", "Le parser web n’utilise ni eval ni Function."] },
      diagnosis: { title: "Un contrat au-dessus des implémentations", paragraphs: ["Partager le code Java et TypeScript créerait un pont maladroit sans prouver grand-chose. Partager le comportement attendu est plus utile.", "J’ai introduit un corpus golden versionné consommé par JUnit et Vitest. Tolérances et limites propres aux runtimes restent visibles."] },
      architecture: { title: "Deux interfaces, un même référentiel numérique", intro: "Java distribue une interface Swing et le cœur numérique dans un JAR. Le web utilise un parser sans dépendance, des routines TypeScript et un tracé Canvas responsive. Les deux vérifient le corpus partagé.", labels: ["FONCTION UTILISATEUR", "PARSER SÛR", "CŒUR NUMÉRIQUE", "CORPUS GOLDEN", "UI JAVA + CANVAS"], caption: "Les implémentations restent distinctes ; leur contrat observable est partagé." },
      technology: {
        title: "Pourquoi ces technologies",
        intro: "Ces choix gardent les deux applications autonomes et ne partagent que ce qui doit réellement coïncider.",
        items: [
          { choice: "Des implémentations Java et TypeScript distinctes.", why: "Chaque interface utilise son runtime naturel, tandis qu’un contrat externe compare le même comportement numérique.", alternative: "Un bridge entre langages ou un partage artificiel du code source ajouteraient du couplage sans démontrer la parité observable.", cost: "Nous acceptons de maintenir deux implémentations des algorithmes." },
          { choice: "Un parser mathématique borné.", why: "Il fournit les expressions nécessaires à l’atelier tout en gardant grammaire, fonctions et échecs contrôlables.", alternative: "eval ou Function exécuteraient du JavaScript arbitraire et rendraient la frontière de sécurité invérifiable.", cost: "Nous acceptons un langage plus réduit, des fonctions énumérées et des erreurs explicites pour les entrées non prises en charge." },
          { choice: "Canvas pour le tracé web.", why: "Il permet un rendu responsive, léger et sans dépendance, avec un contrôle direct de l’échelle et des pixels.", alternative: "Une bibliothèque de graphiques ou un grand arbre SVG ajouteraient dépendances et complexité DOM inutiles pour une seule courbe.", cost: "Nous acceptons d’implémenter axes, mise à l’échelle, redessin et aides d’accessibilité autour du Canvas." },
          { choice: "Un corpus golden partagé.", why: "Des cas et tolérances versionnés comparent les sorties réelles de deux runtimes indépendants.", alternative: "Partager le code serait peu naturel entre Java et TypeScript et pourrait propager la même erreur aux deux interfaces.", cost: "Nous acceptons de maintenir cas, tolérances et versions ; le corpus reste un test, pas une preuve formelle." },
        ],
      },
      decisions: { title: "Les choix qui clarifient les mathématiques", intro: "L’atelier appelle une approximation une approximation.", items: [{ title: "Préserver le signe de l’intégrale", body: "Les méthodes du point milieu et des trapèzes renvoient une aire orientée : inverser les bornes ou intégrer une fonction négative conserve un résultat négatif au lieu de le convertir en aire géométrique.", tradeoff: "La valeur peut surprendre les personnes qui s’attendent toujours à une aire positive, mais elle respecte le sens mathématique de l’intégrale définie." }, { title: "Nommer correctement la référence", body: "La comparaison utilise Simpson composite avec 8 192 sous-intervalles et parle de référence, pas de résultat exact.", tradeoff: "Certaines fonctions sont refusées ; ce n’est pas un système de preuve symbolique." }, { title: "Respecter exactement la partition demandée", body: "Valeur numérique et graphique utilisent le nombre de segments saisi par l’utilisateur. Aucun runtime n’augmente, ne réduit ni n’adapte silencieusement la discrétisation.", tradeoff: "Un choix très grossier produit une approximation visiblement grossière ; le produit la montre au lieu de la corriger en secret." }] },
      delivery: { title: "Distribuer les deux applications", paragraphs: ["La CI compile Java 17, exécute JUnit, construit et teste le JAR, puis vérifie, teste et compile TypeScript. Les candidats incluent bundle web et SBOM des deux runtimes.", "La publication compare des builds indépendants, valide les inventaires et contrôle manifestes SHA-256 et attestations GitHub."] },
      result: { title: "Ce que l’atelier rend visible", paragraphs: ["L’utilisateur modifie fonction, intervalle et segments puis compare estimations, courbe et référence Simpson.", "Les applications restent autonomes ; le corpus offre aux mainteneurs un lieu unique pour contrôler la promesse numérique."] },
      scope: "IntegraDraw est un outil pédagogique exploratoire. Il ne fournit ni intégration symbolique, ni preuve, ni gestion garantie des discontinuités, ni résultat exact pour une fonction arbitraire.",
    }),
    "vector-placement-operations": localize("vector-placement-operations", {
      category: "Logiciel de gestion scolaire", title: "Concevoir un système de stages que chaque école peut héberger et maîtriser", summary: "VECTOR 3.3.0 est un système en marque blanche exploité sur l’infrastructure d’une école. Des règles de programme versionnées définissent les critères d’achèvement, la vue par cohorte révèle les élèves sans affectation et une file adaptée à chaque rôle transforme les retards en actions concrètes.",
      readMinutes: "14",
      facts: [["Produit", "Gestion white label des stages en auto-hébergement"], ["Rôle", "Produit, architecture et implémentation en clean room"], ["Déploiement", "Une école par installation"], ["État", "Version open source 3.3.0 sous licence MIT"]],
      evidence: { title: "Registre des preuves", intro: "Le dépôt de la version 3.3.0 rattache ses promesses produit à des contrôles concrets :", items: [["Politique de programme", "Les coordinateurs publient des versions immuables avec heures cibles, minimum de suivis et justificatifs requis. Les stages existants gardent leur version."], ["Couverture de cohorte", "La vue par période sépare élèves couverts, sans stage et affectations en conflit, puis préremplit un nouveau stage pour un élève non couvert."], ["File opérationnelle", "Justificatifs en retard, heures à vérifier, dates de stage et tuteurs manquants suivent le rôle et le fuseau de l’école avec pagination stable et confidentielle."], ["Sessions", "Le serveur expire les sessions inactives. Le bootstrap de production s’arrête avant l’écoute tant que le secret administrateur à usage unique n’a pas été retiré."], ["Vérification", "Le code source vérifié exécute 89 contrôles Node.js, dont un skip lié à la plateforme sous Windows, et 22 parcours Playwright avec des vérifications dédiées à 320 px pour l’espace de travail et la présentation. Des builds indépendants sous Ubuntu et Windows contrôlent la reproductibilité."]] },
      starting: { title: "Le problème opérationnel", paragraphs: ["La gestion des stages ne se résume pas à un tableau de bord. Une école coordonne des cohortes, des élèves, des organismes, des tuteurs, des dates, des heures, des suivis et des justificatifs signés. Chaque rôle a besoin d’une vue différente du même dossier, et une correction ne doit pas effacer ce qui l’a précédée.", "L’ancienne implémentation scolaire ne pouvait pas servir de base à un produit. J’ai reconstruit VECTOR depuis zéro en ne gardant que la compréhension du métier. Aucun code historique, dossier personnel, nom ou asset de l’ancien projet n’a été repris dans le nouveau dépôt."] },
      constraints: { title: "Ce qu’un système maîtrisé par l’école doit garantir", intro: "L’architecture part de quatre contraintes concrètes :", items: ["Chaque installation appartient à une seule école, qui contrôle sa base, son identité visuelle, ses sauvegardes et son déploiement.", "Les droits et le périmètre des tuteurs doivent être appliqués par le serveur avant toute sélection, tout comptage ou tout export.", "Chaque stage garde la version du programme qui a fixé heures, suivis et justificatifs ; les corrections préservent le dossier opérationnel initial.", "Imports, exports, rétention et restauration doivent être bornés, vérifiables et relançables sans risque après un échec."] },
      diagnosis: { title: "Définir d’abord la frontière de propriété", paragraphs: ["Déplacer davantage d’état dans le navigateur aurait laissé les questions difficiles intactes. Les contrôles de rôle auraient pu rester cachés dans l’interface, toute l’école être chargée en mémoire et un champ modifié être traité comme si sa valeur précédente n’avait jamais existé.", "VECTOR consacre chaque installation à une seule école au lieu de construire un service multi-tenant partagé. La responsabilité opérationnelle est nette, et les sauvegardes, la rétention et le white label restent plus simples à raisonner. Le projet distribue un logiciel, pas une plateforme cloud administrée."] },
      architecture: { title: "Un serveur compact aux frontières explicites", intro: "L’espace web appelle une API Express qui gère authentification, rôles, versions de programme et transitions. SQLite conserve les dossiers en WAL. Des curseurs AES-GCM lient couverture et attention à l’école, au rôle, aux filtres et à une position stable sans en révéler le contenu.", labels: ["ESPACE DE TRAVAIL WEB", "POLICY LAYER EXPRESS", "VERSIONS PROGRAMME", "SQLITE WAL", "AUDIT + RESTAURATION"], caption: "Le serveur décide ce qu’un opérateur peut consulter et modifier ; le navigateur présente cette décision." },
      technology: {
        title: "Pourquoi ces technologies",
        intro: "La stack est dimensionnée pour une école qui possède et exploite sa propre installation.",
        items: [
          { choice: "Une école par installation.", why: "Propriété des données, rôles, white label, sauvegarde et restauration restent dans une frontière institutionnelle claire.", alternative: "Un SaaS multi-tenant exigerait isolation des clients, facturation, opérations centrales et garanties de conformité qui ne relèvent pas du produit.", cost: "Nous acceptons que chaque école gère les mises à jour, la capacité et les sauvegardes de son instance." },
          { choice: "Express comme couche serveur.", why: "Authentification, rôles, périmètre et transitions s’appliquent avant que les données n’atteignent le navigateur.", alternative: "Une application uniquement web laisserait règles et données au client, qui ne peut pas imposer des autorisations fiables.", cost: "Nous acceptons de déployer et maintenir un service serveur sur le réseau de l’établissement." },
          { choice: "SQLite en mode WAL avec migrations.", why: "Transactions, portabilité et snapshots d’un fichier unique sont proportionnés à la charge d’une seule école.", alternative: "PostgreSQL ou une base cloud ajouteraient service, identifiants et administration sans échelle multi-tenant démontrée.", cost: "Nous acceptons les limites d’écriture concurrente et l’absence de haute disponibilité automatique." },
          { choice: "Docker avec des outils explicites de sauvegarde et restauration.", why: "L’établissement obtient une installation reproductible et un parcours de reprise vérifiable sur sa propre infrastructure.", alternative: "Une plateforme gérée simplifierait les opérations, mais déplacerait le contrôle et la dépendance vers un fournisseur.", cost: "Nous acceptons que l’opérateur surveille le stockage, teste les restaurations et planifie les mises à jour." },
        ],
      },
      decisions: { title: "Les choix qui sécurisent le travail quotidien", intro: "Le produit préfère des règles visibles à un état caché mais pratique.", items: [{ title: "Versionner les règles, pas seulement le stage", body: "Une version de programme publiée est immuable. Les nouvelles règles valent pour les nouvelles affectations ; un stage existant garde heures cibles, minimum de suivis et justificatifs de son départ.", tradeoff: "Une correction exige une nouvelle version et une réaffectation explicite des stages intacts. La fin d’un stage ne change jamais rétroactivement." }, { title: "Montrer les trous avant qu’ils deviennent des exceptions", body: "La couverture est calculée par cohorte et période et distingue affectation valide, absence et chevauchement. Une ligne non couverte ouvre un stage prérempli sans perdre le contexte.", tradeoff: "La vue reste volontairement opérationnelle, pas un moteur de reporting général. Elle reste ainsi actionnable et correcte pour chaque rôle." }, { title: "Dériver l’attention des dossiers déjà possédés", body: "La file déduit le travail à faire des justificatifs, heures, dates et tuteurs au lieu de maintenir une seconde liste. Le serveur applique le rôle avant comptage et pagination.", tradeoff: "La file n’accepte pas de rappels arbitraires : elle reste cohérente avec le dossier de stage et évite une seconde source de vérité." }] },
      delivery: { title: "Auto-hébergement et restauration", paragraphs: ["Chaque école peut définir nom, couleurs, logo et coordonnées de support avec des révisions qui protègent les modifications concurrentes. L’image Docker s’exécute sans privilège et accepte un système de fichiers racine en lecture seule. Les commandes health et doctor signalent les problèmes de configuration et de stockage avant l’usage courant.", "Les outils créent un instantané SQLite privé, l’inspectent sans démarrer l’application, le restaurent par un parcours de maintenance protégé et compactent les données conservées si nécessaire. L’automatisation construit deux fois l’archive source, vérifie inventaire et commit, recherche les secrets, installe depuis l’artefact extrait et y exécute le parcours d’acceptation."] },
      result: { title: "Ce que VECTOR prend en charge aujourd’hui", paragraphs: ["Une école peut publier ses règles, contrôler la couverture d’une cohorte, créer un stage depuis un trou de planification et traiter une file par rôle. Le même dossier conserve heures, suivis, historique des preuves, audit, import atomique, export filtré et rétention gouvernée.", "VECTOR est un logiciel open source auto-hébergé. Ce n’est pas un SaaS administré et il ne revendique ni certification de conformité, ni haute disponibilité, ni SSO. Une institution qui en a besoin devra encore traiter ces sujets côté produit et déploiement."] },
      scope: "Cette étude décrit l’architecture publiée avec la version 3.3.0 au commit 0a99a9f et ses contrôles d’auto-hébergement. GitHub Pages est un tour du produit ; l’application opérationnelle s’exécute depuis le paquet serveur. Aucun dossier réel, aucune intégration institutionnelle ni aucun résultat n’y sont représentés.",
    }),
    "jdoor-security-lab": localize("jdoor-security-lab", {
      category: "Assistance à distance sécurisée",
      title: "Transformer un prototype scolaire de contrôle à distance en assistance fondée sur le consentement",
      summary:
        "JDoor est né en 2022 comme projet scolaire de réseau co-créé par Djenis et un collaborateur. Djenis a ensuite reconstruit son modèle de sécurité, son cycle de session, son UX produit, ses tests et sa chaîne de publication sous le nom JDoor Assist : un outil de bureau visible, en consultation seule par défaut, destiné à l’assistance autorisée sur des réseaux locaux de confiance.",
      readMinutes: "12",
      facts: [
        ["Produit", "Assistance LAN fondée sur le consentement"],
        ["Origine", "Projet scolaire de 2022 co-créé par Djenis et un collaborateur"],
        ["Modernisation", "Sécurité, UX produit, tests et release engineering par Djenis"],
        ["État", "Instantané source v1.0.0 versionné sous GPL-3.0"],
      ],
      evidence: {
        title: "Registre des preuves",
        intro: "Le dépôt v1.0.0 rend ces contrôles et limites vérifiables :",
        items: [
          [
            "Sécurité de session",
            "L’hôte crée un certificat P-256 éphémère, partage son pin SHA-256 exact avec un jeton aléatoire à usage unique de 128 bits et exige une approbation locale visible avant qu’un viewer n’entre dans la session.",
          ],
          [
            "Frontière du protocole",
            "Un protocole binaire versionné valide direction, type, dimensions, UTF-8 et taille de charge. Un seul viewer est admis, les images sont bornées et les entrées distantes sont ignorées tant que l’hôte n’active pas le contrôle.",
          ],
          [
            "Gate de vérification",
            "Le gate Maven Wrapper exécute la suite JUnit, les seuils JaCoCo et les contrôles Spotless, puis produit un JAR exécutable avec dépendances et une SBOM CycloneDX. L’intégration couvre jeton invalide, démarrage en consultation seule, streaming, permissions et libération des entrées.",
          ],
          [
            "Limite",
            "JDoor Assist fonctionne directement en LAN sur l’écran principal. Il ne fournit ni relais, ni comptes, ni traversée NAT, ni transfert de fichiers, ni accès sans surveillance ; les app images communautaires documentées ne sont pas encore signées.",
          ],
        ],
      },
      starting: {
        title: "Préserver l’origine, changer le modèle de confiance",
        paragraphs: [
          "Le JDoor d’origine était un projet scolaire de 2022 que Djenis a réalisé avec un collaborateur. Il démontrait le réseau en Java, la capture d’écran et les entrées distantes. Cette origine commune reste dans l’historique : le travail ultérieur ne présente pas le prototype scolaire comme une réalisation individuelle.",
          "Une démonstration n’est pas encore un produit d’assistance. L’ancien design traitait une connexion entrante comme un canal de contrôle, sans appairage fortement authentifié, état de consultation seule ni cycle complet pour les touches bloquées, erreurs de socket et arrêts. La modernisation a donc commencé par limiter ce que l’application est autorisée à faire.",
        ],
      },
      constraints: {
        title: "Règles de l’assistance autorisée",
        intro: "Le produit reconstruit suit quatre contraintes non négociables :",
        items: [
          "Chaque session sert exclusivement une assistance autorisée et initiée par les deux personnes : l’hôte reste visible, approuve localement chaque viewer et n’expose jamais d’accès sans surveillance ou en arrière-plan.",
          "Le chemin réseau peut être observé ou modifié ; le viewer doit donc authentifier le certificat éphémère exact et présenter le jeton à usage unique de courte durée reçu hors bande.",
          "Consultation de l’écran et contrôle distant sont deux permissions distinctes ; le contrôle démarre désactivé, l’hôte peut le retirer immédiatement et la révocation ou la déconnexion libère touches et boutons suivis.",
          "Les entrées du protocole ne sont pas fiables : messages, images, délais, workers et nettoyage exigent des bornes explicites, des règles directionnelles et une fermeture déterministe.",
        ],
      },
      diagnosis: {
        title: "Assistance à distance, pas administration distante",
        paragraphs: [
          "La décision centrale n’était pas de masquer ou d’étendre l’ancien chemin de contrôle. Il fallait le remplacer par une frontière produit qui rend le consentement visible et retire du design persistance, exécution de shell et accès sans surveillance.",
          "Pour la modernisation, Djenis a séparé identité TLS et appairage, protocole encadré, état de session, capture, politique d’entrée, événements d’audit et présentation Swing. Authentification, approbation, consultation et contrôle deviennent des états distincts, non des effets secondaires de l’ouverture d’une socket.",
        ],
      },
      architecture: {
        title: "Une session construite autour d’un consentement explicite",
        intro:
          "L’interface hôte crée une identité éphémère et un lien à usage unique. Le viewer épingle ce certificat, présente le jeton et attend l’approbation locale. Le canal borné ne transporte les images qu’ensuite ; souris et clavier ne sont appliqués que lorsque la session hôte active possède une autorisation de contrôle explicite.",
        labels: ["UI HÔTE", "SESSION + CONSENTEMENT", "TLS ÉPINGLÉ", "PROTOCOLE BORNÉ", "UI VIEWER"],
        caption: "Les images atteignent un seul viewer approuvé ; les entrées ne reviennent que pendant l’autorisation visible de l’hôte.",
      },
      technology: {
        title: "Pourquoi ces technologies",
        intro: "Chaque choix limite JDoor à l’assistance temporaire et visible prévue par son modèle de confiance.",
        items: [
          { choice: "Java et Swing pour l’application de bureau.", why: "Ils préservent le code existant et utilisent directement AWT pour la capture, les entrées et les interfaces natives sous Java 21.", alternative: "Une réécriture web ou Electron ne supprimerait pas les privilèges desktop nécessaires et élargirait la surface du runtime.", cost: "Nous acceptons la distribution Java, les permissions propres au système et une interface moins proche des conventions web." },
          { choice: "Une connexion directe sur un LAN de confiance.", why: "Elle est proportionnée à une session entre un hôte présent et un seul assistant, sans infrastructure centrale.", alternative: "Relais et comptes permettraient Internet et la traversée NAT, mais introduiraient secrets centraux, abus, identités et exploitation d’un service.", cost: "Nous acceptons que les appareils partagent un réseau de confiance ou un chemin privé préparé." },
          { choice: "Un TLS éphémère avec pin et jeton à usage unique.", why: "L’invitation authentifie l’endpoint exact de cette session sans créer d’identité persistante ni de base de comptes.", alternative: "Mots de passe et identités durables exigeraient stockage, récupération, rotation et révocation hors du périmètre.", cost: "Nous acceptons l’échange du lien hors bande, la comparaison du code et une nouvelle identité TLS à chaque démarrage de l’hôte." },
          { choice: "Un protocole binaire étroit et borné.", why: "Il ne transporte que frames, heartbeats, état des permissions et entrées autorisées, avec types et tailles vérifiables.", alternative: "Une stack généraliste comme RDP ou VNC offrirait l’interopérabilité. Pour respecter ce modèle de confiance, il faudrait toutefois limiter ou désactiver des fonctions plus larges comme le presse-papiers, le transfert de fichiers et l’accès sans surveillance.", cost: "Nous acceptons moins de fonctions, aucune compatibilité universelle et la maintenance directe du codec et des tests." },
        ],
      },
      decisions: {
        title: "Les décisions qui ont changé le produit",
        intro: "Chaque décision retire un privilège implicite du prototype d’origine.",
        items: [
          {
            title: "Approuver une personne visible",
            body: "Avant d’entrer, le viewer attend pendant que l’hôte voit le nom déclaré, l’adresse et le code de vérification, puis décide localement s’il accepte cette personne.",
            tradeoff: "L’hôte doit être présent et reconnaître le demandeur ; l’entrée ne peut devenir ni automatique ni invisible.",
          },
          {
            title: "Autoriser séparément consultation et contrôle",
            body: "L’approbation ouvre uniquement un flux en consultation seule. Le contrôle de la souris et du clavier exige ensuite une autorisation explicite et révocable de l’hôte pour la session courante.",
            tradeoff: "L’assistant n’obtient pas immédiatement le contrôle et l’hôte doit le lui accorder délibérément ; le moindre privilège reste ainsi visible.",
          },
          {
            title: "Nettoyer déterministiquement l’état des entrées",
            body: "Révocation, perte de focus, déconnexion et arrêt libèrent toutes les touches et tous les boutons distants suivis, afin qu’aucun état incomplet ne survive à la session.",
            tradeoff: "Le cycle de vie doit gérer plusieurs parcours de nettoyage et tester chaque sortie, mais évite des entrées bloquées ou encore actives après la perte de permission.",
          },
        ],
      },
      delivery: {
        title: "Du code scolaire à une version vérifiable",
        paragraphs: [
          "Le projet Java 21 utilise Maven Wrapper, des tests d’intégration JUnit, JaCoCo et Spotless. L’application shaded est exercée par sa CLI, et le dépôt documente architecture, confidentialité, hypothèses de menace, signalement de sécurité et attentes de contribution.",
          "La CI vérifie les parcours Linux et Windows, CodeQL exécute une analyse statique planifiée et les jobs de publication créent des app images jpackage pour Windows, macOS et Linux avec sommes de contrôle, inventaire CycloneDX et attestations de provenance. Le projet précise que les paquets communautaires ne sont pas encore signés par les plateformes.",
        ],
      },
      result: {
        title: "Ce qu’est JDoor Assist aujourd’hui",
        paragraphs: [
          "JDoor Assist est une application de bureau fonctionnelle avec parcours launcher, hôte et viewer ; lien temporaire à usage unique ; épinglage du certificat ; approbation locale ; streaming en consultation seule ; autorisation explicite du contrôle ; nettoyage des entrées ; audit du cycle de vie et commandes visibles de déconnexion.",
          "Le prototype de 2022 reste attribué comme un travail co-créé avec un collaborateur. La modernisation ultérieure de la sécurité, du produit, de l’UX, des tests et de la publication est la contribution de Djenis, et son résultat reste volontairement limité à une assistance visible entre personnes autorisées sur un réseau local de confiance.",
        ],
      },
      scope:
        "Cette étude couvre l’instantané source v1.0.0 vérifié et son comportement LAN direct documenté. JDoor Assist est réservé à une assistance autorisée et visible ; ce n’est ni un relais Internet, ni un outil d’administration sans surveillance, ni une certification indépendante de sécurité. Il ne promet pas traversée NAT, capture multi-écran, signature de plateforme ou protection après compromission d’un terminal.",
    }),
  },
};
