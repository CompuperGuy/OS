/* Settings app */
Apps.settings = {
  open(){
    this.id='settings';
    this.win = OS.createWindow({id:this.id,title:'Settings',width:420,height:320,top:220,left:220});
    this.win.style.display='block'; OS.bringToFront(this.win); OS.addTask(this.id,'Settings');
    this.body = document.getElementById('body-'+this.id);
    this.render();
  },

  close(){ this.win.style.display='none'; OS.removeTask(this.id); },

  render(){
    const desktopColor = localStorage.getItem('xilix_desktop_color') || '#008080';
    const showClock = localStorage.getItem('xilix_show_clock') !== 'false';
    this.body.innerHTML = `
      <div>
        <div><label>Desktop color: <input id="desktop-color" type="color" value="${desktopColor}"></label></div>
        <div style="margin-top:8px;"><label><input id="show-clock" type="checkbox" ${showClock?'checked':''}> Show clock</label></div>
        <hr/>
        <div style="margin-top:8px;"><button id="delete-all" style="background:#900;color:#fff;padding:6px;border:1px solid #000;">Delete ALL XiliX Data</button></div>
        <div style="margin-top:8px;"><button onclick="Apps.settings.clearAppData()">Clear app data (files, notes, trash)</button></div>
      </div>
    `;
    document.getElementById('desktop-color').addEventListener('input', (e)=>{ document.body.style.background = e.target.value; localStorage.setItem('xilix_desktop_color', e.target.value); });
    document.getElementById('show-clock').addEventListener('change', (e)=>{ localStorage.setItem('xilix_show_clock', e.target.checked); /* can hide clock UI if implemented */ });
    document.getElementById('delete-all').addEventListener('click', ()=> this.deleteAll());
  },

  clearAppData(){
    if(!confirm('Clear files, notes and trash?')) return;
    localStorage.removeItem('xilix_files');
    localStorage.removeItem('xilix_trash');
    localStorage.removeItem('xilix_notes');
    alert('App data cleared'); location.reload();
  },

  deleteAll(){
    if(!confirm('DELETE ALL XILIX DATA? This is permanent.')) return;
    // delete only keys used by XiliX
    const keys = [];
    for(let i=0;i<localStorage.length;i++) keys.push(localStorage.key(i));
    keys.forEach(k => { if(k && k.startsWith('xilix')) localStorage.removeItem(k); });
    localStorage.removeItem('xilix_desktop_color'); localStorage.removeItem('xilix_show_clock');
    alert('All XiliX data removed'); location.reload();
  }
};
