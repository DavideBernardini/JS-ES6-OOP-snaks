class Person {
    #name
    #surname
    #age
    constructor(name, surname, age) {
        this.name = name;
        this.surname = surname;
        this.age = age;
    };
    // setters
    set name(name) { this.#name = name.charAt(0).toUpperCase() +  name.slice(1) };
    set surname(surname) { this.#surname = surname.charAt(0).toUpperCase() +  surname.slice(1) };
    set age(age) {
        this.#age = Number.isInteger(Number(age)) ? Number(age) : 'unknown';
    };
    // getters
    get name() {
        return this.#name 
    };
    get surname() {
        return this.#surname 
    };
    get age() {
        return this.#age 
    };
    // other methods
    printInfo() {
        return `Name: ${this.#name} | Surname: ${this.#surname} | Age: ${this.#age}`;
    }
    greetings() {
        return `Ciao, mi chiamo ${this.name}.`;
    }
}

const mario = new Person('mario', 'rossi', 50)

console.log(mario.printInfo());

console.log(mario.greetings());

class Student extends Person {
    #matricola
    constructor(name, surname, age, matricola) {
        super(name, surname, age) //super chiama il costruttore della classa padre, la superclasse
        this.matricola = matricola;
    };
    set matricola(matricola) {
        if (!isNaN(matricola))
            this.#matricola = matricola
    };
    get matricola() {
        return this.#matricola;
    };
    // overriding
    printInfo() {
        return `${super.printInfo()} | Matricola: ${this.#matricola}`;
    }
}

const domenico = new Student('domenico', 'sabato', 25, 892);

console.log(domenico.printInfo());

console.log(domenico.greetings());