// script.js

document.addEventListener('DOMContentLoaded', () => {
  const loginBtn = document.getElementById('loginBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  const authModal = document.getElementById('authModal');
  const closeModal = document.getElementById('closeModal');
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const forgotPasswordForm = document.getElementById('forgotPasswordForm');

  const showSignup = document.getElementById('showSignup');
  const showLogin = document.getElementById('showLogin');
  const forgotPassword = document.getElementById('forgotPassword');

  // Open modal
  loginBtn.addEventListener('click', () => {
    authModal.style.display = 'block';
    loginForm.style.display = 'block';
    signupForm.style.display = 'none';
    forgotPasswordForm.style.display = 'none';
  });

  // Close modal
  closeModal.addEventListener('click', () => {
    authModal.style.display = 'none';
  });

  // Toggle between login/signup
  showSignup.addEventListener('click', () => {
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
  });

  showLogin.addEventListener('click', () => {
    signupForm.style.display = 'none';
    loginForm.style.display = 'block';
  });

  // Forgot password
  forgotPassword.addEventListener('click', () => {
    loginForm.style.display = 'none';
    forgotPasswordForm.style.display = 'block';
  });

  // Login form submission
  document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();
    if (result.success) {
      localStorage.setItem('token', result.token);
      redirectToDashboard(result.role);
    } else {
      document.getElementById('loginError').style.display = 'block';
    }
  });

  // Signup form submission
  document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const role = document.getElementById('signup-role').value;

    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role }),
    });

    const result = await response.json();
    if (result.success) {
      localStorage.setItem('token', result.token);
      redirectToDashboard(role);
    } else {
      document.getElementById('signupError').style.display = 'block';
    }
  });

  // Token Validation on Page Load
  const token = localStorage.getItem('token');
  if (token) {
    const response = await fetch('/api/validate-token', {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (response.status !== 200) {
      localStorage.removeItem('token');
      window.location.href = '/login'; // Redirect to login if token is invalid
    }
  }

  // Redirect to dashboard based on role
  function redirectToDashboard(role) {
    if (role === 'client') {
      window.location.href = '/client-dashboard.html';
    } else if (role === 'provider') {
      window.location.href = '/provider-dashboard.html';
    } else if (role === 'admin') {
      window.location.href = '/admin-panel.html';
    }
  }

  // Logout functionality
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = '/'; // Redirect to homepage
  });
});
