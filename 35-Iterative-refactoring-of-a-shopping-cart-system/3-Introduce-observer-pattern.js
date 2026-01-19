/**
 * Observer Pattern Implementation for Product Price Changes
 * Loose coupling
 * Automatic notifications
 * Easy to add more observers later (email, SMS, logs)
 * 
 * Goal
    Notify users when product prices drop.  
 */
class PriceObserver {
    update(product) {
        console.log(`Price dropped for ${product.name}: ${product.price}`);
    }
}

class Product {
    constructor(name, price) {
        this.name = name;
        this.price = price;
        this.observers = [];
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    setPrice(newPrice) {
        if (newPrice < this.price) {
            this.notify();
        }
        this.price = newPrice;
    }

    notify() {
        this.observers.forEach(obs => obs.update(this));
    }
}
