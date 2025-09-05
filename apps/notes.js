/* Notes app */
Apps.notes = {
  open(){
    this.id='notes';
    this.win = OS.createWindow({id:this.id,title:'Notes',width:420,height:340,top:160,left:160});
    this.win.style.display='block'; OS.bringToFront(this.win); OS.addTask(this.id,'Notes');
    this.body = document.getElementById('body-'+this.id);
    this.render();
  },

  close(){ this.win.style.display='none'; OS.removeTask(this.id); },

  render(){
    const val = localStorage.getItem('xilix_notes') || '';
    this.body.innerHTML = `<textarea id="notes-area" rows="14" style="width:100%;">${val}</textarea>
      <div style="margin-top:8px;"><button onclick="Apps.notes.save()">Save</button> <button onclick="Apps.notes.clear()">Clear</button></div>`;
  },

  save(){
    const v = document.getElementById('notes-area').value;
    localStorage.setItem('xilix_notes', v);
    alert('Notes saved');
  },

  clear(){
    if(confirm('Clear notes?')){ localStorage.removeItem('xilix_notes'); this.render(); }
  }
};
