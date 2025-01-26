// chat.js

document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const chatForm = document.getElementById("chat-form");
  const chatInput = document.getElementById("chat-input");
  const chatMessages = document.querySelector(".chat-messages");
  const chatUserSelect = document.getElementById("chat-user-select");

  // Mock Data
  const mockMessages = [
    { sender: "Jane Doe", message: "Hi, I need help with plumbing.", timestamp: "10:00 AM" },
    { sender: "John Smith", message: "Sure! What seems to be the issue?", timestamp: "10:01 AM" },
    { sender: "Jane Doe", message: "There’s a leaking pipe in my kitchen.", timestamp: "10:03 AM" },
  ];

  const users = [
    { name: "Jane Doe", role: "Customer" },
    { name: "John Smith", role: "Service Provider" },
  ];

  // Functions
  const renderMessages = () => {
    chatMessages.innerHTML = ""; // Clear chat area
    mockMessages.forEach((msg) => {
      const messageElement = document.createElement("div");
      messageElement.classList.add("chat-message", msg.sender === "John Smith" ? "sent" : "received");
      messageElement.innerHTML = `
        <p class="chat-message-text"><strong>${msg.sender}:</strong> ${msg.message}</p>
        <span class="chat-timestamp">${msg.timestamp}</span>
      `;
      chatMessages.appendChild(messageElement);
    });

    // Scroll to the latest message
    chatMessages.scrollTop = chatMessages.scrollHeight;
  };

  const sendMessage = (event) => {
    event.preventDefault();

    const message = chatInput.value.trim();
    if (message === "") return;

    // Add the message to the mockMessages array
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    mockMessages.push({ sender: "John Smith", message, timestamp });

    // Clear input field
    chatInput.value = "";

    // Re-render messages
    renderMessages();
  };

  const populateUserDropdown = () => {
    users.forEach((user) => {
      const option = document.createElement("option");
      option.value = user.name;
      option.textContent = `${user.name} - ${user.role}`;
      chatUserSelect.appendChild(option);
    });
  };

  // Event Listeners
  chatForm.addEventListener("submit", sendMessage);

  // Initialize Page
  renderMessages();
  populateUserDropdown();
});
