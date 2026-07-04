// ===============================
// Admin Authentication
// ===============================

const user = JSON.parse(localStorage.getItem("user"));

if (!user || !user.isAdmin) {

    alert("Access Denied!");

    window.location.href = "/";

}

// ===============================
// Elements
// ===============================

const form = document.getElementById("product-form");
const productsContainer = document.getElementById("admin-products");

// ===============================
// Load Products
// ===============================

async function loadProducts() {

    try {

        const response = await fetch("/products");

        const products = await response.json();

        productsContainer.innerHTML = "";

        products.forEach(product => {

            productsContainer.innerHTML += `

                <div class="product-card">

                    <img
                        src="/images/${product.image}"
                        width="150"
                        alt="${product.name}">

                    <h3>${product.name}</h3>

                    <p><strong>Price:</strong> $${product.price}</p>

                    <p><strong>Category:</strong> ${product.category}</p>

                    <p><strong>Stock:</strong> ${product.stock}</p>

                    <button onclick="editProduct('${product._id}')">

                        Edit

                    </button>

                    <button onclick="deleteProduct('${product._id}')">

                        Delete

                    </button>

                </div>

            `;

        });

    } catch (error) {

        console.error(error);

    }

}

// ===============================
// Add / Update Product
// ===============================

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const product = {

        name: document.getElementById("name").value,

        price: Number(document.getElementById("price").value),

        category: document.getElementById("category").value,

        stock: Number(document.getElementById("stock").value),

        image: document.getElementById("image").value,

        description: document.getElementById("description").value

    };

    const editId = form.dataset.editId;

    const url = editId
        ? `/products/${editId}`
        : "/products";

    const method = editId
        ? "PUT"
        : "POST";

    try {

        const response = await fetch(url, {

            method,

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(product)

        });

        const data = await response.json();

        alert(data.message || (editId ? "Product updated!" : "Product added!"));

        form.reset();

        delete form.dataset.editId;

        loadProducts();

    } catch (error) {

        console.error(error);

    }

});

// ===============================
// Delete Product
// ===============================

async function deleteProduct(id) {

    if (!confirm("Delete this product?")) return;

    try {

        await fetch(`/products/${id}`, {

            method: "DELETE"

        });

        loadProducts();

    } catch (error) {

        console.error(error);

    }

}

// ===============================
// Edit Product
// ===============================

async function editProduct(id) {

    try {

        const response = await fetch(`/products/${id}`);

        const product = await response.json();

        document.getElementById("name").value = product.name;

        document.getElementById("price").value = product.price;

        document.getElementById("category").value = product.category;

        document.getElementById("stock").value = product.stock;

        document.getElementById("image").value = product.image;

        document.getElementById("description").value = product.description;

        form.dataset.editId = id;

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    } catch (error) {

        console.error(error);

    }

}

// ===============================
// Start
// ===============================

loadProducts();