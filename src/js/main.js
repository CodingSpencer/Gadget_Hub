import { initAddDeviceForm } from './functions/deviceSearch.js';
import { setupRecommendations } from './functions/recommendDevices.js';

// Initialize functions after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const recommendForm = document.querySelector('.recommendForm');
  if (recommendForm) {
    setupRecommendations(recommendForm);
  } else {
    console.warn('Recommend form not found!');
  }
  initAddDeviceForm();
});