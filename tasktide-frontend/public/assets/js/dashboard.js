// js/dashboard.js

// Fetch dashboard data
async function loadDashboardData() {
  try {
      const response = await fetch(`${API_BASE_URL}/dashboard`);
      const data = await response.json();
      // Render data on the dashboard
      renderDashboardData(data);
  } catch (error) {
      showNotification('Error loading dashboard data', 'error');
  }
}

// Render dashboard data into the DOM
function renderDashboardData(data) {
  const dashboardContainer = document.getElementById('dashboard-container');
  if (dashboardContainer) {
      // Render each data item as needed
      dashboardContainer.innerHTML = data.items.map(item => `
          <div class="dashboard-item">
              <h3>${item.title}</h3>
              <p>${item.description}</p>
          </div>
      `).join('');
  }
}

// Initialize dashboard-specific features on page load
document.addEventListener('DOMContentLoaded', () => {
  console.log("Dashboard script loaded");
  loadDashboardData();
});
