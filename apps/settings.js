/* Settings app - includes delete all data button */
Apps.settings = {
  open(){
    this.win = OS.createWindow({id:'settings', title:'Settings', width:420, height:320, top:220, left:220});
    this.win.style.display='block'; OS.bringToFront(this.win); OS.addTask('settings','Settings');
    this.body = document.getElementById('body-settings');
    this.render();
  },

  close(){ this.win.style.display='none'; OS.removeTask('settings'); },

  render(){
    const theme = localStorage.getItem('xilix_theme') || 'classic';
    this.body.innerHTML = `
      <div>
        <div><label>Desktop color: <input id="desktop-color" type="color" value="${this.getDesktopColor()}"></label></div>
        <div style="margin-top:8px;"><label><input type="checkbox" id="show-clock" ${localStorage.getItem('xilix_show_clock')!=='false'?'checked':''}> Show clock</label></div>
        <hr/>
        <div><button onclick="Apps.settings.resetData()" style="color:white; background:#900; border:1px solid #000; padding:6px;">Delete ALL data (permanent)</button></div>
        <div style="margin-top:8px;"><button onclick="Apps.settings.clearStorage()">Clear app caches (non-destructive)</button></div>
      </div>
    `;
    // handlers
    document.getElementById('desktop-color').addEventListener('change', (e)=>{ document.body.style.background = e.target.value; localStorage.setItem('xilix_desktop_color', e.target.value); });
    document.getElementById('show-clock').addEventListener('change', (e)=>{ localStorage.setItem('xilix_show_clock', e.target.checked); document.getElementById('taskbar-clock').style.display = e.target.checked ? 'block' : 'none'; });
  },

  getDesktopColor(){
    return localStorage.getItem('xilix_desktop_color') || '#008080';
  },

  clearStorage(){
    if(!confirm('Clear app local data (files, notes, trash)?')) return;
    localStorage.removeItem('xilix_files'); localStorage.removeItem('xilix_trash'); localStorage.removeItem('xilix_notes');
    alert('App data cleared');
    location.reload();
  },

  resetData(){
    // destructive: wipe everything used by XiliX (keeps browser cookies etc)
    if(!confirm('DELETE ALL XILIX DATA? This will permanently remove files, notes, settings, trash.')) return;
    // remove keys we use (safer than full clear)
    const keys = [];
    for(let i=0;i<localStorage.length;i++) keys.push(localStorage.key(i));
    keys.forEach(k=>{
      if(k && k.startsWith('xilix_')) localStorage.removeItem(k);
    });
    // also clear common keys used above
    localStorage.removeItem('xilix_desktop_color'); localStorage.removeItem('xilix_show_clock');
    alert('All XiliX data deleted. Reloading...');
    location.reload();
  }
};
