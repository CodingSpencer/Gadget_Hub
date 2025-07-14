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
  resetBtn.style.display = "none";


  let devicesData = [];

  // Fetch device data
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
    console.log("🔧 Populating traits for device type:", deviceType);
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

    if (filtered.length === 0) {
      resultContainer.innerHTML = `<p>No devices found for <strong>${deviceType}</strong> with trait <strong>${trait}</strong>.</p>`;
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
      console.log("🏆 Top 10 results:", top10);

      resultContainer.innerHTML = `
      <h3>Top 10 Devices for Trait: <em>${trait.replace(/_/g, " ")}</em></h3>
        <div class="recommend-grid">
          ${top10.map((device) => `
            <div class="recommend-card">
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
            </div>
          `).join("")}
        </div>
  `;
    }

    resultContainer.style.display = "block";
    resetBtn.style.display = "inline-block";
    form.style.display = "none";
  });

  resetBtn.addEventListener("click", () => {
    console.log("Reset button clicked");
    form.reset();
    traitSelect.innerHTML = `<option value="">Overall</option>`;
    resultContainer.style.display = "none";
    resultContainer.innerHTML = "";
    form.style.display = "block";
    resetBtn.style.display = "none";
  });
}
