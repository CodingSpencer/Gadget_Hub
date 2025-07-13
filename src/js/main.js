import '../assets/css/style.css'; // CSS gets bundled by Vite

import { initAddDeviceForm } from './functions/deviceSearch.js';
import { handleDeviceRecommendation } from './functions/recommendDevices.js';

// Initialize functions after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initAddDeviceForm();
  handleDeviceRecommendation();
});