export function handlePhoneSearch(form) {
  const brandSelect = form.querySelector("#brand");
  const modelSelect = form.querySelector("#model");
  const deviceTypeSelect = form.querySelector("#deviceType");
  const deviceInfoSection = document.getElementById("deviceInfo");
  const resultsDiv = document.getElementById("results");

  let phonesData = [];

  console.log("[handlePhoneSearch] Fetching phones data...");

  // Fetch phone data once and fill brand dropdown
  fetch("https://devices.capscloud.cloud/phones")
    .then((res) => res.json())
    .then((data) => {
      phonesData = data;
      console.log("[handlePhoneSearch] Fetched phones data:", phonesData);

      // Extract unique brands and sort
      const brands = [...new Set(phonesData.map((phone) => phone.brand))].sort();
      console.log("[handlePhoneSearch] Unique brands:", brands);

      // Populate brand dropdown
      brands.forEach((brand) => {
        const option = document.createElement("option");
        option.value = brand;
        option.textContent = brand;
        brandSelect.appendChild(option);
      });
      console.log("[handlePhoneSearch] Brand dropdown populated");
    })
    .catch((err) => {
      console.error("[handlePhoneSearch] Error fetching phones data:", err);
    });

  brandSelect.addEventListener("change", () => {
    const selectedBrand = brandSelect.value;
    console.log(`[handlePhoneSearch] Brand selected: ${selectedBrand}`);
    modelSelect.innerHTML = `<option value="">-- Select a Model --</option>`;

    if (!selectedBrand) {
      console.log("[handlePhoneSearch] No brand selected, skipping model population");
      return;
    }

    const models = phonesData
      .filter((phone) => phone.brand === selectedBrand)
      .map((phone) => phone.model);

    const uniqueModels = [...new Set(models)].sort();
    console.log(`[handlePhoneSearch] Models for brand "${selectedBrand}":`, uniqueModels);

    uniqueModels.forEach((model) => {
      const option = document.createElement("option");
      option.value = model;
      option.textContent = model;
      modelSelect.appendChild(option);
    });
    console.log("[handlePhoneSearch] Model dropdown populated");
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("[handlePhoneSearch] Form submitted");

    if (deviceTypeSelect.value !== "smartphone") {
      alert("This form only supports smartphone device searches.");
      console.warn(`[handlePhoneSearch] Device type is not smartphone: ${deviceTypeSelect.value}`);
      return;
    }

    const brand = brandSelect.value;
    const model = modelSelect.value;
    console.log(`[handlePhoneSearch] Searching for brand: "${brand}", model: "${model}"`);

    if (!brand || !model) {
      alert("Please select both brand and model.");
      console.warn("[handlePhoneSearch] Brand or model not selected");
      return;
    }

    const filtered = phonesData.filter(
      (phone) => phone.brand === brand && phone.model === model
    );

    console.log("[handlePhoneSearch] Filtered phones:", filtered);

    if (filtered.length === 0) {
      resultsDiv.innerHTML = `<p>No matching smartphone found for "${brand} ${model}".</p>`;
      console.log("[handlePhoneSearch] No matching smartphone found");
    } else {
      const listItems = filtered
        .map(
          (phone) => `
          <ul class="result">
            <li><strong>Brand:</strong> ${phone.brand}</li>
            <li><strong>Model:</strong> ${phone.model}</li>
            <li><strong>Release Year:</strong> ${phone.release_year}</li>
            <li><strong>OS:</strong> ${phone.os}</li>
            <li><strong>RAM:</strong> ${phone.ram_gb} GB</li>
            <li><strong>Storage:</strong> ${phone.storage_gb} GB</li>
            <li><strong>Battery:</strong> ${phone.battery_mAh} mAh</li>
            <li><strong>Camera:</strong> ${phone.camera_mp} MP</li>
            <li><strong>RFID:</strong> ${phone.rfid ? "Yes" : "No"}</li>
            <li><strong>Unlock Methods:</strong> ${phone.unlock_methods.join(", ")}</li>
          </ul>
        `
        )
        .join("");
      resultsDiv.innerHTML = `
        <h2>Device Found</h2>
        ${listItems}
        <button id="searchAgainBtn">Search Again</button>
      `;
      console.log("[handlePhoneSearch] Results displayed");

      document
        .getElementById("searchAgainBtn")
        .addEventListener("click", () => {
          console.log("[handlePhoneSearch] Search Again button clicked - reloading page");
          location.reload();
        });
    }
  });
}