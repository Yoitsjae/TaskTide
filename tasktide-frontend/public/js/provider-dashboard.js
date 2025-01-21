document.addEventListener("DOMContentLoaded", async () => {
    const assignedTasks = document.getElementById("assigned-tasks");
    const taskRequests = document.getElementById("task-requests");
    const earnings = document.getElementById("earnings");

    try {
        const response = await fetch("http://localhost:5000/api/provider/dashboard");
        const data = await response.json();

        // Populate assigned tasks
        data.assignedTasks.forEach((task) => {
            const li = document.createElement("li");
            li.textContent = task.name;
            assignedTasks.appendChild(li);
        });

        // Populate task requests
        data.taskRequests.forEach((request) => {
            const li = document.createElement("li");
            li.textContent = request.name;
            taskRequests.appendChild(li);
        });

        // Populate earnings
        earnings.textContent = `$${data.earnings}`;
    } catch (err) {
        console.error("Error fetching provider dashboard data:", err);
    }
});
