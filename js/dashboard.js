(() => {
 
 const {collection,wishlist}=SV.records();
 const el=(id)=>document.getElementById(id);
 
 const pulse=el('cataloguePulse');if(pulse)pulse.textContent=`${ScentVaultData.catalogue.length} fragrances · ${ScentVaultData.brands.length} brands · 4 origin groups`;
 const uniqueBrands=new Set(collection.map(x=>x.brand)).size;
 const types=new Set(collection.map(x=>x.category)).size;
 const total=collection.reduce((sum,x)=>sum+Number(x.price||0),0);
 const ratingEntries=collection.filter(x=>Number.isFinite(Number(x.rating))&&x.rating!==''&&x.rating!=null);
 const avg=ratingEntries.length?(ratingEntries.reduce((s,x)=>s+Number(x.rating),0)/ratingEntries.length).toFixed(1):'—';
 const stats=[['Total Perfumes',collection.length,'01'],['Collection Value',SV.money(total),'02'],['Total Brands',uniqueBrands,'03'],['Wishlist Items',wishlist.length,'04'],['Wishlist Value',SV.money(wishlist.reduce((s,x)=>s+Number(x.price||0),0)),'05'],['Favourites',collection.filter(x=>x.favorite).length,'06'],['Average Rating',avg==='—'?'—':avg+' / 5','07'],['Fragrance Types',types,'08']];
 el('kpiGrid').innerHTML=stats.map(([label,value,ico],i)=>`<article class="kpi-card ${i%4===0?'kpi-dark':''}"><span class="kpi-label">${label}</span><span class="kpi-icon" aria-hidden="true">${ico}</span><strong class="kpi-value">${value}</strong></article>`).join('');
 // In-page discovery finder: useful interaction with the same curated catalogue.
 const finderFamily=el('finderFamily'), finderBudget=el('finderBudget'), finderResults=el('finderResults');
 const families=[...new Set(ScentVaultData.catalogue.map(p=>p.category))].sort();
 finderFamily.insertAdjacentHTML('beforeend',families.map(f=>`<option value="${SV.escapeHTML(f)}">${SV.escapeHTML(f)}</option>`).join(''));
 function showMatches(){
   const cap=Number(finderBudget.value),family=finderFamily.value;
   const matches=ScentVaultData.catalogue.filter(p=>p.price<=cap&&(family==='all'||p.category===family));
   const indexed=[...matches].sort((a,b)=>a.price-b.price||a.brand.localeCompare(b.brand));
   const toShow=indexed.slice(0,3);
   finderResults.innerHTML=toShow.length?`<p class="finder-count">${matches.length} matching fragrances · showing ${toShow.length}</p><div class="finder-matches">${toShow.map(p=>`<a href="collection.html?search=${encodeURIComponent(p.name)}#catalogue">${SV.photo(p,'mini')}<span>${SV.escapeHTML(p.brand)}</span><strong>${SV.escapeHTML(p.name)}</strong><small>${SV.money(p.price)} · ${SV.escapeHTML(p.size)} ml</small><b aria-hidden="true">↗</b></a>`).join('')}</div>`:'<p class="finder-count">No matching fragrances in this price range. Try a higher budget or a different family.</p>';
 }
 el('finderForm').addEventListener('submit',e=>{e.preventDefault();showMatches();SV.notice('Matching fragrances are shown below.');});
 finderFamily.addEventListener('change',showMatches);finderBudget.addEventListener('change',showMatches);
 showMatches();
 const recent=[...collection].sort((a,b)=>String(b.addedAt||'').localeCompare(String(a.addedAt||''))).slice(0,5);
 el('recentList').innerHTML=recent.length?recent.map(p=>`<a class="recent-row" href="collection.html?search=${encodeURIComponent(p.name)}#owned">${SV.photo(p,'recent')}<div><strong>${SV.escapeHTML(p.name)}</strong><small>${SV.escapeHTML(p.brand)} · ${SV.escapeHTML(p.origin)}</small></div><span class="recent-price">${SV.money(p.price)} ↗</span></a>`).join(''):'<p class="muted">Your collection is empty. Add fragrances in the next development phase.</p>';
 const byPriority=['High','Medium','Low'].map(p=>({priority:p,count:wishlist.filter(w=>w.priority===p).length}));
 el('wishlistSummary').innerHTML=wishlist.length?byPriority.map(({priority,count})=>`<div class="priority-row"><span>${priority} priority</span><span>${count} fragrance${count===1?'':'s'}</span><div class="priority-track"><span style="width:${count/wishlist.length*100}%" class="priority-fill ${priority.toLowerCase()}"></span></div></div>`).join(''):'<p class="muted">Nothing on your wishlist yet.</p>';
 function counts(key){const map={};collection.forEach(item=>map[item[key]]=(map[item[key]]||0)+1);return Object.entries(map);}
 function makeChart(canvasId,emptyId,items){if(items.length===0){el(canvasId).classList.add('d-none');el(emptyId).classList.remove('d-none');return;}if(!window.Chart){el(emptyId).classList.remove('d-none');el(emptyId).textContent='Charts require an internet connection to load Chart.js.';return;}
  new Chart(el(canvasId),{type:'doughnut',data:{labels:items.map(v=>v[0]),datasets:[{data:items.map(v=>v[1]),backgroundColor:['#b58a47','#36312b','#caa969','#8a8277','#e7cc9e','#a29a8f'],borderColor:'#ffffff',borderWidth:3,hoverOffset:6}]},options:{maintainAspectRatio:false,cutout:'66%',plugins:{legend:{position:'bottom',labels:{color:'#554b40',usePointStyle:true,padding:16,font:{family:'Inter',size:11}}}}}});
 }
 makeChart('categoryChart','categoryEmpty',counts('category'));
 makeChart('originChart','originEmpty',counts('origin'));
})();
