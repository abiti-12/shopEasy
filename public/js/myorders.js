const container = document.getElementById("orders-container");

const token = localStorage.getItem("token");

if (!token) {

    window.location.href = "/login";

}

async function loadOrders() {

    const response = await fetch("/orders/my-orders", {

        headers: {

            Authorization: `Bearer ${token}`

        }

    });

    const orders = await response.json();

    if (!response.ok) {

        container.innerHTML = "<h2>Unable to load orders.</h2>";

        return;

    }

    if (orders.length === 0) {

        container.innerHTML = "<h2>No orders yet.</h2>";

        return;

    }

    container.innerHTML = "";

    orders.forEach(order => {

        container.innerHTML += `

            <div class="product-card">

                <h2>${order.customerName}</h2>

                <p><strong>Email:</strong> ${order.email}</p>

                <p><strong>Address:</strong> ${order.address}</p>

                <p><strong>Items:</strong> ${order.items.length}</p>

            </div>

        `;

    });

}

loadOrders();