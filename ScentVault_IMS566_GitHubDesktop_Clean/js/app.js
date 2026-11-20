/* ScentVault — shared navigation and presentation utilities.
   Submenus are accessible by hover, click/tap, and keyboard.
   All collection data remains hardcoded with no browser storage. */
window.SV = (() => {
  const user = Object.freeze({email:'demo@scentvault.com',displayName:'Collector'});
  const current = location.pathname.split('/').pop() || 'dashboard.html';
  const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const money = value => 'RM ' + Number(value || 0).toLocaleString('en-MY',{minimumFractionDigits:0,maximumFractionDigits:2});
  const currentSection = () => (location.hash.slice(1) || '').toLowerCase();
  const directLink = (href,label) => {
    const active=current===href;
    return `<a class="side-link ${active?'active':''}" href="${href}" ${active?'aria-current="page"':''}><span>${label}</span></a>`;
  };

  // Group data is the single source of truth for desktop + mobile navigation.
  // The parent is a whole-row button; a separate arrow button is intentionally absent.
  const groups=[
    {id:'collection',label:'My Collection',page:'collection.html',items:[
      ['owned','Owned','collection.html#owned'],
      ['wishlist','Wishlist','collection.html#wishlist'],
      ['catalogue','Full Catalogue','collection.html#catalogue']
    ]},
    {id:'brands',label:'Brand Directory',page:'brands.html',items:[
      ['all','All Brands','brands.html'],
      ['Arabian','Arabian Brands','brands.html?region=Arabian#brandResults'],
      ['Malaysian','Malaysian Brands','brands.html?region=Malaysian#brandResults'],
      ['Indonesian','Indonesian Brands','brands.html?region=Indonesian#brandResults'],
      ['International','International Designer','brands.html?region=International#brandResults']
    ]},
    {id:'analytics',label:'Analytics',page:'analytics.html',items:[
      ['overview','Overview','analytics.html#overview'],
      ['fragrance-insights','Fragrance Insights','analytics.html#fragrance-insights'],
      ['financial-insights','Financial Insights','analytics.html#financial-insights'],
      ['catalogue-insights','Catalogue Insights','analytics.html#catalogue-insights']
    ]}
  ];
  const renderGroup=({id,label,page,items})=>{
    const selected=current===page;
    return `<div class="side-group ${selected?'group-active':''}" id="${id}Group">
      <button type="button" class="side-link side-parent ${selected?'active':''}" id="${id}Toggle"
        aria-expanded="${selected}" aria-controls="${id}Submenu" aria-label="${label}, ${selected?'collapse':'expand'} menu">
        <span>${label}</span>
      </button>
      <div class="side-submenu" id="${id}Submenu" ${selected?'':'hidden'}>
        ${items.map(([key,text,href])=>`<a href="${href}" data-menu-key="${escapeHTML(key)}"><span>${escapeHTML(text)}</span></a>`).join('')}
      </div>
    </div>`;
  };

  const header=document.getElementById('siteHeader');
  if(header){
    header.innerHTML=`
      <a href="#main-content" class="skip-link">Skip to main content</a>
      <div class="mobile-topbar"><a class="brand" href="dashboard.html">SCENT<span>VAULT</span><i>.</i></a><button type="button" class="menu-toggle" id="navToggle" aria-controls="sidebar" aria-expanded="false" aria-label="Open navigation">☰ <span>Menu</span></button></div>
      <div class="sidebar-backdrop" id="sidebarBackdrop" hidden></div>
      <aside class="site-sidebar" id="sidebar" aria-label="Site navigation">
        <div><a class="brand sidebar-brand" href="dashboard.html">SCENT<span>VAULT</span><i>.</i></a><div class="sidebar-divider"></div>
          <div class="side-kicker">YOUR LIBRARY</div>
          <nav class="side-navigation" aria-label="Main navigation">
            ${directLink('dashboard.html','Dashboard')}
            ${groups.map(renderGroup).join('')}
            <span class="side-kicker extra-nav-title">EXPLORE</span>
            ${directLink('about.html','About ScentVault')}
            ${directLink('contact.html','Contact Us')}
          </nav>
        </div>
        <div class="sidebar-bottom"><div class="side-monogram" aria-hidden="true">S</div><div class="sidebar-profile"><strong>Private collection</strong><small>Curated fragrance archive</small></div><button type="button" class="sidebar-signout" id="signOutBtn" aria-label="Sign out and return to login">Sign Out <span aria-hidden="true">↗</span></button></div>
      </aside>`;

    document.getElementById('signOutBtn').addEventListener('click', () => {
      // The website uses a fixed demonstration login without persistent sessions.
      // Navigation resets in-memory edits on the next page load.
      window.location.replace('index.html');
    });
    const sidebar=document.getElementById('sidebar');
    const backdrop=document.getElementById('sidebarBackdrop');
    const toggle=document.getElementById('navToggle');
    const desktopHover=()=>window.matchMedia('(hover: hover) and (min-width: 992px)').matches;
    const nodes=groups.map(item=>({
      ...item,container:document.getElementById(item.id+'Group'),
      button:document.getElementById(item.id+'Toggle'),
      submenu:document.getElementById(item.id+'Submenu')
    }));
    function setGroup(item,open){
      item.submenu.hidden=!open;
      item.container.classList.toggle('expanded',open);
      item.button.setAttribute('aria-expanded',String(open));
      item.button.setAttribute('aria-label',`${item.label}, ${open?'collapse':'expand'} menu`);
    }
    function closeOtherGroups(except){nodes.filter(item=>item!==except).forEach(item=>{item.pinned=false;setGroup(item,false);});}

    // Only one expanded group at a time. Click works on touch and with Enter/Space.
    nodes.forEach(item=>{
      setGroup(item,current===item.page);
      item.pinned=false;
      item.button.addEventListener('click',()=>{
        // Hover may already have revealed it: first click pins it open instead
        // of unexpectedly collapsing the menu under the pointer.
        if(desktopHover()){
          item.pinned=!item.pinned;
          if(item.pinned)closeOtherGroups(item);
          setGroup(item,item.pinned);
        }else{
          const opening=item.submenu.hidden;
          if(opening)closeOtherGroups(item);
          setGroup(item,opening);
        }
      });
      item.container.addEventListener('mouseenter',()=>{
        if(!desktopHover())return;
        closeOtherGroups(item);setGroup(item,true);
      });
      item.container.addEventListener('mouseleave',()=>{
        if(desktopHover() && !item.pinned && current!==item.page)setGroup(item,false);
      });
      item.container.addEventListener('focusin',()=>{
        if(desktopHover()){closeOtherGroups(item);setGroup(item,true);}
      });
      item.container.addEventListener('focusout',event=>{
        if(desktopHover() && !item.pinned && !item.container.contains(event.relatedTarget) && current!==item.page)setGroup(item,false);
      });
    });
    function highlightSubmenu(){
      nodes.forEach(item=>{
        const isPage=current===item.page;
        const params=new URLSearchParams(location.search);
        const key=item.id==='collection'?(currentSection()||'owned'):
          item.id==='brands'?(params.get('region')||'all'):
          (currentSection()||'overview');
        item.submenu.querySelectorAll('[data-menu-key]').forEach(a=>{
          const active=isPage&&a.dataset.menuKey.toLowerCase()===key.toLowerCase();
          a.classList.toggle('sub-active',active);
          if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');
        });
      });
    }
    highlightSubmenu();
    window.addEventListener('hashchange',highlightSubmenu);

    function setOpen(open,restoreFocus=true){
      sidebar.classList.toggle('open',open);
      backdrop.hidden=!open;
      toggle.setAttribute('aria-expanded',String(open));
      toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');
      if(open){sidebar.querySelector('.side-link').focus();}
      else if(restoreFocus)toggle.focus();
    }
    toggle.addEventListener('click',()=>setOpen(!sidebar.classList.contains('open')));
    backdrop.addEventListener('click',()=>setOpen(false));
    document.addEventListener('keydown',e=>{
      if(e.key==='Escape'){
        if(sidebar.classList.contains('open'))setOpen(false);
        else {nodes.forEach(item=>setGroup(item,false));}
      }
    });
    sidebar.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
      if(sidebar.classList.contains('open'))setOpen(false,false);
    }));
  }

  // Single local photo component shared by catalogue, collection, details and dashboard.
  // Until a real product photo exists on disk, show a quiet text-only placeholder.
  function photo(perfume, size='card') {
    const name=escapeHTML(perfume?.name||'Unknown fragrance');
    const brand=escapeHTML(perfume?.brand||'SCENTVAULT');
    const src=escapeHTML(perfume?.image||'');
    const label=escapeHTML((perfume?.name||'Fragrance')+' — '+(perfume?.brand||''));
    return `<span class="sv-photo sv-photo--${escapeHTML(size)}" data-photo-slot>
      <span class="sv-photo__fallback" aria-hidden="true"><span>SCENTVAULT</span><strong>${brand}</strong><small>${name}</small></span>
      ${src?`<img class="sv-photo__image" data-fragrance-image src="${src}" alt="${label} perfume bottle" loading="lazy" decoding="async">`:''}
    </span>`;
  }
  // Listen in the capture phase because load/error don't bubble from images.
  document.addEventListener('load',event=>{
    if(event.target.matches?.('[data-fragrance-image]')) event.target.closest('[data-photo-slot]')?.classList.add('has-image');
  },true);
  document.addEventListener('error',event=>{
    if(event.target.matches?.('[data-fragrance-image]')) event.target.closest('[data-photo-slot]')?.classList.remove('has-image');
  },true);

  const footer=document.getElementById('siteFooter');
  if(footer)footer.innerHTML=`<footer class="sv-footer"><span>© 2026 ScentVault · A fragrance archive</span><span>COLLECT WITH INTENTION.</span><span><a href="about.html">About</a> &nbsp;·&nbsp; <a href="contact.html">Contact</a></span></footer>`;
  function notice(message){
    let node=document.getElementById('svNotice');
    if(!node){node=document.createElement('div');node.id='svNotice';node.className='sv-notice';node.setAttribute('role','status');node.setAttribute('aria-live','polite');document.body.append(node);}
    node.textContent=message;node.classList.add('shown');
    clearTimeout(notice.timeout);notice.timeout=setTimeout(()=>node.classList.remove('shown'),3700);
  }
  return {user,escapeHTML,money,notice,photo,records:()=>ScentVaultData.read()};
})();
