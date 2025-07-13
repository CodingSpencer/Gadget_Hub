(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const u of r.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&l(u)}).observe(document,{childList:!0,subtree:!0});function n(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(t){if(t.ep)return;t.ep=!0;const r=n(t);fetch(t.href,r)}})();function E(e,o){console.log("[handlePhoneSearch] Called for form:",e,"Index:",o);const n=e.querySelector(".brand-select"),l=e.querySelector(".model-select"),t=e.querySelector(".year-select"),r=e.querySelector(".device-type"),u=e.closest(".device-block");o||(o=u.dataset.formIndex);let s=document.getElementById(`results-${o}`);s||(console.log("[handlePhoneSearch] Creating result container"),s=document.createElement("div"),s.className="form-results",s.id=`results-${o}`,s.style.display="none",u.appendChild(s)),n.innerHTML='<option value="">-- Select a Brand --</option>',l.innerHTML='<option value="">-- Select a Model --</option>',t.innerHTML='<option value="">-- Select Year --</option>';let m=[];fetch("https://devices.capscloud.cloud/phones").then(d=>d.json()).then(d=>{m=d,[...new Set(m.map(c=>c.brand))].sort().forEach(c=>{const a=document.createElement("option");a.value=c,a.textContent=c,n.appendChild(a)})}).catch(d=>console.error(d)),n.onchange=null,l.onchange=null,e.onsubmit=null,n.onchange=()=>{const d=n.value;if(l.innerHTML='<option value="">-- Select a Model --</option>',t.innerHTML='<option value="">-- Select Year --</option>',!d)return;const p=m.filter(c=>c.brand===d).map(c=>c.model);[...new Set(p)].sort().forEach(c=>{const a=document.createElement("option");a.value=c,a.textContent=c,l.appendChild(a)})},l.onchange=()=>{const d=n.value,p=l.value;if(t.innerHTML='<option value="">-- Select Year --</option>',!d||!p)return;[...new Set(m.filter(a=>a.brand===d&&a.model===p).map(a=>a.release_year))].sort().forEach(a=>{const y=document.createElement("option");y.value=a,y.textContent=a,t.appendChild(y)})},e.onsubmit=d=>{d.preventDefault();const p=n.value,c=l.value,a=t.value;if(!p||!c||!a){alert("Please select brand, model, and year.");return}if(r.value!=="smartphone"){alert("Only smartphones are supported.");return}const y=m.filter(i=>i.brand===p&&i.model===c&&String(i.release_year)===a);y.length===0?s.innerHTML=`<p>No matching device found for "${p} ${c} (${a})".</p>`:s.innerHTML=`
        <h2>Device Found</h2>
        ${y.map(i=>`
          <ul class="result">
            <li><strong>Brand:</strong> ${i.brand}</li>
            <li><strong>Model:</strong> ${i.model}</li>
            <li><strong>Release Year:</strong> ${i.release_year}</li>
            <li><strong>OS:</strong> ${i.os}</li>
            <li><strong>RAM:</strong> ${i.ram_gb} GB</li>
            <li><strong>Storage:</strong> ${i.storage_gb} GB</li>
            <li><strong>Battery:</strong> ${i.battery_mAh} mAh</li>
            <li><strong>Camera:</strong> ${i.camera_mp} MP</li>
            <li><strong>RFID:</strong> ${i.rfid?"Yes":"No"}</li>
            <li><strong>Unlock Methods:</strong> ${i.unlock_methods.join(", ")}</li>
          </ul>
        `).join("")}
        <button class="search-again-btn">Search Again</button>
      `,s.style.display="block";const h=s.querySelector(".search-again-btn");h&&(h.onclick=()=>{e.reset(),n.innerHTML='<option value="">-- Select a Brand --</option>',l.innerHTML='<option value="">-- Select a Model --</option>',t.innerHTML='<option value="">-- Select Year --</option>',[...new Set(m.map(f=>f.brand))].sort().forEach(f=>{const g=document.createElement("option");g.value=f,g.textContent=f,n.appendChild(g)}),s.style.display="none",s.innerHTML="",e.style.display="block"})}}let v=0;function S(e){v++;const o=e.querySelector(".device-type"),n=e.querySelector(".brand-select"),l=e.querySelector(".model-select"),t=e.querySelector(".year-select"),r=e.closest(".device-block");if(r){r.dataset.formIndex=v;const s=r.querySelector(".form-results");s&&(s.id=`results-${v}`)}const u=()=>{const s=o.value;n.innerHTML='<option value="">-- Select a Brand --</option>',l.innerHTML='<option value="">-- Select a Model --</option>',t.innerHTML='<option value="">-- Select Year --</option>',s==="smartphone"&&E(e,v)};o.addEventListener("change",u),u()}const C=6,L=2;function b(){const e=document.getElementById("deviceInfo"),o=e.querySelectorAll(".device-block"),n=document.getElementById("addDeviceButton"),l=o.length;o.forEach(t=>t.style.gridColumn=""),l===1?(e.style.gridTemplateColumns="1fr",o[0].style.gridColumn="1 / -1",n.style.display="block"):l===2?(e.style.gridTemplateColumns="repeat(2, 1fr)",o.forEach(t=>t.style.gridColumn="span 1"),n.style.display="block"):l===3?(e.style.gridTemplateColumns="repeat(3, 1fr)",o.forEach(t=>t.style.gridColumn="span 1"),n.style.display="block"):l===4?(e.style.gridTemplateColumns="repeat(2, 1fr)",o.forEach(t=>t.style.gridColumn="span 1"),n.style.display="block"):l===5?(e.style.gridTemplateColumns="repeat(3, 1fr)",o.forEach(t=>t.style.gridColumn="span 1"),n.style.display="block"):l>=6&&(e.style.gridTemplateColumns="repeat(3, 1fr)",o.forEach(t=>t.style.gridColumn="span 1"),n.style.display="none"),n.style.display!=="none"&&(n.style.gridColumn="1 / -1")}function T(){return[...document.querySelectorAll(".deviceInfoForm")].filter(e=>{const o=e.closest(".device-block").querySelector(".form-results"),n=!o||o.style.display==="none",l=!e.querySelector(".brand-select").value,t=!e.querySelector(".model-select").value,r=!e.querySelector(".year-select").value;return n&&(l||t||r)}).length}function M(){return document.querySelectorAll(".deviceInfoForm").length}function B(){const e=document.createElement("div");e.classList.add("device-block");const o=document.createElement("form");o.classList.add("deviceInfoForm"),o.innerHTML=`
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
  `;const n=document.createElement("div");return n.classList.add("form-results"),n.style.display="none",o.querySelector(".removeFormButton").addEventListener("click",()=>{e.remove(),b()}),e.appendChild(o),e.appendChild(n),e}function q(){const e=()=>{const o=document.getElementById("addDeviceButton"),n=document.getElementById("deviceInfo");!o||!n||([...n.querySelectorAll(".deviceInfoForm")].forEach(l=>{S(l)}),o.addEventListener("click",()=>{const l=M(),t=T();if(l>=C){alert(`You can only add up to ${C} devices.`);return}if(t>=L){alert("Please fill out or remove existing empty forms before adding a new one.");return}const r=B();n.insertBefore(r,o);const u=r.querySelector("form.deviceInfoForm");S(u),b()}),b())};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e):e()}document.addEventListener("DOMContentLoaded",()=>{q()});
