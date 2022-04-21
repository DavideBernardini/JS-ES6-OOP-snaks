class Person {
    #surname;
    #age;
    constructor(surname, age) {
        this.surname = surname;
        this.age = age;
    };

    // setters
    set surname(surname) { this.#surname = surname.charAt(0).toUpperCase() +  surname.slice(1) };

    set age(age) {
        this.#age = Number.isInteger(Number(age)) ? Number(age) : null;
    };

    // getters
    get surname() { return this.#surname };
    get age() { return this.#age };

    // other methods
    printInfo() {
        return `Surname: ${this.#surname} | Age: ${this.#age}`;
    }
};

class Queue {
    #queue;
    constructor() {
        this.#queue = [];
    };
    get queue() { return this.#queue };

    addPerson(person) {
        if (person instanceof Person)
            this.#queue.push(person);
        else
            return 'Solo le persone possono mettersi in fila.';
    };
    goNext() {
        console.log(`Il prossimo è ${this.#queue[0].surname}.`);
        this.#queue.shift();
    };
    printPeopleInQueue() {
        this.#queue.forEach(person => console.log(person.printInfo()));
    }
};


class priorityQueue extends Queue {
    goNext() {
        let foundIndex = this.queue.findIndex(el => el.age >= 60);

        if (foundIndex != -1) {
            

            console.log(`Il prossimo è ${this.queue[foundIndex].surname}, di età ${this.queue[foundIndex].age}.`);
            this.queue.splice(foundIndex, 1);
        } else {
            console.log(`Il prossimo è ${this.queue[0].surname}.`);
            this.queue.shift();
        }
    };
};

const newQueue = new priorityQueue;

let surnames = ['rossi', 'verdi', 'bianchi', 'brambilla', 'esposito', 'caputo', 'marconi'];
let ages = [18, 33, 54, 70, 78, 64, 35, 26, 67, 40];

for(let i = 0; i < 10; i++) {
    newQueue.addPerson( new Person( String(surnames[ Math.floor((Math.random() * surnames.length)) ]) , ages[ Math.floor( (Math.random() * ages.length)) ]) );
};

newQueue.printPeopleInQueue();

console.log();

console.log(newQueue.queue.length + ' persone in fila.');

newQueue.goNext();

console.log(newQueue.queue.length + ' persone in fila.');