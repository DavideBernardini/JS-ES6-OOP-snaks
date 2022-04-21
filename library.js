class Book {
    #title;
    #numberOfPages;
    #id

    constructor(title, numberOfPages) {
        this.title = title;
        this.numberOfPages = numberOfPages;
        this.#id = this.#codeGenerator();
    }
    // setters
    set title(title) {
        this.#title = typeof title == 'string' ? title : null;
    };
    set numberOfPages(numberOfPages) {
        this.#numberOfPages = Number.isInteger(Number(numberOfPages)) ? Number(numberOfPages) : null;
    };
    #codeGenerator() {
        let code = "";
        let elements = "ABCDEFGHILMNOPQRSTUVZ0123456789";

        for(let i = 0 ; i < 10 ; i++)
            code += elements[Math.floor(Math.random() * (elements.length + 1))];
        
        return code;
    };
    // getters
    get title() {return this.#title};
    get numberOfPages() {return this.#numberOfPages};
    get id() {return this.#id};

    returnInfo() {
        return `Title: ${this.#title} | Pages: ${this.#numberOfPages}`;
    };
};

class Magazine extends Book {
    #issueNumber;

    constructor(title, numberOfPages, issueNumber) {
        super(title, numberOfPages);
        this.issueNumber = issueNumber;
    };

    set issueNumber(issueNumber) {
        this.#issueNumber = Number.isInteger(Number(issueNumber)) ? Number(issueNumber) : null;
    };
    get issueNumber() {return this.#issueNumber};

    returnInfo() {
        return `${super.returnInfo()} | Issue number: ${this.#issueNumber}`;
    };
};

class User {
    #name;
    #maxPagesForLoan;
    #booksOnLoan;
    #totalPagesOnLoan
    constructor(name) {
        this.name = name;
        this.#maxPagesForLoan = 600;
        this.#booksOnLoan = [];
        this.#totalPagesOnLoan = 0;
    };
    set name(name) {
        this.#name = name.charAt(0).toUpperCase() +  name.slice(1);
    };
    get name() {return this.#name};
    get maxPagesForLoan() {return this.#maxPagesForLoan};
    get booksOnLoan() {return this.#booksOnLoan};
    get totalPagesOnLoan() {return this.#totalPagesOnLoan};

    borrowBook(book) {
        if (book instanceof Book || book instanceof Magazine) {

            let bookIndex = this.#booksOnLoan.indexOf(book.id);

            if (this.#totalPagesOnLoan + book.numberOfPages <= this.#maxPagesForLoan && bookIndex == -1) {

                this.#booksOnLoan.push(book);
                this.#totalPagesOnLoan += book.numberOfPages;
                return true;

            } else
                return false;
        }
    };
    returnBook(book) {
        let bookIndex = this.#booksOnLoan.indexOf(book.id);

        if (bookIndex != -1) {

            this.#booksOnLoan.splice(bookIndex, 1);
            this.#totalPagesOnLoan -= book.numberOfPages;
            return true;

        } else
            return false;
    };
    printBooksOnLoan() {
        this.#booksOnLoan.forEach(book => console.log(book.returnInfo()));
    }
};

class Subscriber extends User {
    #totalPagesOnLoan;

    constructor(name) {
        super(name);
        this.#totalPagesOnLoan = 0;
    };
    get totalPagesOnLoan() {return this.#totalPagesOnLoan};

    borrowBook(book) {
        if (book instanceof Book || book instanceof Magazine) {

            let bookIndex = this.booksOnLoan.indexOf(book.id);

            if (bookIndex == -1) {

                this.booksOnLoan.push(book);
                this.#totalPagesOnLoan += book.numberOfPages;
                return true;

            } else
                return false;
        }
    };
}

const topolino = new Magazine('topolino', 50, 1);

const mario = new User('mario');

mario.borrowBook(topolino);
mario.borrowBook(new Book('Norwegian Wood', 250));
mario.borrowBook(new Book('Trainspotting', 350));

mario.printBooksOnLoan();

console.log();

const luisa = new Subscriber('luisa');

luisa.borrowBook(topolino);
luisa.borrowBook(new Book('Norwegian Wood', 250));
luisa.borrowBook(new Book('Trainspotting', 350));

luisa.printBooksOnLoan();
