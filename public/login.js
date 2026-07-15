const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const message = document.getElementById("message");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();



  const response = await fetch("/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: document.getElementById("login-email").value,
      password: document.getElementById("login-password").value,
    }),
  });




  const data = await response.json();

  if (response.ok) {
    // save the token so other pages can use it
    localStorage.setItem("token", data.token);
    localStorage.setItem("username", data.username);
    window.location.href = "/dashboard.html";
  } else {
    message.textContent = data.message;
  }
});




registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const response = await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: document.getElementById("register-username").value,
      email: document.getElementById("register-email").value,
      password: document.getElementById("register-password").value,
    }),
  });

  const data = await response.json();

  if (response.ok) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("username", data.username);
    window.location.href = "/dashboard.html";
  } else {
    message.textContent = "Could not register - username or email may be taken";
  }
});

