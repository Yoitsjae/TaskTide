// assets/js/clientDashboard.js
document.addEventListener('DOMContentLoaded', () => {
  fetch('/api/services')
    .then(response => response.json())
    .then(services => {
      const serviceList = document.querySelector('.service-list');
      services.forEach(service => {
        const serviceItem = document.createElement('div');
        serviceItem.classList.add('service');
        serviceItem.innerHTML = `
          <h3>${service.name}</h3>
          <p>${service.description}</p>
          <p>Price: ${service.price}</p>
          <button data-id="${service._id}">Book Service</button>
        `;
        serviceList.appendChild(serviceItem);
      });
    });
});
