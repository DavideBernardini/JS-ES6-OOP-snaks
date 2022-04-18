class Drink {
    #name;
    #origin;
    #price;
    #quantity;
     
    constructor(name , origin , price , quantity){
        this.name = name;
        this.origin = origin;
        this.price = price;
        this.quantity = quantity;
    }

    // setters
    set name(name) { this.#name = name.charAt(0).toUpperCase() +  name.slice(1) };
    set origin(origin) { this.#origin = origin.charAt(0).toUpperCase() +  origin.slice(1) };
    set price(price) { 
        !isNaN(price) && price > 0 ? this.#price = Number(price).toFixed(2) : this.#price = null;
    };
    set quantity(quantity) { 
        Number.isInteger(Number(quantity)) && quantity > 0 ? this.#quantity = Number(quantity) : this.#quantity = null; 
    };

    // getters
    get name() { return this.#name };
    get origin() { return this.#origin };
    get price() { 
        if (this.#price != null)
            return this.#price;
        else 
            return 'Unknown';
    };
    get quantity() { return this.#quantity };

    // methods
    printInfo() {
        console.log(`Name: ${this.#name} | Origin: ${this.#origin} | Price: ${this.#price}€ | Quantity: ${this.#quantity}ml `);
    }
};

class AlcoholicDrink extends Drink{
    
    #alcoholContent;

    constructor(name , origin , price , quantity, alcoholContent){
        super(name , origin , price , quantity);
        this.alcoholContent = alcoholContent;
    };

    // setters
    set alcoholContent(alcoholContent){
        Number.isInteger(Number(alcoholContent)) && alcoholContent > 0 ? this.#alcoholContent = Number(alcoholContent) : this.#alcoholContent = null;
    };

    // getters
    get alcoholContent() { 
        return this.#alcoholContent != null ? this.#alcoholContent : 'Unknown';
    };

    // other methods
    printInfo() {
        return `${super.printInfo()} | Alcohol content: ${this.#alcoholContent}°`;
    };
};

class AlcoholFreeDrink extends Drink{

    #isEnergyDrink;

    constructor(name , origin , price , quantity, isEnergyDrink ){
        super(name , origin , price , quantity);
        this.isEnergyDrink = isEnergyDrink;
    };

    // setters
    set isEnergyDrink(isEnergyDrink){
        this.#isEnergyDrink = typeof(isEnergyDrink) == "boolean" ? isEnergyDrink : null;
    }

    // getters
    get isEnergyDrink(){
        return this.#isEnergyDrink
    };
    
    // other methods
    printInfo() {
        if (this.#isEnergyDrink == null)
            return `${super.printInfo()} | Is an energy drink: Unknown`;
        else
            return `${super.printInfo()} | Is an energy drink: ${this.#isEnergyDrink}`;
    };
}


class VendingMachine {
    #maxCapacity;
    #drinks;

    constructor(maxCapacity){
        this.maxCapacity = maxCapacity;
        this.#drinks = [];
    };
    // setters
    set maxCapacity(maxCapacity){
        Number.isInteger(Number(maxCapacity)) && maxCapacity > 0 ? this.#maxCapacity = Number(maxCapacity) : this.#maxCapacity = null;
    };
    // getters
    get maxCapacity() { return this.#maxCapacity != null ? this.#maxCapacity : ''};

    // other methods
    dispenseDrink(drink){;
        let indexFound = this.#drinks.indexOf(drink);
        
        indexFound != -1 ? this.#drinks.splice(indexFound ,1 ) : console.log("Bevanda non disponibile..");
    };

    addDrink(drink){
        
        this.#drinks.length < this.#maxCapacity ? this.#drinks.push(drink) : console.log("capacità massima raggiunta.");
    };

    showDrinks(){
        this.#drinks.forEach(drink => console.log( drink.printInfo() ))
    };

}

const pepsi = new AlcoholFreeDrink('pepsi', 'usa', '2.50', 250, false);

const negroamaro = new AlcoholicDrink('negroamaro', 'salento', 7, 450, 14);

const distributore = new VendingMachine(2);

distributore.addDrink(pepsi);
distributore.addDrink(negroamaro);

distributore.showDrinks();

console.log();

distributore.dispenseDrink(negroamaro);

distributore.showDrinks();

