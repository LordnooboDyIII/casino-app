document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  // Remove previous error classes and hide error messages
  const inputs = form.querySelectorAll('.form-control');
  inputs.forEach(input => {
    input.classList.remove('is-invalid');
    document.getElementById(`${input.name}-error`).style.display = 'none';
  });

  try {
    // Send login request to server
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result.success) {
      // Redirect on successful login
      window.location.href = "/";
    } else {
      // Handle errors based on the 'field' and show respective messages
      if (result.field === "username") {
        document.getElementById('username-error').style.display = 'block';
        document.getElementById('username').classList.add('is-invalid');  // Add 'is-invalid' class
      } else if (result.field === "password") {
        document.getElementById('password-error').style.display = 'block';
        document.getElementById('password').classList.add('is-invalid');  // Add 'is-invalid' class
      }
    }

  } catch (error) {
    console.error("Error during login:", error);
    // Optionally show a generic error
  }
});
