(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const m of s.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&i(m)}).observe(document,{childList:!0,subtree:!0});function n(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(t){if(t.ep)return;t.ep=!0;const s=n(t);fetch(t.href,s)}})();function L(e,o){console.log("[handlePhoneSearch] Called for form:",e,"Index:",o);const n=e.querySelector(".brand-select"),i=e.querySelector(".model-select"),t=e.querySelector(".year-select"),s=e.querySelector(".device-type"),m=e.closest(".device-block");o||(o=m.dataset.formIndex);let u=document.getElementById(`results-${o}`);u||(console.log("[handlePhoneSearch] Creating result container"),u=document.createElement("div"),u.className="form-results",u.id=`results-${o}`,u.style.display="none",m.appendChild(u)),n.innerHTML='<option value="">-- Select a Brand --</option>',i.innerHTML='<option value="">-- Select a Model --</option>',t.innerHTML='<option value="">-- Select Year --</option>';let f=[];fetch("https://devices.capscloud.cloud/phones").then(c=>c.json()).then(c=>{f=c,[...new Set(f.map(l=>l.brand))].sort().forEach(l=>{const a=document.createElement("option");a.value=l,a.textContent=l,n.appendChild(a)})}).catch(c=>console.error(c)),n.onchange=null,i.onchange=null,e.onsubmit=null,n.onchange=()=>{const c=n.value;if(i.innerHTML='<option value="">-- Select a Model --</option>',t.innerHTML='<option value="">-- Select Year --</option>',!c)return;const y=f.filter(l=>l.brand===c).map(l=>l.model);[...new Set(y)].sort().forEach(l=>{const a=document.createElement("option");a.value=l,a.textContent=l,i.appendChild(a)})},i.onchange=()=>{const c=n.value,y=i.value;if(t.innerHTML='<option value="">-- Select Year --</option>',!c||!y)return;[...new Set(f.filter(a=>a.brand===c&&a.model===y).map(a=>a.release_year))].sort().forEach(a=>{const p=document.createElement("option");p.value=a,p.textContent=a,t.appendChild(p)})},e.onsubmit=c=>{c.preventDefault();const y=n.value,l=i.value,a=t.value;if(!y||!l||!a){alert("Please select brand, model, and year.");return}if(s.value!=="smartphone"){alert("Only smartphones are supported.");return}const p=f.filter(d=>d.brand===y&&d.model===l&&String(d.release_year)===a);p.length===0?u.innerHTML=`<p>No matching device found for "${y} ${l} (${a})".</p>`:u.innerHTML=`
        <h2>Device Found</h2>
        ${p.map(d=>`
          <ul class="result">
            <li><strong>Brand:</strong> ${d.brand}</li>
            <li><strong>Model:</strong> ${d.model}</li>
            <li><strong>Release Year:</strong> ${d.release_year}</li>
            <li><strong>OS:</strong> ${d.os}</li>
            <li><strong>RAM:</strong> ${d.ram_gb} GB</li>
            <li><strong>Storage:</strong> ${d.storage_gb} GB</li>
            <li><strong>Battery:</strong> ${d.battery_mAh} mAh</li>
            <li><strong>Camera:</strong> ${d.camera_mp} MP</li>
            <li><strong>RFID:</strong> ${d.rfid?"Yes":"No"}</li>
            <li><strong>Unlock Methods:</strong> ${d.unlock_methods.join(", ")}</li>
          </ul>
        `).join("")}
        <button class="search-again-btn">Search Again</button>
      `,u.style.display="block";const r=u.querySelector(".search-again-btn");r&&(r.onclick=()=>{e.reset(),n.innerHTML='<option value="">-- Select a Brand --</option>',i.innerHTML='<option value="">-- Select a Model --</option>',t.innerHTML='<option value="">-- Select Year --</option>',[...new Set(f.map(g=>g.brand))].sort().forEach(g=>{const v=document.createElement("option");v.value=g,v.textContent=g,n.appendChild(v)}),u.style.display="none",u.innerHTML="",e.style.display="block"})}}let h=0;function S(e){h++;const o=e.querySelector(".device-type"),n=e.querySelector(".brand-select"),i=e.querySelector(".model-select"),t=e.querySelector(".year-select"),s=e.closest(".device-block");if(s){s.dataset.formIndex=h;const u=s.querySelector(".form-results");u&&(u.id=`results-${h}`)}const m=()=>{const u=o.value;n.innerHTML='<option value="">-- Select a Brand --</option>',i.innerHTML='<option value="">-- Select a Model --</option>',t.innerHTML='<option value="">-- Select Year --</option>',u==="smartphone"&&L(e,h)};o.addEventListener("change",m),m()}const T=6,C=2;function b(){const e=document.getElementById("deviceInfo"),o=e.querySelectorAll(".device-block"),n=document.getElementById("addDeviceButton"),i=o.length;o.forEach(t=>t.style.gridColumn=""),i===1?(e.style.gridTemplateColumns="1fr",o[0].style.gridColumn="1 / -1",n.style.display="block"):i===2?(e.style.gridTemplateColumns="repeat(2, 1fr)",o.forEach(t=>t.style.gridColumn="span 1"),n.style.display="block"):i===3?(e.style.gridTemplateColumns="repeat(3, 1fr)",o.forEach(t=>t.style.gridColumn="span 1"),n.style.display="block"):i===4?(e.style.gridTemplateColumns="repeat(2, 1fr)",o.forEach(t=>t.style.gridColumn="span 1"),n.style.display="block"):i===5?(e.style.gridTemplateColumns="repeat(3, 1fr)",o.forEach(t=>t.style.gridColumn="span 1"),n.style.display="block"):i>=6&&(e.style.gridTemplateColumns="repeat(3, 1fr)",o.forEach(t=>t.style.gridColumn="span 1"),n.style.display="none"),n.style.display!=="none"&&(n.style.gridColumn="1 / -1")}function M(){return[...document.querySelectorAll(".deviceInfoForm")].filter(e=>{const o=e.closest(".device-block").querySelector(".form-results"),n=!o||o.style.display==="none",i=!e.querySelector(".brand-select").value,t=!e.querySelector(".model-select").value,s=!e.querySelector(".year-select").value;return n&&(i||t||s)}).length}function _(){return document.querySelectorAll(".deviceInfoForm").length}function E(){const e=document.createElement("div");e.classList.add("device-block");const o=document.createElement("form");o.classList.add("deviceInfoForm"),o.innerHTML=`
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
  `;const n=document.createElement("div");return n.classList.add("form-results"),n.style.display="none",o.querySelector(".removeFormButton").addEventListener("click",()=>{e.remove(),b()}),e.appendChild(o),e.appendChild(n),e}function B(){const e=()=>{const o=document.getElementById("addDeviceButton"),n=document.getElementById("deviceInfo");!o||!n||([...n.querySelectorAll(".deviceInfoForm")].forEach(i=>{S(i)}),o.addEventListener("click",()=>{const i=_(),t=M();if(i>=T){alert(`You can only add up to ${T} devices.`);return}if(t>=C){alert("Please fill out or remove existing empty forms before adding a new one.");return}const s=E();n.insertBefore(s,o);const m=s.querySelector("form.deviceInfoForm");S(m),b()}),b())};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e):e()}function A(e){const o=e.querySelector(".device-type"),n=e.querySelector(".trait-select"),i=e.querySelector(".recommend-btn"),t=e.closest("#recommend-section"),s=t.querySelector(".recommendations"),m=t.querySelector(".reset-btn");if(!s){console.error("Result container not found. Check .recommendations element in HTML.");return}s.style.display="none",m.style.display="none";let u=[];fetch("https://devices.capscloud.cloud/phones").then(c=>c.json()).then(c=>{u=c,console.log("✅ Loaded device data:",u),f(o.value)}).catch(c=>{console.error("❌ Failed to fetch device data:",c)});function f(c){if(console.log("🔧 Populating traits for device type:",c),n.innerHTML='<option value="">Overall</option>',!c)return;const y=["release_year","screen_size_in","battery_mAh","ram_gb","storage_gb","camera_mp","rfid","os","original_price_usd","unlock_methods"],l={release_year:"Release Year",screen_size_in:"Screen Size (in)",battery_mAh:"Battery (mAh)",ram_gb:"RAM (GB)",storage_gb:"Storage (GB)",camera_mp:"Camera (MP)",rfid:"RFID",os:"Operating System",original_price_usd:"Original Price (USD)",unlock_methods:"Unlock Methods"},a=new Set;u.forEach(r=>{(r.deviceType||"smartphone").toLowerCase()===c.toLowerCase()&&y.forEach(g=>{r[g]!==void 0&&r[g]!==null&&a.add(g)})});const p=[...a].sort();console.log("📊 Available traits:",p),p.forEach(r=>{const d=document.createElement("option");d.value=r,d.textContent=l[r]||r,n.appendChild(d)})}o.addEventListener("change",()=>{console.log("🔄 Device type changed:",o.value),f(o.value)}),i.addEventListener("click",c=>{c.preventDefault();const y=o.value,l=n.value;if(console.log("🚀 Recommend clicked. Device Type:",y,"Trait:",l),!y||!l){alert("Please select both device type and trait.");return}let a=u.filter(p=>(p.deviceType||"smartphone").toLowerCase()===y.toLowerCase());if(console.log("🔍 Filtered by device type:",a.length),a=a.filter(p=>{if(!(l in p))return Array.isArray(p.unlock_methods)&&p.unlock_methods.includes(l);const r=p[l];return Array.isArray(r)?r.length>0:r!=null}),console.log("📊 Filtered by trait:",a.length),a.length===0)s.innerHTML=`<p>No devices found for <strong>${y}</strong> with trait <strong>${l}</strong>.</p>`;else{a.sort((r,d)=>{const g=Array.isArray(r[l])?r[l][0]:r[l],v=Array.isArray(d[l])?d[l][0]:d[l];return typeof g=="number"&&typeof v=="number"?v-g:typeof g=="string"&&typeof v=="string"?g.localeCompare(v):0});const p=a.slice(0,10);console.log("🏆 Top 10 results:",p),s.innerHTML=`
      <h3>Top 10 Devices for Trait: <em>${l.replace(/_/g," ")}</em></h3>
        <div class="recommend-grid">
          ${p.map(r=>`
            <div class="recommend-card">
              <ul class="result">
                <li><strong>Brand:</strong> ${r.brand}</li>
                <li><strong>Model:</strong> ${r.model}</li>
                <li><strong>Device Type:</strong> ${r.deviceType}</li>
                <li><strong>Release Year:</strong> ${r.release_year||"N/A"}</li>
                <li><strong>Battery:</strong> ${r.battery_mAh?r.battery_mAh+" mAh":"N/A"}</li>
                <li><strong>RAM:</strong> ${r.ram_gb?r.ram_gb.join(", ")+" GB":"N/A"}</li>
                <li><strong>Storage:</strong> ${r.storage_gb?r.storage_gb.join(", ")+" GB":"N/A"}</li>
                <li><strong>Camera:</strong> ${r.camera_mp?r.camera_mp.join(", ")+" MP":"N/A"}</li>
                <li><strong>RFID:</strong> ${r.rfid?"Yes":"No"}</li>
                <li><strong>Unlock Methods:</strong> ${r.unlock_methods?r.unlock_methods.join(", "):"N/A"}</li>
              </ul>
            </div>
          `).join("")}
        </div>
  `}s.style.display="block",m.style.display="inline-block",e.style.display="none"}),m.addEventListener("click",()=>{console.log("🔄 Reset button clicked"),e.reset(),n.innerHTML='<option value="">Overall</option>',s.style.display="none",s.innerHTML="",e.style.display="block",m.style.display="none"})}document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".recommendForm");e?A(e):console.warn("Recommend form not found!"),B()});
