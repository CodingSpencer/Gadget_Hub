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
});
