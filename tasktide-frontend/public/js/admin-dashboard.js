document.addEventListener('DOMContentLoaded', async () => {
  const userTable = document.getElementById('user-table').querySelector('tbody');
  const taskTable = document.getElementById('task-table').querySelector('tbody');
  const totalTasks = document.getElementById('total-tasks');
  const completedTasks = document.getElementById('completed-tasks');
  const totalEarnings = document.getElementById('total-earnings');
  const activeUsers = document.getElementById('active-users');

  try {
      const response = await fetch('http://localhost:5000/api/admin/dashboard');
      const data = await response.json();

      // Populate user table
      data.users.forEach(user => {
          const row = document.createElement('tr');
          row.innerHTML = `
              <td>${user.id}</td>
              <td>${user.name}</td>
              <td>${user.role}</td>
              <td>
                  <button onclick="deleteUser(${user.id})">Delete</button>
                  <button onclick="editUser(${user.id})">Edit</button>
              </td>
          `;
          userTable.appendChild(row);
      });

      // Populate task table
      data.tasks.forEach(task => {
          const row = document.createElement('tr');
          row.innerHTML = `
              <td>${task.id}</td>
              <td>${task.name}</td>
              <td>${task.status}</td>
              <td>
                  <button onclick="approveTask(${task.id})">Approve</button>
                  <button onclick="rejectTask(${task.id})">Reject</button>
              </td>
          `;
          taskTable.appendChild(row);
      });

      // Populate analytics
      totalTasks.textContent = data.analytics.totalTasks;
      completedTasks.textContent = data.analytics.completedTasks;
      totalEarnings.textContent = `$${data.analytics.totalEarnings}`;
      activeUsers.textContent = data.analytics.activeUsers;
  } catch (err) {
      console.error('Error fetching admin dashboard data:', err);
  }
});

// Delete user
async function deleteUser(userId) {
  try {
      await fetch(`http://localhost:5000/api/admin/user/${userId}`, { method: 'DELETE' });
      alert('User deleted successfully!');
      location.reload();
  } catch (err) {
      console.error('Error deleting user:', err);
  }
}

// Edit user (mock function)
function editUser(userId) {
  alert(`Edit functionality for user ${userId} is not implemented yet.`);
}

// Approve task
async function approveTask(taskId) {
  try {
      await fetch(`http://localhost:5000/api/admin/task/${taskId}/approve`, { method: 'POST' });
      alert('Task approved successfully!');
      location.reload();
  } catch (err) {
      console.error('Error approving task:', err);
  }
}

// Reject task
async function rejectTask(taskId) {
  try {
      await fetch(`http://localhost:5000/api/admin/task/${taskId}/reject`, { method: 'POST' });
      alert('Task rejected successfully!');
      location.reload();
  } catch (err) {
      console.error('Error rejecting task:', err);
  }
}
