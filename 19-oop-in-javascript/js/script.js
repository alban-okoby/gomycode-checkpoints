document.addEventListener("DOMContentLoaded", function () {

  /* =========================
     CLASSES OOJ
  ========================== */

  class Product {
    constructor(id, name, price) {
      this.id = id;
      this.name = name;
      this.price = price;
    }
  }

  class ShoppingCartItem {
    constructor(product, quantity = 0) {
      this.product = product;
      this.quantity = quantity;
    }

    getTotalPrice() {
      return this.product.price * this.quantity;
    }
  }

  class ShoppingCart {
    constructor() {
      this.items = [];
    }

    /**
     * Add an item to the cart
     * @param {*} product 
     * @param {*} quantity 
     */
    addItem(product, quantity = 1) {
      const item = this.items.find(
        i => i.product.id === product.id
      );

      if (item) {
        item.quantity += quantity;
      } else {
        this.items.push(new ShoppingCartItem(product, quantity));
      }
    }

    /**
     * Decrease the quantity of an item in the cart
     * @param {*} productId 
     */
    decreaseItem(productId) {
      const item = this.items.find(
        i => i.product.id === productId
      );

      if (item && item.quantity > 0) {
        item.quantity--;
      }
    }

    /**
     * Remove an item from the cart
     * @param {*} productId 
     */
    removeItem(productId) {
      this.items = this.items.filter(
        i => i.product.id !== productId
      );
    }

    /**
     * Get the total price of the cart
     * @returns 
     */
    getTotal() {
      return this.items.reduce(
        (sum, item) => sum + item.getTotalPrice(),
        0
      );
    }
  }

  /* =========================
     INITIALISATION PRODUITS
  ========================== */

  const products = [
    new Product(1, "Baskets", 100),
    new Product(2, "Socks", 20),
    new Product(3, "Bag", 50)
  ];

  const cart = new ShoppingCart();
  const totalDisplay = document.querySelector(".total");
  const productCards = document.querySelectorAll(".card");

  function updateTotal() {
    totalDisplay.textContent = `${cart.getTotal()} $`;
  }

  function getProductByName(name) {
    return products.find(p => p.name === name);
  }

  productCards.forEach(card => {

    const productName = card.querySelector(".card-title").textContent;
    const quantitySpan = card.querySelector(".quantity");

    const plusBtn = card.querySelector(".fa-plus-circle");
    const minusBtn = card.querySelector(".fa-minus-circle");
    const trashBtn = card.querySelector(".fa-trash-alt");
    const heartBtn = card.querySelector(".fa-heart");

    const product = getProductByName(productName);

    // Increase quantity
    plusBtn.addEventListener("click", () => {
      cart.addItem(product, 1);
      quantitySpan.textContent++;
      updateTotal();
    });

    // Decrease quantity
    minusBtn.addEventListener("click", () => {
      if (quantitySpan.textContent > 0) {
        cart.decreaseItem(product.id);
        quantitySpan.textContent--;
        updateTotal();
      }
    });

    // Remove product
    trashBtn.addEventListener("click", () => {
      cart.removeItem(product.id);
      card.parentElement.remove();
      updateTotal();
    });

    // Like product
    heartBtn.addEventListener("click", () => {
      heartBtn.classList.toggle("text-danger");
    });

  });

  updateTotal();
});
