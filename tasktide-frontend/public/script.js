// script.js

document.addEventListener('DOMContentLoaded', () => {
  const roleSelect = document.getElementById('user-role');
  const loginForm = document.getElementById('loginForm');
  const forgotPasswordForm = document.getElementById('forgotPasswordForm');
  const loginError = document.getElementById('loginError');
  const forgotPasswordError = document.getElementById('forgotPasswordError');

  roleSelect.addEventListener('change', () => {
    if (roleSelect.value) {
      loginForm.style.display = 'block';
    }
  });

  // Login form submission
  document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const result = await response.json();
    if (result.success) {
      localStorage.setItem('token', result.token);
      window.location.href = result.role === 'client' ? '/client-dashboard.html' : '/provider-dashboard.html';
    } else {
      loginError.style.display = 'block';
    }
  });

  // Forgot password form submission
  document.getElementById('forgot-password-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('forgot-email').value;

    const response = await fetch('/api/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });

    const result = await response.json();
    if (result.success) {
      alert('Reset link sent to your email.');
      forgotPasswordForm.style.display = 'none';
    } else {
      forgotPasswordError.style.display = 'block';
    }
  });
});
