// js/auth.js

// Handle user login
async function login(email, password) {
  try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
      });

      if (response.ok) {
          const data = await response.json();
          localStorage.setItem('token', data.token);  // Save JWT token
          showNotification('Login successful', 'success');
          window.location.href = '/dashboard.html';   // Redirect to dashboard
      } else {
          showNotification('Login failed', 'error');
      }
  } catch (error) {
      showNotification('Error during login', 'error');
  }
}

// Handle user signup
async function signup(userData) {
  try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
      });

      if (response.ok) {
          showNotification('Signup successful', 'success');
          window.location.href = '/login.html';
      } else {
          showNotification('Signup failed', 'error');
      }
  } catch (error) {
      showNotification('Error during signup', 'error');
  }
}

// Handle password reset
async function resetPassword(email) {
  try {
      const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email })
      });

      if (response.ok) {
          showNotification('Password reset email sent', 'success');
      } else {
          showNotification('Failed to send password reset email', 'error');
      }
  } catch (error) {
      showNotification('Error during password reset', 'error');
  }
}
