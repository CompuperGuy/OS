/* Simple Browser app - uses DuckDuckGo in iframe (works on GitHub Pages) */
Apps.browser = {
  open(){
    this.win = OS.createWindow({id:'browser', title:'Internet', width:700, height:460, top:160, left:160});
    this.win.style.display='block'; OS.bringToFront(this.win); OS.addTask('browser','Internet');
    this.body = document.getElementById('body-browser');
    this.render();
  },

  close(){ this.win.style.display='none'; OS.removeTask('browser'); },

  render(){
    this.body.innerHTML = `<div style="display:flex; gap:6px; margin-bottom:6px;">
        <input id="browser-q" type="text" placeholder="Search the web or type url" style="flex:1;">
        <button onclick="Apps.browser.go()">Go</button>
        <button onclick="Apps.browser.openNew()">New Tab</button>
      </div>
      <iframe id="browser-frame" src="https://duckduckgo.com" style="width:100%; height:calc(100% - 46px); border:2px inset #fff;" sandbox="allow-same-origin allow-scripts allow-forms allow-popups"></iframe>`;
    const q = document.getElementById('browser-q');
    q.addEventListener('keydown', (e)=>{ if(e.key==='Enter') Apps.browser.go(); });
  },

  go(){
    const q = document.getElementById('browser-q').value.trim();
    if(!q) return;
    const isUrl = q.includes('.') && !q.includes(' ');
    const url = isUrl ? (q.startsWith('http')?q:'https://'+q) : 'https://duckduckgo.com/?q=' + encodeURIComponent(q);
    document.getElementById('browser-frame').src = url;
  },

  openNew(){ window.open('https://duckduckgo.com','_blank'); }
};

