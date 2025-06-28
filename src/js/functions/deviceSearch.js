import { handlePhoneSearch } from "./fetchPhones.js";
// import { handleTabletSearch } from "./fetchTablets.js";
// import { handleLaptopSearch } from "./fetchLaptops.js";

export function attachHandler(form) {
  const deviceTypeSelect = form.querySelector("#deviceType");
  const brandSelect = form.querySelector("#brand");
  const modelSelect = form.querySelector("#model");

  const applyHandler = () => {
    const deviceType = deviceTypeSelect.value;
    console.log(`[attachHandler] deviceType selected: ${deviceType}`);

    // Clear brand and model dropdowns first
    brandSelect.innerHTML = `<option value="">-- Select a Brand --</option>`;
    modelSelect.innerHTML = `<option value="">-- Select a Model --</option>`;
    console.log("[attachHandler] Cleared brand and model dropdowns");

    if (deviceType === "smartphone") {
      console.log("[attachHandler] Handling smartphone search");
      handlePhoneSearch(form);
    }
    // else if (deviceType === "tablet") {
    //   handleTabletSearch(form);
    // }
    // else if (deviceType === "laptop") {
    //   handleLaptopSearch(form);
    // }
  };

  deviceTypeSelect.addEventListener("change", () => {
    console.log("[attachHandler] Device type changed");
    applyHandler();
  });

  // Initial call on form load
  console.log("[attachHandler] Initial applyHandler call");
  applyHandler();
}

const maxTotalForms = 6;
const maxUnfilledForms = 2;

function countUnfilledForms() {
  const forms = document.querySelectorAll(".deviceInfoForm");
  let unfilledCount = 0;

  forms.forEach((form) => {
    const searchButton = form.querySelector("button[type='submit']");
    if (searchButton && !searchButton.disabled) {
      unfilledCount++;
    }
  });

  console.log(`[countUnfilledForms] Unfilled forms count: ${unfilledCount}`);
  return unfilledCount;
}

function countTotalForms() {
  const total = document.querySelectorAll(".deviceInfoForm").length;
  console.log(`[countTotalForms] Total forms count: ${total}`);
  return total;
}

export function createDeviceForm() {
  console.log("[createDeviceForm] Creating new device form");
  const form = document.createElement("form");
  form.classList.add("deviceInfoForm");
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
    <label for="brand">Brand:</label>
    <select id="brand" name="brand" required>
      <option value="">-- Select a Brand --</option>
    </select>
    <label for="model">Model:</label>
    <select id="model" name="model" required>
      <option value="">-- Select a Model --</option>
    </select>
    <button type="submit">Search</button>
    <button type="button" class="removeFormButton">Remove</button>
  `;

  form.querySelector(".removeFormButton").addEventListener("click", () => {
    console.log("[createDeviceForm] Remove button clicked - removing form");
    form.remove();
  });

  return form;
}

export function initAddDeviceForm() {
  document.addEventListener("DOMContentLoaded", () => {
    console.log("[initAddDeviceForm] DOMContentLoaded event fired");
    const addDeviceButton = document.getElementById("addDeviceButton");
    const deviceInfoSection = document.getElementById("deviceInfo");

    if (!addDeviceButton || !deviceInfoSection) {
      console.error("[initAddDeviceForm] Add Device button or Device Info section NOT found in DOM");
      return;
    }

    console.log("[initAddDeviceForm] Add Device button and Device Info section found");

    // 👉 Attach handler to initial form (if one exists)
    const initialForm = deviceInfoSection.querySelector(".deviceInfoForm");
    if (initialForm) {
      console.log("[initAddDeviceForm] Initial form found - attaching handler");
      attachHandler(initialForm);
    } else {
      console.log("[initAddDeviceForm] No initial form found");
    }

    // 👉 Set up add button click to create new forms
    addDeviceButton.addEventListener("click", () => {
      console.log("[initAddDeviceForm] Add Device button clicked");

      const totalForms = countTotalForms();
      const unfilledForms = countUnfilledForms();

      if (totalForms >= maxTotalForms) {
        alert(`You can only add up to ${maxTotalForms} devices.`);
        console.warn(`[initAddDeviceForm] Maximum total forms reached: ${totalForms}`);
        return;
      }
      if (unfilledForms >= maxUnfilledForms) {
        alert(`Please fill out or remove existing empty forms before adding a new one.`);
        console.warn(`[initAddDeviceForm] Maximum unfilled forms reached: ${unfilledForms}`);
        return;
      }

      const newForm = createDeviceForm();
      deviceInfoSection.insertBefore(newForm, addDeviceButton);
      attachHandler(newForm);
      console.log("[initAddDeviceForm] New device form added and handler attached");
    });
  });
}