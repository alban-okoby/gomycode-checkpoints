document.addEventListener("DOMContentLoaded", function () {
    const plusButtons = document.querySelectorAll(".fa-plus-circle");
    const minusButtons = document.querySelectorAll(".fa-minus-circle");
    const trashButtons = document.querySelectorAll(".fa-trash-alt");
    const heartButtons = document.querySelectorAll(".fa-heart");
    const totalDisplay = document.querySelector(".total");

    function parsePrice(text) {
        return parseFloat(text.replace("$", "").trim());
    }

    /**
     *  Calculate total
     */
    function calculateTotal() {
        let total = 0;
        const cards = document.querySelectorAll(".card-body");
        cards.forEach((card) => {
            const unitPrice = parsePrice(
                card.querySelector(".unit-price")?.textContent || "0"
            );
            const quantity = parseInt(
                card.querySelector(".quantity")?.textContent || "0"
            );
            total += (unitPrice * quantity) / 2;
        });
        totalDisplay.textContent = `${total} $`;
    }

    plusButtons.forEach((btn) => {
        btn.addEventListener("click", function () {
            const quantitySpan = this.parentElement.querySelector(".quantity");
            let quantity = parseInt(quantitySpan.textContent);
            quantitySpan.textContent = quantity + 1;
            calculateTotal();
        });
    });

    /**
     * Add event listeners to "-" buttons
     */
    minusButtons.forEach((btn) => {
        btn.addEventListener("click", function () {
            const quantitySpan = this.parentElement.querySelector(".quantity");
            let quantity = parseInt(quantitySpan.textContent);
            if (quantity > 0) {
                quantitySpan.textContent = quantity - 1;
                calculateTotal();
            }
        });
    });

    /**
     *  Add event listeners to trash (delete) buttons
     */
    trashButtons.forEach((btn) => {
        btn.addEventListener("click", function () {
            const productCard = this.closest(".card");
            console.info(productCard);
            if (productCard) {
                productCard.remove();
                calculateTotal();
            }
        });
    });

    /**
     *  Add event listeners to heart (like) buttons
     */
    heartButtons.forEach((btn) => {
        btn.addEventListener("click", function () {
            this.classList.toggle("text-danger");
        });
    });


    calculateTotal();
});