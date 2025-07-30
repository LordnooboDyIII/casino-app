document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form[action='/registration']");
    const emailInput = document.getElementById("email");
    const emailError = document.getElementById("email-error");
    const usernameInput = document.getElementById("username");
    const usernameError = document.getElementById("username-error");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const passwordError = document.getElementById("password-error");

    form.addEventListener("submit", async function (e) {
        // Remove previous error state
        emailInput.classList.remove("input-error");
        if (emailError) emailError.style.display = "none";
        usernameInput.classList.remove("input-error");
        if (usernameError) usernameError.style.display = "none";
        passwordInput.classList.remove("input-error");
        confirmPasswordInput.classList.remove("input-error");
        if (passwordError) passwordError.style.display = "none";

        // Prevent default form submission
        e.preventDefault();

        // Password match check (client-side)
        if (passwordInput.value !== confirmPasswordInput.value) {
            passwordInput.classList.add("input-error");
            confirmPasswordInput.classList.add("input-error");
            if (passwordError) passwordError.style.display = "block";
            return; // Stop form submission
        }

        // Gather form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Send AJAX POST request
        const res = await fetch("/registration", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await res.json();

        if (!result.success && result.error) {
            if (result.error.includes("email")) {
                emailInput.classList.add("input-error");
                if (emailError) emailError.style.display = "block";
            }
            if (result.error.includes("Username")) {
                usernameInput.classList.add("input-error");
                if (usernameError) usernameError.style.display = "block";
            }
            // Optionally handle server-side password mismatch error here
        } else if (!result.success) {
            alert(result.error || "Registration failed.");
        } else {
            window.location.href = "/login";
        }
    });
});