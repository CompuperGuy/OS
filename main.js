/* main.js - XiliX OS core */
const OS = {
  zIndex: 10,
  init() {
    // Boot simulation
    const bar = document.getElementById('boot-bar');
    let p = 0;
    const iv = setInterval(()=>{
      p += Math.floor(Math.random()*12)+6; if(p>100) p=100;
      bar.style.width = p+'%';
      if(p>=100){ clearInterval(iv); setTimeout(()=>this.finishBoot(), 300); }
    }, 180);

    // skip on any key or click
    document.addEventListener('keydown', ()=>{ this.finishBoot(); });
    document.addEventListener('click', ()=>{ this.finishBoot(); }, {once:true});
  },

  finishBoot(){
    const boot = document.getElementById('boot');
    if(!boot || boot._done) return;
    boot._done = true;
    boot.style.display='none';
    document.getElementById('desktop').style.display='block';
    this.startClock();
  },

  // window & taskbar
  openApp(id){ const app = window.Apps && Apps[id]; if(!app) return alert('App missing: '+id); app.open(); },
  closeApp(id){ const app = window.Apps && Apps[id]; if(app) app.close(); },

  bringToFront(el){ el.style.zIndex = ++this.zIndex; },

  addTask(appId, label){
    if(document.getElementById('tb-'+appId)) return;
    const tb = document.createElement('div'); tb.id = 'tb-'+appId; tb.className='taskbar-app';
    tb.textContent = label; tb.onclick = ()=>{ this.openApp(appId); };
    document.querySelector('.taskbar-apps').appendChild(tb);
  },

  removeTask(appId){ const el = document.getElementById('tb-'+appId); if(el) el.remove(); },

  toggleStart(){ const sm = document.getElementById('start-menu'); sm.style.display = (sm.style.display==='flex'?'none':'flex'); },

  startClock(){
    const el = document.getElementById('taskbar-clock');
    if(!el) return;
    const update = ()=>{ const d=new Date(); el.textContent = d.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'}); };
    update(); setInterval(update,60000);
  },

  // create a generic resizable+draggable window helper used by apps
  createWindow({id, title, width=360, height=240, top=120, left=120}){
    // if exists reuse
    if(document.getElementById('win-'+id)) return document.getElementById('win-'+id);

    const win = document.createElement('div'); win.className='window'; win.id='win-'+id;
    win.style.width = width+'px'; win.style.height = height+'px'; win.style.left = left+'px'; win.style.top = top+'px';
    win.innerHTML = `
      <div class="title-bar">
        <div class="title-bar-text">${title}</div>
        <div class="title-bar-controls">
          <button aria-label="Close" onclick="Apps.${id}.close()"></button>
        </div>
      </div>
      <div class="window-body" id="body-${id}"></div>
      <div class="win-resizer" id="res-${id}"></div>
    `;
    document.body.appendChild(win);

    // drag
    const tb = win.querySelector('.title-bar');
    tb.addEventListener('mousedown', (e)=>{
      let ox = e.clientX - win.offsetLeft, oy = e.clientY - win.offsetTop;
      const move = (ev)=>{ win.style.left = (ev.clientX-ox)+'px'; win.style.top = (ev.clientY-oy)+'px'; OS.bringToFront(win); };
      document.addEventListener('mousemove', move);
      document.addEventListener('mouseup', ()=>{ document.removeEventListener('mousemove', move); }, {once:true});
    });

    // resize
    const r = document.getElementById('res-'+id);
    (r).addEventListener('mousedown', (e)=>{
      e.stopPropagation();
      let w0 = win.offsetWidth, h0 = win.offsetHeight, sx = e.clientX, sy = e.clientY;
      const drag = (ev)=>{ win.style.width = Math.max(220, w0 + (ev.clientX - sx)) + 'px'; win.style.height = Math.max(120, h0 + (ev.clientY - sy)) + 'px'; };
      document.addEventListener('mousemove', drag);
      document.addEventListener('mouseup', ()=>{ document.removeEventListener('mousemove', drag); }, {once:true});
    });

    // focus on click
    win.addEventListener('mousedown', ()=> OS.bringToFront(win));

    return win;
  },

  // utility to wipe all data
  deleteAllData(){ localStorage.clear(); location.reload(); }
};

window.addEventListener('load', ()=>OS.init());
