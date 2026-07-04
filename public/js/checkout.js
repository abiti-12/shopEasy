const form = document.getElementById("checkout-form");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const customerName = document.getElementById("customerName").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    const payment = document.getElementById("payment").value;

    const items = JSON.parse(localStorage.getItem("cart")) || [];

    const token = localStorage.getItem("token");

    if (!token) {

        alert("Please login first.");

        window.location.href = "/login";

        return;

    }

    if (items.length === 0) {

        alert("Your cart is empty.");

        return;

    }

    // Calculate total amount
 const amount = Number(
    items.reduce((sum, item) => {
        return sum + (Number(item.price) * Number(item.quantity));
    }, 0)
);

console.log("Amount:", amount);
console.log(JSON.stringify(items, null, 2));

    // ==========================
    // CHAPA PAYMENT
    // ==========================

    if (payment === "chapa") {

        try {

            const names = customerName.trim().split(" ");

            const first_name = names[0];

            const last_name = names.slice(1).join(" ") || "Customer";

            const response = await fetch("/payment/chapa", {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    amount,
                    email,
                    first_name,
                    last_name

                })

            });

            const data = await response.json();

            if (data.status === "success") {

                // Save order after successful payment (next step)
               localStorage.setItem("pendingOrder", JSON.stringify({

    customerName,
    email,
    address,
    items,
    paymentMethod: "Chapa"

}));

window.location.href = data.data.checkout_url;

            } else {

                alert("Unable to initialize payment.");

            }

        } catch (error) {

            console.error(error);

            alert("Payment error.");

        }

        return;

    }

    // ==========================
    // TELEBIRR
    // ==========================

    if (payment === "telebirr") {

        alert("Telebirr integration coming soon.");

        return;

    }

    // ==========================
    // SANTIMPAY
    // ==========================

    if (payment === "santimpay") {

        alert("SantimPay integration coming soon.");

        return;

    }

});