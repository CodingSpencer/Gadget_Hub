export function setupRecommendations(form) {
  const deviceTypeSelect = form.querySelector(".device-type");
  const traitSelect = form.querySelector(".trait-select");
  const recommendBtn = form.querySelector(".recommend-btn");

  const formWrapper = form.closest(".device-block") || form.parentElement;

  // Create results container or reuse
  let resultContainer = formWrapper.querySelector(".form-results");
  if (!resultContainer) {
    resultContainer = document.createElement("div");
    resultContainer.className = "form-results";
    resultContainer.style.display = "none";
    formWrapper.appendChild(resultContainer);
  }

  let devicesData = [];

  // Load device data
  fetch("https://devices.capscloud.cloud/phones")
    .then((res) => res.json())
    .then((data) => {
      devicesData = data;
      // Initial populate trait options for default or current device type
      populateTraits(deviceTypeSelect.value);
    })
    .catch(console.error);

  // Helper: populate traits based on selected device type
  function populateTraits(deviceType) {
    traitSelect.innerHTML = `<option value="">Overall</option>`;
    if (!deviceType) return;

    const traitsSet = new Set();

    devicesData.forEach((device) => {
      if (
        device.deviceType === deviceType ||
        device.deviceType === deviceType.toLowerCase()
      ) {
        // Collect keys that qualify as traits - you can customize this list:
        // Example traits from your data keys:
        // 'rfid', 'release_year', 'screen_size_in', 'unlock_methods', 'battery_mAh', 'ram_gb', 'storage_gb', 'os', 'camera_mp', 'original_price_usd'
        // We'll include all keys except brand/model/deviceType:
        Object.keys(device).forEach((key) => {
          if (
            ![
              "brand",
              "model",
              "deviceType",
              "traits",
              "unlock_methods",
            ].includes(key)
          ) {
            traitsSet.add(key);
          }
        });

        // Also include unlock_methods as a trait category?
        if (Array.isArray(device.unlock_methods)) {
          device.unlock_methods.forEach((method) => traitsSet.add(method));
        }
      }
    });

    // Convert set to sorted array and add options
    [...traitsSet]
      .sort()
      .forEach((trait) => {
        const option = document.createElement("option");
        option.value = trait;
        option.textContent =
          trait
            .replace(/_/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase()) || trait;
        traitSelect.appendChild(option);
      });
  }

  // Update traits when device type changes
  deviceTypeSelect.addEventListener("change", () => {
    populateTraits(deviceTypeSelect.value);
  });

  // Recommendation button click
  recommendBtn.addEventListener("click", () => {
    const deviceType = deviceTypeSelect.value;
    const trait = traitSelect.value;

    if (!deviceType || !trait) {
      alert("Please select both device type and trait.");
      return;
    }

    // Filter devices by deviceType first
    let filtered = devicesData.filter(
      (device) =>
        device.deviceType === deviceType ||
        device.deviceType === deviceType.toLowerCase()
    );

    // Then filter by trait presence or matching trait value

    // Check if trait is a boolean or scalar attribute or part of array (like unlock_methods)
    filtered = filtered.filter((device) => {
      if (!(trait in device)) {
        // Trait might be inside unlock_methods array
        if (
          Array.isArray(device.unlock_methods) &&
          device.unlock_methods.includes(trait)
        )
          return true;
        return false;
      }

      const val = device[trait];

      // Handle array fields (e.g., ram_gb, os, camera_mp)
      if (Array.isArray(val)) {
        return val.length > 0;
      }

      // For scalar fields, check if defined/truthy
      return val !== undefined && val !== null;
    });

    if (filtered.length === 0) {
      resultContainer.innerHTML = `<p>No devices found for <strong>${deviceType}</strong> with trait <strong>${trait}</strong>.</p>`;
    } else {
      resultContainer.innerHTML = `
        <h3>Recommended Devices for Trait: <em>${trait.replace(
          /_/g,
          " "
        )}</em></h3>
        ${filtered
          .map(
            (device) => `
          <ul class="result">
            <li><strong>Brand:</strong> ${device.brand}</li>
            <li><strong>Model:</strong> ${device.model}</li>
            <li><strong>Device Type:</strong> ${device.deviceType}</li>
            <li><strong>Release Year:</strong> ${device.release_year || "N/A"}</li>
            <li><strong>Battery:</strong> ${
              device.battery_mAh ? device.battery_mAh + " mAh" : "N/A"
            }</li>
            <li><strong>RAM:</strong> ${
              device.ram_gb ? device.ram_gb.join(", ") + " GB" : "N/A"
            }</li>
            <li><strong>Storage:</strong> ${
              device.storage_gb ? device.storage_gb.join(", ") + " GB" : "N/A"
            }</li>
            <li><strong>Camera:</strong> ${
              device.camera_mp ? device.camera_mp.join(", ") + " MP" : "N/A"
            }</li>
            <li><strong>RFID:</strong> ${
              device.rfid ? "Yes" : "No"
            }</li>
            <li><strong>Unlock Methods:</strong> ${
              device.unlock_methods ? device.unlock_methods.join(", ") : "N/A"
            }</li>
          </ul>`
          )
          .join("")}
      `;
    }

    resultContainer.style.display = "block";
  });
}
