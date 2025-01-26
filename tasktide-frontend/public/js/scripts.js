// scripts.js

// Function to show the logout confirmation modal
function showLogoutModal() {
  const modal = document.createElement('div');
  modal.id = 'logout-modal';
  modal.innerHTML = `
      <div class="modal-content">
          <p>Are you sure you want to log out?</p>
          <button onclick="logout()">Yes</button>
          <button onclick="closeModal()">No</button>
      </div>
  `;
  document.body.appendChild(modal);
}

// Function to close the modal
function closeModal() {
  const modal = document.getElementById('logout-modal');
  if (modal) {
      modal.remove();
  }
}

// Function to handle logout
function logout() {
  // Logic to handle logout, like clearing session, tokens, etc.
  window.location.href = '/login';  // Redirect to login page after logout
}

// Event listener for logout button
const logoutButton = document.querySelector('#logout-btn');
if (logoutButton) {
  logoutButton.addEventListener('click', showLogoutModal);
}

// Add more functions as needed for additional interactivity
