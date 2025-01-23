import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";

const ClientDashboard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const response = await axios.get("/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchUserData();
  }, []);

  if (!userData) return <div>Loading...</div>;

  return (
    <div className="dashboard">
      <h1>Welcome, {userData.name} {userData.surname}</h1>
      <p>Role: {userData.role}</p>
      <div className="dashboard-links">
        <a href="/profile">Edit Profile</a>
        <a href="/services">View Services</a>
        <a href="/logout">Logout</a>
      </div>
    </div>
  );
};

export default ClientDashboard;
