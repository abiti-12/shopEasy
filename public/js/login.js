const form = document.getElementById("login-form");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value;

    const password = document.getElementById("password").value;

    const response = await fetch("/users/login", {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify({

            email,
            password

        })

    });

    const data = await response.json();

    if (!response.ok) {

        alert(data.message);

        return;

    }

    // Save JWT Token
    localStorage.setItem("token", data.token);

    // Save Logged-in User
    localStorage.setItem("user", JSON.stringify(data.user));

    alert("Login Successful!");

   const redirect = localStorage.getItem("redirectAfterLogin");

if (redirect) {

    localStorage.removeItem("redirectAfterLogin");

    window.location.href = redirect;

} else {

    window.location.href = "/";

}

});