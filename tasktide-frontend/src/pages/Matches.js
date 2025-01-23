import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const response = await axios.get("/api/matches", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMatches(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching matches:", error);
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (matches.length === 0)
    return <div>No matches found. Please refine your requirements.</div>;

  return (
    <div className="dashboard">
      <h1>Your Matches</h1>
      <ul className="matches-list">
        {matches.map((match, index) => (
          <li key={match.provider._id} className="match-item">
            <h2>
              {index + 1}. {match.provider.name} {match.provider.surname}
            </h2>
            <p>Location: {match.provider.location}</p>
            <p>Skills: {match.provider.skills.join(", ")}</p>
            <p>Rating: {match.provider.rating}/5</p>
            <p>Experience: {match.provider.experienceYears} years</p>
            <p>Match Score: {match.matchScore}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Matches;
