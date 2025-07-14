// fetchPhones.js must be available in the same directory
import { handlePhoneSearch } from "./fetchPhones.js";

let formIndexCounter = 0; // Unique index counter

export function attachHandler(form) {
  formIndexCounter++;

  const deviceTypeSelect = form.querySelector(".device-type");
  const brandSelect = form.querySelector(".brand-select");
  const modelSelect = form.querySelector(".model-select");
  const yearSelect = form.querySelector(".year-select");

  const formWrapper = form.closest(".device-block");
  if (formWrapper) {
    formWrapper.dataset.formIndex = formIndexCounter;
    const resultContainer = formWrapper.querySelector(".form-results");
    if (resultContainer) {
      resultContainer.id = `results-${formIndexCounter}`;
    }
  }

  const applyHandler = () => {
    const deviceType = deviceTypeSelect.value;
    brandSelect.innerHTML = `<option value="">-- Select a Brand --</option>`;
    modelSelect.innerHTML = `<option value="">-- Select a Model --</option>`;
    yearSelect.innerHTML = `<option value="">-- Select Year --</option>`;

    if (deviceType === "smartphone") {
      handlePhoneSearch(form, formIndexCounter);
    }
  };

  deviceTypeSelect.addEventListener("change", applyHandler);
  applyHandler();
}

const maxTotalForms = 6;
const maxUnfilledForms = 2;

function updateDeviceGridSpans() {
  const container = document.getElementById('deviceInfo');
  const blocks = container.querySelectorAll('.device-block');
  const addButton = document.getElementById('addDeviceButton');
  const count = blocks.length;

  blocks.forEach(block => block.style.gridColumn = '');

  if (count === 1) {
    container.style.gridTemplateColumns = '1fr';
    blocks[0].style.gridColumn = '1 / -1';
    addButton.style.display = 'block';
  } else if (count === 2) {
    container.style.gridTemplateColumns = 'repeat(2, 1fr)';
    blocks.forEach(b => b.style.gridColumn = 'span 1');
    addButton.style.display = 'block';
  } else if (count === 3) {
    container.style.gridTemplateColumns = 'repeat(3, 1fr)';
    blocks.forEach(b => b.style.gridColumn = 'span 1');
    addButton.style.display = 'block';
  } else if (count === 4) {
    container.style.gridTemplateColumns = 'repeat(2, 1fr)';
    blocks.forEach(b => b.style.gridColumn = 'span 1');
    addButton.style.display = 'block';
  } else if (count === 5) {
    container.style.gridTemplateColumns = 'repeat(3, 1fr)';
    blocks.forEach(b => b.style.gridColumn = 'span 1');
    addButton.style.display = 'block';
  } else if (count >= 6) {
    container.style.gridTemplateColumns = 'repeat(3, 1fr)';
    blocks.forEach(b => b.style.gridColumn = 'span 1');
    addButton.style.display = 'none';
  }

  if (addButton.style.display !== 'none') {
    addButton.style.gridColumn = '1 / -1';
  }
}

function countUnfilledForms() {
  return [...document.querySelectorAll(".deviceInfoForm")].filter(form => {
    const resultContainer = form.closest(".device-block").querySelector(".form-results");
    const isResultsHidden = !resultContainer || resultContainer.style.display === "none";
    const brandEmpty = !form.querySelector(".brand-select").value;
    const modelEmpty = !form.querySelector(".model-select").value;
    const yearEmpty = !form.querySelector(".year-select").value;
    return isResultsHidden && (brandEmpty || modelEmpty || yearEmpty);
  }).length;
}

function countTotalForms() {
  return document.querySelectorAll(".deviceInfoForm").length;
}

export function createDeviceForm() {
  const deviceBlock = document.createElement("div");
  deviceBlock.classList.add("device-block");

  const form = document.createElement("form");
  form.classList.add("deviceInfoForm");
  form.innerHTML = `
    <h2>Device Information</h2>
    <label for="deviceType">Device Type</label>
    <select class="device-type" name="deviceType">
      <option value="smartphone">Smartphone</option>
      <option value="tablet">Tablet</option>
      <option value="laptop">Laptop</option>
      <option value="desktop">Desktop</option>
      <option value="wearable">Wearable</option>
    </select>

    <label for="brand">Brand:</label>
    <select class="brand-select" name="brand" required>
      <option value="">-- Select a Brand --</option>
    </select>

    <label for="model">Model:</label>
    <select class="model-select" name="model" required>
      <option value="">-- Select a Model --</option>
    </select>

    <label for="year">Year:</label>
    <select class="year-select" name="year" required>
      <option value="">-- Select Year --</option>
    </select>

    <button type="submit">Search</button>
    <button type="button" class="removeFormButton">Remove</button>
  `;

  const resultsDiv = document.createElement("div");
  resultsDiv.classList.add("form-results");
  resultsDiv.style.display = "none";

  form.querySelector(".removeFormButton").addEventListener("click", () => {
    deviceBlock.remove();
    updateDeviceGridSpans();
  });

  deviceBlock.appendChild(form);
  deviceBlock.appendChild(resultsDiv);

  return deviceBlock;
}

export function initAddDeviceForm() {
  const initialize = () => {
    const addDeviceButton = document.getElementById("addDeviceButton");
    const deviceInfoSection = document.getElementById("deviceInfo");

    if (!addDeviceButton || !deviceInfoSection) return;

    [...deviceInfoSection.querySelectorAll(".deviceInfoForm")].forEach(form => {
      attachHandler(form);
    });

    addDeviceButton.addEventListener("click", () => {
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

      const newDeviceBlock = createDeviceForm();

      deviceInfoSection.insertBefore(newDeviceBlock, addDeviceButton);

      const newForm = newDeviceBlock.querySelector("form.deviceInfoForm");
      attachHandler(newForm);
      updateDeviceGridSpans();
    });

    updateDeviceGridSpans();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize);
  } else {
    initialize();
  }
}
