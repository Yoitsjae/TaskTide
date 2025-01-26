// scripts.js

document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const profileForm = document.getElementById("profile-form");
  const reviewsSection = document.querySelector(".reviews-section");
  const portfolioGrid = document.querySelector(".portfolio-grid");
  const saveButton = profileForm.querySelector(".btn");

  // Mock Data
  const reviews = [
    {
      client: "Jane Doe",
      rating: 4,
      comment: "John was quick and efficient. Highly recommend!",
    },
    {
      client: "Emily Brown",
      rating: 5,
      comment: "Fantastic service! Very professional and on time.",
    },
  ];

  const portfolioItems = [
    {
      image: "assets/plumbing-job.jpg",
      description: "Bathroom Plumbing Installation",
    },
    {
      image: "assets/electrical-repair.jpg",
      description: "Electrical Panel Repair",
    },
    {
      image: "assets/painting-job.jpg",
      description: "Interior Painting Project",
    },
  ];

  // Load Reviews
  const loadReviews = () => {
    reviews.forEach((review) => {
      const reviewElement = document.createElement("div");
      reviewElement.classList.add("review");
      reviewElement.innerHTML = `
        <h3>Client: ${review.client}</h3>
        <p>Rating: ${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}</p>
        <p>Comment: "${review.comment}"</p>
      `;
      reviewsSection.appendChild(reviewElement);
    });
  };

  // Load Portfolio Items
  const loadPortfolio = () => {
    portfolioItems.forEach((item) => {
      const portfolioElement = document.createElement("div");
      portfolioElement.classList.add("portfolio-item");
      portfolioElement.innerHTML = `
        <img src="${item.image}" alt="${item.description}">
        <p>${item.description}</p>
      `;
      portfolioGrid.appendChild(portfolioElement);
    });
  };

  // Save Profile Changes
  const saveProfile = () => {
    const formData = new FormData(profileForm);
    const profileData = Object.fromEntries(formData.entries());
    console.log("Profile Updated:", profileData);

    // Mock saving data
    alert("Profile changes have been saved!");
  };

  // Event Listeners
  saveButton.addEventListener("click", saveProfile);

  // Initialize Page Content
  loadReviews();
  loadPortfolio();
});
