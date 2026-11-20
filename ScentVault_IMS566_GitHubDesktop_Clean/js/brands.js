/* ScentVault 1.4 | Searchable, filterable directory with live brand comparison. */
(() => {
  const {collection,wishlist}=SV.records();
  const input=document.getElementById('brandSearch'),region=document.getElementById('brandRegion');
  const requestedRegion=new URLSearchParams(location.search).get('region');
  if(['Arabian','Malaysian','Indonesian','International'].includes(requestedRegion))region.value=requestedRegion;
  const result=document.getElementById('brandResults');const all=ScentVaultData.brands;
  const selected=new Set();const dialog=document.getElementById('compareDialog');
  const fmt=SV.escapeHTML;
  function render(){
    const q=input.value.toLowerCase().trim();
    const filtered=all.filter(b=>(b.name+' '+b.country).toLowerCase().includes(q)&&(region.value==='all'||b.origin===region.value)).sort((a,b)=>a.name.localeCompare(b.name));
    document.getElementById('brandCount').textContent=`Showing ${filtered.length} of ${all.length} brands`;
    result.innerHTML=filtered.length?filtered.map((b,i)=>{
      const products=ScentVaultData.catalogue.filter(p=>p.brand===b.name);
      const owned=collection.filter(p=>p.brand===b.name).length;
      const wished=wishlist.filter(p=>p.brand===b.name).length;
      const chosen=selected.has(b.name);
      return `<article class="brand-row ${chosen?'brand-selected':''}"><div class="brand-row-main"><span class="eyebrow">${fmt(b.origin)} / ${fmt(b.country)}</span><h3>${fmt(b.name)}</h3><div class="brand-perfumes">${products.map(p=>`<span>${fmt(p.name)}</span>`).join('')}</div></div><div class="brand-row-meta"><span>REFERENCE / 01 BOTTLE</span><strong>${SV.money(b.fixedPriceRM)}</strong><small>${owned} owned · ${wished} wished</small><label class="compare-check"><input type="checkbox" data-compare="${fmt(b.name)}" ${chosen?'checked':''} aria-label="Compare ${fmt(b.name)}"> Compare</label><a href="collection.html?brand=${encodeURIComponent(b.name)}#catalogue">View fragrances <span aria-hidden="true">↗</span></a></div></article>`;
    }).join(''):'<div class="surface-card empty-list"><h3>No matching fragrance houses</h3><p>Clear the search or choose another region.</p></div>';
    document.getElementById('compareCount').textContent=`(${selected.size})`;
    document.getElementById('compareBrands').disabled=selected.size<2;
  }
  result.addEventListener('change',e=>{
    const check=e.target.closest('[data-compare]');if(!check)return;
    const name=check.dataset.compare;
    if(check.checked){
      if(selected.size>=3){check.checked=false;SV.notice('Choose up to three brands to compare.');return;}
      selected.add(name);
    }else selected.delete(name);
    render();
    SV.notice(`${selected.size} brand${selected.size===1?'':'s'} selected for comparison.`);
  });
  document.getElementById('compareBrands').addEventListener('click',()=>{
    const brands=[...selected].map(name=>all.find(b=>b.name===name));
    if(brands.length<2)return;
    document.getElementById('compareResults').innerHTML=`<table class="sv-table"><thead><tr><th>Metric</th>${brands.map(b=>`<th>${fmt(b.name)}</th>`).join('')}</tr></thead><tbody><tr><td>Origin group</td>${brands.map(b=>`<td>${fmt(b.origin)}</td>`).join('')}</tr><tr><td>Country</td>${brands.map(b=>`<td>${fmt(b.country)}</td>`).join('')}</tr><tr><td>Reference price</td>${brands.map(b=>`<td><strong>${SV.money(b.fixedPriceRM)}</strong></td>`).join('')}</tr><tr><td>Catalogue fragrances</td>${brands.map(b=>`<td>${ScentVaultData.catalogue.filter(p=>p.brand===b.name).length}</td>`).join('')}</tr><tr><td>Owned</td>${brands.map(b=>`<td>${collection.filter(p=>p.brand===b.name).length}</td>`).join('')}</tr><tr><td>Wishlist</td>${brands.map(b=>`<td>${wishlist.filter(p=>p.brand===b.name).length}</td>`).join('')}</tr></tbody></table>`;
    dialog.showModal();
  });
  document.getElementById('closeCompare').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
  input.addEventListener('input',render);region.addEventListener('change',render);render();
})();
