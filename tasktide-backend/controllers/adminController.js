const db = require("../db");

exports.getDashboardData = (req, res) => {
  try {
    const data = {
      users: db.users,
      tasks: db.tasks,
      analytics: {
        totalUsers: db.users.length,
        pendingTasks: db.tasks.filter((task) => task.status === "Pending").length,
        completedTasks: db.tasks.filter((task) => task.status === "Completed").length,
      },
    };
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching dashboard data", error: err.message });
  }
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;
  try {
    db.users = db.users.filter((user) => user.id !== id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting user", error: err.message });
  }
};

exports.approveTask = (req, res) => {
  const { id } = req.params;
  try {
    const task = db.tasks.find((task) => task.id === id);
    if (task) {
      task.status = "Approved";
      res.status(200).json({ message: "Task approved successfully" });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error approving task", error: err.message });
  }
};

exports.rejectTask = (req, res) => {
  const { id } = req.params;
  try {
    const task = db.tasks.find((task) => task.id === id);
    if (task) {
      task.status = "Rejected";
      res.status(200).json({ message: "Task rejected successfully" });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error rejecting task", error: err.message });
  }
};
