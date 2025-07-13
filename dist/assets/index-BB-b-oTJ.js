(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const p of r.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&s(p)}).observe(document,{childList:!0,subtree:!0});function l(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(o){if(o.ep)return;o.ep=!0;const r=l(o);fetch(o.href,r)}})();function C(e,n){console.log("[handlePhoneSearch] Called for form:",e,"Index:",n);const l=e.querySelector(".brand-select"),s=e.querySelector(".model-select"),o=e.querySelector(".year-select"),r=e.querySelector(".device-type"),p=e.closest(".device-block");n||(n=p.dataset.formIndex);let d=document.getElementById(`results-${n}`);d||(console.log("[handlePhoneSearch] Creating result container"),d=document.createElement("div"),d.className="form-results",d.id=`results-${n}`,d.style.display="none",p.appendChild(d)),l.innerHTML='<option value="">-- Select a Brand --</option>',s.innerHTML='<option value="">-- Select a Model --</option>',o.innerHTML='<option value="">-- Select Year --</option>';let u=[];fetch("https://devices.capscloud.cloud/phones").then(c=>c.json()).then(c=>{u=c,[...new Set(u.map(t=>t.brand))].sort().forEach(t=>{const a=document.createElement("option");a.value=t,a.textContent=t,l.appendChild(a)})}).catch(c=>console.error(c)),l.onchange=null,s.onchange=null,e.onsubmit=null,l.onchange=()=>{const c=l.value;if(s.innerHTML='<option value="">-- Select a Model --</option>',o.innerHTML='<option value="">-- Select Year --</option>',!c)return;const i=u.filter(t=>t.brand===c).map(t=>t.model);[...new Set(i)].sort().forEach(t=>{const a=document.createElement("option");a.value=t,a.textContent=t,s.appendChild(a)})},s.onchange=()=>{const c=l.value,i=s.value;if(o.innerHTML='<option value="">-- Select Year --</option>',!c||!i)return;[...new Set(u.filter(a=>a.brand===c&&a.model===i).map(a=>a.release_year))].sort().forEach(a=>{const y=document.createElement("option");y.value=a,y.textContent=a,o.appendChild(y)})},e.onsubmit=c=>{c.preventDefault();const i=l.value,t=s.value,a=o.value;if(!i||!t||!a){alert("Please select brand, model, and year.");return}if(r.value!=="smartphone"){alert("Only smartphones are supported.");return}const y=u.filter(m=>m.brand===i&&m.model===t&&String(m.release_year)===a);y.length===0?d.innerHTML=`<p>No matching device found for "${i} ${t} (${a})".</p>`:d.innerHTML=`
        <h2>Device Found</h2>
        ${y.map(m=>`
          <ul class="result">
            <li><strong>Brand:</strong> ${m.brand}</li>
            <li><strong>Model:</strong> ${m.model}</li>
            <li><strong>Release Year:</strong> ${m.release_year}</li>
            <li><strong>OS:</strong> ${m.os}</li>
            <li><strong>RAM:</strong> ${m.ram_gb} GB</li>
            <li><strong>Storage:</strong> ${m.storage_gb} GB</li>
            <li><strong>Battery:</strong> ${m.battery_mAh} mAh</li>
            <li><strong>Camera:</strong> ${m.camera_mp} MP</li>
            <li><strong>RFID:</strong> ${m.rfid?"Yes":"No"}</li>
            <li><strong>Unlock Methods:</strong> ${m.unlock_methods.join(", ")}</li>
          </ul>
        `).join("")}
        <button class="search-again-btn">Search Again</button>
      `,d.style.display="block";const b=d.querySelector(".search-again-btn");b&&(b.onclick=()=>{e.reset(),l.innerHTML='<option value="">-- Select a Brand --</option>',s.innerHTML='<option value="">-- Select a Model --</option>',o.innerHTML='<option value="">-- Select Year --</option>',[...new Set(u.map(f=>f.brand))].sort().forEach(f=>{const h=document.createElement("option");h.value=f,h.textContent=f,l.appendChild(h)}),d.style.display="none",d.innerHTML="",e.style.display="block"})}}let g=0;function S(e){g++;const n=e.querySelector(".device-type"),l=e.querySelector(".brand-select"),s=e.querySelector(".model-select"),o=e.querySelector(".year-select"),r=e.closest(".device-block");if(r){r.dataset.formIndex=g;const d=r.querySelector(".form-results");d&&(d.id=`results-${g}`)}const p=()=>{const d=n.value;l.innerHTML='<option value="">-- Select a Brand --</option>',s.innerHTML='<option value="">-- Select a Model --</option>',o.innerHTML='<option value="">-- Select Year --</option>',d==="smartphone"&&C(e,g)};n.addEventListener("change",p),p()}const T=6,E=2;function v(){const e=document.getElementById("deviceInfo"),n=e.querySelectorAll(".device-block"),l=document.getElementById("addDeviceButton"),s=n.length;n.forEach(o=>o.style.gridColumn=""),s===1?(e.style.gridTemplateColumns="1fr",n[0].style.gridColumn="1 / -1",l.style.display="block"):s===2?(e.style.gridTemplateColumns="repeat(2, 1fr)",n.forEach(o=>o.style.gridColumn="span 1"),l.style.display="block"):s===3?(e.style.gridTemplateColumns="repeat(3, 1fr)",n.forEach(o=>o.style.gridColumn="span 1"),l.style.display="block"):s===4?(e.style.gridTemplateColumns="repeat(2, 1fr)",n.forEach(o=>o.style.gridColumn="span 1"),l.style.display="block"):s===5?(e.style.gridTemplateColumns="repeat(3, 1fr)",n.forEach(o=>o.style.gridColumn="span 1"),l.style.display="block"):s>=6&&(e.style.gridTemplateColumns="repeat(3, 1fr)",n.forEach(o=>o.style.gridColumn="span 1"),l.style.display="none"),l.style.display!=="none"&&(l.style.gridColumn="1 / -1")}function L(){return[...document.querySelectorAll(".deviceInfoForm")].filter(e=>{const n=e.closest(".device-block").querySelector(".form-results"),l=!n||n.style.display==="none",s=!e.querySelector(".brand-select").value,o=!e.querySelector(".model-select").value,r=!e.querySelector(".year-select").value;return l&&(s||o||r)}).length}function M(){return document.querySelectorAll(".deviceInfoForm").length}function $(){const e=document.createElement("div");e.classList.add("device-block");const n=document.createElement("form");n.classList.add("deviceInfoForm"),n.innerHTML=`
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
  `;const l=document.createElement("div");return l.classList.add("form-results"),l.style.display="none",n.querySelector(".removeFormButton").addEventListener("click",()=>{e.remove(),v()}),e.appendChild(n),e.appendChild(l),e}function B(){const e=()=>{const n=document.getElementById("addDeviceButton"),l=document.getElementById("deviceInfo");!n||!l||([...l.querySelectorAll(".deviceInfoForm")].forEach(s=>{S(s)}),n.addEventListener("click",()=>{const s=M(),o=L();if(s>=T){alert(`You can only add up to ${T} devices.`);return}if(o>=E){alert("Please fill out or remove existing empty forms before adding a new one.");return}const r=$();l.insertBefore(r,n);const p=r.querySelector("form.deviceInfoForm");S(p),v()}),v())};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e):e()}function q(e){const n=e.querySelector(".device-type"),l=e.querySelector(".trait-select"),s=e.querySelector(".recommend-btn"),o=e.closest(".device-block")||e.parentElement;let r=o.querySelector(".form-results");r||(r=document.createElement("div"),r.className="form-results",r.style.display="none",o.appendChild(r));let p=[];fetch("https://devices.capscloud.cloud/phones").then(u=>u.json()).then(u=>{p=u,d(n.value)}).catch(console.error);function d(u){if(l.innerHTML='<option value="">Overall</option>',!u)return;const c=new Set;p.forEach(i=>{(i.deviceType===u||i.deviceType===u.toLowerCase())&&(Object.keys(i).forEach(t=>{["brand","model","deviceType","traits","unlock_methods"].includes(t)||c.add(t)}),Array.isArray(i.unlock_methods)&&i.unlock_methods.forEach(t=>c.add(t)))}),[...c].sort().forEach(i=>{const t=document.createElement("option");t.value=i,t.textContent=i.replace(/_/g," ").replace(/\b\w/g,a=>a.toUpperCase())||i,l.appendChild(t)})}n.addEventListener("change",()=>{d(n.value)}),s.addEventListener("click",()=>{const u=n.value,c=l.value;if(!u||!c){alert("Please select both device type and trait.");return}let i=p.filter(t=>t.deviceType===u||t.deviceType===u.toLowerCase());i=i.filter(t=>{if(!(c in t))return!!(Array.isArray(t.unlock_methods)&&t.unlock_methods.includes(c));const a=t[c];return Array.isArray(a)?a.length>0:a!=null}),i.length===0?r.innerHTML=`<p>No devices found for <strong>${u}</strong> with trait <strong>${c}</strong>.</p>`:r.innerHTML=`
        <h3>Recommended Devices for Trait: <em>${c.replace(/_/g," ")}</em></h3>
        ${i.map(t=>`
          <ul class="result">
            <li><strong>Brand:</strong> ${t.brand}</li>
            <li><strong>Model:</strong> ${t.model}</li>
            <li><strong>Device Type:</strong> ${t.deviceType}</li>
            <li><strong>Release Year:</strong> ${t.release_year||"N/A"}</li>
            <li><strong>Battery:</strong> ${t.battery_mAh?t.battery_mAh+" mAh":"N/A"}</li>
            <li><strong>RAM:</strong> ${t.ram_gb?t.ram_gb.join(", ")+" GB":"N/A"}</li>
            <li><strong>Storage:</strong> ${t.storage_gb?t.storage_gb.join(", ")+" GB":"N/A"}</li>
            <li><strong>Camera:</strong> ${t.camera_mp?t.camera_mp.join(", ")+" MP":"N/A"}</li>
            <li><strong>RFID:</strong> ${t.rfid?"Yes":"No"}</li>
            <li><strong>Unlock Methods:</strong> ${t.unlock_methods?t.unlock_methods.join(", "):"N/A"}</li>
          </ul>`).join("")}
      `,r.style.display="block"})}document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".recommendForm");e?q(e):console.warn("Recommend form not found!"),B()});
