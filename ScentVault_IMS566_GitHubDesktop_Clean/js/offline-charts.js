/* ScentVault offline chart fallback.
   When the Chart.js CDN is unavailable, render real data using the Canvas 2D API.
   When Chart.js loads successfully this file does nothing. This file is not Chart.js. */
if (!window.Chart) {
  window.Chart = class ScentVaultOfflineChart {
    constructor(canvas, config) {
      this.canvas = canvas;
      this.config = config;
      this.draw = this.draw.bind(this);
      this.draw();
      window.addEventListener('resize', this.draw, {passive:true});
    }
    destroy() {window.removeEventListener('resize',this.draw);}
    draw() {
      const {canvas, config} = this;
      if (!canvas || !canvas.parentElement) return;
      const box = canvas.parentElement.getBoundingClientRect();
      const w = Math.max(240, Math.floor(box.width));
      const h = Math.max(180, Math.floor(box.height));
      const scale = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * scale; canvas.height = h * scale;
      canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
      const c = canvas.getContext('2d');
      c.setTransform(scale, 0, 0, scale, 0, 0); c.clearRect(0,0,w,h);
      const labels = config.data.labels.map(x=>String(x));
      const values = config.data.datasets[0].data.map(x=>Number(x)||0);
      const type = config.type;
      const palette = ['#ad8550','#2d2a26','#dfbc7c','#81766a','#c9ae82','#54504a','#e9d8b6','#999086'];
      const color = i=>palette[i%palette.length];
      const font = '12px Arial, sans-serif';
      c.textBaseline='middle'; c.font=font;
      if(type==='doughnut') {
        const radius = Math.min((h-65)/2, w/4, 115);
        const cx = w/2, cy = (h-50)/2;
        const total = values.reduce((a,b)=>a+b,0);
        let start = -Math.PI/2;
        values.forEach((v,i)=>{
          if(!v||!total)return;
          const sweep = 2*Math.PI*v/total;
          c.beginPath();c.arc(cx,cy,radius,start,start+sweep);c.arc(cx,cy,radius*.68,start+sweep,start,true);c.closePath();c.fillStyle=color(i);c.fill();start+=sweep;
        });
        c.textAlign='center';c.fillStyle='#2c2925';c.font='bold 23px Arial';c.fillText(String(total),cx,cy-4);
        c.font='10px Arial';c.fillStyle='#867967';c.fillText('FRAGRANCES',cx,cy+17);
        // Compact wrapping legend beneath the chart.
        const count=labels.length, rows=Math.ceil(count/3), cell=w/3;
        labels.forEach((name,i)=>{
          const row=Math.floor(i/3), col=i%3;
          c.fillStyle=color(i);c.fillRect(col*cell+7,h-rows*16+row*16-2,7,7);
          c.fillStyle='#514b44';c.font='10px Arial';c.textAlign='left';
          c.fillText((name.length>16?name.slice(0,15)+'…':name)+' '+values[i],col*cell+18,h-rows*16+row*16+2);
        });
      } else if (type==='bar') {
        const horizontal = config.options && config.options.indexAxis==='y';
        const max = Math.max(...values,1);
        const line='#e5dfd4';
        if(horizontal) {
          const left=Math.min(150,w*.42), right=22, top=10, rowH=(h-top-10)/Math.max(1,labels.length);
          values.forEach((v,i)=>{
            const y=top+i*rowH;
            c.font='10px Arial';c.textAlign='right';c.fillStyle='#62594c';c.fillText(labels[i].slice(0,18),left-10,y+rowH*.48);
            c.fillStyle='#f0eadf';c.fillRect(left,y+rowH*.22,w-left-right,rowH*.52);
            c.fillStyle=color(i);c.fillRect(left,y+rowH*.22,(w-left-right)*v/max,rowH*.52);
            c.font='bold 10px Arial';c.textAlign='left';c.fillStyle='#514435';c.fillText(String(v),Math.min(w-16,left+(w-left-right)*v/max+3),y+rowH*.48);
          });
        } else {
          const left=35,right=12,top=12,bottom=58;
          const plotW=w-left-right,plotH=h-top-bottom;
          c.strokeStyle=line;c.lineWidth=1;
          for(let i=0;i<=4;i++){const y=top+plotH*i/4;c.beginPath();c.moveTo(left,y);c.lineTo(w-right,y);c.stroke();}
          const step=plotW/Math.max(1,values.length),barW=Math.min(54,step*.62);
          values.forEach((v,i)=>{
            const x=left+step*(i+.5),barH=plotH*v/max;
            c.fillStyle=color(i);c.fillRect(x-barW/2,top+plotH-barH,barW,barH);
            c.font='bold 11px Arial';c.textAlign='center';c.fillStyle='#625039';c.fillText(String(v),x,top+plotH-barH-8);
            c.font='10px Arial';c.fillStyle='#665d52';
            let name=labels[i];if(name.length>12)name=name.slice(0,11)+'…';
            c.save();c.translate(x,h-bottom+13);c.rotate(-Math.PI/5);c.textAlign='right';c.fillText(name,0,0);c.restore();
          });
        }
      } else if(type==='line') {
        const left=36,right=20,top=16,bottom=48;
        const plotW=w-left-right,plotH=h-top-bottom,max=Math.max(...values,1);
        c.strokeStyle='#e5dfd4';c.lineWidth=1;
        for(let i=0;i<=4;i++){let y=top+plotH*i/4;c.beginPath();c.moveTo(left,y);c.lineTo(w-right,y);c.stroke();}
        c.beginPath();c.strokeStyle='#b58a47';c.lineWidth=3;
        values.forEach((v,i)=>{const x=left+plotW*(values.length===1?.5:i/(values.length-1)),y=top+plotH*(1-v/max);if(!i)c.moveTo(x,y);else c.lineTo(x,y);});c.stroke();
        values.forEach((v,i)=>{const x=left+plotW*(values.length===1?.5:i/(values.length-1)),y=top+plotH*(1-v/max);c.beginPath();c.arc(x,y,3.5,0,2*Math.PI);c.fillStyle='#b58a47';c.fill();
          if(i%Math.max(1,Math.ceil(values.length/5))===0){c.fillStyle='#6c6255';c.font='10px Arial';c.textAlign='center';c.fillText(labels[i],x,h-24);}
        });
      }
    }
  };
}
