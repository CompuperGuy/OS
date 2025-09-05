/* Trash app */
Apps.trash = {
  open(){
    this.win = OS.createWindow({id:'trash', title:'Trash', width:360, height:260, top:200, left:200});
    this.win.style.display='block'; OS.bringToFront(this.win); OS.addTask('trash','Trash');
    this.body = document.getElementById('body-trash');
    this.render();
  },

  close(){ this.win.style.display='none'; OS.removeTask('trash'); },

  render(){
    const trash = JSON.parse(localStorage.getItem('xilix_trash')||'[]');
    this.body.innerHTML = `<div><button onclick="Apps.trash.empty()">Empty Trash</button></div>`;
    const ul = document.createElement('ul');
    trash.forEach((f,i)=>{
      const li = document.createElement('li'); li.textContent = f.name; li.className='small';
      li.onclick = ()=>{ this.restore(i); };
      li.oncontextmenu = (ev)=>{ ev.preventDefault(); if(confirm('Delete permanently?')){ trash.splice(i,1); localStorage.setItem('xilix_trash', JSON.stringify(trash)); this.render(); } };
      ul.appendChild(li);
    });
    this.body.appendChild(ul);
  },

  restore(i){
    const trash = JSON.parse(localStorage.getItem('xilix_trash')||'[]');
    const files = JSON.parse(localStorage.getItem('xilix_files')||'[]');
    files.push(trash[i]);
    trash.splice(i,1);
    localStorage.setItem('xilix_files', JSON.stringify(files));
    localStorage.setItem('xilix_trash', JSON.stringify(trash));
    this.render();
  },

  empty(){ if(confirm('Empty trash permanently?')){ localStorage.setItem('xilix_trash', JSON.stringify([])); this.render(); } }
};
