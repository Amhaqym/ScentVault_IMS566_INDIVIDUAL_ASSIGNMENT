/* ScentVault 1.4 | Honest front-end contact workflow.
   Form validates and prepares a message to copy; no backend/email is faked. */
(() => {
  const el=id=>document.getElementById(id),form=el('contactForm');
  const message=el('contactMessage'),counter=el('messageCount'),result=el('contactResult');
  let prepared='';
  message.addEventListener('input',()=>{counter.textContent=`${message.value.length} / 1500 characters`;result.classList.add('d-none');});
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const name=el('contactName').value.trim(),email=el('contactEmail').value.trim();
    const body=message.value.trim(),topic=el('contactTopic').value;
    const error=el('contactError');
    if(name.length<2||!el('contactEmail').validity.valid||body.length<10){
      error.textContent='Please enter your name, a valid email address and a message of at least 10 characters.';
      error.classList.remove('d-none');return;
    }
    error.classList.add('d-none');
    prepared=`Subject: ScentVault — ${topic}\nFrom: ${name} <${email}>\n\n${body}`;
    el('messagePreview').textContent=prepared;
    result.classList.remove('d-none');result.scrollIntoView({behavior:'smooth',block:'nearest'});
    SV.notice('Your message has been prepared. Copy it when ready.');
  });
  el('copyPrepared').addEventListener('click',async()=>{
    if(!prepared)return;
    try{
      if(navigator.clipboard && window.isSecureContext)await navigator.clipboard.writeText(prepared);
      else{
        const box=el('messagePreview');const range=document.createRange();range.selectNodeContents(box);const select=window.getSelection();select.removeAllRanges();select.addRange(range);
        if(!document.execCommand('copy'))throw Error('Clipboard unavailable');select.removeAllRanges();
      }
      SV.notice('Message copied to clipboard. Paste it into your email app.');
    }catch{SV.notice('Select the prepared message text and copy it manually (Ctrl+C).');}
  });
  form.addEventListener('reset',()=>{prepared='';result.classList.add('d-none');el('contactError').classList.add('d-none');counter.textContent='0 / 1500 characters';});
})();
