export function setupRecommendations(form) {
  const deviceTypeSelect = form.querySelector(".device-type");
  const traitSelect = form.querySelector(".trait-select");
  const recommendBtn = form.querySelector(".recommend-btn");

  const section = form.closest("#recommend-section");
  const resultContainer = section.querySelector(".recommendations");
  const resetBtn = section.querySelector(".reset-btn");

  if (!resultContainer) {
    console.error("Result container not found. Check .recommendations element in HTML.");
    return;
  }

  // Hide recommendations section by default
  resultContainer.style.display = "none";

  let devicesData = [];

  // Fetch device data
  fetch("https://devices.capscloud.cloud/phones")
    .then((res) => res.json())
    .then((data) => {
      devicesData = data;
      console.log("✅ Loaded device data:", devicesData);
      populateTraits(deviceTypeSelect.value);
    })
    .catch((err) => {
      console.error("Failed to fetch device data:", err);
    });

  function populateTraits(deviceType) {
    console.log("Populating traits for device type:", deviceType);
    traitSelect.innerHTML = `<option value="">Overall</option>`;
    if (!deviceType) return;

    const validTraitKeys = [
      "release_year", "screen_size_in", "battery_mAh", "ram_gb",
      "storage_gb", "camera_mp", "rfid", "os", "original_price_usd", "unlock_methods"
    ];

    const traitLabelMap = {
      release_year: "Release Year", screen_size_in: "Screen Size (in)",
      battery_mAh: "Battery (mAh)", ram_gb: "RAM (GB)", storage_gb: "Storage (GB)",
      camera_mp: "Camera (MP)", rfid: "RFID", os: "Operating System",
      original_price_usd: "Original Price (USD)", unlock_methods: "Unlock Methods"
    };

    const traitsSet = new Set();

    devicesData.forEach((device) => {
      const typeMatch = (device.deviceType || "smartphone").toLowerCase() === deviceType.toLowerCase();
      if (!typeMatch) return;

      validTraitKeys.forEach((key) => {
        if (device[key] !== undefined && device[key] !== null) {
          traitsSet.add(key);
        }
      });
    });

    const sortedTraits = [...traitsSet].sort();
    console.log("Available traits:", sortedTraits);

    sortedTraits.forEach((trait) => {
      const option = document.createElement("option");
      option.value = trait;
      option.textContent = traitLabelMap[trait] || trait;
      traitSelect.appendChild(option);
    });
  }

  deviceTypeSelect.addEventListener("change", () => {
    console.log("Device type changed:", deviceTypeSelect.value);
    populateTraits(deviceTypeSelect.value);
  });

  recommendBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const deviceType = deviceTypeSelect.value;
    const trait = traitSelect.value;

    console.log("Recommend clicked. Device Type:", deviceType, "Trait:", trait);

    if (!deviceType || !trait) {
      alert("Please select both device type and trait.");
      return;
    }

    let filtered = devicesData.filter(
      (device) => (device.deviceType || "smartphone").toLowerCase() === deviceType.toLowerCase()
    );

    console.log("Filtered by device type:", filtered.length);

    filtered = filtered.filter((device) => {
      if (!(trait in device)) {
        return Array.isArray(device.unlock_methods) &&
              device.unlock_methods.includes(trait);
      }

      const val = device[trait];
      if (Array.isArray(val)) return val.length > 0;
      return val !== undefined && val !== null;
    });

    console.log("Filtered by trait:", filtered.length);

    // Result rendering (same as before)...
    if (filtered.length === 0) {
      resultContainer.innerHTML = `<p>No devices found for <strong>${deviceType}</strong> with trait <strong>${trait}</strong>.</p>`;
    } else {
      // (Rendering code unchanged)
    }

    resultContainer.style.display = "block";
    form.style.display = "none"; // 👈 Hide the form
  });

  resetBtn.addEventListener("click", () => {
    console.log("Reset button clicked");
    form.reset();
    traitSelect.innerHTML = `<option value="">Overall</option>`;
    resultContainer.style.display = "none";
    resultContainer.innerHTML = "";
    form.style.display = "block"; // 👈 Show the form again
  });
}
