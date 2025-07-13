(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const p of s.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&r(p)}).observe(document,{childList:!0,subtree:!0});function n(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(t){if(t.ep)return;t.ep=!0;const s=n(t);fetch(t.href,s)}})();function M(e,o){console.log("[handlePhoneSearch] Called for form:",e,"Index:",o);const n=e.querySelector(".brand-select"),r=e.querySelector(".model-select"),t=e.querySelector(".year-select"),s=e.querySelector(".device-type"),p=e.closest(".device-block");o||(o=p.dataset.formIndex);let a=document.getElementById(`results-${o}`);a||(console.log("[handlePhoneSearch] Creating result container"),a=document.createElement("div"),a.className="form-results",a.id=`results-${o}`,a.style.display="none",p.appendChild(a)),n.innerHTML='<option value="">-- Select a Brand --</option>',r.innerHTML='<option value="">-- Select a Model --</option>',t.innerHTML='<option value="">-- Select Year --</option>';let m=[];fetch("https://devices.capscloud.cloud/phones").then(i=>i.json()).then(i=>{m=i,[...new Set(m.map(c=>c.brand))].sort().forEach(c=>{const l=document.createElement("option");l.value=c,l.textContent=c,n.appendChild(l)})}).catch(i=>console.error(i)),n.onchange=null,r.onchange=null,e.onsubmit=null,n.onchange=()=>{const i=n.value;if(r.innerHTML='<option value="">-- Select a Model --</option>',t.innerHTML='<option value="">-- Select Year --</option>',!i)return;const d=m.filter(c=>c.brand===i).map(c=>c.model);[...new Set(d)].sort().forEach(c=>{const l=document.createElement("option");l.value=c,l.textContent=c,r.appendChild(l)})},r.onchange=()=>{const i=n.value,d=r.value;if(t.innerHTML='<option value="">-- Select Year --</option>',!i||!d)return;[...new Set(m.filter(l=>l.brand===i&&l.model===d).map(l=>l.release_year))].sort().forEach(l=>{const y=document.createElement("option");y.value=l,y.textContent=l,t.appendChild(y)})},e.onsubmit=i=>{i.preventDefault();const d=n.value,c=r.value,l=t.value;if(!d||!c||!l){alert("Please select brand, model, and year.");return}if(s.value!=="smartphone"){alert("Only smartphones are supported.");return}const y=m.filter(u=>u.brand===d&&u.model===c&&String(u.release_year)===l);y.length===0?a.innerHTML=`<p>No matching device found for "${d} ${c} (${l})".</p>`:a.innerHTML=`
        <h2>Device Found</h2>
        ${y.map(u=>`
          <ul class="result">
            <li><strong>Brand:</strong> ${u.brand}</li>
            <li><strong>Model:</strong> ${u.model}</li>
            <li><strong>Release Year:</strong> ${u.release_year}</li>
            <li><strong>OS:</strong> ${u.os}</li>
            <li><strong>RAM:</strong> ${u.ram_gb} GB</li>
            <li><strong>Storage:</strong> ${u.storage_gb} GB</li>
            <li><strong>Battery:</strong> ${u.battery_mAh} mAh</li>
            <li><strong>Camera:</strong> ${u.camera_mp} MP</li>
            <li><strong>RFID:</strong> ${u.rfid?"Yes":"No"}</li>
            <li><strong>Unlock Methods:</strong> ${u.unlock_methods.join(", ")}</li>
          </ul>
        `).join("")}
        <button class="search-again-btn">Search Again</button>
      `,a.style.display="block";const b=a.querySelector(".search-again-btn");b&&(b.onclick=()=>{e.reset(),n.innerHTML='<option value="">-- Select a Brand --</option>',r.innerHTML='<option value="">-- Select a Model --</option>',t.innerHTML='<option value="">-- Select Year --</option>',[...new Set(m.map(f=>f.brand))].sort().forEach(f=>{const g=document.createElement("option");g.value=f,g.textContent=f,n.appendChild(g)}),a.style.display="none",a.innerHTML="",e.style.display="block"})}}let v=0;function S(e){v++;const o=e.querySelector(".device-type"),n=e.querySelector(".brand-select"),r=e.querySelector(".model-select"),t=e.querySelector(".year-select"),s=e.closest(".device-block");if(s){s.dataset.formIndex=v;const a=s.querySelector(".form-results");a&&(a.id=`results-${v}`)}const p=()=>{const a=o.value;n.innerHTML='<option value="">-- Select a Brand --</option>',r.innerHTML='<option value="">-- Select a Model --</option>',t.innerHTML='<option value="">-- Select Year --</option>',a==="smartphone"&&M(e,v)};o.addEventListener("change",p),p()}const C=6,E=2;function h(){const e=document.getElementById("deviceInfo"),o=e.querySelectorAll(".device-block"),n=document.getElementById("addDeviceButton"),r=o.length;o.forEach(t=>t.style.gridColumn=""),r===1?(e.style.gridTemplateColumns="1fr",o[0].style.gridColumn="1 / -1",n.style.display="block"):r===2?(e.style.gridTemplateColumns="repeat(2, 1fr)",o.forEach(t=>t.style.gridColumn="span 1"),n.style.display="block"):r===3?(e.style.gridTemplateColumns="repeat(3, 1fr)",o.forEach(t=>t.style.gridColumn="span 1"),n.style.display="block"):r===4?(e.style.gridTemplateColumns="repeat(2, 1fr)",o.forEach(t=>t.style.gridColumn="span 1"),n.style.display="block"):r===5?(e.style.gridTemplateColumns="repeat(3, 1fr)",o.forEach(t=>t.style.gridColumn="span 1"),n.style.display="block"):r>=6&&(e.style.gridTemplateColumns="repeat(3, 1fr)",o.forEach(t=>t.style.gridColumn="span 1"),n.style.display="none"),n.style.display!=="none"&&(n.style.gridColumn="1 / -1")}function L(){return[...document.querySelectorAll(".deviceInfoForm")].filter(e=>{const o=e.closest(".device-block").querySelector(".form-results"),n=!o||o.style.display==="none",r=!e.querySelector(".brand-select").value,t=!e.querySelector(".model-select").value,s=!e.querySelector(".year-select").value;return n&&(r||t||s)}).length}function T(){return document.querySelectorAll(".deviceInfoForm").length}function $(){const e=document.createElement("div");e.classList.add("device-block");const o=document.createElement("form");o.classList.add("deviceInfoForm"),o.innerHTML=`
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
  `;const n=document.createElement("div");return n.classList.add("form-results"),n.style.display="none",o.querySelector(".removeFormButton").addEventListener("click",()=>{e.remove(),h()}),e.appendChild(o),e.appendChild(n),e}function q(){const e=()=>{const o=document.getElementById("addDeviceButton"),n=document.getElementById("deviceInfo");!o||!n||([...n.querySelectorAll(".deviceInfoForm")].forEach(r=>{S(r)}),o.addEventListener("click",()=>{const r=T(),t=L();if(r>=C){alert(`You can only add up to ${C} devices.`);return}if(t>=E){alert("Please fill out or remove existing empty forms before adding a new one.");return}const s=$();n.insertBefore(s,o);const p=s.querySelector("form.deviceInfoForm");S(p),h()}),h())};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e):e()}function B(e,o){const n=e.querySelector(".device-type"),r=e.querySelector(".brand-select"),t=e.querySelector(".model-select"),s=e.querySelector(".year-select"),a=e.closest(".device-block").querySelector(`#results-${o}`),m=n.value;let i="";if(m==="smartphone")i="https://devices.capscloud.cloud/phones";else{alert("Recommendations for this device type aren't available yet.");return}fetch(i).then(d=>d.json()).then(d=>{const c=d.filter(l=>(!r.value||l.brand===r.value)&&(!t.value||l.model===t.value)&&(!s.value||String(l.release_year)===s.value));c.length===0?a.innerHTML="<p>No matching devices found.</p>":a.innerHTML=`
          <h2>Recommended Devices</h2>
          ${c.map(l=>`
            <ul class="result">
              <li><strong>Brand:</strong> ${l.brand}</li>
              <li><strong>Model:</strong> ${l.model}</li>
              <li><strong>Year:</strong> ${l.release_year}</li>
              <li><strong>OS:</strong> ${l.os}</li>
              <li><strong>RAM:</strong> ${l.ram_gb} GB</li>
              <li><strong>Storage:</strong> ${l.storage_gb} GB</li>
              <li><strong>Battery:</strong> ${l.battery_mAh} mAh</li>
              <li><strong>Camera:</strong> ${l.camera_mp} MP</li>
              <li><strong>RFID:</strong> ${l.rfid?"Yes":"No"}</li>
              <li><strong>Unlock Methods:</strong> ${l.unlock_methods.join(", ")}</li>
            </ul>
          `).join("")}
        `,a.style.display="block"}).catch(d=>{a.innerHTML=`<p>Error fetching recommendations: ${d.message}</p>`})}document.addEventListener("DOMContentLoaded",()=>{q(),document.querySelectorAll(".deviceInfoForm").forEach((e,o)=>{B(e,o+1)})});
