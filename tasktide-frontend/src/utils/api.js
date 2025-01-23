export const signupUser = async (userData) => {
  try {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    return await response.json();
  } catch (error) {
    console.error("Signup error:", error.message);
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    return await response.json();
  } catch (error) {
    console.error("Login error:", error.message);
  }
};

export const getUserDashboard = async () => {
  try {
    const response = await fetch("/api/auth/dashboard", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Dashboard error:", error.message);
  }
  const API_URL = "http://localhost:5000/api/some-endpoint";

};
