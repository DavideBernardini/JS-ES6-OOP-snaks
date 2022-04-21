const dado = {
    lancio : function() {
        return Math.floor(Math.random() * 6) + 1;
    }
};

class Pedina {
    #colore;
    #casellaCorrente
    constructor(colore) {
        this.colore = colore;
        this.#casellaCorrente = 1;
    };
    // setters
    set colore(colore) {
        this.#colore = colore.toUpperCase();
    };
    // getters
    get colore() { return this.#colore  };
    get casellaCorrente() { return this.#casellaCorrente };

    avanza() {
        this.#casellaCorrente += dado.lancio();
    };
    stampaInfo() {
        console.log(`La pedina di colore ${this.#colore} adesso si trova in posizione ${this.#casellaCorrente}.`);
    };
}

class GiocoDellOca {
    #numeroCaselleTotali;
    #pedine;
    #turnoCorrente
    #classifica
    constructor(numeroCaselleTotali) {
        this.numeroCaselleTotali = numeroCaselleTotali;
        this.#pedine = [];
        this.#turnoCorrente = 0;
        this.#classifica = 1;
    };
    // setters
    set numeroCaselleTotali(num) {
        this.#numeroCaselleTotali = Number.isInteger(Number(num)) && num > 1 ? Number(num) : null; 
    };
    // getters
    get numeroCaselleTotali() {return this.#numeroCaselleTotali};
    get pedine() {return this.#pedine};
    get turnoCorrente() {return this.#turnoCorrente};
    get classifica() {return this.#classifica};

    aggiungiPedina(pedina) {
        
        if((pedina instanceof Pedina)){
            
            let trovato = this.#pedine.indexOf(pedina.colore);

            if( trovato == -1 )
                this.#pedine.push(pedina);
            else
                console.log(`Una pedina di colore ${pedina.colore} è già in gioco.`);
        }
    };
    giocaTurno() {
        if (this.#numeroCaselleTotali != null) {

            if(this.#pedine.length > 0) {

                let pedina = this.#pedine[this.#turnoCorrente];
                pedina.avanza();

                if (pedina.casellaCorrente <= this.#numeroCaselleTotali) {

                    pedina.stampaInfo();

                } else {

                    if (this.#pedine.length > 1) {

                        switch(this.#classifica) {
                            case 1:
                                console.log(`La pedina di colore ${pedina.colore} è la prima a raggiungere il traguardo!`);
                                
                                break;
                            case 2:
                                console.log(`La pedina di colore ${pedina.colore} è la seconda a raggiungere il traguardo!`);
                                
                                break;
                            case 3:
                                console.log(`La pedina di colore ${pedina.colore} è la terza a raggiungere il traguardo!`);
                                
                                break;
                            default:
                                console.log(`Anche la pedina di colore ${pedina.colore} ha raggiunto il traguardo.`);
                        }

                        this.#pedine.splice(this.#turnoCorrente, 1);
                        this.#turnoCorrente--;
                        this.#classifica++;

                    } else {

                        console.log(`La pedina di colore ${pedina.colore} è l'ultima a raggiungere il traguardo il traguardo.`);
                        this.#pedine.splice(this.#turnoCorrente, 1);

                        console.log('~~~ Gioco terminato! ~~~');
                    }
                }

                this.#turnoCorrente == this.#pedine.length - 1 ? this.#turnoCorrente = 0 : this.#turnoCorrente++;

            } else 
                console.log('Non ci sono pedine con cui giocare.');

        } else 
            console.log('Impossibile giocare senza specificare correttamente il numero di caselle totali.');
    }
}

class GiocoDellOcaConEliminazione extends GiocoDellOca {
    #casellaEliminazione;
    #turnoCorrente
    #classifica
    constructor(numeroCaselleTotali) {
        super(numeroCaselleTotali)
        this.#casellaEliminazione = this.#casellaEl();
        this.#turnoCorrente = 0;
        this.#classifica = 1;
    };

    #casellaEl() {
        return Math.round(this.numeroCaselleTotali / 2);
    };

    // getters
    get casellaEliminazione() {return this.#casellaEliminazione};
    get turnoCorrente() {return this.#turnoCorrente};
    get classifica() {return this.#classifica};

    giocaTurno() {
        if (this.numeroCaselleTotali != null) {

            if(this.pedine.length > 0) {

                let pedina = this.pedine[this.#turnoCorrente];
                pedina.avanza();

                if (pedina.casellaCorrente <= this.numeroCaselleTotali) {

                    if (pedina.casellaCorrente == this.#casellaEliminazione) {

                        console.log(`La pedina di colore ${pedina.colore} è finita nella CASELLA MALEDETTA in posizione ${this.#casellaEliminazione} e viene eliminata dal gioco.`);

                        this.pedine.splice(this.#turnoCorrente, 1);
                        this.#turnoCorrente--;

                    } else {
                        pedina.stampaInfo();
                    }
                    

                } else {

                    if (this.pedine.length > 1) {

                        switch(this.#classifica) {
                            case 1:
                                console.log(`La pedina di colore ${pedina.colore} è la prima a raggiungere il traguardo!`);
                                
                                break;
                            case 2:
                                console.log(`La pedina di colore ${pedina.colore} è la seconda a raggiungere il traguardo!`);
                                
                                break;
                            case 3:
                                console.log(`La pedina di colore ${pedina.colore} è la terza a raggiungere il traguardo!`);
                                
                                break;
                            default:
                                console.log(`Anche la pedina di colore ${pedina.colore} ha raggiunto il traguardo.`);
                        }

                        this.pedine.splice(this.#turnoCorrente, 1);
                        this.#turnoCorrente--;
                        this.#classifica++;

                    } else {

                        console.log(`La pedina di colore ${pedina.colore} ha raggiunto il traguardo il traguardo.`);
                        this.pedine.splice(this.#turnoCorrente, 1);

                        console.log('~~~ Gioco terminato! ~~~');
                    }
                }

                this.#turnoCorrente == this.pedine.length - 1 ? this.#turnoCorrente = 0 : this.#turnoCorrente++;

            } else 
                console.log('Non ci sono pedine con cui giocare.');

        } else 
            console.log('Impossibile giocare senza specificare correttamente il numero di caselle totali.');
    };
};

const gioco = new GiocoDellOcaConEliminazione(18);

gioco.aggiungiPedina(new Pedina('rosso'));
gioco.aggiungiPedina(new Pedina('blu'));
gioco.aggiungiPedina(new Pedina('verde'));

while ( gioco.pedine.length > 0) {
    gioco.giocaTurno();
}