const maxForms = 2;
const addDeviceButton = document.getElementById('addDeviceButton');
const deviceFormContainer = document.querySelector('form.deviceInfoForm');

function countForms() {
    const forms = document.querySelectorAll('.deviceInfoForm');
    let count = 0;
    forms.forEach(form => {
        const brand = form.querySelector('input[name="brand"]').value.trim();
        const model = form.querySelector('input[name="model"]').value.trim();
        if (brand || model) {
            count++;
        }
    });
    return count;
}

export function addDeviceForm() {
    const form = document.createElement('form');
    form.classList.add('deviceInfoForm');
    form.innerHTML = `
        section id="deviceInfo">
    <form class="deviceInfoForm">
      <h2>Device Information</h2>

      <label for="deviceType">Device Type</label>
      <select id="deviceType" name="deviceType">
        <option value="smartphone">Smartphone</option>
        <option value="tablet">Tablet</option>
        <option value="laptop">Laptop</option>
        <option value="desktop">Desktop</option>
        <option value="wearable">Wearable</option>

        <label for="Brand">Brand: </label>
        <input type="text" id="brand" name="brand" placeholder="Apple, Samsung, etc." required />

        <label for="model">Model: </label>
        <input type="text" id="model" name="model" placeholder="iPhone 14, Galaxy S21, etc." required />

        <button type="submit">Search</button>
    </form>
    <button type="button" class="removeFormButton">Remove</button>
    <button type="button" id="addDeviceButton">Add Device</button>
  </section>`;
  
  const removeButton = form.querySelector('.removeFormButton');
  removeButton.addEventListener('click', () => {
        form.remove();
    });
    return form;
}

export function addDeviceForm() {
    addDeviceButton.addEventListener('click', () => {
        if (countForms() < maxForms) {
            const newForm = addDeviceForm();
            ddeviceInfoSection.insertBefore(newForm, addDeviceButton);
        } else {
            alert('You can only have up to 2 unfilled device forms at once.');
        }
    });
}