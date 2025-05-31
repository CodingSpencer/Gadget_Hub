const maxTotalForms = 6;
const maxUnfilledForms = 2;
const addDeviceButton = document.getElementById('addDeviceButton');
const deviceInfoSection = document.getElementById('deviceInfo');

function countUnfilledForms() {
    const forms = document.querySelectorAll('.deviceInfoForm');
    let unfilledCount = 0;
    forms.forEach(form => {
        const searchButton = form.querySelector('button[type="submit"]');
        if (searchButton || !searchButton.disabled) {
            unfilledCount++;
        }
    });
    return unfilledCount;
}

function countTotalForms() {
    return document.querySelectorAll('.deviceInfoForm').length;
}

export function createDeviceForm() {
    const form = document.createElement('form');
    form.classList.add('deviceInfoForm');
    form.innerHTML = `
      <h2>Device Information</h2>

      <label for="deviceType">Device Type</label>
      <select id="deviceType" name="deviceType">
        <option value="smartphone">Smartphone</option>
        <option value="tablet">Tablet</option>
        <option value="laptop">Laptop</option>
        <option value="desktop">Desktop</option>
        <option value="wearable">Wearable</option>
      </select>

        <label for="Brand">Brand: </label>
        <input type="text" id="brand" name="brand" placeholder="Apple, Samsung, etc." required />

        <label for="model">Model: </label>
        <input type="text" id="model" name="model" placeholder="iPhone 14, Galaxy S21, etc." required />

        <button type="submit">Search</button>
        <button type="button" class="removeFormButton">Remove</button>
    `;
  
  const removeButton = form.querySelector('.removeFormButton');
  removeButton.addEventListener('click', () => {
        form.remove();
    });
    return form;
}

export function initAddDeviceForm() {
    addDeviceButton.addEventListener('click', () => {
        const totalForms = countTotalForms();
        const unfilledForms = countUnfilledForms();

        if (totalForms >= maxTotalForms) {
            alert(`You can only add up to ${maxTotalForms} devices.`);
            return;
        }
        if (unfilledForms >= maxUnfilledForms) {
            alert(`Please fill out or remove existing empty forms before adding a new one.`);
            return;
        }

        const newForm = createDeviceForm();
        deviceInfoSection.insertBefore(newForm, addDeviceButton);
    });
}