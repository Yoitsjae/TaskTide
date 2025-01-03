// Admin dashboard
exports.adminDashboard = async (req, res) => {
  try {
    res.status(200).json({ message: 'Welcome to the Admin Dashboard' });
  } catch (error) {
    res.status(500).json({ message: 'Error accessing admin dashboard', error });
  }
};

// User dashboard
exports.userDashboard = async (req, res) => {
  try {
    res.status(200).json({ message: 'Welcome to the User Dashboard' });
  } catch (error) {
    res.status(500).json({ message: 'Error accessing user dashboard', error });
  }
};

// Manager dashboard
exports.managerDashboard = async (req, res) => {
  try {
    res.status(200).json({ message: 'Welcome to the Manager Dashboard' });
  } catch (error) {
    res.status(500).json({ message: 'Error accessing manager dashboard', error });
  }
};
