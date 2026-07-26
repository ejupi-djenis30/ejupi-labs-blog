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
      title: "Rendere ispezionabile il protocollo Gopher senza nasconderne i limiti",
      summary:
        "DIG affianca un vero client Gopher da terminale a un explorer deterministico nel browser. La CLI apre risorse gopher:// tramite TCP limitato; l’edizione web insegna lo stesso parser attraverso una fixture sicura.",
      facts: [
        ["Prodotto", "Client da terminale ed explorer del protocollo"],
        ["Ruolo", "Core del protocollo, CLI ed esperienza browser"],
        ["Runtime", "Node.js e web statico"],
        ["Stato", "CLI installabile e app Pages disponibile offline"],
      ],
      evidence: {
        title: "Registro delle evidenze",
        intro: "Le affermazioni su protocollo e trasporto sono sostenute da limiti di progetto espliciti:",
        items: [
          ["Verifica", "68 dichiarazioni di test Node.js e due dichiarazioni E2E nel browser nel rilascio sottoposto ad audit."],
          ["Limiti richiesta", "Richiesta massima di 8 KiB, scadenza totale di 5 secondi, timeout di inattività di 2,5 secondi e limite predefinito di 10.000 voci di menu."],
          ["Limiti risposta", "Soglia predefinita di 1 MiB per la risposta e soglia assoluta configurabile di 10 MiB."],
          ["Limite", "Il TCP diretto non è cifrato; TLS, autenticazione, Gopher+, Telnet e download automatici non sono supportati."],
        ],
      },
      starting: {
        title: "Perché ricostruire un piccolo client di protocollo",
        paragraphs: [
          "Il repository era nato come prototipo visuale Flutter, ma il problema utile era più profondo: interpretare fedelmente un menu Gopher, mostrare il significato di ogni campo e permettere a chi usa il terminale di aprire una risorsa reale senza un comportamento di rete illimitato.",
          "I browser non possono creare la connessione TCP grezza richiesta da Gopher. Invece di nascondere il limite, il progetto usa un parser in due contesti trasparenti: TCP reale nella CLI e una fixture deterministica nell’explorer pubblico.",
        ],
      },
      constraints: {
        title: "I confini del protocollo",
        intro: "Anche un piccolo client richiede regole esplicite per rete e rendering:",
        items: [
          "Le richieste hanno scadenza assoluta, timeout di inattività, limite di 8 KiB e dimensione della risposta vincolata.",
          "I byte binari restano binari e non vengono mai stampati direttamente in un terminale interattivo.",
          "Le sequenze di controllo del terminale vengono neutralizzate prima che testo non attendibile arrivi sullo schermo.",
          "Le righe di menu malformate restano visibili, così l’explorer non trasforma errori di parsing in dati plausibili.",
        ],
      },
      diagnosis: {
        title: "Un parser, due trasporti",
        paragraphs: [
          "Il parser e le regole URL sono utili indipendentemente dalla connessione di rete. Mantenerli nel sito statico rende il protocollo comprensibile e testabile nel browser senza introdurre un proxy che cambierebbe il modello di sicurezza.",
          "La CLI aggiunge il confine di trasporto mancante: TCP limitato, connessioni dirette non cifrate e gestione esplicita degli elementi menu, testo, ricerca e binari.",
        ],
      },
      architecture: {
        title: "Il percorso della richiesta",
        intro:
          "Un URL gopher:// diventa host, porta e selector. La CLI invia il selector tramite TCP limitato e passa i byte restituiti all’interpretazione condivisa di menu e testo. Il browser parte dallo stesso confine di parsing con una fixture inclusa nel repository.",
        labels: ["URL GOPHER", "CONTRATTO URL", "TCP LIMITATO", "PARSER MENU", "TERMINALE O WEB"],
        caption: "Il browser illustra il protocollo; soltanto la CLI oltrepassa il confine TCP.",
      },
      decisions: {
        title: "Le scelte che mantengono leggibile il client",
        intro: "Il progetto preferisce un comportamento del protocollo visibile a una comodità opaca.",
        items: [
          {
            title: "Conservare i selector",
            body: "Gli URL di ricerca RFC 4266 vengono interpretati senza ridurre i segmenti punto del selector che appartengono al percorso del protocollo remoto.",
            tradeoff: "I selector Gopher non si comportano come i consueti percorsi HTTP, quindi la distinzione deve restare esplicita.",
          },
          {
            title: "Fallire in sicurezza nel terminale",
            body: "Il testo viene ripulito dalle sequenze di controllo del terminale, mentre le risorse binarie devono essere reindirizzate a un file.",
            tradeoff: "Il client rifiuta alcuni percorsi di output comodi perché l’integrità del terminale viene prima.",
          },
          {
            title: "Mantenere deterministica la demo web",
            body: "GitHub Pages usa una fixture inclusa e non sostiene mai di connettersi a un server Gopher reale.",
            tradeoff: "L’explorer è uno strumento didattico, non un client di rete nel browser.",
          },
        ],
      },
      delivery: {
        title: "Integrità del rilascio",
        paragraphs: [
          "I candidati al rilascio vengono compilati due volte; gli archivi npm e le evidenze SBOM normalizzate devono coincidere byte per byte. Uno smoke test con prefisso pulito esegue il comando pubblicato prima del rilascio.",
          "La pubblicazione con tag verifica versione, discendenza dal main revisionato, checksum, attestazioni e inventario immutabile del rilascio. Nulla di questo amplia l’ambito del protocollo: Gopher+, TLS, Telnet, autenticazione e download automatici restano esclusi.",
        ],
      },
      result: {
        title: "Cosa possono ispezionare gli utenti",
        paragraphs: [
          "Dal terminale si possono aprire menu, testi e ricerche Gopher reali attraverso un trasporto limitato. Nel browser si può esplorare una fixture accessibile da tastiera e controllare tipo, selector, host e porta a ogni passaggio.",
          "Il progetto è volutamente circoscritto. Proprio questa scelta rende facili da trovare il confine di rete, il comportamento del parser e le funzionalità non supportate.",
        ],
      },
      scope:
        "L’implementazione copre il comportamento documentato di richiesta base, menu, testo e ricerca. Il traffico Gopher diretto non è cifrato e gli ottetti arbitrari non UTF-8 nei selector non rientrano nell’ambito attuale.",
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
      category: "Software operativo",
      title: "Ricostruire una dashboard per i tirocini attorno a un modello dati piccolo e verificabile",
      summary:
        "VECTOR trasforma una coorte fittizia di tirocini in una console operativa solo browser. Ricerca, filtri di stato, viste dei progressi e aggiornamenti delle tappe funzionano localmente, senza account, backend o servizio di analytics.",
      facts: [
        ["Prodotto", "Dashboard operativa per i tirocini"],
        ["Ruolo", "Ricostruzione del prodotto e frontend engineering"],
        ["Dati", "Solo record fittizi"],
        ["Stato", "Applicazione statica funzionante"],
      ],
      evidence: {
        title: "Registro delle evidenze",
        intro: "L’edizione pubblica include una fixture volutamente piccola e verificabile:",
        items: [
          ["Fixture", "Sei tirocini fittizi distribuiti in quattro stati; due attivi e due in revisione."],
          ["Vista derivata", "La fixture verificata riporta un completamento aggregato del 67% su obiettivi di 160/180 ore."],
          ["Verifica", "30 dichiarazioni di test Node.js e cinque E2E nel browser, inclusi mobile a 390 px e controllo esatto dell’overflow a 320 px."],
          ["Limite", "Tutta la persistenza appartiene a un singolo browser. Il progetto non è un sistema di tirocinio multiutente in produzione."],
        ],
      },
      starting: {
        title: "La domanda di prodotto",
        paragraphs: [
          "Coordinare i tirocini coinvolge persone, organizzazioni ospitanti, supervisori, tappe e ore. Una console utile deve rispondere rapidamente a domande operative semplici: chi è bloccato, cosa scade e quale record richiede attenzione.",
          "Il concetto accademico originale è stato ricostruito come applicazione statica volutamente limitata. I dati pubblici sono fittizi, le modifiche restano nel browser e ogni stato della demo può essere ripristinato.",
        ],
      },
      constraints: {
        title: "Cosa promette l’edizione pubblica",
        intro: "La ricostruzione mantiene un confine piccolo e ispezionabile:",
        items: [
          "Ogni persona e organizzazione nel dataset distribuito è fittizia.",
          "La ricerca e i filtri di stato lavorano su un unico modello esplicito di tirocinio.",
          "Gli aggiornamenti delle tappe persistono soltanto nel local storage del browser e possono essere azzerati.",
          "Non esistono account, database, endpoint di analytics o API remote di scrittura.",
        ],
      },
      diagnosis: {
        title: "Modellare il processo prima della dashboard",
        paragraphs: [
          "Una dashboard diventa fragile quando totali, etichette e stato delle righe derivano ciascuno lo stato in modo diverso. Il primo compito è stato rendere lo stato del tirocinio e il calcolo delle ore un unico modello verificato.",
          "L’interfaccia è poi diventata una proiezione di quel modello: metriche della coorte, filtri e progressi individuali usano le stesse funzioni, mentre la persistenza locale conserva soltanto lo stato di lavoro fittizio.",
        ],
      },
      architecture: {
        title: "Un confine di prodotto statico completo",
        intro:
          "Un dataset fittizio incluso nel repository alimenta il modello dei tirocini. Ricerca, filtri, riepiloghi della coorte e transizioni delle tappe leggono lo stesso stato derivato. Il browser conserva le modifiche localmente; il reset ripristina la fixture originale.",
        labels: ["DATI FITTIZI", "MODELLO TIROCINI", "RICERCA + FILTRI", "TAPPE", "LOCAL STORAGE"],
        caption: "Un unico modello locale al browser alimenta il riepilogo e la vista del singolo tirocinio.",
      },
      decisions: {
        title: "Le scelte che rendono affidabile la demo",
        intro: "L’app pubblica fa meno, ma ogni interazione visibile è reale.",
        items: [
          {
            title: "Distribuire record fittizi",
            body: "L’intera coorte è progettata per la dimostrazione, quindi l’applicazione non richiede esportazioni di produzione censurate.",
            tradeoff: "La demo non può sostenere di rappresentare il processo o il volume dati di un’istituzione reale.",
          },
          {
            title: "Derivare le metriche dal modello",
            body: "Calcoli di stato e ore sono condivisi da schede, filtri e record individuali e coperti da test Node.js.",
            tradeoff: "I nuovi stati del flusso devono aggiornare il contratto del modello prima di apparire nell’interfaccia.",
          },
          {
            title: "Mantenere locale la persistenza",
            body: "Le modifiche alle tappe sopravvivono a un refresh tramite local storage e il reset ripristina la fixture originale.",
            tradeoff: "Questa edizione non offre collaborazione, autenticazione o sincronizzazione tra dispositivi.",
          },
        ],
      },
      delivery: {
        title: "Verifica del sito statico",
        paragraphs: [
          "Il server locale riproduce l’esatto percorso base di GitHub Pages, così le regressioni dei link assoluti falliscono prima del deploy. I test Node.js coprono il modello dati e Playwright verifica l’esperienza nel browser.",
          "I rilasci stabili includono archivi ZIP e TAR deterministici con inventario, SBOM CycloneDX, evidenza del commit sorgente e checksum SHA-256.",
        ],
      },
      result: {
        title: "Cosa supporta la console",
        paragraphs: [
          "Un operatore può cercare per studente, organizzazione ospitante o supervisore, filtrare la coorte per stato, esaminare i progressi, avanzare una tappa e ritrovare lo stesso stato locale dopo un refresh.",
          "VECTOR è una demo mirata, non un servizio ospitato per i tirocini. Il suo valore è un modello di interazione coerente e funzionante con un confine dati insolitamente chiaro.",
        ],
      },
      scope:
        "L’applicazione pubblica usa record fittizi e persistenza locale al browser. Non afferma operatività multiutente, controlli privacy di produzione, integrazioni istituzionali o risultati reali di tirocinio.",
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
      title: "Das Gopher-Protokoll prüfbar machen, ohne seine rauen Kanten zu verstecken",
      summary: "DIG verbindet einen echten Terminal-Gopher-Client mit einem deterministischen Browser-Explorer. Die CLI öffnet gopher://-Ressourcen über begrenztes TCP; die Webausgabe vermittelt denselben Parser anhand einer sicheren Fixture.",
      facts: [["Produkt", "Terminal-Client und Protokoll-Explorer"], ["Rolle", "Protokollkern, CLI und Browser-Erlebnis"], ["Laufzeit", "Node.js und statisches Web"], ["Status", "Installierbare CLI und offlinefähige Pages-App"]],
      evidence: { title: "Evidenzprotokoll", intro: "Protokoll- und Transportaussagen werden durch ausdrückliche Projektgrenzen gestützt:", items: [
        ["Verifikation", "68 Node.js-Testdeklarationen und zwei Browser-E2E-Deklarationen im auditierten Release."],
        ["Anfragegrenzen", "8 KiB Anfragegrenze, 5 Sekunden Gesamtablaufzeit, 2,5 Sekunden Idle-Timeout und standardmäßig höchstens 10.000 Menüeinträge."],
        ["Antwortgrenzen", "Standardmäßig 1 MiB Antwortobergrenze und absolut konfigurierbar höchstens 10 MiB."],
        ["Grenze", "Direktes TCP ist unverschlüsselt; TLS, Authentifizierung, Gopher+, Telnet und automatische Downloads werden nicht unterstützt."],
      ]},
      starting: { title: "Warum einen kleinen Protokoll-Client neu bauen", paragraphs: [
        "Das Repository begann als visueller Flutter-Prototyp, doch die nützliche Aufgabe lag tiefer: ein Gopher-Menü korrekt parsen, jedes Feld erklären und eine reale Ressource im Terminal ohne unbegrenztes Netzwerkverhalten öffnen.",
        "Browser können die für Gopher nötige rohe TCP-Verbindung nicht herstellen. Statt diese Grenze zu kaschieren, nutzt das Projekt einen Parser in zwei ehrlichen Kontexten: echtes TCP in der CLI und eine deterministische Fixture im öffentlichen Explorer.",
      ]},
      constraints: { title: "Die Protokollgrenzen", intro: "Auch ein kleiner Client braucht klare Netzwerk- und Darstellungsregeln:", items: [
        "Anfragen besitzen absolute Frist, Idle-Timeout, 8 KiB Obergrenze und eine begrenzte Antwortgröße.",
        "Binäre Bytes bleiben binär und werden nie direkt in ein interaktives Terminal geschrieben.",
        "Terminal-Steuersequenzen werden neutralisiert, bevor nicht vertrauenswürdiger Text den Bildschirm erreicht.",
        "Fehlerhafte Menüzeilen bleiben sichtbar, damit der Explorer Parsing-Fehler nicht in plausible Daten verwandelt.",
      ]},
      diagnosis: { title: "Ein Parser, zwei Transporte", paragraphs: [
        "Parser und URL-Regeln sind unabhängig von der Netzwerkverbindung nützlich. In der statischen Site machen sie das Protokoll im Browser verständlich und testbar, ohne einen Proxy einzuführen, der das Sicherheitsmodell verändern würde.",
        "Die CLI ergänzt die fehlende Transportgrenze: begrenztes TCP, direkte unverschlüsselte Verbindungen und ausdrückliche Behandlung von Menü-, Text-, Such- und Binäreinträgen.",
      ]},
      architecture: { title: "Der Anfragepfad", intro: "Eine gopher://-URL wird zu Host, Port und Selector. Die CLI sendet den Selector über begrenztes TCP und übergibt die zurückgegebenen Bytes an die gemeinsame Menü-/Textauswertung. Der Browser beginnt an derselben Parsing-Grenze mit einer eingecheckten Fixture.", labels: ["GOPHER-URL", "URL-VERTRAG", "BEGRENZTES TCP", "MENÜ-PARSER", "TERMINAL ODER WEB"], caption: "Der Browser vermittelt das Protokoll; nur die CLI überschreitet die TCP-Grenze." },
      decisions: { title: "Entscheidungen für einen verständlichen Client", intro: "Das Projekt bevorzugt sichtbares Protokollverhalten gegenüber bequemer Magie.", items: [
        { title: "Selectors bewahren", body: "RFC 4266-Such-URLs werden geparst, ohne Selector-Punktsegmente zu reduzieren, die zum entfernten Protokollpfad gehören.", tradeoff: "Gopher-Selectors verhalten sich nicht wie vertraute HTTP-Pfade; der Unterschied muss sichtbar bleiben." },
        { title: "Im Terminal sicher scheitern", body: "Text wird von Terminal-Steuersequenzen bereinigt; binäre Ressourcen müssen in eine Datei umgeleitet werden.", tradeoff: "Der Client verweigert einige bequeme Ausgabewege, weil die Integrität des Terminals wichtiger ist." },
        { title: "Die Web-Demo deterministisch halten", body: "GitHub Pages nutzt eine mitgelieferte Fixture und behauptet nie, einen echten Gopher-Server zu erreichen.", tradeoff: "Der Explorer ist eine Lernoberfläche, kein Netzwerk-Client im Browser." },
      ]},
      delivery: { title: "Release-Integrität", paragraphs: [
        "Release-Kandidaten werden zweimal gebaut; npm-Archive und normalisierte SBOM-Evidenz müssen bytegleich sein. Ein Smoke-Test mit sauberem Präfix führt den veröffentlichten Befehl vor dem Release aus.",
        "Die getaggte Veröffentlichung prüft Version, Abstammung von geprüftem main, Checksummen, Attestierungen und unveränderliches Release-Inventar. Der Protokollumfang wächst dadurch nicht: Gopher+, TLS, Telnet, Authentifizierung und automatische Downloads bleiben ausgeschlossen.",
      ]},
      result: { title: "Was Benutzer untersuchen können", paragraphs: [
        "Im Terminal lassen sich echte Gopher-Menüs, Texte und Suchen über einen begrenzten Transport öffnen. Im Browser lässt sich eine tastaturbedienbare Fixture durchlaufen und bei jedem Schritt Typ, Selector, Host und Port prüfen.",
        "Das Projekt ist bewusst eng gefasst. Dadurch sind Netzwerkgrenze, Parser-Verhalten und nicht unterstützte Funktionen leicht zu finden.",
      ]},
      scope: "Die Implementierung deckt das dokumentierte Verhalten für Basisanfragen, Menüs, Text und Suche ab. Direkter Gopher-Verkehr ist unverschlüsselt; beliebige nicht UTF-8-kodierte Selector-Oktette liegen außerhalb des aktuellen Umfangs.",
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
      category: "Betriebssoftware",
      title: "Ein Placement-Dashboard rund um ein kleines, testbares Datenmodell neu aufbauen",
      summary: "VECTOR macht aus einer fiktiven Placement-Kohorte ein rein browserbasiertes Operations-Board. Suche, Statusfilter, Fortschrittsansichten und Meilensteinänderungen laufen lokal ohne Konto, Backend oder Analytics-Dienst.",
      facts: [["Produkt", "Placement-Operations-Dashboard"], ["Rolle", "Produktrekonstruktion und Frontend Engineering"], ["Daten", "Ausschließlich fiktive Datensätze"], ["Status", "Funktionsfähige statische Anwendung"]],
      evidence: { title: "Evidenzprotokoll", intro: "Die öffentliche Ausgabe liefert eine bewusst kleine, testbare Fixture:", items: [
        ["Fixture", "Sechs fiktive Placements in vier Statuszuständen; zwei aktiv und zwei in Prüfung."],
        ["Abgeleitete Ansicht", "Die geprüfte Fixture weist 67% Gesamtfortschritt aus 160/180-Stunden-Zielen aus."],
        ["Verifikation", "30 Node.js- und fünf Browser-E2E-Deklarationen, darunter 390 px Mobile und exakte Overflow-Prüfung bei 320 px."],
        ["Grenze", "Die gesamte Persistenz gehört zu einem Browser. Das Projekt ist kein produktives Placement-System für mehrere Benutzer."],
      ]},
      starting: { title: "Die Produktfrage", paragraphs: [
        "Placement-Koordination umfasst Menschen, aufnehmende Organisationen, Betreuer, Meilensteine und Stunden. Ein nützliches Board muss einfache betriebliche Fragen schnell beantworten: Wer ist blockiert, was ist fällig und welcher Datensatz braucht Aufmerksamkeit?",
        "Das ursprüngliche akademische Konzept wurde als bewusst begrenzte statische Anwendung neu gebaut. Öffentliche Daten sind fiktiv, Änderungen bleiben im Browser und jeder Demo-Zustand kann zurückgesetzt werden.",
      ]},
      constraints: { title: "Was die öffentliche Ausgabe verspricht", intro: "Die Rekonstruktion hält ihre Grenze klein und prüfbar:", items: [
        "Jede Person und Organisation im ausgelieferten Datensatz ist fiktiv.",
        "Suche und Statusfilter arbeiten auf einem einzigen ausdrücklichen Placement-Modell.",
        "Meilensteinänderungen bleiben nur im lokalen Browser-Speicher und lassen sich zurücksetzen.",
        "Es gibt weder Konto, Datenbank, Analytics-Endpunkt noch entfernte Schreib-API.",
      ]},
      diagnosis: { title: "Den Betrieb vor dem Dashboard modellieren", paragraphs: [
        "Ein Dashboard wird brüchig, wenn Summen, Labels und Zeilenzustand den Status jeweils anders herleiten. Zuerst mussten Placement-Zustand und Stundenberechnung zu einem getesteten Modell werden.",
        "Die Oberfläche wurde dann zur Projektion dieses Modells: Kohortenmetriken, Filter und individueller Fortschritt nutzen dieselben Funktionen; lokal gespeichert wird nur der fiktive Arbeitszustand.",
      ]},
      architecture: { title: "Eine vollständige statische Produktgrenze", intro: "Ein eingecheckter fiktiver Datensatz speist das Placement-Modell. Suche, Filter, Kohortenübersichten und Meilensteinübergänge lesen denselben abgeleiteten Zustand. Der Browser speichert Änderungen lokal; Reset stellt die ursprüngliche Fixture wieder her.", labels: ["FIKTIVE DATEN", "PLACEMENT-MODELL", "SUCHE + FILTER", "MEILENSTEINE", "LOCAL STORAGE"], caption: "Ein einziges browserlokales Modell treibt Zusammenfassung und individuelle Placement-Ansicht." },
      decisions: { title: "Entscheidungen für eine vertrauenswürdige Demo", intro: "Die öffentliche App leistet weniger, aber jede sichtbare Interaktion ist echt.", items: [
        { title: "Fiktive Datensätze ausliefern", body: "Die gesamte Kohorte wurde für die Demonstration entworfen; die Anwendung benötigt keine redigierten Produktionsdaten.", tradeoff: "Die Demo kann weder Prozess noch Datenvolumen einer realen Institution beanspruchen." },
        { title: "Metriken aus dem Modell ableiten", body: "Status- und Stundenberechnungen werden von Karten, Filtern und Einzeldatensätzen gemeinsam genutzt und durch Node.js-Tests abgedeckt.", tradeoff: "Neue Workflow-Zustände müssen zuerst den Modellvertrag erweitern, bevor sie in der Oberfläche erscheinen." },
        { title: "Persistenz lokal halten", body: "Meilensteinänderungen überstehen einen Refresh im local storage; Reset stellt die ursprüngliche Fixture wieder her.", tradeoff: "Diese Ausgabe bietet keine Zusammenarbeit, Authentifizierung oder geräteübergreifende Synchronisierung." },
      ]},
      delivery: { title: "Verifikation der statischen Site", paragraphs: [
        "Der lokale Server bildet den genauen GitHub-Pages-Basispfad ab, damit Fehler absoluter Links vor dem Deployment auffallen. Node.js-Tests prüfen das Datenmodell und Playwright die Browser-Erfahrung.",
        "Stabile Releases paketieren deterministische ZIP- und TAR-Archive mit Inventar, CycloneDX SBOM, Quell-Commit-Evidenz und SHA-256-Prüfsummen.",
      ]},
      result: { title: "Was das Board unterstützt", paragraphs: [
        "Ein Operator kann nach Student, Host oder Betreuer suchen, die Kohorte nach Status filtern, Fortschritt prüfen, einen Meilenstein weiterschalten und nach einem Refresh denselben lokalen Zustand vorfinden.",
        "VECTOR ist ein fokussierter Demonstrator, kein gehosteter Placement-Dienst. Sein Wert liegt in einem kohärenten, funktionierenden Interaktionsmodell mit ungewöhnlich klarer Datengrenze.",
      ]},
      scope: "Die öffentliche Anwendung nutzt fiktive Datensätze und browserlokale Persistenz. Sie beansprucht weder Mehrbenutzerbetrieb noch produktive Datenschutzkontrollen, institutionelle Integrationen oder reale Placement-Ergebnisse.",
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
      category: "Outils de protocole", title: "Rendre le protocole Gopher inspectable sans en masquer les aspérités", summary: "DIG associe un vrai client Gopher en terminal à un explorateur web déterministe. La CLI ouvre des ressources gopher:// sur un TCP borné ; l’édition web enseigne le même parser avec une fixture sûre.",
      facts: [["Produit", "Client terminal et explorateur de protocole"], ["Rôle", "Cœur du protocole, CLI et expérience web"], ["Runtime", "Node.js et web statique"], ["État", "CLI installable et application Pages hors ligne"]],
      evidence: { title: "Registre des preuves", intro: "Les affirmations sur le protocole et le transport reposent sur des limites explicites :", items: [["Vérification", "68 déclarations de tests Node.js et deux E2E web dans la version auditée."], ["Limites de requête", "Plafond de 8 KiB, délai total de 5 secondes, inactivité de 2.5 secondes et limite par défaut de 10 000 entrées de menu."], ["Limites de réponse", "Plafond par défaut de 1 MiB et plafond absolu configurable de 10 MiB."], ["Limite", "Le TCP direct n’est pas chiffré ; TLS, authentification, Gopher+, Telnet et téléchargements automatiques ne sont pas pris en charge."]] },
      starting: { title: "Pourquoi reconstruire un petit client de protocole", paragraphs: ["Le dépôt était un prototype visuel Flutter, mais la vraie question était plus basse couche : parser fidèlement un menu Gopher, expliquer chaque champ et ouvrir une ressource réelle sans réseau non borné.", "Un navigateur ne peut pas établir la connexion TCP brute de Gopher. Le projet assume cette limite avec un parser dans deux contextes : TCP réel dans la CLI et fixture déterministe dans l’explorateur."] },
      constraints: { title: "Les limites du protocole", intro: "Même un petit client exige des règles réseau et de rendu explicites :", items: ["Les requêtes ont délai absolu, timeout d’inactivité, plafond de 8 KiB et réponse bornée.", "Les octets binaires restent binaires et ne sont jamais imprimés dans un terminal interactif.", "Les séquences de contrôle sont neutralisées avant l’affichage de texte non fiable.", "Les lignes de menu mal formées restent visibles afin de ne pas transformer une erreur en donnée plausible."] },
      diagnosis: { title: "Un parser, deux transports", paragraphs: ["Le parser et les règles URL sont utiles sans connexion. Dans le site statique, ils rendent le protocole compréhensible et testable sans proxy qui modifierait le modèle de sécurité.", "La CLI ajoute le transport manquant : TCP borné, connexion directe non chiffrée et traitement explicite des menus, textes, recherches et binaires."] },
      architecture: { title: "Le chemin de la requête", intro: "Une URL gopher:// devient hôte, port et selector. La CLI envoie le selector sur TCP borné puis confie les octets au traitement partagé. Le navigateur commence à la même frontière avec une fixture versionnée.", labels: ["URL GOPHER", "CONTRAT URL", "TCP BORNÉ", "PARSER DE MENU", "TERMINAL OU WEB"], caption: "Le navigateur explique le protocole ; seule la CLI franchit la frontière TCP." },
      decisions: { title: "Les choix qui gardent le client lisible", intro: "Le comportement visible du protocole prime sur la magie pratique.", items: [{ title: "Préserver les selectors", body: "Les URL de recherche RFC 4266 sont analysées sans réduire les segments point du selector distant.", tradeoff: "Les selectors Gopher ne suivent pas les habitudes HTTP ; la différence doit rester explicite." }, { title: "Échouer sans risque dans le terminal", body: "Le texte est nettoyé des séquences de contrôle et les ressources binaires doivent être redirigées vers un fichier.", tradeoff: "Le client refuse des sorties pratiques pour protéger l’intégrité du terminal." }, { title: "Garder la démo déterministe", body: "GitHub Pages utilise une fixture incluse et ne prétend jamais joindre un serveur Gopher réel.", tradeoff: "L’explorateur enseigne ; ce n’est pas un client réseau web." }] },
      delivery: { title: "Intégrité des publications", paragraphs: ["Les candidats sont construits deux fois ; archives npm et preuves SBOM normalisées doivent être identiques octet pour octet. Un smoke test exécute la commande publiée dans un préfixe propre.", "La publication taguée valide version, ascendance depuis main révisé, checksums, attestations et inventaire immuable. Gopher+, TLS, Telnet, authentification et téléchargements automatiques restent hors périmètre."] },
      result: { title: "Ce que l’on peut inspecter", paragraphs: ["Le terminal ouvre menus, textes et recherches Gopher réels sur un transport borné. Le navigateur parcourt une fixture au clavier et expose type, selector, hôte et port.", "Le projet est volontairement étroit, ce qui rend sa frontière réseau, son parser et ses fonctions absentes faciles à comprendre."] },
      scope: "L’implémentation couvre requête de base, menu, texte et recherche documentés. Le trafic direct n’est pas chiffré et les octets de selector arbitraires non UTF-8 restent hors périmètre.",
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
      category: "Logiciel opérationnel", title: "Reconstruire un tableau de placements autour d’un petit modèle de données testable", summary: "VECTOR transforme une cohorte fictive en tableau opérationnel dans le navigateur. Recherche, filtres, progression et jalons fonctionnent localement, sans compte, backend ni analytics.",
      facts: [["Produit", "Tableau d’opérations de placement"], ["Rôle", "Reconstruction produit et frontend engineering"], ["Données", "Enregistrements fictifs uniquement"], ["État", "Application statique fonctionnelle"]],
      evidence: { title: "Registre des preuves", intro: "L’édition publique fournit une fixture volontairement petite et testable :", items: [["Fixture", "Six placements fictifs dans quatre états ; deux actifs et deux en révision."], ["Vue dérivée", "La fixture vérifiée indique 67 % d’avancement agrégé sur des objectifs de 160/180 heures."], ["Vérification", "30 déclarations Node.js et cinq E2E web, dont mobile à 390 px et contrôle exact du débordement à 320 px."], ["Limite", "Toute la persistance appartient à un navigateur. Ce n’est pas un système de placement multi-utilisateur."]] },
      starting: { title: "La question produit", paragraphs: ["La coordination implique personnes, organismes d’accueil, superviseurs, jalons et heures. Un bon tableau répond vite : qui est bloqué, quelle échéance arrive et quel dossier demande une action ?", "Le concept académique a été reconstruit comme application statique bornée. Les données sont fictives, les changements restent dans le navigateur et chaque état se réinitialise."] },
      constraints: { title: "Ce que promet l’édition publique", intro: "La reconstruction garde une frontière petite et vérifiable :", items: ["Chaque personne et organisation est fictive.", "Recherche et filtres utilisent un seul modèle explicite.", "Les jalons persistent uniquement dans local storage et se réinitialisent.", "Aucun compte, base, endpoint analytics ou API distante d’écriture n’existe."] },
      diagnosis: { title: "Modéliser l’opération avant le tableau", paragraphs: ["Un tableau devient fragile si totaux, libellés et lignes calculent l’état différemment. J’ai d’abord réuni état et calcul d’heures dans un modèle testé.", "L’interface projette ensuite ce modèle : métriques, filtres et progression partagent les mêmes fonctions ; seule la fixture de travail fictive persiste localement."] },
      architecture: { title: "Une frontière de produit statique complète", intro: "Un dataset fictif alimente le modèle. Recherche, filtres, synthèses et transitions lisent le même état dérivé. Le navigateur conserve les changements ; reset restaure la fixture.", labels: ["DONNÉES FICTIVES", "MODÈLE DE PLACEMENT", "RECHERCHE + FILTRES", "JALONS", "LOCAL STORAGE"], caption: "Un modèle local pilote synthèse et vue individuelle." },
      decisions: { title: "Les choix qui rendent la démo fiable", intro: "L’application en fait moins, mais chaque interaction visible est réelle.", items: [{ title: "Fournir des données fictives", body: "La cohorte entière est conçue pour la démonstration, sans export de production expurgé.", tradeoff: "La démo ne représente ni processus ni volume d’une institution réelle." }, { title: "Dériver les métriques du modèle", body: "État et heures sont partagés par cartes, filtres et dossiers, avec tests Node.js.", tradeoff: "Tout nouvel état doit d’abord modifier le contrat du modèle." }, { title: "Garder la persistance locale", body: "Les jalons survivent au refresh et reset restaure la fixture.", tradeoff: "Pas de collaboration, authentification ou synchronisation multi-appareil." }] },
      delivery: { title: "Vérification du site statique", paragraphs: ["Le serveur local reproduit le chemin GitHub Pages exact, afin de détecter les liens absolus avant déploiement. Node.js teste le modèle et Playwright l’expérience web.", "Les releases produisent des archives ZIP et TAR déterministes avec inventaire, CycloneDX SBOM, commit source et checksums SHA-256."] },
      result: { title: "Ce que permet le tableau", paragraphs: ["Un opérateur recherche étudiant, organisme ou superviseur, filtre la cohorte, examine la progression, avance un jalon et retrouve l’état après refresh.", "VECTOR est un démonstrateur ciblé, pas un service hébergé. Sa valeur est un modèle d’interaction cohérent avec une frontière de données claire."] },
      scope: "L’application utilise des données fictives et une persistance locale. Elle ne revendique ni multi-utilisateur, ni contrôles de production, ni intégrations institutionnelles, ni résultats réels.",
    }),
  },
};
