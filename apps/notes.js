/* Notes app */
Apps.notes = {
  open(){
    this.win = OS.createWindow({id:'notes', title:'Notes', width:380, height:300, top:140, left:140});
    this.win.style.display='block';
    OS.bringToFront(this.win); OS.addTask('notes','Notes');
    this.body = document.getElementById('body-notes');
    this.render();
  },

  close(){ this.win.style.display='none'; OS.removeTask('notes'); },

  render(){
    const val = localStorage.getItem('xilix_notes') || '';
    this.body.innerHTML = `<textarea id="notes-area" rows="12" style="width:100%;">${escapeHtml(val)}</textarea>
      <div style="margin-top:6px;"><button onclick="Apps.notes.save()">Save</button> <button onclick="Apps.notes.clear()">Clear</button></div>`;
  },

  save(){
    const v = document.getElementById('notes-area').value;
    localStorage.setItem('xilix_notes', v);
    alert('Notes saved');
  },

  clear(){ if(confirm('Clear notes?')){ localStorage.removeItem('xilix_notes'); this.render(); } }
};

/* small helper */
function escapeHtml(s){ return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
