/**
 * Builder Pattern Implementation for Product Creation
 * 
 * Cleaner object creation
 * No constructor overloads
 * Highly readable
 */
class ProductBuilder {
    constructor(name) {
        this.product = { name };
    }

    setPrice(price) {
        this.product.price = price;
        return this;
    }

    setCategory(category) {
        this.product.category = category;
        return this;
    }

    setStock(stock) {
        this.product.stock = stock;
        return this;
    }

    build() {
        return this.product;
    }
}

const laptop = new ProductBuilder("Laptop")
    .setPrice(3000)
    .setCategory("Electronics")
    .setStock(5)
    .build();

