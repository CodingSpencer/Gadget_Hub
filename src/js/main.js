import { initAddDeviceForm } from './functions/deviceSearch.js';
import { setupRecommendations } from './functions/recommendDevices.js';

// Initialize after DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize device form section
  initAddDeviceForm();

  // Initialize recommendation form
  const recommendForm = document.querySelector('#recommend-section .recommendForm');
  if (recommendForm) {
    setupRecommendations(recommendForm);
  } else {
    console.warn('Recommend form not found in #recommend-section!');
  }
  
  // Display welcome back message based on localStorage
  const welcomeMsg = document.getElementById('welcome-message');
  if (welcomeMsg) {
    const now = new Date();
    const currentPage = window.location.pathname;

    const lastVisit = localStorage.getItem('lastVisit');
    const lastPage = localStorage.getItem('lastPage');

    let message = '';

    if (lastVisit) {
      const daysAgo = Math.floor((now - new Date(lastVisit)) / (1000 * 60 * 60 * 24));
      message = `Welcome back! It's been ${daysAgo} day${daysAgo !== 1 ? 's' : ''} since your last visit.`;

      if (lastPage && lastPage !== currentPage) {
        message += ` You left off on the <a href="${lastPage}">${lastPage}</a> page.`;
      }
    } else {
      message = `Welcome! This looks like your first time here.`;
    }

    welcomeMsg.innerHTML = message;

    // Update localStorage with latest info
    localStorage.setItem('lastVisit', now.toISOString());
    localStorage.setItem('lastPage', currentPage);
  }
});
