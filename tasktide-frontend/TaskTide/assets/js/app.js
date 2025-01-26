document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const logoutButton = document.getElementById("logout-btn");

  // Mock Login
  loginForm?.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      // Mock login logic
      if (email === "jane@example.com" && password === "123456") {
          alert("Login successful!");
          window.location.href = "dashboard/client-dashboard.html";
      } else {
          alert("Invalid credentials.");
      }
  });

  // Logout Logic
  logoutButton?.addEventListener("click", () => {
      if (confirm("Are you sure you want to logout?")) {
          window.location.href = "../index.html";
      }
  });
});
