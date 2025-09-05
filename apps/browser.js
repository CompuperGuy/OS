/* Browser app - iframe based */
Apps.browser = {
  open(){
    this.id='browser';
    this.win = OS.createWindow({id:this.id,title:'Internet',width:760,height:480,top:120,left:120});
    this.win.style.display='block'; OS.bringToFront(this.win); OS.addTask(this.id,'Internet');
    this.body = document.getElementById('body-'+this.id);
    this.render();
  },

  close(){ this.win.style.display='none'; OS.removeTask(this.id); },

  render(){
    this.body.innerHTML = `
      <div style="display:flex;gap:6px;margin-bottom:6px;">
        <input id="browser-q" type="text" placeholder="Search or URL" style="flex:1;">
        <button onclick="Apps.browser.go()">Go</button>
        <button onclick="Apps.browser.newTab()">New Tab</button>
      </div>
      <iframe id="browser-frame" src="https://duckduckgo.com" style="width:100%;height:calc(100% - 46px);border:2px inset #fff;" sandbox="allow-same-origin allow-scripts allow-forms allow-popups"></iframe>
    `;
    document.getElementById('browser-q').addEventListener('keydown', (e)=>{ if(e.key==='Enter') Apps.browser.go(); });
  },

  go(){
    const q = document.getElementById('browser-q').value.trim();
    if(!q) return;
    // if contains space -> search; if contains dot -> url
    const isUrl = q.includes('.') && !q.includes(' ');
    const url = isUrl ? (q.startsWith('http')? q : 'https://'+q) : 'https://duckduckgo.com/?q=' + encodeURIComponent(q);
    document.getElementById('browser-frame').src = url;
  },

  newTab(){ window.open('https://duckduckgo.com','_blank'); }
};
