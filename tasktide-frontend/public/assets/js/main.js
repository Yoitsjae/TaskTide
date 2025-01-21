// js/main.js

// Global constants
const API_BASE_URL = "https://yourapi.com/api";

// Toggle visibility of an element
function toggleVisibility(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.display = element.style.display === 'none' ? 'block' : 'none';
    }
}

// Format date in a user-friendly way
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Show notification message
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerText = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Initialize global event listeners
document.addEventListener('DOMContentLoaded', () => {
    console.log("Main script loaded and ready!");
    // Add other global initialization code here
});
