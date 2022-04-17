/*
classe persona arttributi nome e età metodo stampa info
passeggero attributi carta di inbarco
capitano attr. ore di volo
aereoporto attr nome, aerei + metodo per rimuovere l'aereo
*/
class Person {
    #name
    #age
    constructor(name, age) {
        this.name = name;
        this.age = age;
    };

    // setters
    set name(name) { this.#name = name.charAt(0).toUpperCase() +  name.slice(1) };

    set age(age) {
        Number.isInteger(Number(age)) && age > 0 ? this.#age = Number(age) : this.#age = null; 
    };

    // getters
    get name() { return this.#name };
    get age() { return this.#age };

    // other methods
    printInfo() {
        return `Name: ${this.#name} | Age: ${this.#age}`;
    }
};

class Passenger extends Person {
    #boardingPass
    constructor (name, age) {
        super(name, age);
        this.#boardingPass = this.#codeGenerator();
    }
    #codeGenerator() {
        let code = ""
        let elements = "ABCDEFGHILMNOPQRSTUVZ0123456789"

        for(let i = 0 ; i < 10 ; i++)
            code += elements[Math.floor(Math.random() * (elements.length + 1))]
        
        return code;
    };

    get boardingPass() {return this.#boardingPass};

    printInfo() {
        return `${ super.printInfo()} | Boarding pass number: ${this.#boardingPass}`;
    }
};

class Captain extends Person {
    #flightHours
    constructor (name, age, flightHours) {
        super(name, age);
        this.flightHours = flightHours;
    }
    set flightHours(flightHours) {
        this.#flightHours = Number.isInteger(Number(flightHours)) && flightHours > 0 ? Number(flightHours) : null;
    }

    get flightHours() { 
        return this.#flightHours != null ? this.#flightHours : 'unknown';
    };

    printInfo() {
        return `${ super.printInfo()} | Flight hours: ${this.#flightHours}h`;
    }
};


class Airplane {
    #id;
    #name
    #maxCapacity;
    #minFlightHours;
    #peopleOnBoard;
    #captain
    constructor(name, maxCapacity, minFlightHours){
        this.#id = this.#codeGenerator();
        this.name = name;
        this.maxCapacity = maxCapacity;
        this.minFlightHours = minFlightHours;
        this.#peopleOnBoard = [];
    }
    // setters
    set maxCapacity(maxCapacity) {
        this.#maxCapacity = Number.isInteger(Number(maxCapacity)) ? Number(maxCapacity) : null;
    };
    set minFlightHours(minFlightHours) {
        this.#minFlightHours = Number.isInteger(Number(minFlightHours)) ? Number(minFlightHours) : null;
    };
    set name(name) {
        this.#name = name;
    }
    // private methods
    #codeGenerator() {
        let code = ""
        let elements = "ABCDEFGHILMNOPQRSTUVZ0123456789"

        for(let i = 0 ; i < 10 ; i++)
            code += elements[Math.floor(Math.random() * (elements.length + 1))]
        
        return code;
    };
    // getters
    get name() { return this.#name };
    get maxCapacity() { return this.#maxCapacity };
    get minFlightHours() { return this.#minFlightHours };
    get peopleOnBoard() { return this.#peopleOnBoard };
    get id() { return this.#id };
    get captain() { return this.#captain };

    

    // other methods
    addPassenger(passenger) {
        
        if(this.#maxCapacity - 1 > this.#peopleOnBoard.length && !(passenger instanceof Captain)){
            
            let found = this.#peopleOnBoard.indexOf(passenger.boardingPass);

            if( found == -1 )
                this.#peopleOnBoard.push(passenger);
        }
    };

    addCaptain(captain){
        let captainFound = this.#peopleOnBoard.indexOf(captain instanceof Captain)
        
        if(captainFound == -1 && captain.flightHours >= this.#minFlightHours)
            this.#peopleOnBoard.push(captain);
    };

    printPeopleOnBoard(){
       this.#peopleOnBoard.forEach(person => console.log(person.printInfo()));
    };
}

const captainJames = new Captain('Steve James', 44, 200);
const boeing800 = new Airplane('boeing800', 80, 120);

boeing800.addPassenger(new Passenger('aldo', 55));
boeing800.addCaptain(captainJames);

boeing800.printPeopleOnBoard();

class Airport {
    #name;
    #airplanesParked;
    constructor(name) {
        this.name = name;
        this.#airplanesParked = [];
    };
    set name(name) {
        this.#name = name;
    };
    get name() {return this.#name};
    get airplanesParked() {return this.#airplanesParked};

    landing(airplane) {
        if(airplane instanceof Airplane){
            
            let found = this.#airplanesParked.indexOf(airplane.id);

            if( found == -1 )
                this.#airplanesParked.push(airplane);
        }
    };
    fly(airplane) {
        let found = this.#airplanesParked.indexOf(airplane.id);

        if( found != -1 )
            this.#airplanesParked.slice(found, 1);
    }
    printAirplanes(){
        this.#airplanesParked.forEach(airplane => console.log(airplane.name));
     };
}

const orioAlSerio = new Airport('orioAlSerio');

orioAlSerio.landing(boeing800);
orioAlSerio.landing(new Airplane('boeing600', 50, 90));

console.log();
orioAlSerio.printAirplanes();

