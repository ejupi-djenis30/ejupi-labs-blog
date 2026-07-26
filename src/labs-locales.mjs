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
        "CareerOS Local combina un’app desktop Tauri, un sidecar FastAPI, un archivio SQLite versionato e un runtime LLM locale obbligatorio. Il risultato è uno strumento per la carriera che conserva sul dispositivo dell’utente fonti, documenti e analisi.",
      facts: [
        ["Prodotto", "Utility desktop open source"],
        ["Ruolo", "Prodotto, architettura e implementazione"],
        ["Confine di fiducia", "Dispositivo locale per impostazione predefinita"],
        ["Stato", "Release v1.6.0 firmata con pipeline di rilascio verificata"],
      ],
      evidence: {
        title: "Registro delle evidenze",
        intro: "Il repository documenta questi controlli e limiti riproducibili:",
        items: [
          ["Backend", "1.369 test superati per la v1.6.0; una review indipendente ha rieseguito 42 test su portabilità e storage."],
          ["Frontend + shell", "334 test frontend in 64 file e 17 test della libreria Rust superati, incluso il writer nativo dei backup."],
          ["Verifica dei backup", "Gli archivi dalla versione 1 alla 4 ricevono un preflight completo e non mutante; la risposta contiene metadati limitati, non il contenuto dell’archivio."],
          ["Fixture di scala", "Una fixture agenda con 10.000 candidature registra un p95 di 68,670 ms rispetto al budget di progetto di 200 ms."],
          ["Limite", "Le ricevute locali non proteggono da un processo che può scrivere direttamente nel database; le importazioni non firmate vengono messe in quarantena."],
        ],
      },
      starting: {
        title: "Il problema di prodotto",
        paragraphs: [
          "Le informazioni professionali tendono a disperdersi tra vecchi CV, portali di lavoro, appunti e sistemi di candidatura. Gli strumenti AI generici aggiungono un altro problema: una risposta ben scritta può perdere il legame con il fatto che la sostiene.",
          "CareerOS Local è stato progettato prima di tutto come registro operativo. Esperienze, formazione, competenze e risultati conservano provenienza, stato di verifica e cronologia delle revisioni. L’LLM analizza poi quel registro, di proprietà dell’utente, per il matching e il coaching, invece di inventare un secondo profilo scollegato.",
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
      decisions: {
        title: "Le scelte che lo rendono uno strumento vero",
        intro: "Il prodotto utile è l’intero flusso costruito attorno al modello.",
        items: [
          {
            title: "Conservare la provenienza nel registro",
            body: "I dati professionali mantengono fonte, stato di verifica e revisioni. Il contenuto del CV e le evidenze di candidatura possono risalire a quel registro.",
            tradeoff: "Richiede più struttura di un profilo libero, ma rende possibili correzioni e verifiche.",
          },
          {
            title: "Richiedere l’analisi locale",
            body: "Il matching delle opportunità e il coaching restano bloccati finché il runtime locale approvato non è pronto. L’applicazione non invia mai l’attività a un modello remoto come fallback di comodo.",
            tradeoff: "La prima configurazione è più impegnativa e l’hardware conta, ma il confine di privacy resta reale.",
          },
          {
            title: "Trattare le candidature come evidenze",
            body: "CV versionati, risposte, mappature dei requisiti e file verificati possono essere esportati con un manifesto SHA-256 canonico.",
            tradeoff: "Un dossier richiede più cura di una cartella di file sparsi; in cambio è riproducibile e verificabile.",
          },
        ],
      },
      delivery: {
        title: "Come viene verificato il prodotto",
        paragraphs: [
          "Il repository testa i servizi Python, il comportamento React e l’integrazione desktop Rust. Le migrazioni del database vengono eseguite in cicli di upgrade, downgrade e nuovo upgrade. I test dei backup ispezionano senza modifiche le versioni 1–4, poi verificano sostituzione, rilevamento della corruzione e rollback su dati locali temporanei.",
          "L’automazione dei rilasci controlla anche licenze delle dipendenze, SBOM, container e policy sulle vulnerabilità ad alta gravità. Le immagini del tour provengono dall’applicazione reale con dati fittizi e il registratore rifiuta errori del browser, risposte API fallite e avvisi visibili.",
        ],
      },
      result: {
        title: "Cosa esiste oggi",
        paragraphs: [
          "CareerOS Local è una utility desktop funzionante con archivio professionale, studio per il CV, pipeline privata delle opportunità, dossier di candidatura, backup, esportazioni e un runtime supervisionato per l’analisi locale.",
          "Non sostiene che un LLM possa decidere una carriera. Il modello aiuta a interpretare un insieme di evidenze di proprietà dell’utente; l’utente conserva il registro, la fonte e la decisione finale.",
        ],
      },
      scope:
        "Questo case study descrive l’architettura presente nel repository e il comportamento documentato del prodotto. Non afferma risultati occupazionali, accuratezza del modello su dati privati degli utenti né supporto per ogni modello locale e ogni macchina.",
    }),
    "eliza-lab": localize("eliza-lab", {
      category: "Machine learning",
      title: "Trasformare un prototipo di chatbot rischioso in un esperimento ML open-set verificabile",
      summary:
        "ELIZA Lab è una pipeline di machine learning in Rust per addestrare, calibrare e analizzare localmente un classificatore di intenti. Sostituisce l’equivoco presupposto di un bot terapeutico con un esperimento riproducibile, non clinico e capace di astenersi.",
      facts: [
        ["Prodotto", "Pipeline ML didattica e laboratorio nel browser"],
        ["Ruolo", "Protocollo ML, implementazione Rust e riprogettazione della sicurezza"],
        ["Dati", "Fixture sintetiche versionate"],
        ["Stato", "Bundle v3 riproducibile, audit annidato della selezione e CLI"],
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
      decisions: {
        title: "Le scelte che mantengono onesto il risultato",
        intro: "Il progetto considera il protocollo di valutazione parte integrante del software.",
        items: [
          {
            title: "Congelare le famiglie semantiche",
            body: "La fixture supervisionata contiene 525 righe in 105 famiglie di prompt della stessa dimensione. ID di gruppo espliciti mantengono unite le formulazioni correlate durante la partizione.",
            tradeoff: "La fixture è volutamente sintetica e limitata; garantisce riproducibilità, non validità sul linguaggio clinico reale.",
          },
          {
            title: "Separare gli esempi ignoti dai test finali",
            body: "Popolazioni distinte per sviluppo OOD e test OOD permettono di scegliere la policy di astensione prima della valutazione finale.",
            tradeoff: "Il protocollo richiede più fixture e tracciamento, ma la misurazione finale non fa più parte della taratura.",
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
        "Tutte le dimensioni dei dataset e i dettagli del protocollo riportati provengono dalla documentazione versionata del repository. Il corpus sintetico non dimostra validità clinica, ampia copertura linguistica o idoneità alla produzione.",
    }),
    "djenis-ai-agent": localize("djenis-ai-agent", {
      category: "Sistemi agentici",
      title: "Costruire un’automazione del computer che espone i propri permessi prima di agire",
      summary:
        "DjenisAiAgent osserva un’interfaccia Windows o browser, richiede una singola azione Gemini strutturata, la verifica rispetto ai permessi del runtime e inserisce il risultato verificato nel turno successivo.",
      facts: [
        ["Prodotto", "Agente sperimentale per l’uso del computer"],
        ["Ruolo", "Architettura, livello di policy e implementazione"],
        ["Runtime", "Windows nativo o Docker orientato al browser"],
        ["Stato", "Alpha funzionante con capacità limitate"],
      ],
      evidence: {
        title: "Registro delle evidenze",
        intro: "Le affermazioni sull’alpha sono legate a limiti verificati, non ad aneddoti su attività autonome:",
        items: [
          ["Verifica", "155 dichiarazioni di unit test e una soglia di copertura del repository del 70%."],
          ["Limiti dell’attività", "50 turni, 900 secondi per attività, 120 secondi per richiesta al modello e 45 secondi per azione come valori predefiniti."],
          ["Piano di controllo", "Token operatore di almeno 24 caratteri, al massimo otto WebSocket e due stream nativi come valori predefiniti."],
          ["Limite", "Gemini è una dipendenza cloud; Docker non può controllare il desktop host e l’affidabilità nativa dipende dall’accessibilità dell’interfaccia e dal focus."],
        ],
      },
      starting: {
        title: "Il problema dell’automazione",
        paragraphs: [
          "Un ciclo di computer use diventa pericoloso quando il suggerimento del modello e l’autorità del programma vengono trattati come la stessa cosa. Un prompt può descrivere un obiettivo; non dovrebbe concedere in silenzio accesso a filesystem, shell o desktop.",
          "Il progetto doveva esporre soltanto le capacità supportate dal runtime corrente, applicare un livello di permessi scelto dall’operatore e richiedere un’osservazione dopo ogni azione.",
        ],
      },
      constraints: {
        title: "I confini applicati dal runtime",
        intro: "L’agente è progettato attorno a limiti espliciti:",
        items: [
          "Il livello observe predefinito espone controlli del runtime e accesso in sola lettura ai file nei percorsi approvati.",
          "Gli strumenti desktop, browser, file e sistema compaiono soltanto quando runtime e livello di permesso li consentono entrambi.",
          "Non esiste una shell general-purpose. Il launcher limitato invoca direttamente un solo eseguibile in allowlist e rifiuta pipeline, sostituzioni e concatenazione dei comandi.",
          "Un’attività non può risultare completata finché il ciclo di orchestrazione non dispone di un’osservazione verificata successiva all’azione.",
        ],
      },
      diagnosis: {
        title: "Separare ragionamento e autorità",
        paragraphs: [
          "Il modello dovrebbe scegliere quale azione dichiarata richiedere. Non dovrebbe decidere se l’azione è consentita, quanto può durare o quanto output entra nel prompt successivo.",
          "Ho spostato queste decisioni in un registro degli strumenti protetto da policy e in un livello di orchestrazione limitato. Gli strumenti sconosciuti falliscono, tentativi e durata dell’attività sono limitati e gli eventi di audit vengono redatti prima di raggiungere il disco.",
        ],
      },
      architecture: {
        title: "Un ciclo che osserva, decide, autorizza e verifica",
        intro:
          "La percezione acquisisce uno screenshot o l’albero di accessibilità. Gemini restituisce una singola chiamata di funzione dichiarata. Il livello di policy verifica supporto del runtime, livello e allowlist prima di eseguire uno strumento. L’osservazione risultante diventa l’evidenza del turno successivo.",
        labels: ["PERCEZIONE", "TOOL CALL GEMINI", "CONTROLLO POLICY", "AZIONE", "OSSERVAZIONE VERIFICATA"],
        caption: "Il modello propone; il runtime decide quale autorità esiste davvero.",
      },
      decisions: {
        title: "Le scelte che riducono la superficie di attacco",
        intro: "Le capacità sono configurazione e codice, non buone maniere suggerite nel prompt.",
        items: [
          {
            title: "Costruire il registro a runtime",
            body: "Gli strumenti non supportati vengono omessi, invece di essere pubblicizzati per poi fallire dopo che il modello li ha scelti.",
            tradeoff: "Il modello vede meno strumenti, preferibile al fingere che ogni ambiente disponga degli stessi poteri.",
          },
          {
            title: "Usare controlli indipendenti",
            body: "Gli strumenti di sistema richiedono il livello system e un flag separato di conferma delle azioni pericolose, con allowlist per percorsi, applicazioni ed eseguibili.",
            tradeoff: "La configurazione richiede più tempo, ma un unico interruttore generico non può esporre tutte le azioni ad alto impatto.",
          },
          {
            title: "Autenticare la console locale",
            body: "Il piano di controllo web scambia un token operatore con una sessione HttpOnly di breve durata e applica limiti a origine, frequenza, upload e concorrenza.",
            tradeoff: "Resta un piano di controllo locale a processo singolo, non un servizio pubblico multi-tenant.",
          },
        ],
      },
      delivery: {
        title: "Verifica del runtime e del rilascio",
        paragraphs: [
          "I test portabili vengono eseguiti su Linux, mentre la CI Windows verifica la copertura legata al desktop. Analisi statica, audit delle dipendenze, validazione del sito e smoke test Docker coprono i percorsi di distribuzione circostanti.",
          "I rilasci dei container vengono promossi soltanto tramite digest dopo i controlli di vulnerabilità, SBOM e provenienza. Il controllo nativo del desktop resta volutamente fuori da Docker; il sito Pages pubblico è una presentazione, non una console operatore.",
        ],
      },
      result: {
        title: "Cosa dimostra l’alpha",
        paragraphs: [
          "L’agente può usare strumenti desktop e browser dichiarati attraverso un ciclo la cui autorità è visibile e limitata al di fuori della risposta del modello.",
          "Non afferma un’autonomia generale. Qualità dell’interfaccia, focus della finestra, latenza di terze parti e interfacce basate su Canvas continuano a limitarne l’affidabilità; il progetto va quindi usato in ambienti usa e getta o attentamente confinati.",
        ],
      },
      scope:
        "Questo case study riflette l’implementazione alpha documentata. Non afferma un funzionamento sicuro senza supervisione, protezione completa dai flag propri di un programma in allowlist né supporto per ogni applicazione Windows.",
    }),
    "dig-gopher-explorer": localize("dig-gopher-explorer", {
      category: "Strumenti per protocolli",
      title: "Trasformare Gopher in uno strumento locale controllato e ispezionabile",
      summary:
        "DIG 3.0.0 è un vero client Gopher con tre superfici separate: una CLI su TCP, un explorer live nel browser dietro un gateway locale same-origin e un sito GitHub Pages basato solo su fixture. Il core condiviso interpreta risposte RFC 1436 e indirizzi RFC 4266 senza fingere che un browser statico possa aprire socket grezzi.",
      facts: [
        ["Prodotto", "CLI Gopher, gateway locale ed explorer nel browser"],
        ["Protocollo", "Richieste, menu e testo RFC 1436; URL e ricerca RFC 4266"],
        ["Sicurezza", "Policy fail-closed sulle destinazioni con DNS pinning"],
        ["Stato", "Versione open source v3.0.0 con licenza MIT"],
      ],
      evidence: {
        title: "Registro delle evidenze",
        intro: "Le affermazioni sulla v3.0.0 sono legate a controlli eseguibili e limiti visibili:",
        items: [
          ["Verifica", "90 test Node.js e quattro E2E Chromium superati, incluso l’intero percorso live su una viewport esatta di 320 px."],
          ["Policy di rete", "La modalità hosted richiede un token, rifiuta un hostname se anche una sola risposta DNS non è pubblica e si connette soltanto all’indirizzo già validato."],
          ["Integrità dell’output", "La CLI scrive in un file temporaneo nella stessa cartella e rende visibile il percorso finale con un’operazione atomica; i byte binari non vengono mai stampati in un terminale interattivo."],
          ["Runtime", "L’audit delle dipendenze rileva zero vulnerabilità e l’immagine Docker di produzione supera lo smoke test come processo non privilegiato."],
          ["Confine pubblico", "GitHub Pages offre l’explorer soltanto con fixture incluse nel repository. Le richieste Gopher live richiedono il gateway same-origin."],
        ],
      },
      starting: {
        title: "La distanza tra uno schema del protocollo e un client utile",
        paragraphs: [
          "L’interfaccia precedente poteva illustrare un menu Gopher, ma non provava le parti importanti: come un selector diventa byte su un socket, dove termina il framing del testo o cosa accade se un server remoto si blocca, dichiara un tipo errato o restituisce dati binari.",
          "La versione 3.0.0 ricostruisce il progetto attorno al percorso reale della richiesta. La CLI apre connessioni TCP limitate. Il browser locale usa lo stesso client tramite un gateway same-origin. Il sito Pages resta basato solo su fixture perché JavaScript nel browser non può creare il socket TCP grezzo richiesto da Gopher.",
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
        title: "Un solo percorso di fetch, due interfacce live",
        intro:
          "Un URL Gopher e l’eventuale query di ricerca passano attraverso validazione dell’URL, policy sulla destinazione e una connessione TCP limitata e vincolata all’indirizzo validato. La risposta entra quindi nel parser RFC condiviso. La CLI la presenta o la salva direttamente; il gateway same-origin restituisce un risultato tipizzato all’explorer.",
        labels: ["URL + QUERY", "POLICY DESTINAZIONE", "TCP VINCOLATO", "PARSER RFC", "CLI + EXPLORER"],
        caption: "CLI ed explorer locale condividono il percorso reale del protocollo; Pages si ferma al confine delle fixture.",
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
            title: "Mantenere le richieste live same-origin",
            body: "Il gateway serve interfaccia e API JSON, verificando origine, formato del body, frequenza e dimensioni prima di ogni richiesta Gopher. Pages offre lo stesso explorer su fixture, senza accesso live o cross-origin.",
            tradeoff: "Una risorsa live richiede il gateway locale o ospitato consapevolmente; il sito pubblico resta statico invece di diventare un’API proxy riutilizzabile.",
          },
          {
            title: "Conservare i byte della risposta",
            body: "L’ispezione raw è facoltativa per testo e menu. Le risorse binarie conservano byte esatti, dimensione e digest SHA-256; il browser le scarica e la CLI le salva atomicamente.",
            tradeoff: "L’esattezza richiede percorsi separati per testo e binario, ma evita corruzione UTF-8 silenziosa e file finali incompleti.",
          },
        ],
      },
      delivery: {
        title: "Come viene verificata la v3.0.0",
        paragraphs: [
          "I 90 test Node.js coprono parsing RFC, fixture TCP reali, policy di rete, contratto HTTP, output atomico della CLI, asset statici e regole di rilascio. Quattro flussi Chromium guidano l’explorer attraverso il gateway locale, includendo ricerca, cronologia, preferiti, ispezione raw, esportazione, download binario e layout a 320 px.",
          "Il gate di rilascio esegue anche un audit delle dipendenze con zero vulnerabilità e avvia l’immagine Docker non privilegiata per uno smoke test runtime. Il progetto è distribuito sotto MIT; la build Pages resta statica, mentre il container avvia soltanto il gateway hosted autenticato.",
        ],
      },
      result: {
        title: "Cosa funziona oggi",
        paragraphs: [
          "Dal terminale si possono recuperare menu, testi, ricerche e tipi binari comuni reali, verificare hash e dimensioni oppure salvare i byte esatti senza esporre un file finale parziale. Nell’explorer locale lo stesso percorso live aggiunge cronologia, preferiti, moduli di ricerca, ispezione della risposta raw, esportazione JSON e download binario.",
          "DIG non trasforma Gopher in HTTP. Il traffico verso un server Gopher resta in chiaro, Pages non recupera risorse live e Gopher+, TLS, sessioni Telnet e crawling ricorsivo rimangono fuori dal contratto supportato.",
        ],
      },
      scope:
        "Questo case study descrive l’implementazione verificata della v3.0.0: framing RFC 1436 per menu e testo, URL e ricerca RFC 4266, tipi binari comuni, TCP limitato, gateway same-origin ed explorer Pages basato solo su fixture. UTF-8 è la codifica supportata per i campi URL; il progetto non offre autenticazione del server né trasporto Gopher cifrato.",
    }),
    integradraw: localize("integradraw", {
      category: "Matematica computazionale",
      title: "Mantenere coerenti due strumenti di integrazione numerica con un unico corpus condiviso",
      summary:
        "IntegraDraw è un ambiente Java desktop e TypeScript Canvas per confrontare somme dei punti medi e trapezoidali con un riferimento Simpson. Entrambi i runtime condividono casi numerici versionati e tolleranze esplicite.",
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
      decisions: {
        title: "Le scelte che migliorano la chiarezza matematica",
        intro: "L’ambiente chiama l’approssimazione con il suo nome.",
        items: [
          {
            title: "Usare un linguaggio di espressioni limitato",
            body: "Il browser accetta x, costanti, operazioni aritmetiche, parentesi e un insieme documentato di funzioni tramite un parser proprio.",
            tradeoff: "È più sicuro e comprensibile di JavaScript arbitrario, ma volutamente meno espressivo.",
          },
          {
            title: "Dare al riferimento il nome corretto",
            body: "Il confronto web usa la regola composita di Simpson con 8.192 sottointervalli e lo definisce riferimento, non risultato esatto.",
            tradeoff: "Alcune funzioni discontinue o non finite vengono rifiutate; il progetto non è un sistema di dimostrazione simbolica.",
          },
          {
            title: "Confrontare il comportamento osservabile",
            body: "I test Java e TypeScript usano gli stessi casi versionati mantenendo visibili le rispettive tolleranze numeriche.",
            tradeoff: "Il corpus deve evolvere in modo deliberato ogni volta che cambia il contratto matematico supportato.",
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
        "VECTOR 3.0.0 è un sistema white-label per la gestione dei tirocini che ogni scuola può eseguire sulla propria infrastruttura. Riunisce coorti, studenti, aziende ospitanti, assegnazioni, ore, verifiche ed evidenze in un flusso con regole di accesso applicate dalle API.",
      facts: [
        ["Prodotto", "Gestione white-label dei tirocini in self-hosting"],
        ["Ruolo", "Prodotto, architettura e implementazione clean-room"],
        ["Distribuzione", "Una scuola per installazione"],
        ["Stato", "Versione open source 3.0.0 con licenza MIT"],
      ],
      evidence: {
        title: "Registro delle evidenze",
        intro: "Il repository della versione 3.0.0 lega le promesse del prodotto a controlli concreti:",
        items: [
          ["Accesso", "I permessi di amministratori, coordinatori, tutor e lettori vengono verificati dal server. L’amministratore iniziale deve sostituire la password temporanea prima di accedere ai dati operativi."],
          ["Record", "SQLite funziona in modalità WAL con migrazioni esplicite. Il controllo delle revisioni impedisce che un operatore sovrascriva in silenzio le modifiche di un altro."],
          ["Flusso", "Requisiti di idoneità e transizioni regolano i tirocini, le ore verificate o annullate, i check-in e le evidenze, che possono essere sostituite senza cancellarne la storia."],
          ["Governance", "I metadati di audit non contengono campi personali. La retention rispetta i blocchi applicati agli studenti e richiede l’impronta esatta dell’anteprima prima di eliminare record in lotti limitati."],
          ["Distribuzione", "Il percorso di rilascio crea un artefatto sorgente riproducibile, lo verifica dopo l’estrazione e prova backup, ispezione, ripristino e compattazione sull’applicazione pacchettizzata."],
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
          "Ore verificate ed evidenze firmate richiedono percorsi di correzione espliciti che conservino il record originale.",
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
          "L’ambiente nel browser comunica con un’API Express che gestisce autenticazione, ruoli e transizioni. SQLite conserva i record di una scuola in modalità WAL. I cursori opachi AES-GCM legano la paginazione alla scuola, all’ambito e ai filtri attivi; le ricerche limitate evitano di caricare intere tabelle nei moduli.",
        labels: ["AMBIENTE WEB", "POLICY LAYER EXPRESS", "SQLITE WAL", "AUDIT + RETENTION", "BACKUP + RELEASE"],
        caption: "Il server decide cosa un operatore può vedere e modificare; il browser presenta quella decisione.",
      },
      decisions: {
        title: "Le scelte che rendono più sicuro il lavoro quotidiano",
        intro: "Il prodotto preferisce regole visibili a uno stato nascosto ma comodo.",
        items: [
          {
            title: "Applicare l’ambito prima della paginazione",
            body: "Ogni elenco applica scuola e ruolo prima del limite. I cursori opachi autenticati legano quell’ambito ai filtri e a una posizione di ordinamento stabile. Le ricerche restituiscono soltanto pochi record idonei.",
            tradeoff: "L’interfaccia non può scaricare una tabella illimitata in una sola richiesta. L’estrazione completa passa da un export filtrato separato, con un limite di 10.000 righe.",
          },
          {
            title: "Correggere le evidenze senza riscrivere la storia",
            body: "Le regole di idoneità governano le transizioni del tirocinio. Le ore vengono verificate o annullate; un documento firmato si corregge sostituendolo con un nuovo record invece di modificare l’evidenza sul posto.",
            tradeoff: "L’operatore deve compiere un passaggio esplicito, ma chi controlla può ricostruire l’intera sequenza delle decisioni.",
          },
          {
            title: "Bloccare in sicurezza le operazioni massive",
            body: "Gli import CSV convalidano l’intero file in un’unica transazione. Le anteprime di retention mostrano record bloccati, lavoro residuo e un’impronta esatta; l’esecuzione rifiuta anteprime obsolete ed elimina in lotti limitati.",
            tradeoff: "Le modifiche amministrative più grandi richiedono un’anteprima deliberata e talvolta più esecuzioni. È preferibile a un import parziale o a una cancellazione di massa non verificata.",
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
          "Una scuola può gestire coorti, studenti, aziende ospitanti, periodi e assegnazioni; verificare ore; registrare check-in; conservare la storia dei documenti; esaminare eventi di audit nel proprio ambito; importare dati in modo atomico ed esportare una vista operativa filtrata. Gli amministratori possono inoltre bloccare la retention per uno studente prima che i record più vecchi vengano rimossi.",
          "VECTOR è software open source in self-hosting. Non è un SaaS gestito e non dichiara certificazioni di conformità, alta disponibilità o SSO. Per un’istituzione che ne abbia bisogno, questi aspetti restano lavoro di prodotto e di distribuzione.",
        ],
      },
      scope:
        "Questo case study descrive l’architettura della versione 3.0.0 presente nel repository e i relativi controlli di self-hosting. GitHub Pages presenta il prodotto senza dati operativi; l’applicazione vera e propria parte dal pacchetto server. Non vengono rappresentati dati scolastici reali, integrazioni istituzionali o risultati dei tirocini.",
    }),
  },
  de: {
    "careeros-local": localize("careeros-local", {
      category: "Local-first-Produkt",
      title: "Ein privater Karriere-Arbeitsbereich, der auf Belegen statt auf generierten Behauptungen beruht",
      summary: "CareerOS Local verbindet eine Tauri-Desktop-Anwendung, einen FastAPI-Sidecar, einen versionierten SQLite-Tresor und eine verpflichtende lokale LLM-Laufzeit. So bleiben Quelldaten, Dokumente und Analysen auf dem Gerät des Benutzers.",
      facts: [["Produkt", "Open-Source-Desktop-Utility"], ["Rolle", "Produkt, Architektur und Implementierung"], ["Vertrauensgrenze", "Standardmäßig das lokale Gerät"], ["Status", "Signiertes v1.6.0-Release mit geprüfter Release-Pipeline"]],
      evidence: { title: "Evidenzprotokoll", intro: "Das aktuelle Repository dokumentiert diese reproduzierbaren Prüfungen und Grenzen:", items: [
        ["Backend", "1.369 Tests bestehen für v1.6.0; eine unabhängige Prüfung wiederholte 42 Portabilitäts- und Speichertests."],
        ["Frontend + Shell", "334 Frontend-Tests in 64 Dateien und 17 Rust-Bibliothekstests bestehen, einschließlich des nativen Backup-Writers."],
        ["Backup-Prüfung", "Archive der Versionen 1–4 durchlaufen einen vollständigen, nicht verändernden Preflight; die Antwort enthält begrenzte Metadaten statt Archivinhalten."],
        ["Skalierungs-Fixture", "Eine Agenda-Fixture mit 10.000 Bewerbungen erfasst einen p95 von 68,670 ms bei einem Projektbudget von 200 ms."],
        ["Grenze", "Lokale Belege schützen nicht vor einem Prozess, der direkt in die Datenbank schreiben kann; unsignierte Importe werden unter Quarantäne gestellt."],
      ]},
      starting: { title: "Das Produktproblem", paragraphs: [
        "Karriereinformationen verteilen sich häufig auf alte Lebensläufe, Jobportale, Notizen und Bewerbungsplattformen. Allgemeine AI-Werkzeuge schaffen ein weiteres Problem: Eine überzeugend formulierte Antwort kann den Bezug zu dem Fakt verlieren, der sie stützt.",
        "CareerOS Local wurde zuerst als belastbares Arbeitsprotokoll entworfen. Erfahrung, Ausbildung, Fähigkeiten und Erfolge behalten Herkunft, Prüfstatus und Revisionsverlauf. Das LLM analysiert diesen eigenen Datenbestand für Matching und Coaching, statt ein zweites, losgelöstes Profil zu erfinden.",
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
      decisions: { title: "Entscheidungen, die daraus ein echtes Werkzeug machen", intro: "Das nützliche Produkt ist der vollständige Arbeitsablauf rund um das Modell.", items: [
        { title: "Herkunft im Datensatz bewahren", body: "Karrierefakten behalten Quelle, Prüfstatus und Revisionen. Lebenslaufinhalte und Bewerbungsbelege können auf diesen Datensatz zurückverweisen.", tradeoff: "Das verlangt mehr Struktur als ein Freitextprofil, ermöglicht dafür aber Korrekturen und Audits." },
        { title: "Lokale Analyse voraussetzen", body: "Opportunity-Matching und Coaching bleiben gesperrt, bis die freigegebene lokale Laufzeit bereit ist. Die Anwendung sendet die Aufgabe nie als bequemen Fallback an ein entferntes Modell.", tradeoff: "Die Ersteinrichtung ist aufwendiger und die Hardware spielt eine Rolle; die Datenschutzgrenze bleibt dafür ehrlich." },
        { title: "Bewerbungen als Belege paketieren", body: "Versionierte Lebensläufe, Antworten, Anforderungszuordnungen und geprüfte Dateien lassen sich mit einem kanonischen SHA-256-Manifest exportieren.", tradeoff: "Ein Dossier ist bewusster aufgebaut als ein Ordner mit losen Dateien; dafür ist es reproduzierbar und prüfbar." },
      ]},
      delivery: { title: "Wie das Produkt verifiziert wird", paragraphs: [
        "Das Repository testet Python-Dienste, React-Verhalten und die Rust-Desktop-Integration. Datenbankmigrationen durchlaufen Upgrade-, Downgrade- und erneute Upgrade-Zyklen. Backup-Tests prüfen die Versionen 1–4 ohne Änderungen und testen danach Austausch, Korruptionserkennung und verifizierten Rollback mit kurzlebigen lokalen Daten.",
        "Die Release-Automatisierung prüft außerdem Abhängigkeitslizenzen, SBOMs, Container und die Richtlinie für schwerwiegende Schwachstellen. Produkt-Touren werden in der echten Anwendung mit fiktiven Daten aufgenommen; der Recorder verwirft Browserfehler, fehlgeschlagene API-Antworten und sichtbare Warnungen.",
      ]},
      result: { title: "Was heute vorhanden ist", paragraphs: [
        "CareerOS Local ist eine funktionsfähige Desktop-Utility mit Karriere-Tresor, Lebenslauf-Studio, privater Opportunity-Pipeline, Bewerbungsdossiers, Backups, Exporten und einer überwachten lokalen Analyse-Laufzeit.",
        "Das Produkt behauptet nicht, ein LLM könne eine Karriere entscheiden. Das Modell hilft, einen eigenen Belegbestand auszuwerten; Datensatz, Quelle und letzte Entscheidung bleiben beim Benutzer.",
      ]},
      scope: "Diese Fallstudie beschreibt die eingecheckte Architektur und das dokumentierte Produktverhalten. Sie behauptet weder Beschäftigungsergebnisse noch Modellgenauigkeit auf privaten Benutzerdaten oder Unterstützung für jedes lokale Modell und jede Maschine.",
    }),
    "eliza-lab": localize("eliza-lab", {
      category: "Machine Learning",
      title: "Aus einem riskanten Chatbot-Prototyp wird ein prüfbares Open-Set-ML-Experiment",
      summary: "ELIZA Lab ist eine Rust-Pipeline zum lokalen Trainieren, Kalibrieren und Untersuchen eines Intent-Klassifikators. Sie ersetzt die irreführende Idee eines Therapie-Bots durch ein reproduzierbares, nicht klinisches Experiment, das sich enthalten kann.",
      facts: [["Produkt", "Lernorientierte ML-Pipeline und Browser-Labor"], ["Rolle", "ML-Protokoll, Rust-Implementierung und Sicherheitsneugestaltung"], ["Daten", "Versionierte synthetische Fixtures"], ["Status", "Reproduzierbares v3-Bundle, verschachteltes Auswahl-Audit und CLI"]],
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
      decisions: { title: "Entscheidungen für ein ehrliches Ergebnis", intro: "Das Projekt behandelt das Evaluationsprotokoll als Teil der Software.", items: [
        { title: "Semantische Familien einfrieren", body: "Die überwachte Fixture enthält 525 Zeilen in 105 gleich großen Prompt-Familien. Explizite Gruppen-IDs halten verwandte Formulierungen bei der Partitionierung zusammen.", tradeoff: "Die Fixture ist bewusst synthetisch und begrenzt; sie stützt Reproduzierbarkeit, keine Aussagen über reale klinische Sprache." },
        { title: "Unbekanntes von finalen Tests trennen", body: "Getrennte OOD-Entwicklungs- und OOD-Testpopulationen erlauben die Auswahl der Enthaltungsrichtlinie vor ihrer finalen Bewertung.", tradeoff: "Das Protokoll braucht mehr Fixtures und Buchführung, doch die finale Messung gehört nicht mehr zur Abstimmung." },
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
      scope: "Alle genannten Datensatzgrößen und Protokolldetails stammen aus der versionierten Repository-Dokumentation. Der synthetische Korpus belegt weder klinische Validität noch breite Sprachabdeckung oder Produktionsreife.",
    }),
    "djenis-ai-agent": localize("djenis-ai-agent", {
      category: "Agentensysteme",
      title: "Computerautomatisierung, die ihre Berechtigungen vor dem Handeln offenlegt",
      summary: "DjenisAiAgent beobachtet eine Windows- oder Browseroberfläche, fordert eine einzelne strukturierte Gemini-Aktion an, prüft sie gegen Laufzeitberechtigungen und übergibt das verifizierte Ergebnis an den nächsten Turn.",
      facts: [["Produkt", "Experimenteller Computer-Use-Agent"], ["Rolle", "Architektur, Policy-Schicht und Implementierung"], ["Laufzeit", "Natives Windows oder browserorientiertes Docker"], ["Status", "Funktionsfähige Alpha mit begrenzten Fähigkeiten"]],
      evidence: { title: "Evidenzprotokoll", intro: "Die Aussagen zur Alpha beruhen auf geprüften Grenzen statt auf Anekdoten autonomer Aufgaben:", items: [
        ["Verifikation", "155 Unit-Test-Deklarationen und ein Repository-Coverage-Gate von 70%."],
        ["Aufgabengrenzen", "Standardmäßig 50 Turns, 900 Sekunden pro Aufgabe, 120 Sekunden pro Modellabfrage und 45 Sekunden pro Aktion."],
        ["Control Plane", "Mindestens 24 Zeichen langes Operator-Token, standardmäßig höchstens acht WebSockets und zwei native Streams."],
        ["Grenze", "Gemini ist eine Cloud-Abhängigkeit; Docker kann den Host-Desktop nicht steuern, und native Zuverlässigkeit hängt von UI-Zugänglichkeit und Fokus ab."],
      ]},
      starting: { title: "Das Automatisierungsproblem", paragraphs: [
        "Ein Computer-Use-Zyklus wird gefährlich, wenn Modellvorschlag und Programmbefugnis als dasselbe behandelt werden. Ein Prompt kann ein Ziel beschreiben; er darf nicht stillschweigend Zugriff auf Dateisystem, Shell oder Desktop gewähren.",
        "Das Projekt musste nur Fähigkeiten zeigen, die die aktuelle Laufzeit wirklich unterstützt, eine vom Operator gewählte Berechtigungsstufe durchsetzen und nach jeder Aktion eine Beobachtung verlangen.",
      ]},
      constraints: { title: "Die von der Laufzeit erzwungenen Grenzen", intro: "Der Agent ist um ausdrückliche Beschränkungen gebaut:", items: [
        "Die Standardstufe observe stellt Laufzeitprüfungen und schreibgeschützten Dateizugriff innerhalb freigegebener Pfade bereit.",
        "Desktop-, Browser-, Datei- und Systemwerkzeuge erscheinen nur, wenn Laufzeit und Berechtigungsstufe sie beide erlauben.",
        "Es gibt keine universelle Shell. Der begrenzte Programmstarter ruft genau ein freigegebenes Programm direkt auf und verwirft Pipelines, Substitutionen und Befehlsketten.",
        "Eine Aufgabe darf erst als abgeschlossen gelten, wenn der Orchestrierungszyklus eine verifizierte Beobachtung nach der Aktion besitzt.",
      ]},
      diagnosis: { title: "Schlussfolgern und Befugnis trennen", paragraphs: [
        "Das Modell soll entscheiden, welche deklarierte Aktion es anfordern möchte. Es soll nicht bestimmen, ob diese erlaubt ist, wie lange sie laufen darf oder wie viel Ausgabe in den nächsten Prompt gelangt.",
        "Ich habe diese Entscheidungen in ein richtliniengeschütztes Tool-Register und eine begrenzte Orchestrierungsschicht verlegt. Unbekannte Werkzeuge schlagen fehl, Wiederholungen und Aufgabendauer sind beschränkt, und Audit-Ereignisse werden vor dem Schreiben redigiert.",
      ]},
      architecture: { title: "Ein Zyklus, der beobachtet, entscheidet, prüft und verifiziert", intro: "Die Wahrnehmung erfasst Screenshot oder Accessibility Tree. Gemini liefert genau einen deklarierten Funktionsaufruf. Die Policy-Schicht prüft Laufzeitunterstützung, Stufe und Allowlists, bevor ein Werkzeug läuft. Die resultierende Beobachtung wird zur Evidenz des nächsten Turns.", labels: ["WAHRNEHMUNG", "GEMINI TOOL CALL", "POLICY-GATE", "AKTION", "VERIFIZIERTE BEOBACHTUNG"], caption: "Das Modell schlägt vor; die Laufzeit entscheidet, welche Befugnis tatsächlich besteht." },
      decisions: { title: "Entscheidungen zur Verringerung der Angriffsfläche", intro: "Fähigkeiten sind Konfiguration und Code, keine Prompt-Etikette.", items: [
        { title: "Das Register zur Laufzeit aufbauen", body: "Nicht unterstützte Werkzeuge werden weggelassen, statt sie anzubieten und erst nach der Auswahl durch das Modell scheitern zu lassen.", tradeoff: "Das Modell sieht weniger Werkzeuge; das ist besser, als in jeder Umgebung dieselben Befugnisse vorzutäuschen." },
        { title: "Unabhängige Gates verwenden", body: "Systemwerkzeuge verlangen die Stufe system und ein separates Bestätigungsflag für gefährliche Aktionen sowie Allowlists für Pfade, Anwendungen und Programme.", tradeoff: "Die Einrichtung dauert länger, aber ein einziger breiter Schalter kann nicht alle folgenreichen Aktionen freigeben." },
        { title: "Die lokale Konsole authentifizieren", body: "Die Web-Control-Plane tauscht ein Operator-Token gegen eine kurzlebige HttpOnly-Sitzung und begrenzt Herkunft, Rate, Uploads und Parallelität.", tradeoff: "Sie bleibt eine lokale Control Plane in einem Prozess, kein öffentlicher Multi-Tenant-Dienst." },
      ]},
      delivery: { title: "Laufzeit- und Release-Verifikation", paragraphs: [
        "Portable Tests laufen unter Linux, während Windows CI desktopbezogene Abdeckung prüft. Statische Analyse, Abhängigkeits-Audit, Site-Validierung und Docker-Smoke-Tests decken die übrigen Auslieferungspfade ab.",
        "Container-Releases werden erst nach Vulnerability-, SBOM- und Provenance-Prüfungen ausschließlich per Digest freigegeben. Native Desktop-Steuerung bleibt bewusst außerhalb von Docker; die öffentliche Pages-Site ist eine Präsentation, keine Operator-Konsole.",
      ]},
      result: { title: "Was die Alpha belegt", paragraphs: [
        "Der Agent kann deklarierte Desktop- und Browserwerkzeuge in einem Zyklus bedienen, dessen Befugnisse außerhalb der Modellantwort sichtbar und begrenzt sind.",
        "Er beansprucht keine allgemeine Autonomie. UI-Qualität, Fensterfokus, Drittanbieterlatenz und Canvas-lastige Oberflächen begrenzen weiterhin die Zuverlässigkeit; das Projekt gehört deshalb in kurzlebige oder sorgfältig eingegrenzte Umgebungen.",
      ]},
      scope: "Diese Fallstudie beschreibt die dokumentierte Alpha-Implementierung. Sie behauptet weder sicheren unbeaufsichtigten Betrieb noch vollständigen Schutz vor den eigenen Flags eines freigegebenen Programms oder Unterstützung jeder Windows-Anwendung.",
    }),
    "dig-gopher-explorer": localize("dig-gopher-explorer", {
      category: "Protokollwerkzeuge",
      title: "Gopher als klar begrenzte, prüfbare lokale Arbeitsumgebung",
      summary:
        "DIG 3.0.0 ist ein echter Gopher-Client mit drei klar getrennten Oberflächen: einer CLI über TCP, einem Live-Explorer hinter einem lokalen Same-Origin-Gateway und einer GitHub-Pages-Ausgabe ausschließlich mit Fixtures. Der gemeinsame Kern verarbeitet RFC-1436-Antworten und RFC-4266-Adressen, ohne vorzugeben, dass eine statische Browserseite rohe Sockets öffnen kann.",
      facts: [
        ["Produkt", "Gopher-CLI, lokales Gateway und Browser-Explorer"],
        ["Protokoll", "RFC-1436-Anfragen, Menüs und Text; RFC-4266-URLs und Suche"],
        ["Sicherheit", "Fail-closed-Zielrichtlinie mit DNS-Pinning"],
        ["Status", "Open-Source-Version 3.0.0 unter der MIT-Lizenz"],
      ],
      evidence: {
        title: "Evidenzprotokoll",
        intro: "Die Aussagen zu Version 3.0.0 sind an ausführbare Prüfungen und sichtbare Grenzen gebunden:",
        items: [
          ["Verifikation", "90 Node.js-Tests und vier Chromium-E2E-Tests bestehen, einschließlich des vollständigen Live-Pfads bei exakt 320 px Viewport-Breite."],
          ["Netzrichtlinie", "Der Hosted-Modus verlangt ein Zugriffstoken, verwirft einen Hostnamen, sobald eine DNS-Antwort nicht öffentlich ist, und verbindet sich nur mit der bereits geprüften Adresse."],
          ["Ausgabeintegrität", "Die CLI schreibt über eine temporäre Datei im selben Verzeichnis und macht den Zielpfad atomar sichtbar; binäre Bytes gelangen nie in ein interaktives Terminal."],
          ["Laufzeit", "Das Abhängigkeitsaudit meldet null Schwachstellen, und das produktive Docker-Image besteht den Laufzeit-Smoke-Test als unprivilegierter Prozess."],
          ["Öffentliche Grenze", "GitHub Pages liefert den Explorer ausschließlich mit eingecheckten Fixtures aus. Live-Gopher-Anfragen benötigen das Same-Origin-Gateway."],
        ],
      },
      starting: {
        title: "Der Abstand zwischen Protokollskizze und brauchbarem Client",
        paragraphs: [
          "Die frühere Oberfläche konnte ein Gopher-Menü veranschaulichen, belegte aber nicht die entscheidenden Teile: wie ein Selector als Bytes auf dem Socket landet, wo Text-Framing endet oder was geschieht, wenn ein Server hängt, einen falschen Typ meldet oder Binärdaten zurückgibt.",
          "Version 3.0.0 baut das Projekt um den echten Anfragepfad neu auf. Die CLI öffnet begrenzte TCP-Verbindungen. Der lokale Browser verwendet denselben Client über ein Same-Origin-Gateway. Pages bleibt auf Fixtures beschränkt, weil Browser-JavaScript den für Gopher nötigen rohen TCP-Socket nicht erstellen kann.",
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
        title: "Ein Abrufpfad, zwei Live-Oberflächen",
        intro:
          "Eine Gopher-URL und eine optionale Suchanfrage durchlaufen URL-Prüfung, Zielrichtlinie und eine begrenzte TCP-Verbindung zur fest geprüften Adresse. Danach verarbeitet der gemeinsame RFC-Parser die Antwort. Die CLI zeigt oder speichert sie direkt; das Same-Origin-Gateway liefert dem Browser-Explorer ein typisiertes Ergebnis.",
        labels: ["URL + SUCHE", "ZIELRICHTLINIE", "GEPINNTES TCP", "RFC-PARSER", "CLI + EXPLORER"],
        caption: "CLI und lokaler Explorer teilen den echten Protokollpfad; Pages endet an der Fixture-Grenze.",
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
            title: "Live-Anfragen auf Same-Origin begrenzen",
            body: "Das Gateway liefert Oberfläche und JSON-API gemeinsam aus und prüft Origin, Body-Form, Rate und Größe vor jedem Gopher-Abruf. Pages bietet denselben Explorer über Fixtures, ohne Live- oder Cross-Origin-Zugriff.",
            tradeoff: "Eine Live-Ressource braucht das lokale oder bewusst gehostete Gateway; die öffentliche Site bleibt statisch statt zu einer wiederverwendbaren Proxy-API zu werden.",
          },
          {
            title: "Antwortbytes unverändert erhalten",
            body: "Rohdatenansicht ist bei Text und Menüs optional. Binärressourcen behalten exakte Bytes, Bytezahl und SHA-256-Digest; der Browser lädt sie herunter und die CLI speichert sie atomar.",
            tradeoff: "Exaktheit braucht getrennte Text- und Binärpfade, verhindert aber stille UTF-8-Verfälschung und unvollständige Zieldateien.",
          },
        ],
      },
      delivery: {
        title: "Wie Version 3.0.0 geprüft wird",
        paragraphs: [
          "Die 90 Node.js-Tests decken RFC-Parsing, echte TCP-Fixtures, Netzrichtlinie, HTTP-Vertrag, atomare CLI-Ausgabe, statische Assets und Release-Regeln ab. Vier Chromium-Abläufe steuern den Explorer über das lokale Gateway und prüfen Suche, Verlauf, Lesezeichen, Rohdatenansicht, Export, Binärdownload und das 320-px-Layout.",
          "Das Release-Gate führt außerdem ein Abhängigkeitsaudit mit null Schwachstellen aus und startet das unprivilegierte Docker-Image für einen Laufzeit-Smoke-Test. Das Projekt steht unter MIT; Pages bleibt statisch, während der Container ausschließlich das authentifizierte Hosted-Gateway startet.",
        ],
      },
      result: {
        title: "Was heute funktioniert",
        paragraphs: [
          "Im Terminal lassen sich reale Menüs, Texte, Suchergebnisse und gängige Binärtypen abrufen, Hashes und Größen prüfen oder exakte Bytes speichern, ohne eine teilweise geschriebene Zieldatei offenzulegen. Der lokale Explorer ergänzt denselben Live-Pfad um Verlauf, Lesezeichen, Suchformulare, Rohdatenprüfung, JSON-Export und Binärdownload.",
          "DIG macht aus Gopher kein HTTP. Der Verkehr zum Gopher-Server bleibt unverschlüsselt, Pages ruft keine Live-Ressourcen ab, und Gopher+, TLS, Telnet-Sitzungen sowie rekursives Crawling bleiben außerhalb des unterstützten Vertrags.",
        ],
      },
      scope:
        "Diese Fallstudie beschreibt die geprüfte Implementierung von Version 3.0.0: RFC-1436-Framing für Menüs und Text, RFC-4266-URLs und Suche, gängige Binärtypen, begrenztes TCP, ein Same-Origin-Gateway und den fixturebasierten Pages-Explorer. UTF-8 ist die unterstützte Kodierung für URL-Felder; Serverauthentifizierung und verschlüsselter Gopher-Transport gehören nicht zum Projekt.",
    }),
    integradraw: localize("integradraw", {
      category: "Computergestützte Mathematik",
      title: "Zwei Werkzeuge für numerische Integration mit einem gemeinsamen Korpus konsistent halten",
      summary: "IntegraDraw ist eine Java-Desktop- und TypeScript-Canvas-Umgebung zum Vergleich von Mittelpunkt- und Trapezsummen mit einer Simpson-Referenz. Beide Laufzeiten teilen versionierte numerische Fälle und ausdrückliche Toleranzen.",
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
      decisions: { title: "Entscheidungen für mathematische Klarheit", intro: "Die Umgebung bezeichnet Näherung als Näherung.", items: [
        { title: "Eine begrenzte Ausdruckssprache nutzen", body: "Der Browser akzeptiert x, Konstanten, Arithmetik, Klammern und eine dokumentierte Funktionsmenge über einen eigenen Parser.", tradeoff: "Das ist sicherer und verständlicher als beliebiges JavaScript, aber bewusst weniger ausdrucksstark." },
        { title: "Die Referenz korrekt benennen", body: "Der Webvergleich verwendet die zusammengesetzte Simpson-Regel mit 8.192 Teilintervallen und nennt sie Referenz statt exaktes Ergebnis.", tradeoff: "Einige unstetige oder nicht endliche Funktionen werden abgelehnt; das Projekt ist kein symbolisches Beweissystem." },
        { title: "Beobachtbares Verhalten gegenprüfen", body: "Java- und TypeScript-Tests verwenden dieselben versionierten Fälle und halten ihre numerischen Toleranzen sichtbar.", tradeoff: "Der Korpus muss bewusst weiterentwickelt werden, wenn sich der unterstützte mathematische Vertrag ändert." },
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
      summary: "VECTOR 3.0.0 ist ein White-Label-System für Praktikumsabläufe, das eine Schule auf der eigenen Infrastruktur betreiben kann. Kohorten, Schüler, Betriebe, Einsätze, Stunden, Check-ins und Nachweise laufen in einem servergestützten Arbeitsablauf zusammen; die API setzt die Zugriffsregeln durch.",
      facts: [["Produkt", "Selbst betriebene White-Label-Praktikumsverwaltung"], ["Rolle", "Clean-Room-Produkt, Architektur und Implementierung"], ["Betrieb", "Eine Schule pro Installation"], ["Status", "Open-Source-Version 3.0.0 unter der MIT-Lizenz"]],
      evidence: { title: "Evidenzprotokoll", intro: "Das Repository der Version 3.0.0 verknüpft seine Produktversprechen mit konkreten Kontrollen:", items: [
        ["Zugriff", "Berechtigungen für Administratoren, Koordinatoren, Tutoren und Leser werden auf dem Server geprüft. Der erste Administrator muss das temporäre Passwort ändern, bevor operative Daten zugänglich sind."],
        ["Datensätze", "SQLite läuft im WAL-Modus hinter expliziten Migrationen. Revisionsprüfungen verhindern, dass ein Operator die Änderungen eines anderen unbemerkt überschreibt."],
        ["Ablauf", "Bereitschaftsregeln und Zustandswechsel steuern Einsätze, bestätigte oder stornierte Stunden, Check-ins und Nachweise, die ohne Verlust ihrer Historie ersetzt werden können."],
        ["Governance", "Audit-Metadaten enthalten keine personenbezogenen Felder. Aufbewahrungsläufe beachten Sperren auf Schülerebene und verlangen vor begrenzten Löschbatches den exakten Fingerabdruck der Vorschau."],
        ["Auslieferung", "Der Release-Pfad erzeugt ein reproduzierbares Quellartefakt, prüft es nach dem Entpacken und testet Sicherung, Inspektion, Wiederherstellung und Datenbankverdichtung an der paketierten Anwendung."],
      ]},
      starting: { title: "Das operative Problem", paragraphs: [
        "Praktikumsverwaltung ist mehr als ein Dashboard. Eine Schule koordiniert Kohorten, Schüler, Betriebe, Tutoren, Termine, Stunden, Check-ins und unterschriebene Nachweise. Unterschiedliche Rollen benötigen unterschiedliche Ausschnitte desselben Datensatzes, und eine Korrektur darf den früheren Stand nicht auslöschen.",
        "Die frühere akademische Implementierung eignete sich nicht als Produktbasis. Ich habe VECTOR von Grund auf neu gebaut und nur den Praktikumsbereich als fachliche Referenz verwendet. Weder Legacy-Code noch personenbezogene Datensätze, Namen oder Assets gelangten in das neue Repository.",
      ]},
      constraints: { title: "Was ein schuleigenes System gewährleisten muss", intro: "Die Architektur beginnt mit vier praktischen Vorgaben:", items: [
        "Jede Installation gehört zu genau einer Schule, die Datenbank, Erscheinungsbild, Sicherungen und Betrieb kontrolliert.",
        "Berechtigungen und Tutorenzuständigkeit müssen auf dem Server greifen, bevor Datensätze ausgewählt, gezählt oder exportiert werden.",
        "Bestätigte Stunden und unterschriebene Nachweise benötigen ausdrückliche Korrekturwege, die den ursprünglichen Datensatz erhalten.",
        "Import, Export, Aufbewahrung und Wiederherstellung müssen begrenzt, prüfbar und nach einem Fehler sicher wiederholbar sein.",
      ]},
      diagnosis: { title: "Zuerst die Eigentumsgrenze festlegen", paragraphs: [
        "Mehr Zustand im Browser hätte die schwierigen Fragen offengelassen. Rollenprüfungen könnten in der Oberfläche verborgen bleiben, die gesamte Schule könnte in den Speicher geladen und ein geändertes Feld so behandelt werden, als hätte der frühere Wert nie existiert.",
        "VECTOR verwendet eine Schule pro Installation, statt einen gemeinsamen mandantenfähigen Dienst aufzubauen. Die operative Verantwortung bleibt eindeutig; Sicherung, Aufbewahrung und White-Label-Konfiguration lassen sich leichter nachvollziehen. Das Projekt liefert Software aus, keine verwaltete Cloud-Plattform.",
      ]},
      architecture: { title: "Ein kompakter Server mit klaren Grenzen", intro: "Der Browser-Arbeitsbereich spricht mit einer Express-API, die Anmeldung, Rollen und Zustandswechsel verwaltet. SQLite speichert die Datensätze einer Schule im WAL-Modus. Undurchsichtige AES-GCM-Cursor binden die Seitennavigation an Schule, Zuständigkeit und aktive Filter; begrenzte Suchendpunkte verhindern, dass Formulare ganze Tabellen laden.", labels: ["BROWSER-ARBEITSBEREICH", "EXPRESS POLICY LAYER", "SQLITE WAL", "AUDIT + AUFBEWAHRUNG", "SICHERUNG + RELEASE"], caption: "Der Server entscheidet, was ein Operator sehen und ändern darf; der Browser stellt diese Entscheidung dar." },
      decisions: { title: "Entscheidungen für einen sichereren Arbeitsalltag", intro: "Das Produkt bevorzugt sichtbare Regeln gegenüber bequemem, verborgenem Zustand.", items: [
        { title: "Zuständigkeit vor Seitennavigation", body: "Jede Liste wendet Schule und Rolle vor dem Limit an. Authentifizierte undurchsichtige Cursor binden diesen Geltungsbereich an Filter und eine stabile Sortierposition. Suchendpunkte liefern nur eine kleine Menge geeigneter Datensätze.", tradeoff: "Die Oberfläche kann keine unbegrenzte Tabelle in einer Anfrage laden. Die vollständige Entnahme erfolgt über einen getrennten, gefilterten Export mit höchstens 10.000 Zeilen." },
        { title: "Nachweise korrigieren, ohne Historie umzuschreiben", body: "Bereitschaftsregeln steuern die Zustandswechsel eines Einsatzes. Stunden werden bestätigt oder storniert; ein unterschriebenes Dokument wird durch einen neuen Datensatz ersetzt, nicht nachträglich verändert.", tradeoff: "Der Operator muss einen ausdrücklichen Korrekturschritt ausführen, dafür bleibt die Abfolge der Entscheidungen nachvollziehbar." },
        { title: "Massenänderungen geschlossen abbrechen", body: "CSV-Importe validieren die gesamte Datei innerhalb einer Transaktion. Aufbewahrungsvorschauen zeigen gesperrte Datensätze, verbleibende Arbeit und einen exakten Fingerabdruck; die Ausführung lehnt veraltete Vorschauen ab und löscht in begrenzten Batches.", tradeoff: "Große Verwaltungsänderungen benötigen eine bewusste Vorschau und manchmal mehrere Läufe. Das ist besser als ein Teilimport oder eine ungeprüfte Massenlöschung." },
      ]},
      delivery: { title: "Self-Hosting und Wiederherstellung", paragraphs: [
        "Schulen können Name, Farben, Logo und Supportdaten mit Revisionsschutz für gleichzeitige Änderungen festlegen. Das Docker-Image läuft als unprivilegierter Benutzer und unterstützt ein schreibgeschütztes Root-Dateisystem. Health- und Doctor-Befehle zeigen Konfigurations- und Speicherprobleme vor dem normalen Betrieb.",
        "Die Backup-Werkzeuge erstellen einen privaten SQLite-Snapshot, prüfen ihn ohne Anwendungsstart, stellen ihn über einen geschützten Wartungspfad wieder her und verdichten die Datenbank bei Bedarf. Die Release-Automatisierung baut das Quellpaket zweimal, prüft Inventar und Commit, sucht nach Geheimnissen, installiert aus dem entpackten Artefakt und führt dort die Abnahme aus.",
      ]},
      result: { title: "Was VECTOR heute unterstützt", paragraphs: [
        "Eine Schule kann Kohorten, Schüler, Betriebe, Zeiträume und Einsätze verwalten; Stunden bestätigen; Check-ins erfassen; Dokumenthistorien bewahren; zuständige Audit-Ereignisse prüfen; Daten atomar importieren und einen gefilterten operativen Stand exportieren. Administratoren können einen Schüler außerdem von der Aufbewahrungslöschung ausnehmen, bevor ältere Datensätze entfernt werden.",
        "VECTOR ist selbst betriebene Open-Source-Software. Es ist kein verwaltetes SaaS und beansprucht weder Compliance-Zertifizierung noch Hochverfügbarkeit oder SSO. Für Institutionen mit solchen Anforderungen bleiben diese Punkte Produkt- und Betriebsarbeit.",
      ]},
      scope: "Diese Fallstudie beschreibt die eingecheckte Architektur der Version 3.0.0 und ihre Self-Hosting-Kontrollen. GitHub Pages präsentiert das Produkt ohne operative Daten; die eigentliche Anwendung läuft aus dem Serverpaket. Reale Schuldaten, institutionelle Integrationen und Praktikumsergebnisse werden nicht dargestellt.",
    }),
  },
  fr: {
    "careeros-local": localize("careeros-local", {
      category: "Produit local-first",
      title: "Construire un espace de travail privé pour sa carrière, fondé sur des preuves plutôt que sur des affirmations générées",
      summary: "CareerOS Local associe une application de bureau Tauri, un sidecar FastAPI, un coffre SQLite versionné et un runtime LLM local obligatoire. Les faits sources, les documents et les analyses restent ainsi sur l’appareil de l’utilisateur.",
      facts: [["Produit", "Utilitaire de bureau open source"], ["Rôle", "Produit, architecture et implémentation"], ["Périmètre de confiance", "Appareil local par défaut"], ["État", "Version v1.6.0 signée avec pipeline de publication vérifié"]],
      evidence: { title: "Registre des preuves", intro: "Le dépôt actuel consigne ces vérifications et limites reproductibles :", items: [
        ["Backend", "1 369 tests réussis pour la v1.6.0 ; une revue indépendante a rejoué 42 tests de portabilité et de stockage."],
        ["Frontend + shell", "334 tests frontend dans 64 fichiers et 17 tests de bibliothèque Rust réussis, dont le writer natif de sauvegarde."],
        ["Assurance des sauvegardes", "Les archives des versions 1 à 4 subissent un preflight complet sans mutation ; la réponse contient des métadonnées bornées, pas le contenu de l’archive."],
        ["Fixture à grande échelle", "Une fixture d’agenda de 10 000 candidatures mesure un p95 de 68,670 ms face au budget projet de 200 ms."],
        ["Limite", "Les reçus locaux ne protègent pas contre un processus capable d’écrire directement dans la base ; les imports non signés sont mis en quarantaine."],
      ]},
      starting: { title: "Le problème produit", paragraphs: [
        "Les informations professionnelles se dispersent souvent entre d’anciens CV, des plateformes d’emploi, des notes et des portails de candidature. Les outils AI génériques ajoutent un risque : une réponse soignée peut perdre le lien avec le fait qui la justifie.",
        "CareerOS Local a d’abord été conçu comme un registre de travail. Expériences, formations, compétences et réalisations conservent leur provenance, leur état de vérification et leur historique. Le LLM analyse ensuite ce registre maîtrisé pour le matching et le coaching, au lieu d’inventer un second profil déconnecté.",
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
      decisions: { title: "Les choix qui en font un véritable utilitaire", intro: "Le produit utile est le workflow complet construit autour du modèle.", items: [
        { title: "Conserver la provenance dans le registre", body: "Les faits professionnels gardent leur source, leur état de vérification et leurs révisions. Le CV et les preuves de candidature peuvent remonter à ce registre.", tradeoff: "Cette structure est plus exigeante qu’un profil libre, mais elle rend possibles les corrections et les audits." },
        { title: "Exiger l’analyse locale", body: "Le matching et le coaching restent bloqués jusqu’à ce que le runtime local approuvé soit prêt. L’application n’envoie jamais la tâche à un modèle distant par commodité.", tradeoff: "La première configuration est plus lourde et dépend du matériel, mais la limite de confidentialité reste honnête." },
        { title: "Regrouper les candidatures comme preuves", body: "CV versionnés, réponses, correspondances d’exigences et fichiers vérifiés s’exportent avec un manifeste SHA-256 canonique.", tradeoff: "Un dossier demande plus de rigueur qu’un répertoire de fichiers épars ; il est aussi reproductible et vérifiable." },
      ]},
      delivery: { title: "Comment le produit est vérifié", paragraphs: [
        "Le dépôt teste les services Python, le comportement React et l’intégration de bureau Rust. Les migrations suivent des cycles upgrade, downgrade puis upgrade. Les tests inspectent les sauvegardes v1 à v4 sans mutation, puis vérifient remplacement, détection de corruption et rollback contrôlé sur des données locales temporaires.",
        "L’automatisation contrôle aussi les licences, les SBOM, les conteneurs et la politique de vulnérabilités critiques. Les captures du parcours produit proviennent de l’application réelle avec des données fictives ; l’enregistreur refuse les erreurs du navigateur, les réponses API en échec et les alertes visibles.",
      ]},
      result: { title: "Ce qui existe aujourd’hui", paragraphs: [
        "CareerOS Local est un utilitaire de bureau fonctionnel avec coffre de carrière, studio de CV, pipeline privé d’opportunités, dossiers de candidature, sauvegardes, exports et runtime supervisé d’analyse locale.",
        "Il ne prétend pas qu’un LLM puisse décider d’une carrière. Le modèle aide à interpréter un ensemble de preuves maîtrisé ; l’utilisateur conserve le registre, les sources et la décision finale.",
      ]},
      scope: "Cette étude de cas décrit l’architecture versionnée et le comportement documenté. Elle ne revendique ni résultats professionnels, ni précision du modèle sur des données privées, ni prise en charge de tous les modèles locaux et de toutes les machines.",
    }),
    "eliza-lab": localize("eliza-lab", {
      category: "Machine learning",
      title: "Transformer un prototype de chatbot risqué en expérience ML open-set vérifiable",
      summary: "ELIZA Lab est un pipeline Rust pour entraîner, calibrer et examiner localement un classificateur d’intentions. Il remplace la prémisse trompeuse d’un bot thérapeutique par une expérience reproductible, non clinique et capable de s’abstenir.",
      facts: [["Produit", "Pipeline ML pédagogique et laboratoire web"], ["Rôle", "Protocole ML, implémentation Rust et refonte de la sécurité"], ["Données", "Fixtures synthétiques versionnées"], ["État", "Bundle v3 reproductible, audit de sélection imbriqué et CLI"]],
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
      decisions: { title: "Les choix qui préservent l’honnêteté du résultat", intro: "Le protocole d’évaluation fait partie du logiciel.", items: [
        { title: "Geler les familles sémantiques", body: "La fixture supervisée contient 525 lignes dans 105 familles de prompts de taille égale. Des ID de groupe explicites gardent les formulations apparentées ensemble.", tradeoff: "La fixture est volontairement synthétique et bornée ; elle prouve la reproductibilité, pas la validité sur un langage clinique réel." },
        { title: "Séparer l’inconnu des tests finaux", body: "Des populations distinctes pour le développement OOD et le test OOD permettent de choisir la politique avant l’évaluation finale.", tradeoff: "Le protocole exige davantage de fixtures et de suivi, mais la mesure finale ne sert plus au réglage." },
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
      scope: "Toutes les tailles de dataset et tous les détails du protocole proviennent de la documentation versionnée. Le corpus synthétique n’établit ni validité clinique, ni large couverture linguistique, ni aptitude à la production.",
    }),
    "djenis-ai-agent": localize("djenis-ai-agent", {
      category: "Systèmes agentiques",
      title: "Construire une automatisation qui expose ses permissions avant d’agir",
      summary: "DjenisAiAgent observe une interface Windows ou web, demande une action Gemini structurée, la confronte aux permissions du runtime puis transmet le résultat vérifié au tour suivant.",
      facts: [["Produit", "Agent expérimental d’utilisation de l’ordinateur"], ["Rôle", "Architecture, couche de politique et implémentation"], ["Runtime", "Windows natif ou Docker orienté navigateur"], ["État", "Alpha fonctionnelle aux capacités bornées"]],
      evidence: { title: "Registre des preuves", intro: "Les affirmations reposent sur des limites vérifiées, pas sur des anecdotes d’autonomie :", items: [
        ["Vérification", "155 déclarations de tests unitaires et un seuil de couverture du dépôt de 70 %."],
        ["Limites des tâches", "Par défaut : 50 tours, 900 secondes par tâche, 120 secondes par requête modèle et 45 secondes par action."],
        ["Plan de contrôle", "Jeton opérateur d’au moins 24 caractères, huit WebSockets et deux flux natifs au maximum par défaut."],
        ["Limite", "Gemini est une dépendance cloud ; Docker ne contrôle pas le bureau hôte et la fiabilité native dépend de l’accessibilité et du focus."],
      ]},
      starting: { title: "Le problème d’automatisation", paragraphs: ["Une boucle computer use devient dangereuse si suggestion du modèle et autorité du programme se confondent. Un prompt décrit un objectif ; il ne doit pas accorder silencieusement l’accès aux fichiers, au shell ou au bureau.", "Le projet devait n’exposer que les capacités réellement disponibles, appliquer le niveau de permission choisi par l’opérateur et exiger une observation après chaque action."] },
      constraints: { title: "Les limites imposées par le runtime", intro: "L’agent repose sur des limites explicites :", items: ["Le niveau observe par défaut fournit des contrôles du runtime et un accès en lecture seule aux chemins approuvés.", "Les outils bureau, navigateur, fichiers et système n’apparaissent que si runtime et niveau de permission les autorisent.", "Il n’existe pas de shell généraliste. Le lanceur borné invoque directement un seul exécutable en allowlist et refuse pipelines, substitutions et chaînage.", "Une tâche n’est terminée qu’après une observation post-action vérifiée."] },
      diagnosis: { title: "Séparer raisonnement et autorité", paragraphs: ["Le modèle choisit l’action déclarée qu’il souhaite demander. Il ne décide ni de sa permission, ni de sa durée, ni de la quantité de sortie ajoutée au prompt suivant.", "J’ai placé ces décisions dans un registre d’outils protégé par politique et une orchestration bornée. Les outils inconnus échouent, les tentatives et la durée sont limitées, et les événements d’audit sont expurgés avant écriture."] },
      architecture: { title: "Une boucle qui observe, décide, autorise et vérifie", intro: "La perception capture une image ou l’arbre d’accessibilité. Gemini renvoie un appel de fonction déclaré. La politique vérifie runtime, niveau et allowlists avant exécution. L’observation obtenue devient la preuve du tour suivant.", labels: ["PERCEPTION", "GEMINI TOOL CALL", "CONTRÔLE DE POLITIQUE", "ACTION", "OBSERVATION VÉRIFIÉE"], caption: "Le modèle propose ; le runtime décide de l’autorité réelle." },
      decisions: { title: "Les choix qui réduisent la surface d’attaque", intro: "Les capacités relèvent de la configuration et du code, pas de la politesse du prompt.", items: [
        { title: "Construire le registre au runtime", body: "Les outils indisponibles sont omis au lieu d’être annoncés puis de tomber en échec après leur sélection.", tradeoff: "Le modèle voit moins d’outils, ce qui vaut mieux que de prétendre chaque environnement aussi puissant." },
        { title: "Utiliser des contrôles indépendants", body: "Les outils système exigent le niveau system, une confirmation séparée et des allowlists de chemins, applications et exécutables.", tradeoff: "La configuration prend plus de temps, mais un seul interrupteur ne peut pas exposer toutes les actions sensibles." },
        { title: "Authentifier la console locale", body: "Le plan de contrôle échange un jeton opérateur contre une session HttpOnly courte et limite origine, débit, uploads et concurrence.", tradeoff: "Il reste local et mono-processus, pas un service public multi-tenant." },
      ]},
      delivery: { title: "Vérification du runtime et des publications", paragraphs: ["Les tests portables tournent sous Linux et la CI Windows couvre les fonctions de bureau. Analyse statique, audit des dépendances, validation du site et smoke tests Docker vérifient les autres chemins de livraison.", "Les conteneurs ne sont promus par digest qu’après contrôles des vulnérabilités, SBOM et provenance. Le contrôle natif reste hors de Docker ; le site Pages est une présentation, pas une console opérateur."] },
      result: { title: "Ce que prouve l’alpha", paragraphs: ["L’agent utilise des outils déclarés dans une boucle dont l’autorité est visible et bornée en dehors de la réponse du modèle.", "Il ne revendique pas d’autonomie générale. Qualité de l’interface, focus, latence tierce et surfaces Canvas limitent encore sa fiabilité ; il doit rester dans un environnement jetable ou soigneusement borné."] },
      scope: "Cette étude reflète l’alpha documentée. Elle ne revendique ni fonctionnement autonome sûr, ni protection complète contre les options propres à un programme autorisé, ni compatibilité avec toutes les applications Windows.",
    }),
    "dig-gopher-explorer": localize("dig-gopher-explorer", {
      category: "Outils de protocole",
      title: "Faire de Gopher un outil local borné et inspectable",
      summary:
        "DIG 3.0.0 est un vrai client Gopher décliné en trois surfaces bien séparées : une CLI sur TCP, un explorateur web connecté derrière une passerelle locale same-origin et un site GitHub Pages alimenté uniquement par des fixtures. Le cœur partagé traite les réponses RFC 1436 et les adresses RFC 4266 sans prétendre qu’une page statique peut ouvrir des sockets bruts.",
      facts: [
        ["Produit", "CLI Gopher, passerelle locale et explorateur web"],
        ["Protocole", "Requêtes, menus et texte RFC 1436 ; URL et recherche RFC 4266"],
        ["Sécurité", "Politique de destination restrictive avec DNS pinning"],
        ["État", "Version open source 3.0.0 sous licence MIT"],
      ],
      evidence: {
        title: "Registre des preuves",
        intro: "Les affirmations sur la version 3.0.0 reposent sur des contrôles exécutables et des limites visibles :",
        items: [
          ["Vérification", "90 tests Node.js et quatre E2E Chromium réussissent, y compris le parcours connecté complet dans une fenêtre de 320 px exactement."],
          ["Politique réseau", "Le mode hébergé exige un jeton d’accès, refuse un nom d’hôte dès qu’une réponse DNS n’est pas publique et se connecte uniquement à l’adresse déjà validée."],
          ["Intégrité des sorties", "La CLI écrit dans un fichier temporaire du même répertoire puis rend le chemin final visible de façon atomique ; aucun octet binaire n’est imprimé dans un terminal interactif."],
          ["Runtime", "L’audit des dépendances signale zéro vulnérabilité et l’image Docker de production réussit son smoke test en tant que processus non privilégié."],
          ["Frontière publique", "GitHub Pages sert l’explorateur uniquement avec des fixtures versionnées. Les requêtes Gopher réelles passent nécessairement par la passerelle same-origin."],
        ],
      },
      starting: {
        title: "L’écart entre un schéma de protocole et un client utile",
        paragraphs: [
          "L’ancienne interface pouvait illustrer un menu Gopher, mais pas prouver l’essentiel : comment un selector devient des octets sur un socket, où se termine le framing du texte ou ce qui se passe lorsqu’un serveur distant se bloque, annonce un mauvais type ou renvoie du binaire.",
          "La version 3.0.0 reconstruit le projet autour du véritable chemin de requête. La CLI ouvre des connexions TCP bornées. Le navigateur local utilise le même client par une passerelle same-origin. Pages reste limité aux fixtures, car le JavaScript du navigateur ne peut pas créer le socket TCP brut dont Gopher a besoin.",
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
        title: "Un chemin d’accès, deux interfaces connectées",
        intro:
          "Une URL Gopher et son éventuelle recherche passent par la validation d’adresse, la politique de destination et une connexion TCP bornée vers l’adresse épinglée. La réponse entre ensuite dans le parser RFC partagé. La CLI l’affiche ou l’enregistre directement ; la passerelle same-origin renvoie un résultat typé à l’explorateur.",
        labels: ["URL + RECHERCHE", "POLITIQUE CIBLE", "TCP ÉPINGLÉ", "PARSER RFC", "CLI + EXPLORATEUR"],
        caption: "La CLI et l’explorateur local partagent le vrai chemin du protocole ; Pages s’arrête à la frontière des fixtures.",
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
            title: "Garder les requêtes réelles sur la même origine",
            body: "La passerelle sert l’interface et l’API JSON, puis contrôle origine, forme du corps, débit et taille avant tout accès Gopher. Pages propose le même explorateur sur fixtures, sans accès réel ni cross-origin.",
            tradeoff: "Une ressource réelle exige la passerelle locale ou volontairement hébergée ; le site public reste statique au lieu de devenir une API de proxy réutilisable.",
          },
          {
            title: "Préserver les octets de la réponse",
            body: "L’inspection brute reste facultative pour le texte et les menus. Les ressources binaires conservent leurs octets exacts, leur taille et leur empreinte SHA-256 ; le navigateur les télécharge et la CLI les enregistre atomiquement.",
            tradeoff: "L’exactitude impose des chemins séparés pour le texte et le binaire, mais évite la corruption UTF-8 silencieuse et les fichiers cibles incomplets.",
          },
        ],
      },
      delivery: {
        title: "Comment la version 3.0.0 est vérifiée",
        paragraphs: [
          "Les 90 tests Node.js couvrent le parsing RFC, de vraies fixtures TCP, la politique réseau, le contrat HTTP, la sortie atomique de la CLI, les ressources statiques et les règles de publication. Quatre parcours Chromium utilisent l’explorateur par la passerelle locale et vérifient recherche, historique, favoris, inspection brute, export, téléchargement binaire et mise en page à 320 px.",
          "Le contrôle de publication exécute aussi un audit des dépendances avec zéro vulnérabilité et démarre l’image Docker non privilégiée pour un smoke test du runtime. Le projet est distribué sous MIT ; Pages reste statique, tandis que le conteneur ne lance que la passerelle hébergée authentifiée.",
        ],
      },
      result: {
        title: "Ce qui fonctionne aujourd’hui",
        paragraphs: [
          "Dans le terminal, on peut récupérer de vrais menus, textes, résultats de recherche et types binaires courants, vérifier taille et empreinte ou enregistrer les octets exacts sans exposer un fichier cible partiel. L’explorateur local ajoute au même parcours l’historique, les favoris, les formulaires de recherche, l’inspection brute, l’export JSON et le téléchargement binaire.",
          "DIG ne transforme pas Gopher en HTTP. Le trafic vers le serveur Gopher reste en clair, Pages ne récupère aucune ressource réelle, et Gopher+, TLS, les sessions Telnet ainsi que le crawling récursif restent hors du contrat pris en charge.",
        ],
      },
      scope:
        "Cette étude décrit l’implémentation vérifiée de la version 3.0.0 : framing RFC 1436 des menus et textes, URL et recherche RFC 4266, types binaires courants, TCP borné, passerelle same-origin et explorateur Pages sur fixtures. UTF-8 est l’encodage pris en charge pour les champs URL ; le projet ne fournit ni authentification du serveur ni transport Gopher chiffré.",
    }),
    integradraw: localize("integradraw", {
      category: "Mathématiques computationnelles", title: "Maintenir deux outils d’intégration numérique cohérents grâce à un corpus partagé", summary: "IntegraDraw est un atelier Java desktop et TypeScript Canvas qui compare sommes des milieux et des trapèzes à une référence Simpson. Les deux runtimes partagent des cas versionnés et des tolérances explicites.",
      facts: [["Produit", "Atelier visuel de calcul"], ["Rôle", "Refonte multi-runtime et release engineering"], ["Runtimes", "Java 17 desktop et TypeScript web"], ["État", "Application web fonctionnelle et JAR exécutable"]],
      evidence: { title: "Registre des preuves", intro: "Le contrat numérique est assez petit pour être énuméré :", items: [["Corpus golden", "Six cas d’intégrales, trois expressions invalides et sept cas de validation sous le schéma version 1."], ["Vérification", "22 déclarations JUnit et 80 TypeScript dans la version auditée."], ["Référence", "La comparaison Simpson composite du navigateur utilise 8 192 sous-intervalles."], ["Limite", "La référence n’est pas exacte ; discontinuités et expressions non finies peuvent être rejetées et les limites des runtimes diffèrent volontairement."]] },
      starting: { title: "Le problème de cohérence", paragraphs: ["Un outil numérique peut sembler convaincant alors que deux implémentations divergent sur le nombre d’intervalles, l’aire signée ou les fonctions invalides. IntegraDraw avait un passé Java et devait gagner une édition web sans devenir deux calculatrices distinctes.", "La refonte explicite le contrat : nombre exact d’intervalles demandé, résultats signés, erreur visible et rejet clair des entrées non finies."] },
      constraints: { title: "Ce sur quoi les runtimes doivent s’accorder", intro: "L’interface n’est utile que si les règles restent stables :", items: ["Les méthodes du milieu et des trapèzes utilisent exactement le nombre de segments saisi.", "Une aire négative reste négative.", "La valeur de comparaison est une référence Simpson, jamais un résultat symbolique exact.", "Le parser web n’utilise ni eval ni Function."] },
      diagnosis: { title: "Un contrat au-dessus des implémentations", paragraphs: ["Partager le code Java et TypeScript créerait un pont maladroit sans prouver grand-chose. Partager le comportement attendu est plus utile.", "J’ai introduit un corpus golden versionné consommé par JUnit et Vitest. Tolérances et limites propres aux runtimes restent visibles."] },
      architecture: { title: "Deux interfaces, un même référentiel numérique", intro: "Java distribue une interface Swing et le cœur numérique dans un JAR. Le web utilise un parser sans dépendance, des routines TypeScript et un tracé Canvas responsive. Les deux vérifient le corpus partagé.", labels: ["FONCTION UTILISATEUR", "PARSER SÛR", "CŒUR NUMÉRIQUE", "CORPUS GOLDEN", "UI JAVA + CANVAS"], caption: "Les implémentations restent distinctes ; leur contrat observable est partagé." },
      decisions: { title: "Les choix qui clarifient les mathématiques", intro: "L’atelier appelle une approximation une approximation.", items: [{ title: "Borner le langage d’expressions", body: "Le navigateur accepte x, constantes, arithmétique, parenthèses et fonctions documentées via son propre parser.", tradeoff: "C’est plus sûr que du JavaScript arbitraire, mais volontairement moins expressif." }, { title: "Nommer correctement la référence", body: "La comparaison utilise Simpson composite avec 8 192 sous-intervalles et parle de référence, pas de résultat exact.", tradeoff: "Certaines fonctions sont refusées ; ce n’est pas un système de preuve symbolique." }, { title: "Comparer le comportement observable", body: "Les tests Java et TypeScript utilisent les mêmes cas en gardant leurs tolérances visibles.", tradeoff: "Le corpus doit évoluer délibérément avec le contrat mathématique." }] },
      delivery: { title: "Distribuer les deux applications", paragraphs: ["La CI compile Java 17, exécute JUnit, construit et teste le JAR, puis vérifie, teste et compile TypeScript. Les candidats incluent bundle web et SBOM des deux runtimes.", "La publication compare des builds indépendants, valide les inventaires et contrôle manifestes SHA-256 et attestations GitHub."] },
      result: { title: "Ce que l’atelier rend visible", paragraphs: ["L’utilisateur modifie fonction, intervalle et segments puis compare estimations, courbe et référence Simpson.", "Les applications restent autonomes ; le corpus offre aux mainteneurs un lieu unique pour contrôler la promesse numérique."] },
      scope: "IntegraDraw est un outil pédagogique exploratoire. Il ne fournit ni intégration symbolique, ni preuve, ni gestion garantie des discontinuités, ni résultat exact pour une fonction arbitraire.",
    }),
    "vector-placement-operations": localize("vector-placement-operations", {
      category: "Logiciel de gestion scolaire", title: "Concevoir un système de stages que chaque école peut héberger et maîtriser", summary: "VECTOR 3.0.0 est un système white label de gestion des stages qu’une école peut exploiter sur sa propre infrastructure. Cohortes, élèves, organismes d’accueil, affectations, heures, suivis et justificatifs partagent un même flux côté serveur, avec des règles d’accès appliquées par l’API.",
      facts: [["Produit", "Gestion white label des stages en auto-hébergement"], ["Rôle", "Produit, architecture et implémentation en clean room"], ["Déploiement", "Une école par installation"], ["État", "Version open source 3.0.0 sous licence MIT"]],
      evidence: { title: "Registre des preuves", intro: "Le dépôt de la version 3.0.0 rattache ses promesses produit à des contrôles concrets :", items: [["Accès", "Le serveur vérifie les droits des administrateurs, coordinateurs, tuteurs et lecteurs. L’administrateur initial doit remplacer son mot de passe temporaire avant d’accéder aux données opérationnelles."], ["Données", "SQLite fonctionne en mode WAL derrière des migrations explicites. Les contrôles de révision empêchent un opérateur d’écraser silencieusement les changements d’un autre."], ["Flux", "Les critères de préparation et les transitions couvrent les stages, les heures validées ou annulées, les suivis et les justificatifs, qui peuvent être remplacés sans effacer leur historique."], ["Gouvernance", "Les métadonnées d’audit excluent les champs personnels. La rétention respecte les blocages placés sur les élèves et exige l’empreinte exacte de l’aperçu avant chaque lot de suppression limité."], ["Livraison", "Le parcours de publication construit une archive source reproductible, la vérifie après extraction et teste sauvegarde, inspection, restauration et compactage sur l’application empaquetée."]] },
      starting: { title: "Le problème opérationnel", paragraphs: ["La gestion des stages ne se résume pas à un tableau de bord. Une école coordonne des cohortes, des élèves, des organismes, des tuteurs, des dates, des heures, des suivis et des justificatifs signés. Chaque rôle a besoin d’une vue différente du même dossier, et une correction ne doit pas effacer ce qui l’a précédée.", "L’ancienne implémentation scolaire ne pouvait pas servir de base à un produit. J’ai reconstruit VECTOR depuis zéro en ne gardant que la compréhension du métier. Aucun code historique, dossier personnel, nom ou asset de l’ancien projet n’a été repris dans le nouveau dépôt."] },
      constraints: { title: "Ce qu’un système maîtrisé par l’école doit garantir", intro: "L’architecture part de quatre contraintes concrètes :", items: ["Chaque installation appartient à une seule école, qui contrôle sa base, son identité visuelle, ses sauvegardes et son déploiement.", "Les droits et le périmètre des tuteurs doivent être appliqués par le serveur avant toute sélection, tout comptage ou tout export.", "Les heures validées et les justificatifs signés ont besoin de parcours de correction explicites qui préservent le dossier initial.", "Imports, exports, rétention et restauration doivent être bornés, vérifiables et relançables sans risque après un échec."] },
      diagnosis: { title: "Définir d’abord la frontière de propriété", paragraphs: ["Déplacer davantage d’état dans le navigateur aurait laissé les questions difficiles intactes. Les contrôles de rôle auraient pu rester cachés dans l’interface, toute l’école être chargée en mémoire et un champ modifié être traité comme si sa valeur précédente n’avait jamais existé.", "VECTOR consacre chaque installation à une seule école au lieu de construire un service multi-tenant partagé. La responsabilité opérationnelle est nette, et les sauvegardes, la rétention et le white label restent plus simples à raisonner. Le projet distribue un logiciel, pas une plateforme cloud administrée."] },
      architecture: { title: "Un serveur compact aux frontières explicites", intro: "L’espace de travail web appelle une API Express qui gère authentification, rôles et transitions. SQLite conserve les dossiers d’une école en mode WAL. Des curseurs opaques AES-GCM lient la pagination à l’école, au périmètre et aux filtres actifs ; des recherches bornées évitent de charger des tables entières dans les formulaires.", labels: ["ESPACE DE TRAVAIL WEB", "POLICY LAYER EXPRESS", "SQLITE WAL", "AUDIT + RÉTENTION", "SAUVEGARDE + RELEASE"], caption: "Le serveur décide ce qu’un opérateur peut consulter et modifier ; le navigateur présente cette décision." },
      decisions: { title: "Les choix qui sécurisent le travail quotidien", intro: "Le produit préfère des règles visibles à un état caché mais pratique.", items: [{ title: "Appliquer le périmètre avant la pagination", body: "Chaque liste applique l’école et le rôle avant sa limite. Les curseurs opaques authentifiés lient ce périmètre aux filtres et à une position de tri stable. Les recherches ne renvoient qu’un petit ensemble de dossiers admissibles.", tradeoff: "L’interface ne peut pas télécharger une table sans limite en une requête. L’extraction complète passe par un export filtré séparé, plafonné à 10 000 lignes." }, { title: "Corriger les justificatifs sans réécrire l’historique", body: "Les critères de préparation gouvernent les transitions du stage. Les heures sont validées ou annulées ; un document signé est corrigé par un nouveau dossier qui le remplace, jamais par une modification sur place.", tradeoff: "L’opérateur suit une étape explicite, mais le contrôle peut reconstituer toute la suite des décisions." }, { title: "Faire échouer proprement les opérations massives", body: "Un import CSV valide le fichier entier dans une seule transaction. L’aperçu de rétention montre dossiers bloqués, travail restant et empreinte exacte ; l’exécution refuse un aperçu périmé et supprime par lots bornés.", tradeoff: "Les changements administratifs importants demandent un aperçu délibéré et parfois plusieurs passages. Cela vaut mieux qu’un import partiel ou une suppression massive non relue." }] },
      delivery: { title: "Auto-hébergement et restauration", paragraphs: ["Chaque école peut définir nom, couleurs, logo et coordonnées de support avec des révisions qui protègent les modifications concurrentes. L’image Docker s’exécute sans privilège et accepte un système de fichiers racine en lecture seule. Les commandes health et doctor signalent les problèmes de configuration et de stockage avant l’usage courant.", "Les outils créent un instantané SQLite privé, l’inspectent sans démarrer l’application, le restaurent par un parcours de maintenance protégé et compactent les données conservées si nécessaire. L’automatisation construit deux fois l’archive source, vérifie inventaire et commit, recherche les secrets, installe depuis l’artefact extrait et y exécute le parcours d’acceptation."] },
      result: { title: "Ce que VECTOR prend en charge aujourd’hui", paragraphs: ["Une école peut gérer cohortes, élèves, organismes, périodes et affectations ; valider les heures ; enregistrer les suivis ; préserver l’historique des documents ; examiner les événements d’audit dans son périmètre ; importer les données de façon atomique et exporter une vue opérationnelle filtrée. Un administrateur peut aussi placer un élève sous blocage de rétention avant la suppression d’anciens dossiers.", "VECTOR est un logiciel open source auto-hébergé. Ce n’est pas un SaaS administré et il ne revendique ni certification de conformité, ni haute disponibilité, ni SSO. Une institution qui en a besoin devra encore traiter ces sujets côté produit et déploiement."] },
      scope: "Cette étude décrit l’architecture versionnée 3.0.0 et ses contrôles d’auto-hébergement. GitHub Pages présente le produit sans données opérationnelles ; l’application elle-même s’exécute depuis le paquet serveur. Aucun dossier scolaire réel, aucune intégration institutionnelle et aucun résultat de stage n’y sont représentés.",
    }),
  },
};
