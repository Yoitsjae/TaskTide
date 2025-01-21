// js/profile.js

// Update profile information
async function updateProfile(profileData) {
  try {
      const response = await fetch(`${API_BASE_URL}/profile`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(profileData)
      });
      
      if (response.ok) {
          showNotification('Profile updated successfully', 'success');
      } else {
          showNotification('Failed to update profile', 'error');
      }
  } catch (error) {
      showNotification('Error updating profile', 'error');
  }
}

// Handle profile form submission
document.getElementById('profile-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const profileData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      bio: document.getElementById('bio').value,
  };
  updateProfile(profileData);
});
