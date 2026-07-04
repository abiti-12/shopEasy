const container = document.getElementById("product-details");

// Get product id from URL
const productId = window.location.pathname.split("/").pop();

async function loadProduct() {

    try {

        const response = await fetch(`/products/${productId}`);
        const product = await response.json();

        if (!response.ok) {
            container.innerHTML = "<h2>Product not found.</h2>";
            return;
        }
container.innerHTML = `
<div class="product-details-card">

    <img src="/images/${product.image}" alt="${product.name}">

    <div class="product-info-details">

        <h1>${product.name}</h1>

        <h2>$${product.price}</h2>

        <p>${product.description}</p>

        <p><strong>Category:</strong> ${product.category}</p>

        <p><strong>Stock:</strong> ${product.stock}</p>

        <button id="add-cart">
            🛒 Add to Cart
        </button>

    </div>

</div>
`;

       document.getElementById("add-cart").addEventListener("click", () => {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(item => item.id === product._id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            id: product._id,
            name: product.name,
            price: Number(product.price),
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Product added to cart!");

});

    } catch (error) {

        console.error(error);

        container.innerHTML = "<h2>Error loading product.</h2>";

    }

}

loadProduct();