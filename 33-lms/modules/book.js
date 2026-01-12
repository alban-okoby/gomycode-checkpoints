export class Book {
    constructor(id, title, author, ISBN) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.ISBN = ISBN;
        this.status = "Available";
        this.observers = [];
    }

    issue() {
        if (this.status === "Available") {
            this.status = "Issued";
            this.notifyObservers(`Book "${this.title}" has been issued.`);
            return true;
        }
        return false;
    }

    returnBook() {
        this.status = "Available";
        this.notifyObservers(`Book "${this.title}" has been returned.`);
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    notifyObservers(message) {
        this.observers.forEach(obs => obs.update(message));
    }
}
