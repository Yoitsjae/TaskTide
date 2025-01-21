document.addEventListener("DOMContentLoaded", async () => {
    const activeTasks = document.getElementById("active-tasks");
    const completedTasks = document.getElementById("completed-tasks");
    const notifications = document.getElementById("notifications");

    try {
        const response = await fetch("http://localhost:5000/api/client/dashboard");
        const data = await response.json();

        // Populate active tasks
        data.activeTasks.forEach((task) => {
            const li = document.createElement("li");
            li.textContent = task.name;
            activeTasks.appendChild(li);
        });

        // Populate completed tasks
        data.completedTasks.forEach((task) => {
            const li = document.createElement("li");
            li.textContent = task.name;
            completedTasks.appendChild(li);
        });

        // Populate notifications
        data.notifications.forEach((note) => {
            const li = document.createElement("li");
            li.textContent = note.message;
            notifications.appendChild(li);
        });
    } catch (err) {
        console.error("Error fetching client dashboard data:", err);
    }
});
