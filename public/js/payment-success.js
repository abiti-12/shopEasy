const order = JSON.parse(localStorage.getItem("pendingOrder"));

const token = localStorage.getItem("token");

if (!order) {

    alert("No pending order found.");

    window.location.href = "/";

}

async function saveOrder() {

    try {

        const response = await fetch("/orders", {

            method: "POST",

            headers: {

                "Content-Type": "application/json",

                Authorization: `Bearer ${token}`

            },

            body: JSON.stringify(order)

        });

        const data = await response.json();

        if (response.ok) {

            localStorage.removeItem("cart");

            localStorage.removeItem("pendingOrder");

            alert("Order saved successfully!");

            window.location.href = "/my-orders";

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.error(error);

        alert("Failed to save order.");

    }

}

saveOrder();