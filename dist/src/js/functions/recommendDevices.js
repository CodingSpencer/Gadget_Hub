export function setupRecommendations(form) {
  const deviceTypeSelect = form.querySelector(".device-type");
  const traitSelect = form.querySelector(".trait-select");
  const recommendBtn = form.querySelector(".recommend-btn");

  const section = form.closest("#recommend-section");
  const resultContainer = section.querySelector(".recommendations");

  if (!resultContainer) {
    console.error("Result container not found. Check .recommendations element in HTML.");
    return;
  }

  // --- Dynamically create and insert reset button ---
  const resetBtn = document.createElement("button");
  resetBtn.textContent = "Reset";
  resetBtn.className = "reset-btn";
  resetBtn.style.display = "none";
  resetBtn.type = "button"; // Prevent form submission
  resultContainer.appendChild(resetBtn); // Add at the bottom of recommendations section

  // Hide result container initially
  resultContainer.style.display = "none";

  let devicesData = [];

  fetch("https://devices.capscloud.cloud/phones")
    .then((res) => res.json())
    .then((data) => {
      devicesData = data;
      console.log("Loaded device data:", devicesData);
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

    filtered = filtered.filter((device) => {
      if (!(trait in device)) {
        return Array.isArray(device.unlock_methods) &&
               device.unlock_methods.includes(trait);
      }

      const val = device[trait];
      if (Array.isArray(val)) return val.length > 0;
      return val !== undefined && val !== null;
    });

    console.log("Filtered results:", filtered.length);

    const existingHeading = resultContainer.querySelector("h3");
    if (existingHeading) existingHeading.remove();
    const existingGrid = resultContainer.querySelector(".recommend-grid");
    if (existingGrid) existingGrid.remove();

    if (filtered.length === 0) {
      const noResultMsg = document.createElement("p");
      noResultMsg.innerHTML = `No devices found for <strong>${deviceType}</strong> with trait <strong>${trait}</strong>.`;
      resultContainer.insertBefore(noResultMsg, resetBtn);
    } else {
      filtered.sort((a, b) => {
        const aVal = Array.isArray(a[trait]) ? a[trait][0] : a[trait];
        const bVal = Array.isArray(b[trait]) ? b[trait][0] : b[trait];

        if (typeof aVal === "number" && typeof bVal === "number") {
          return bVal - aVal;
        }
        if (typeof aVal === "string" && typeof bVal === "string") {
          return aVal.localeCompare(bVal);
        }
        return 0;
      });

      const top10 = filtered.slice(0, 10);

      const heading = document.createElement("h3");
      heading.innerHTML = `Top 10 Devices for Trait: <em>${trait.replace(/_/g, " ")}</em>`;
      resultContainer.insertBefore(heading, resetBtn);

      const grid = document.createElement("div");
      grid.className = "recommend-grid";

      top10.forEach((device) => {
        const card = document.createElement("div");
        card.className = "recommend-card";
        card.innerHTML = `
          <ul class="result">
            <li><strong>Brand:</strong> ${device.brand}</li>
            <li><strong>Model:</strong> ${device.model}</li>
            <li><strong>Device Type:</strong> ${device.deviceType}</li>
            <li><strong>Release Year:</strong> ${device.release_year || "N/A"}</li>
            <li><strong>Battery:</strong> ${device.battery_mAh ? device.battery_mAh + " mAh" : "N/A"}</li>
            <li><strong>RAM:</strong> ${device.ram_gb ? device.ram_gb.join(", ") + " GB" : "N/A"}</li>
            <li><strong>Storage:</strong> ${device.storage_gb ? device.storage_gb.join(", ") + " GB" : "N/A"}</li>
            <li><strong>Camera:</strong> ${device.camera_mp ? device.camera_mp.join(", ") + " MP" : "N/A"}</li>
            <li><strong>RFID:</strong> ${device.rfid ? "Yes" : "No"}</li>
            <li><strong>Unlock Methods:</strong> ${device.unlock_methods ? device.unlock_methods.join(", ") : "N/A"}</li>
          </ul>
        `;
        grid.appendChild(card);
      });

      resultContainer.appendChild(grid);
      resultContainer.appendChild(resetBtn);  
    }

    resultContainer.style.display = "block";
    resetBtn.style.display = "inline-block";
    form.style.display = "none";
  });

  // Reset button handler
  resetBtn.addEventListener("click", () => {
    console.log("Reset button clicked");
    form.reset();
    traitSelect.innerHTML = `<option value="">Overall</option>`;
    const existingHeading = resultContainer.querySelector("h3");
    if (existingHeading) existingHeading.remove();
    const existingGrid = resultContainer.querySelector(".recommend-grid");
    if (existingGrid) existingGrid.remove();
    const noResultMsg = resultContainer.querySelector("p");
    if (noResultMsg) noResultMsg.remove();
    resultContainer.style.display = "none";
    form.style.display = "block";
    resetBtn.style.display = "none";
  });
}
