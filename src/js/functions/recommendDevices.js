export function handleDeviceRecommendation(form, formIndex) {
  const typeSelect = form.querySelector(".device-type");
  const brandSelect = form.querySelector(".brand-select");
  const modelSelect = form.querySelector(".model-select");
  const yearSelect = form.querySelector(".year-select");

  const formWrapper = form.closest(".device-block");
  const resultContainer = formWrapper.querySelector(`#results-${formIndex}`);
  const deviceType = typeSelect.value;

  let endpoint = "";
  if (deviceType === "smartphone") {
    endpoint = "https://devices.capscloud.cloud/phones";
  } else {
    alert("Recommendations for this device type aren't available yet.");
    return;
  }

  fetch(endpoint)
    .then(res => res.json())
    .then(data => {
      const filtered = data.filter(device => {
        return (
          (!brandSelect.value || device.brand === brandSelect.value) &&
          (!modelSelect.value || device.model === modelSelect.value) &&
          (!yearSelect.value || String(device.release_year) === yearSelect.value)
        );
      });

      if (filtered.length === 0) {
        resultContainer.innerHTML = `<p>No matching devices found.</p>`;
      } else {
        resultContainer.innerHTML = `
          <h2>Recommended Devices</h2>
          ${filtered.map(d => `
            <ul class="result">
              <li><strong>Brand:</strong> ${d.brand}</li>
              <li><strong>Model:</strong> ${d.model}</li>
              <li><strong>Year:</strong> ${d.release_year}</li>
              <li><strong>OS:</strong> ${d.os}</li>
              <li><strong>RAM:</strong> ${d.ram_gb} GB</li>
              <li><strong>Storage:</strong> ${d.storage_gb} GB</li>
              <li><strong>Battery:</strong> ${d.battery_mAh} mAh</li>
              <li><strong>Camera:</strong> ${d.camera_mp} MP</li>
              <li><strong>RFID:</strong> ${d.rfid ? "Yes" : "No"}</li>
              <li><strong>Unlock Methods:</strong> ${d.unlock_methods.join(", ")}</li>
            </ul>
          `).join("")}
        `;
      }

      resultContainer.style.display = "block";
    })
    .catch(err => {
      resultContainer.innerHTML = `<p>Error fetching recommendations: ${err.message}</p>`;
    });
}
