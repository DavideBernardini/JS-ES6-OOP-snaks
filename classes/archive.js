class Document {
    #text;
    #title;

    constructor(title, text) {
        this.title = title;
        this.text = text;
    };
    set text(text) {
        this.#text = typeof text == 'string' ? text : null;
    };
    set title(title) {
        this.#title = title;
    };
    get text() {return this.#text};
    get title() {return this.#title};

    qualityCalculator() {
        return this.#text != null ? 1 / (1 + this.#text.length) : -1;
    }
}

class DocumentWithPriority extends Document {
    #priority;

    constructor(priority, title, text) {
        super(title, text);
        this.priority = priority;
    };
    set priority(priority) {
        this.#priority = isFinite(priority) && priority >= -1 ? priority : 0;
    }
    get priority() {return this.#priority};

    qualityCalculator() {
        return this.text != null ? 1 / (1 + this.text.length) + this.#priority : -1;
    }
}

class Archive {
    #documentsList;

    constructor() {
        this.#documentsList = [];
    };

    get documentsList() {return this.#documentsList};

    addDocument(document) {
        if (document instanceof Document || document instanceof DocumentWithPriority) 
            this.#documentsList.push(document);
    };

    findTheBest() {
        if (this.#documentsList.length > 0) {
            
            let bestDocument = this.#documentsList[0];

            this.#documentsList.forEach(document => {
                if( bestDocument.qualityCalculator() < document.qualityCalculator())
                    bestDocument = document;
            });

            return `Il documento più importate è "${bestDocument.title}".`;

        } else {
            console.log("Non ci sono documenti nell'archivio");
        }
    }
}



const wikipedia = new Document('Wikipedia', "Wikipedia è un'enciclopedia online, libera e collaborativa. Grazie al contributo di volontari da tutto il mondo, Wikipedia è disponibile in oltre 300 lingue. Chiunque può contribuire alle voci esistenti o crearne di nuove, affrontando sia gli argomenti tipici delle enciclopedie tradizionali sia quelli presenti in almanacchi, dizionari geografici e pubblicazioni specialistiche. Tutti i contenuti di Wikipedia sono protetti da una licenza libera, la Creative Commons CC BY-SA, che ne permette il riutilizzo per qualsiasi scopo a condizione di adottare la medesima licenza. ");

const portaAlchemica = new Document('Porta Alchemica', "La Porta Alchemica è un rudere del 1600 originariamente appartenente alla villa del marchese Massimiliano Savelli Palombara, attualmente situato al centro di piazza Vittorio Emanuele II a Roma. Il portale, secondo la leggenda trascritta per la prima volta nel 1802, reca delle criptiche iscrizioni e dei simboli alchemici che consentirebbero di trasmutare i metalli in oro. Riprodurrebbe quanto lasciato da un misterioso pellegrino, ospitato nella villa per una notte, che al mattino seguente sarebbe stato visto scomparire per sempre attraverso la porta, abbandonando dietro di sé alcune pagliuzze d'oro, frutto di una riuscita trasmutazione alchemica, ottentuta tramite la pietra filosofale.")

const pasqueVeronesi = new DocumentWithPriority(1, 'Pasque Veronesi', "Le Pasque veronesi furono un episodio d'insurrezione della città di Verona e dei suoi dintorni contro le truppe di occupazione francesi, comandate dal generale Napoleone Bonaparte. Furono così chiamate anche per assonanza con i Vespri siciliani. La rivolta, scoppiata per via dell'oppressione francese in città (durante il loro soggiorno a Verona vi furono confische di beni ai cittadini e complotti per tentare di rovesciare l'amministrazione locale), iniziò la mattina del 17 aprile 1797, Lunedì dell'Angelo: la popolazione esasperata riuscì a mettere fuori combattimento più di mille soldati francesi, soprattutto nelle prime ore della battaglia, mentre i militi francesi cercavano di rifugiarsi nei castelli della città, successivamente presi d'assalto. L'insurrezione terminò il 25 aprile 1797 con l'accerchiamento della città da parte di 15 000 soldati: le conseguenze a cui la città e i cittadini dovettero far fronte furono principalmente il pagamento di ingenti somme e le razzie di opere d'arte e di beni. La ricostruzione dell'esatto andamento degli eventi ha dato vita a un dibattito e alla nascita di alcune controversie dovute ad alcune differenze tra ciò che riportano le fonti veronesi e quelle francesi che si sono protratte fino agli anni 2000 investendo anche il dibattito politico locale. ");

const roma = new DocumentWithPriority(1, 'Origini Roma', "Secondo la tradizione, è stata fondata il 21 aprile 753 a.C. da Romolo (sebbene scavi recenti nel Lapis niger farebbero risalire la fondazione a 2 secoli prima[10][11]), nel corso dei suoi tre millenni di storia è stata la prima metropoli dell'Occidente,[12] cuore pulsante di una delle più importanti civiltà antiche, che influenzò la società, la cultura, la lingua, la letteratura, l'arte, l'architettura, l'urbanistica, l'ingegneria civile, la filosofia, la religione, il diritto e i costumi dei secoli successivi. Luogo di origine della lingua latina, fu capitale dell'antico Stato romano che estendeva il suo dominio su tutto il bacino del Mediterraneo e gran parte dell'Europa, dello Stato Pontificio, sottoposto al potere temporale dei papi e del Regno d'Italia (dal 1871 al 1946). Per antonomasia, è definita l'Urbe, Caput mundi e Città eterna. ");

const unesco = new Document('UNESCO Info', "L'Organizzazione delle Nazioni Unite per l'Educazione, la Scienza e la Cultura (in inglese United Nations Educational, Scientific and Cultural Organization, da cui l'acronimo UNESCO, pronuncia /uˈnɛsko/ o /uˈnesko/[2]) è un'agenzia specializzata delle Nazioni Unite creata con lo scopo[3] di promuovere la pace e la comprensione tra le nazioni con l'istruzione, la scienza, la cultura, la comunicazione e l'informazione per promuovere 'il rispetto universale per la giustizia, per lo stato di diritto e per i diritti umani e le libertà fondamentali'[4] quali sono definite e affermate dalla Dichiarazione universale dei diritti umani. ")

const biblioteca = new Archive;

biblioteca.addDocument(wikipedia);
biblioteca.addDocument(unesco);
biblioteca.addDocument(roma);
biblioteca.addDocument(pasqueVeronesi);
biblioteca.addDocument(portaAlchemica);

console.log(biblioteca.findTheBest());

