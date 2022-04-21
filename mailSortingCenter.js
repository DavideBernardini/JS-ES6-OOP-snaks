class Mail {
    #senderAddress;
    #reciverAddress;
    #backToSender;
    #id;

    constructor(senderAddress, reciverAddress) {
        this.senderAddress = senderAddress;
        this.reciverAddress = reciverAddress;
        this.#backToSender = false;
        this.#id = this.#codeGenerator();
    };

    // setters
    set senderAddress(senderAddress) {
        this.#senderAddress = typeof senderAddress == 'string' ? senderAddress : null;
    };
    set reciverAddress(reciverAddress) {
        this.#reciverAddress = typeof reciverAddress == 'string' ? reciverAddress : null;
    };
    #codeGenerator() {
        let code = "";
        let elements = "ABCDEFGHILMNOPQRSTUVZ0123456789";

        for(let i = 0 ; i < 10 ; i++)
            code += elements[Math.floor(Math.random() * (elements.length + 1))];
        
        return code;
    };
    // getters
    get senderAddress() {return this.#senderAddress};
    get reciverAddress() {return this.#reciverAddress};
    get backToSender() {return this.#backToSender};
    get id() {return this.#id};

    returnToSender() {
        this.#backToSender = !this.#backToSender;
    }
};

class PrioritaryMail extends Mail {
    #priority;
    constructor(senderAddress, reciverAddress, priority) {
        super(senderAddress, reciverAddress);
        this.priority = priority;
    }
    set priority(priority) {
        this.#priority = isFinite(priority) && priority > 0 ? priority : 1;
    };
    get priority() {
        return this.backToSender ? 0 : this.#priority;
    };
};

class mailSortingCenter {
    #centerCode;
    #mailList;

    constructor() {
        this.#centerCode = this.#codeGenerator();
        this.#mailList = [];
    };

    #codeGenerator() {
        let code = ""
        let elements = "ABCDEFGHILMNOPQRSTUVZ0123456789"

        for(let i = 0 ; i < 10 ; i++)
            code += elements[Math.floor(Math.random() * (elements.length + 1))]
        
        return code;
    };

    get centerCode() {return this.#centerCode};
    get mailList() {return this.#mailList};

    reciveMail(mail) {

        if (mail instanceof Mail || mail instanceof PrioritaryMail) {

            let indexMail = this.#mailList.indexOf(mail.id);
        
            if (indexMail != -1)node
                this.#mailList.push(mail)
        }
        
    };
    sortMail() {

        if (this.#mailList.length > 0) {

            let priorityMail = null;

            this.#mailList.forEach(mail =>{

                if (priorityMail == null && mail instanceof PrioritaryMail)
                    priorityMail = mail;

                else if (mail instanceof PrioritaryMail) 
                    if (mail.priority > priorityMail.priority)
                        priorityMail = mail;
            }); 

            if (priorityMail != null) {

                console.log(`Lettera ${priorityMail.id} spedita.`);
                this.#mailList.splice(this.#mailList.indexOf(priorityMail.id), 1);

            } else {

                console.log(`Lettera ${this.#mailList[0].id} spedita.`);
                this.#mailList.shift();
            }

        } else 
            return null;
    }
};

const poste = new mailSortingCenter;

poste.reciveMail(new PrioritaryMail('via ripamonti 90', 'via marche 12', 3));
poste.reciveMail(new Mail('via mazzini 90', 'via marche 12'));
poste.reciveMail(new Mail('via pascoli 10', 'via oronzo 132'));
poste.reciveMail(new PrioritaryMail('via corso 30', 'via carri 18a', 5));

poste.sortMail();