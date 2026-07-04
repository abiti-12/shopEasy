let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cart-items");
const totalElement = document.getElementById("cart-total");

function saveCart() {

    localStorage.setItem("cart", JSON.stringify(cart));

    renderCart();

}

function increase(index) {

    cart[index].quantity++;

    saveCart();

}

function decrease(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }

    saveCart();

}

function removeItem(index) {

    cart.splice(index, 1);

    saveCart();

}

function renderCart() {

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = "<h2>Your cart is empty.</h2>";

        totalElement.innerHTML = "";

        return;

    }

    let total = 0;

    cart.forEach((item, index) => {

        total += item.price * item.quantity;

        cartItems.innerHTML += `

        <div class="product-card">

            <h2>${item.name}</h2>

            <h3>$${item.price}</h3>

            <p>

                Quantity:

                <button onclick="decrease(${index})">−</button>

                ${item.quantity}

                <button onclick="increase(${index})">+</button>

            </p>

            <h3>Subtotal: $${item.price * item.quantity}</h3>

            <button onclick="removeItem(${index})">

                Remove

            </button>

        </div>

        `;

    });

    totalElement.innerHTML = `<h2>Total: $${total}</h2>`;

}

document.getElementById("checkout-btn").onclick = () => {

    if (cart.length === 0) {

        alert("Cart is empty.");

        return;

    }

    window.location.href = "/checkout";

};

renderCart();