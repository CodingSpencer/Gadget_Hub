export function handlePhoneSearch(form, formIndex) {
  console.log("[handlePhoneSearch] Called for form:", form, "Index:", formIndex);

  const brandSelect = form.querySelector(".brand-select");
  const modelSelect = form.querySelector(".model-select");
  const yearSelect = form.querySelector(".year-select");
  const deviceTypeSelect = form.querySelector(".device-type");

  const formWrapper = form.closest(".device-block");

  // Use formIndex if provided, else fallback to data attribute
  if (!formIndex) {
    formIndex = formWrapper.dataset.formIndex;
  }

  // Select result container by ID specific to this formIndex
  let resultContainer = document.getElementById(`results-${formIndex}`);
  if (!resultContainer) {
    console.log("[handlePhoneSearch] Creating result container");
    resultContainer = document.createElement("div");
    resultContainer.className = "form-results";
    resultContainer.id = `results-${formIndex}`;
    resultContainer.style.display = "none";
    formWrapper.appendChild(resultContainer);
  }

  // Clear dropdowns before fetching data
  brandSelect.innerHTML = `<option value="">-- Select a Brand --</option>`;
  modelSelect.innerHTML = `<option value="">-- Select a Model --</option>`;
  yearSelect.innerHTML = `<option value="">-- Select Year --</option>`;

  let phonesData = [];

  fetch("https://devices.capscloud.cloud/phones")
    .then(res => res.json())
    .then(data => {
      phonesData = data;
      const brands = [...new Set(phonesData.map(p => p.brand))].sort();
      brands.forEach(brand => {
        const option = document.createElement("option");
        option.value = brand;
        option.textContent = brand;
        brandSelect.appendChild(option);
      });
    })
    .catch(err => console.error(err));

  // Remove previous listeners to avoid duplicates
  brandSelect.onchange = null;
  modelSelect.onchange = null;
  form.onsubmit = null;

  brandSelect.onchange = () => {
    const selectedBrand = brandSelect.value;
    modelSelect.innerHTML = `<option value="">-- Select a Model --</option>`;
    yearSelect.innerHTML = `<option value="">-- Select Year --</option>`;

    if (!selectedBrand) return;

    const models = phonesData.filter(p => p.brand === selectedBrand).map(p => p.model);
    [...new Set(models)].sort().forEach(model => {
      const option = document.createElement("option");
      option.value = model;
      option.textContent = model;
      modelSelect.appendChild(option);
    });
  };

  modelSelect.onchange = () => {
    const brand = brandSelect.value;
    const model = modelSelect.value;
    yearSelect.innerHTML = `<option value="">-- Select Year --</option>`;

    if (!brand || !model) return;

    const years = [...new Set(
      phonesData.filter(p => p.brand === brand && p.model === model).map(p => p.release_year)
    )].sort();

    years.forEach(year => {
      const option = document.createElement("option");
      option.value = year;
      option.textContent = year;
      yearSelect.appendChild(option);
    });
  };

  form.onsubmit = e => {
    e.preventDefault();

    const brand = brandSelect.value;
    const model = modelSelect.value;
    const year = yearSelect.value;

    if (!brand || !model || !year) {
      alert("Please select brand, model, and year.");
      return;
    }

    if (deviceTypeSelect.value !== "smartphone") {
      alert("Only smartphones are supported.");
      return;
    }

    const filtered = phonesData.filter(p =>
      p.brand === brand &&
      p.model === model &&
      String(p.release_year) === year
    );

    // Do NOT hide other results or the form itself

    if (filtered.length === 0) {
      resultContainer.innerHTML = `<p>No matching device found for "${brand} ${model} (${year})".</p>`;
    } else {
      resultContainer.innerHTML = `
        <h2>Device Found</h2>
        ${filtered.map(phone => `
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
        `).join("")}
        <button class="search-again-btn">Search Again</button>
      `;
    }

    resultContainer.style.display = "block";

    const againBtn = resultContainer.querySelector(".search-again-btn");
    if (againBtn) {
      againBtn.onclick = () => {
        form.reset();

        // Reset selects
        brandSelect.innerHTML = `<option value="">-- Select a Brand --</option>`;
        modelSelect.innerHTML = `<option value="">-- Select a Model --</option>`;
        yearSelect.innerHTML = `<option value="">-- Select Year --</option>`;

        // Repopulate brands
        const brands = [...new Set(phonesData.map(p => p.brand))].sort();
        brands.forEach(brand => {
          const option = document.createElement("option");
          option.value = brand;
          option.textContent = brand;
          brandSelect.appendChild(option);
        });

        resultContainer.style.display = "none";
        resultContainer.innerHTML = "";
        form.style.display = "block";
      };
    }
  };
}
