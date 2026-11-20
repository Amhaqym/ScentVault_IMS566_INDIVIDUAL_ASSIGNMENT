/* Phase 1.3 — seven charts from hardcoded owned/wishlist arrays and a full 24-brand catalogue summary. */
(() => {
  const {collection,wishlist}=SV.records();
  const el=(id)=>document.getElementById(id);
  const count=(items,key)=>{
    const map=new Map();items.forEach(p=>{const name=p[key]||'Unspecified';map.set(name,(map.get(name)||0)+1);});
    return [...map.entries()].sort((a,b)=>b[1]-a[1]);
  };
  const sum=(items,key)=>{
    const map=new Map();items.forEach(p=>{const name=p[key]||'Unspecified';map.set(name,(map.get(name)||0)+Number(p.price||0));});
    return [...map.entries()].sort((a,b)=>b[1]-a[1]);
  };
  const style=['#b58a47','#2c2b2a','#d7b577','#8d8273','#c49f5c','#63605c','#e0c28b','#b2a18a'];
  const noData=(id,message)=>{const canvas=el(id);canvas.replaceWith(Object.assign(document.createElement('p'),{className:'chart-empty',textContent:message||'No data available yet.'}));};
  function draw(id,type,pairs,{title='',horizontal=false,value=false}={}){
    if(!pairs.length || pairs.every(x=>!Number(x[1]))){noData(id);return;}
    if(!window.Chart){noData(id,'Connect to the internet to load the Chart.js library.');return;}
    const isPie=type==='doughnut';
    const dataset={label:title||'Total',data:pairs.map(x=>x[1]),backgroundColor:isPie?pairs.map((_,i)=>style[i%style.length]):(type==='line'?'rgba(195,161,100,.14)':pairs.map((_,i)=>style[i%style.length])),borderColor:isPie?'#ffffff':'#c5a46d',borderWidth:isPie?3:1};
    if(type==='line')Object.assign(dataset,{tension:.3,fill:true,pointRadius:4,pointBackgroundColor:'#b19051'});
    if(type==='bar')dataset.borderRadius=4;
    return new Chart(el(id),{type,data:{labels:pairs.map(x=>x[0]),datasets:[dataset]},options:{
      maintainAspectRatio:false,indexAxis:horizontal?'y':'x',
      ...(isPie?{cutout:'65%'}:{}),
      plugins:{legend:{display:isPie,position:'bottom',labels:{color:'#554b40',usePointStyle:true,padding:12,font:{family:'Inter',size:10}}},tooltip:{callbacks:value?{label:(context)=>`${context.label}: ${SV.money(context.parsed.y??context.parsed.x??context.parsed)}`}:{}}},
      ...(!isPie?{scales:horizontal?{x:{beginAtZero:true,grid:{color:'#e9e0d3'},ticks:{color:'#554b40',precision:0,font:{size:10}}},y:{grid:{color:'#e9e0d3'},ticks:{color:'#554b40',font:{size:10}}}}:{x:{grid:{color:'#e9e0d3'},ticks:{color:'#554b40',maxRotation:35,autoSkip:false,font:{size:10}}},y:{beginAtZero:true,grid:{color:'#e9e0d3'},ticks:{color:'#554b40',precision:0}}}}:{})
    }});
  }
  const stats=[
    ['Catalogue perfumes',ScentVaultData.catalogue.length],
    ['Curated brands',ScentVaultData.brands.length],
    ['My collection',collection.length],
    ['Wishlist items',wishlist.length]
  ];
  el('overview').innerHTML=stats.map(([label,value])=>`<article class="analytics-mini-stat"><span>${label}</span><strong>${value}</strong></article>`).join('');
  draw('originDistChart','doughnut',count(collection,'origin'),{title:'Perfumes'});
  const byBrand=count(collection,'brand');
  if(byBrand.length>7)el('brandChart').parentElement.style.height=Math.min(430,byBrand.length*32+50)+'px';
  draw('brandChart','bar',byBrand,{title:'Perfumes',horizontal:true});
  const growthPerMonth=new Map();
  collection.forEach(p=>{const date=String(p.addedAt||'');if(/^\d{4}-\d{2}/.test(date)){const key=date.slice(0,7);growthPerMonth.set(key,(growthPerMonth.get(key)||0)+1);}});
  let accumulated=0;
  const growth=[...growthPerMonth.entries()].sort((a,b)=>a[0].localeCompare(b[0])).map(([month,n])=>[month,accumulated+=n]);
  draw('growthChart','line',growth,{title:'Cumulative perfumes'});
  draw('valueChart','bar',sum(collection,'origin'),{title:'RM',value:true});
  draw('familyChart','doughnut',count(collection,'category'),{title:'Perfumes'});
  const priorities=['High','Medium','Low'].map(p=>[p,wishlist.filter(x=>x.priority===p).length]);
  draw('wishlistChart','doughnut',priorities,{title:'Wishlist items'});
  const ratings=[1,2,3,4,5].map(r=>[String(r)+' star'+(r===1?'':'s'),collection.filter(p=>p.rating!==null&&p.rating!==undefined&&p.rating!==''&&Number(p.rating)===r).length]);
  draw('ratingChart','bar',ratings,{title:'Perfumes'});
  const total=collection.length||1;
  const collectionValue=collection.reduce((s,p)=>s+Number(p.price||0),0)||1;
  const perBrand=count(collection,'brand');
  el('statsTable').querySelector('tbody').innerHTML=perBrand.length?perBrand.map(([brand,n])=>{
    const items=collection.filter(p=>p.brand===brand);
    const value=items.reduce((s,p)=>s+Number(p.price||0),0);
    return `<tr><td><strong>${SV.escapeHTML(brand)}</strong></td><td>${SV.escapeHTML(items[0].origin)}</td><td>${n}</td><td>${SV.money(value)}</td><td>${(n/total*100).toFixed(1)}%</td><td>${(value/collectionValue*100).toFixed(1)}%</td></tr>`;
  }).join(''):'<tr><td colspan="6">No owned perfumes to analyse yet. The curated catalogue is still available for exploration.</td></tr>';
  const brandCount=ScentVaultData.catalogue.reduce((m,p)=>(m[p.brand]=(m[p.brand]||0)+1,m),{});
  const catalogueTable=el('catalogueBrandTable');
  if(catalogueTable){catalogueTable.querySelector('tbody').innerHTML=ScentVaultData.brands.map(b=>`<tr><td><strong>${SV.escapeHTML(b.name)}</strong></td><td>${SV.escapeHTML(b.origin)}</td><td>${brandCount[b.name]||0}</td><td>${SV.money(b.fixedPriceRM)}</td></tr>`).join('');}
  // Dataset comparison changes all three extra charts without changing persisted data.
  const scopes={owned:collection,catalogue:ScentVaultData.catalogue,wishlist};
  const scopeNames={owned:'your owned fragrances',catalogue:'all fragrances in the catalogue',wishlist:'your saved wishlist items'};
  const buckets=[['RM0–100',0,100],['RM101–300',100,300],['RM301–500',300,500],['RM501–1,000',500,1000],['Over RM1,000',1000,Infinity]];
  let activeCharts=[];
  function updateScope(scope){
    activeCharts.forEach(chart=>{if(chart && typeof chart.destroy==='function')chart.destroy();});
    activeCharts=[];
    document.querySelectorAll('[data-scope]').forEach(b=>{const active=b.dataset.scope===scope;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
    const items=scopes[scope];
    el('scopeDescription').textContent=`Comparing ${items.length} records from ${scopeNames[scope]}. Reference prices are fixed by brand.`;
    const byPrice=buckets.map(([label,min,max])=>[label,items.filter(x=>Number(x.price)>(min===0?-1:min)&&Number(x.price)<=max).length]);
    const concentrations=count(items.map(x=>({...x,concentration:x.concentration?.includes('Extrait')?'Extrait de Parfum':x.concentration?.includes('Toilette')?'Eau de Toilette (EDT)':'Eau de Parfum (EDP)'})),'concentration');
    const sizes=count(items.map(x=>({...x,size:(x.size||'Unknown')+' ml'})),'size').sort((a,b)=>Number.parseInt(a[0])-Number.parseInt(b[0]));
    activeCharts.push(draw('priceRangeChart','bar',byPrice,{title:'Fragrances'}));
    activeCharts.push(draw('concentrationChart','doughnut',concentrations,{title:'Fragrances'}));
    activeCharts.push(draw('bottleSizeChart','bar',sizes,{title:'Fragrances'}));
  }
  document.querySelectorAll('[data-scope]').forEach(b=>b.addEventListener('click',()=>updateScope(b.dataset.scope)));
  updateScope('owned');
  // Budget planner — the slider is an exploration tool, not a purchase transaction.
  const wishlistTotal=wishlist.reduce((s,x)=>s+Number(x.price||0),0);
  function updateBudget(){
    const amount=Number(el('budgetRange').value),remaining=Math.max(0,wishlistTotal-amount);
    const ratio=wishlistTotal?Math.min(100,amount/wishlistTotal*100):100;
    el('budgetValue').textContent=SV.money(amount);
    el('budgetFill').style.width=ratio+'%';
    const affordable=[...wishlist].sort((a,b)=>a.price-b.price);
    let spending=0,bottles=0;affordable.forEach(p=>{if(spending+Number(p.price)<=amount){spending+=Number(p.price);bottles++;}});
    el('budgetSummary').innerHTML=`<div><span>Wishlist estimate</span><strong>${SV.money(wishlistTotal)}</strong></div><div><span>${remaining?'Still needed':'Budget status'}</span><strong>${remaining?SV.money(remaining):'Covered'}</strong></div><div><span>Potential bottles within budget</span><strong>${bottles} of ${wishlist.length}</strong></div>`;
  }
  el('budgetRange').addEventListener('input',updateBudget);updateBudget();
  // Collection progress against the fixed catalogue (unique fragrances and brand houses).
  const uniqueOwned=new Set(collection.map(x=>x.id)).size;
  const ownedBrands=new Set(collection.map(x=>x.brand)).size;
  const percentages=[[uniqueOwned,ScentVaultData.catalogue.length],[ownedBrands,ScentVaultData.brands.length]];
  el('coverageMetrics').innerHTML=percentages.map(([part,whole],i)=>`<div class="coverage-row"><div><span>${i?'Brand coverage':'Fragrance coverage'}</span><strong>${part} / ${whole} <small>${(part/whole*100).toFixed(1)}%</small></strong></div><div class="coverage-track"><span style="width:${part/whole*100}%"></span></div></div>`).join('');

})();
