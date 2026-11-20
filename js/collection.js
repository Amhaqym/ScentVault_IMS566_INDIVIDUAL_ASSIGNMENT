/* ScentVault 1.4 | In-memory collection & wishlist management.
   Add, edit, remove, rate, favourite, export, browse, sort and filter all work.
   The curated seed is restored after refresh; nothing is persisted to storage. */
(() => {
  const seed=SV.records();
  const owned=seed.collection, wishlist=seed.wishlist;
  const catalogue=ScentVaultData.catalogue;
  const el=id=>document.getElementById(id);
  const params=new URLSearchParams(location.search);
  const selectedBrand=params.get('brand');
  const selectedCategory=params.get('category');
  const selectedMax=params.get('max');
  const selectedSearch=params.get('search');
  const validTabs=['owned','wishlist','catalogue'];
  const tabFromHash=()=>location.hash.slice(1).toLowerCase();
  let activeTab=validTabs.includes(tabFromHash())?tabFromHash():(selectedBrand||selectedCategory||selectedMax||selectedSearch?'catalogue':'owned');
  let activeView='grid',currentPage=1,editing=false;
  const perPage=12;
  const search=el('collectionSearch'), origin=el('originSelect'), brand=el('brandSelect'), category=el('categorySelect'), sort=el('sortSelect'), maxPrice=el('priceMaxSelect');
  const results=el('collectionResults'),pagination=el('collectionPagination'),description=el('listDescription');
  const detail=el('detailDialog'),formDialog=el('editDialog'),form=el('editForm');
  const tabs=[...document.querySelectorAll('[data-tab]')],views=[...document.querySelectorAll('[data-view]')];
  const fmt=SV.escapeHTML,price=p=>p.price==null?'Price not recorded':SV.money(p.price);
  const listing=()=>activeTab==='owned'?owned:activeTab==='wishlist'?wishlist:catalogue;
  const searchable=p=>[p.name,p.brand,p.origin,p.country,p.category,p.notes,p.concentration].join(' ').toLowerCase();
  const same=(a,b)=>a.id===b.id;
  const exists=(items,p)=>items.some(x=>same(x,p));
  const options=ScentVaultData.brands.slice().sort((a,b)=>a.name.localeCompare(b.name));
  brand.insertAdjacentHTML('beforeend',options.map(x=>`<option value="${fmt(x.name)}">${fmt(x.name)}</option>`).join(''));
  const families=[...new Set(catalogue.map(x=>x.category))].sort();
  category.insertAdjacentHTML('beforeend',families.map(x=>`<option value="${fmt(x)}">${fmt(x)}</option>`).join(''));
  el('editCatalogue').innerHTML=catalogue.map(x=>`<option value="${fmt(x.id)}">${fmt(x.brand)} — ${fmt(x.name)} · ${fmt(x.size)} ml</option>`).join('');
  if(selectedSearch)search.value=selectedSearch;
  if(selectedBrand && options.some(x=>x.name===selectedBrand))brand.value=selectedBrand;
  if(selectedCategory && families.includes(selectedCategory))category.value=selectedCategory;
  if(selectedMax && [...maxPrice.options].some(x=>x.value===selectedMax))maxPrice.value=selectedMax;
  const display=v=>v===undefined||v===null||v===''?'Not specified':fmt(v);
  const listTabName=()=>activeTab==='owned'?'Owned fragrances':activeTab==='wishlist'?'Wishlist':'Full catalogue';
  function filtered(){
    const q=search.value.trim().toLowerCase();
    const items=listing().filter(p=>(!q||searchable(p).includes(q))&&
      (origin.value==='all'||p.origin===origin.value)&&
      (brand.value==='all'||p.brand===brand.value)&&
      (category.value==='all'||p.category===category.value)&&
      (maxPrice.value==='all'||Number(p.price)<=Number(maxPrice.value)));
    const byName=(a,b)=>a.name.localeCompare(b.name);
    if(sort.value==='name')items.sort(byName);
    if(sort.value==='brand')items.sort((a,b)=>a.brand.localeCompare(b.brand)||byName(a,b));
    if(sort.value==='category')items.sort((a,b)=>a.category.localeCompare(b.category)||byName(a,b));
    if(sort.value==='price-low')items.sort((a,b)=>Number(a.price)-Number(b.price)||byName(a,b));
    if(sort.value==='price-high')items.sort((a,b)=>Number(b.price)-Number(a.price)||byName(a,b));
    return items;
  }
  function render(){
    tabs.forEach(tab=>{const active=tab.dataset.tab===activeTab;tab.classList.toggle('active',active);tab.setAttribute('aria-selected',String(active));
      const count=tab.querySelector('.tab-count');if(count)count.textContent=tab.dataset.tab==='owned'?owned.length:tab.dataset.tab==='wishlist'?wishlist.length:catalogue.length;});
    views.forEach(b=>{const active=b.dataset.view===activeView;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
    const items=filtered();const pages=Math.max(1,Math.ceil(items.length/perPage));currentPage=Math.min(currentPage,pages);
    const visible=items.slice((currentPage-1)*perPage,currentPage*perPage);
    description.textContent=`${items.length} of ${listing().length} · ${listTabName()} · Select a perfume for details and actions`;
    if(!items.length){results.innerHTML='<div class="surface-card empty-list"><h3>No matching fragrances</h3><p class="muted">Try different filters, or browse the full catalogue.</p><button class="btn btn-outline-ink" type="button" data-action="clear">Reset filters</button></div>';pagination.innerHTML='';return;}
    if(activeView==='grid'){
      results.innerHTML='<div class="perfume-grid">'+visible.map(p=>`<button type="button" class="perfume-card" data-open="${fmt(p.id)}" aria-label="View ${fmt(p.name)} details"><div class="perfume-photo">${SV.photo(p,'card')}</div><div class="perfume-info"><span class="eyebrow">${fmt(p.brand)}</span><h3>${fmt(p.name)}</h3><p>${fmt(p.origin)} · ${fmt(p.category)}</p><p class="variant-line">${fmt(p.concentration)} · ${fmt(p.size)} ml</p><strong>${price(p)}</strong>${activeTab==='owned'?`<span class="personal-stars" aria-label="Personal rating ${p.rating==null?'not rated':p.rating+' out of five'}">${p.rating==null?'Not rated':'★'.repeat(Number(p.rating))+'☆'.repeat(5-Number(p.rating))}</span>`:''}${activeTab==='wishlist'?`<span class="personal-stars">${fmt(p.priority||'Medium')} priority</span>`:''}${p.selectionStatus==='suggested'?'<span class="provisional-label">Suggested option</span>':''}</div></button>`).join('')+'</div>';
    }else{
      results.innerHTML='<div class="surface-card table-scroll"><table class="sv-table"><thead><tr><th>Fragrance</th><th>Brand</th><th>Origin</th><th>Scent family</th><th>Variant</th><th>Price</th><th>Details</th></tr></thead><tbody>'+visible.map(p=>`<tr><td><div class="table-fragrance">${SV.photo(p,'thumb')}<strong>${fmt(p.name)}</strong></div></td><td>${fmt(p.brand)}</td><td>${fmt(p.origin)}</td><td>${fmt(p.category)}</td><td>${fmt(p.size)} ml · ${fmt(p.concentration)}</td><td>${price(p)}</td><td><button class="table-action" type="button" data-open="${fmt(p.id)}">View ↗</button></td></tr>`).join('')+'</tbody></table></div>';
    }
    pagination.innerHTML=pages>1?`<span>Page ${currentPage} / ${pages}</span><div class="pagination-buttons"><button type="button" data-page="previous" ${currentPage===1?'disabled':''}>← Previous</button><button type="button" data-page="next" ${currentPage===pages?'disabled':''}>Next →</button></div>`:'';
  }
  function openDetails(p){
    if(!p)return;
    const inOwned=exists(owned,p),inWish=exists(wishlist,p);
    const op=owned.find(x=>same(x,p)),wp=wishlist.find(x=>same(x,p));
    const buttons=[];
    if(inOwned){buttons.push(`<button class="btn btn-gold" type="button" data-detail-action="edit-owned">Edit owned entry ↗</button>`,`<button class="btn btn-outline-ink" type="button" data-detail-action="favourite">${op.favorite?'★ Remove favourite':'☆ Add favourite'}</button>`,`<button class="btn btn-danger-outline" type="button" data-detail-action="remove-owned">Remove from owned</button>`);}
    else buttons.push(`<button class="btn btn-gold" type="button" data-detail-action="add-owned">+ Add to owned</button>`);
    if(inWish){buttons.push(`<button class="btn btn-outline-ink" type="button" data-detail-action="edit-wishlist">Edit wishlist</button>`,`<button class="btn btn-danger-outline" type="button" data-detail-action="remove-wishlist">Remove wishlist</button>`);}
    else buttons.push(`<button class="btn btn-outline-ink" type="button" data-detail-action="add-wishlist">♡ Add to wishlist</button>`);
    el('detailContent').innerHTML=`<p class="eyebrow">${fmt(p.origin)} / ${fmt(p.brand)}</p><div class="detail-specimen detail-photo">${SV.photo(p,'detail')}</div><h2 id="detailHeading">${fmt(p.name)}</h2><p class="detail-price">${price(p)}</p><div class="detail-data"><div><strong>Scent family</strong><span>${display(p.category)}</span></div><div><strong>Country</strong><span>${display(p.country)}</span></div><div><strong>Concentration</strong><span>${display(p.concentration)}</span></div><div><strong>Bottle size</strong><span>${fmt(p.size)} ml</span></div><div><strong>Personal rating</strong><span>${op?.rating==null?'Not rated':fmt(op.rating)+' / 5'}</span></div><div><strong>Fragrance notes</strong><span>${display(p.notes)}</span></div></div>${op?.personalReview?`<p class="muted small"><strong>My note:</strong> ${fmt(op.personalReview)}</p>`:''}${wp?.wishlistNotes?`<p class="muted small"><strong>Wishlist note:</strong> ${fmt(wp.wishlistNotes)}</p>`:''}<p class="muted small">${p.selectionStatus==='suggested'?'Suggested catalogue selection awaiting final confirmation. ':''}Brand reference prices are collector-defined, not live retail prices.</p><div class="detail-actions">${buttons.join('')}</div>`;
    detail.dataset.id=p.id;detail.showModal();
  }
  const findAny=id=>listing().find(p=>p.id===id)||catalogue.find(p=>p.id===id);
  function openEditor(mode,item){
    editing=!!item;form.reset();
    el('editMode').value=mode;el('editId').value=item?.id||'';
    el('editCatalogue').disabled=editing;
    const p=item||catalogue[0];
    el('editCatalogue').value=p.id;
    el('editPrice').value=item?.price??p.price;
    el('editDate').value=item?.addedAt||new Date().toISOString().slice(0,10);
    el('editRating').value=item?.rating??'';
    el('editFavorite').checked=!!item?.favorite;
    el('editPriority').value=item?.priority||'Medium';
    el('editNotes').value=item?.personalReview||item?.wishlistNotes||'';
    el('editRating').closest('.form-field').hidden=mode!=='owned';
    el('editDate').closest('.form-field').hidden=mode!=='owned';
    el('favoriteWrapper').hidden=mode!=='owned';
    el('editPriority').closest('.form-field').hidden=mode!=='wishlist';
    el('editHeading').textContent=(item?'Edit ':'Add ')+(mode==='wishlist'?'wishlist fragrance':'owned fragrance');
    el('editLead').textContent=mode==='wishlist'?'Choose a fragrance and set your wishlist priority.':'Use the fixed catalogue as a starting point, then set your personal rating and purchase details.';
    el('editError').classList.add('d-none');
    formDialog.showModal();
  }
  function remove(mode,id){
    const items=mode==='owned'?owned:wishlist;
    const index=items.findIndex(x=>x.id===id);
    if(index<0)return;
    if(!window.confirm(`Remove ${items[index].name} from ${mode==='owned'?'Owned':'Wishlist'}? This only changes the current page.`))return;
    const label=items[index].name;items.splice(index,1);detail.close();render();SV.notice(label+' removed from '+(mode==='owned'?'Owned':'Wishlist')+'.');
  }
  function addFromCatalogue(mode,p){
    const items=mode==='owned'?owned:wishlist;
    if(exists(items,p)){SV.notice('This fragrance is already in '+(mode==='owned'?'Owned':'Wishlist')+'.');return;}
    detail.close();openEditor(mode,null);el('editCatalogue').value=p.id;el('editPrice').value=p.price;
  }
  el('detailContent').addEventListener('click',e=>{
    const button=e.target.closest('[data-detail-action]');if(!button)return;
    const action=button.dataset.detailAction;
    const id=detail.dataset.id,p=findAny(id);
    if(action==='add-owned')addFromCatalogue('owned',p);
    else if(action==='add-wishlist')addFromCatalogue('wishlist',p);
    else if(action==='edit-owned'){detail.close();openEditor('owned',owned.find(x=>x.id===id));}
    else if(action==='edit-wishlist'){detail.close();openEditor('wishlist',wishlist.find(x=>x.id===id));}
    else if(action==='remove-owned')remove('owned',id);
    else if(action==='remove-wishlist')remove('wishlist',id);
    else if(action==='favourite'){const item=owned.find(x=>x.id===id);item.favorite=!item.favorite;detail.close();render();SV.notice(item.favorite?'Added to favourites.':'Removed from favourites.');}
  });
  el('closeDetails').addEventListener('click',()=>detail.close());
  detail.addEventListener('click',e=>{if(e.target===detail)detail.close();});
  el('closeEdit').addEventListener('click',()=>formDialog.close());
  el('cancelEdit').addEventListener('click',()=>formDialog.close());
  formDialog.addEventListener('click',e=>{if(e.target===formDialog)formDialog.close();});
  el('editCatalogue').addEventListener('change',()=>{const p=catalogue.find(x=>x.id===el('editCatalogue').value);if(p)el('editPrice').value=p.price;});
  form.addEventListener('submit',e=>{
    e.preventDefault();const mode=el('editMode').value,items=mode==='owned'?owned:wishlist;
    const id=editing?el('editId').value:el('editCatalogue').value;
    const base=catalogue.find(x=>x.id===id);const amount=Number(el('editPrice').value);
    if(!base||!el('editPrice').value.trim()||!Number.isFinite(amount)||amount<0){el('editError').textContent='Enter a valid purchase or reference price (RM0 or higher).';el('editError').classList.remove('d-none');return;}
    if(!editing&&exists(items,base)){el('editError').textContent='This fragrance is already in this list. Open its details to edit it.';el('editError').classList.remove('d-none');return;}
    const old=items.find(x=>x.id===id);
    const item={...(old||base),price:amount};
    if(mode==='owned')Object.assign(item,{addedAt:el('editDate').value||new Date().toISOString().slice(0,10),rating:el('editRating').value===''?null:Number(el('editRating').value),favorite:el('editFavorite').checked,personalReview:el('editNotes').value.trim()});
    else Object.assign(item,{priority:el('editPriority').value,wishlistNotes:el('editNotes').value.trim()});
    if(old)Object.assign(old,item);else items.push(item);
    formDialog.close();activeTab=mode;location.hash=mode;currentPage=1;search.value='';origin.value='all';brand.value='all';category.value='all';maxPrice.value='all';sort.value='name';render();SV.notice((old?'Updated ':'Added ')+item.name+(mode==='owned'?' in Owned.':' to Wishlist.'));
  });
  el('addPerfumeBtn').addEventListener('click',()=>openEditor(activeTab==='wishlist'?'wishlist':'owned'));
  results.addEventListener('click',e=>{
    if(e.target.closest('[data-action="clear"]')){resetFilters();return;}
    const btn=e.target.closest('[data-open]');if(btn)openDetails(findAny(btn.dataset.open));
  });
  pagination.addEventListener('click',e=>{const btn=e.target.closest('[data-page]');if(!btn)return;currentPage+=btn.dataset.page==='next'?1:-1;render();pagination.scrollIntoView({block:'nearest',behavior:'smooth'});});
  function resetFilters(){search.value='';origin.value='all';brand.value='all';category.value='all';sort.value='name';maxPrice.value='all';currentPage=1;render();}
  tabs.forEach((tab,index)=>{
    tab.addEventListener('click',()=>{activeTab=tab.dataset.tab;currentPage=1;location.hash=activeTab;render();});
    tab.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight'].includes(e.key))return;e.preventDefault();const next=(index+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;tabs[next].focus();tabs[next].click();});
  });
  window.addEventListener('hashchange',()=>{const next=tabFromHash();if(validTabs.includes(next)){activeTab=next;currentPage=1;render();}});
  views.forEach(b=>b.addEventListener('click',()=>{activeView=b.dataset.view;render();}));
  [search,origin,brand,category,sort,maxPrice].forEach(c=>c.addEventListener(c===search?'input':'change',()=>{currentPage=1;render();}));
  el('clearFilters').addEventListener('click',resetFilters);
  // Export the current owned collection as CSV: no storage or network call.
  el('exportCollectionBtn').addEventListener('click',()=>{
    const columns=['Brand','Perfume','Origin','Scent Family','Concentration','Bottle Size (ml)','Purchase Price (RM)','Rating','Date Added','Favourite','Personal Notes'];
    const quote=value=>'"'+String(value??'').replace(/"/g,'""')+'"';
    const rows=owned.map(p=>[p.brand,p.name,p.origin,p.category,p.concentration,p.size,p.price,p.rating??'',p.addedAt,p.favorite?'Yes':'No',p.personalReview||'']);
    const csv='\uFEFF'+[columns,...rows].map(x=>x.map(quote).join(',')).join('\r\n');
    const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));
    const a=document.createElement('a');a.href=url;a.download='ScentVault_Owned_Collection.csv';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);
    SV.notice('Exported '+owned.length+' owned fragrances as CSV.');
  });
  render();
})();
