// =========================
// Cart
// =========================
console.log("SCRIPT.JS LOADED");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Elements
const searchInput = document.getElementById("search-input");
const container = document.getElementById("product-container");

let allProducts = [];

// Update cart count
updateCartCount();

// =========================
// Update Cart Counter
// =========================

function updateCartCount() {

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    document.getElementById("cart-count").textContent = totalItems;

}

// =========================
// Display Products
// =========================

function displayProducts(products) {

    container.innerHTML = "";

    if (products.length === 0) {

        container.innerHTML = `
            <h2 style="text-align:center;width:100%;">
                No products found.
            </h2>
        `;

        return;
    }

    products.forEach(product => {

        container.innerHTML += `

            <div class="product-card">

                <a href="/product/${product._id}" class="product-link">

                    <span class="sale-badge">SALE</span>

                    <img
                        src="/images/${product.image}"
                        alt="${product.name}">

                    <div class="product-info">

                        <h3>${product.name}</h3>

                        <p class="rating">
                            ⭐⭐⭐⭐⭐
                            <span>(120 Reviews)</span>
                        </p>

                        <div class="price-box">

                            <span class="new-price">$${product.price}</span>

                        </div>

                    </div>

                </a>

                <button
                    class="cart-btn"
                    data-id="${product._id}"
                    data-name="${product.name}"
                    data-price="${product.price}">

                    🛒 Add to Cart

                </button>

            </div>

        `;

    });

    document.querySelectorAll(".cart-btn").forEach(button => {

        button.addEventListener("click", () => {

            const product = {

                id: button.dataset.id,

                name: button.dataset.name,

                price: Number(button.dataset.price)

            };

            const existing = cart.find(item => item.id === product.id);

            if (existing) {

                existing.quantity++;

            } else {

                product.quantity = 1;

                cart.push(product);

            }

            localStorage.setItem("cart", JSON.stringify(cart));

            updateCartCount();

            alert("Product added to cart!");

        });

    });

}

// =========================
// Load Products
// =========================

async function loadProducts() {

    try {

        const response = await fetch("/products");

        allProducts = await response.json();

        displayProducts(allProducts);

    } catch (error) {

        console.error(error);

    }

}

loadProducts();


// =========================
// Search Products
// =========================
searchInput.addEventListener("input", () => {

    const keyword = searchInput.value.trim().toLowerCase();

    if (keyword === "") {

        displayProducts(allProducts);

        return;

    }

    const filtered = allProducts.filter(product =>

        product.name.toLowerCase().includes(keyword) ||

        product.category.toLowerCase().includes(keyword)

    );

    console.log(filtered);

    displayProducts(filtered);

});
// =========================
// Category Filter
// =========================

function filterCategory(category) {

    const title = document.getElementById("category-title");

    if (category === "All") {

        title.textContent = "Featured Products";

        displayProducts(allProducts);

    } else {

        title.textContent = category;

        const filtered = allProducts.filter(product =>
            product.category.toLowerCase() === category.toLowerCase()
        );

        displayProducts(filtered);

    }

    document.getElementById("products").scrollIntoView({

        behavior: "smooth"

    });

}

// =========================
// User Authentication UI
// =========================

const userArea = document.getElementById("user-area");

const user = JSON.parse(localStorage.getItem("user"));

if (user) {

    userArea.innerHTML = `

        <span class="welcome-user">

            Welcome, ${user.name}

        </span>

        <button id="logout-btn" class="login-btn">

            Logout

        </button>

    `;

    document.getElementById("logout-btn").addEventListener("click", () => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        window.location.reload();

    });

} else {

    userArea.innerHTML = `

        <a href="/login">

            <button class="login-btn">

                Login

            </button>

        </a>

        <a href="/register">

            <button class="login-btn">

                Register

            </button>

        </a>

    `;

}
const subscribeBtn = document.getElementById("subscribe-btn");

console.log("Subscribe button:", subscribeBtn);

if (subscribeBtn) {

    subscribeBtn.addEventListener("click", () => {

        const email = document
            .getElementById("newsletter-email")
            .value
            .trim();

        if (email === "") {

            alert("Please enter your email.");

            return;

        }

        alert(`Thank you for subscribing, ${email}!`);

        document.getElementById("newsletter-email").value = "";

    });

}