class Team {
    #name
    #numberOfPlayersMax
    #players
    #coach
    constructor(name) {
        this.name = name;
        this.#players = [];
        this.#numberOfPlayersMax = 11;
        this.#coach = null;
    }
    // setters
    set name(name) { this.#name = name.charAt(0).toUpperCase() +  name.slice(1) };

    // getters
    get name() { return this.#name };
    get players() { return this.#players};
    get numberOfPlayersMax() { return this.#numberOfPlayersMax};
    get coach() { return this.#coach};

    // other methods
    addPlayer(newPlayer) {
        if (this.#players.length < this.#numberOfPlayersMax) {
            let found = this.#players.indexOf(newPlayer.name);

            if(found == -1) 
                this.#players.push(newPlayer);
                           
        }
    };
    sellPlayer(player) {
        let found = this.#players.indexOf(player.name);

        found != -1 ? this.#players.splice(found, 1) : `${player} is not in the team.`;
    };
    addCoach(newCoach) {
        this.#coach == null ? this.#coach = newCoach : 'there is already a coach.';
    };
    removeCoach() {
        this.#coach != null ? this.#coach = null : 'there is no coach to remove.';
    }
    printInfo() {
        if (this.#coach != null)
            return `Team name: ${this.#name} | Number of players: ${this.#players.length} | Coach: ${this.#coach.name}`;
        else
            return `Team name: ${this.#name} | Number of players: ${this.#players.length} | Coach: there is no coach yet`;
    }
    showPayers() {
        this.#players.forEach(player => console.log(player.printInfo()));
    }
}

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
        this.#age = Number.isInteger(Number(age)) ? Number(age) : 'incorrect age value';
    };

    // getters
    get name() { return this.#name };
    get age() { return this.#age };

    // other methods
    printInfo() {
        return `Name: ${this.#name} | Age: ${this.#age}`;
    }
}

class Player extends Person{
    #role
    #shirtNumber
    constructor(name, age, role, shirtNumber) {
        super(name, age);
        this.role = role;
        this.shirtNumber = shirtNumber;
    };
    // setter
    set role(role) {
        isNaN(role) ? this.#role = role : this.#role = 'unknown';
    };
    set shirtNumber(shirtNumber) {
        this.#shirtNumber = Number.isInteger(Number(shirtNumber)) ? Number(shirtNumber) : 'unknown';

    };

    // getters
    get role() { return this.#role };
    get shirtNumber() { return this.#shirtNumber };

    printInfo() {
        return `${ super.printInfo()} | Role: ${this.#role} | Shirt Number: ${this.#shirtNumber}`;
    }

}

class Coach extends Person{
    #yearsOfExperience
    constructor(name, age, yearsOfExperience) {
        super(name, age);
        this.#yearsOfExperience = yearsOfExperience;
    };
    // setter
    set yearsOfExperience(yearsOfExperience) {
        !isNaN(yearsOfExperience) &&  yearsOfExperience > 0 ? this.#yearsOfExperience = yearsOfExperience : this.#yearsOfExperience = 'unknown';
    };

    // getters
    get yearsOfExperience() { return this.#yearsOfExperience };

    printInfo() {
        return `${ super.printInfo()} | Years of experience: ${this.#yearsOfExperience}`;
    }

}

const lecce = new Team('lecce');

lecce.addCoach(new Coach('zeman', 70, 40))

lecce.addPlayer(new Player('giacomazzi', 35, 'centrocampista', 15));


console.log(lecce.printInfo());
console.log('Players:');
lecce.showPayers();