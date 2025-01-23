const User = require("../models/User");

const calculateMatchScore = (customer, provider) => {
  let score = 0;

  // Check location match
  if (customer.location === provider.location) {
    score += 50;
  }

  // Check expertise match
  const matchingSkills = provider.skills.filter(skill =>
    customer.requiredSkills.includes(skill)
  );
  score += matchingSkills.length * 10;

  // Check other factors (e.g., ratings, experience)
  score += provider.rating * 5;
  score += provider.experienceYears * 2;

  return score;
};

exports.matchUsers = async (req, res) => {
  try {
    const customerId = req.user.id; // Assuming JWT middleware adds user ID to the request
    const customer = await User.findById(customerId);
    if (!customer || customer.role !== "Customer") {
      return res.status(400).json({ message: "Invalid customer request" });
    }

    const providers = await User.find({ role: "Provider" });
    const matches = providers
      .map(provider => ({
        provider,
        matchScore: calculateMatchScore(customer, provider),
      }))
      .filter(match => match.matchScore > 0)
      .sort((a, b) => b.matchScore - a.matchScore);

    res.json(matches);
  } catch (error) {
    console.error("Error matching users:", error);
    res.status(500).json({ message: "Server error" });
  }
};
