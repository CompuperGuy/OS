/* Explorer app */
window.Apps = window.Apps || {};
Apps.explorer = {
  open(){
    this.win = OS.createWindow({id:'explorer', title:'File Explorer', width:420, height:300, top:100, left:100});
    this.win.style.display='block';
    OS.bringToFront(this.win);
    OS.addTask('explorer','Explorer');
    this.body = document.getElementById('body-explorer');
    this.render();
  },

  close(){ this.win.style.display='none'; OS.removeTask('explorer'); },

  render(){
    const files = JSON.parse(localStorage.getItem('xilix_files')||'[]');
    this.body.innerHTML = '';
    const hdr = document.createElement('div'); hdr.innerHTML = `<button onclick="Apps.explorer.createFile()">New File</button> <button onclick="Apps.explorer.importSample()">Import Sample</button>`;
    this.body.appendChild(hdr);
    const ul = document.createElement('ul');
    files.forEach((f,i)=>{
      const li = document.createElement('li'); li.className='small';
      li.textContent = f.name;
      li.onclick = ()=> this.editFile(i);
      li.oncontextmenu = (ev)=>{ ev.preventDefault(); this.deleteFile(i); };
      ul.appendChild(li);
    });
    this.body.appendChild(ul);
  },

  createFile(){
    const name = prompt('File name:');
    if(!name) return;
    const files = JSON.parse(localStorage.getItem('xilix_files')||'[]');
    files.push({name, content:''});
    localStorage.setItem('xilix_files', JSON.stringify(files));
    this.render();
  },

  editFile(i){
    const files = JSON.parse(localStorage.getItem('xilix_files')||'[]');
    const content = prompt('Edit content:', files[i].content||'');
    if(content===null) return;
    files[i].content = content;
    localStorage.setItem('xilix_files', JSON.stringify(files));
    this.render();
  },

  deleteFile(i){
    const files = JSON.parse(localStorage.getItem('xilix_files')||'[]');
    const trash = JSON.parse(localStorage.getItem('xilix_trash')||'[]');
    trash.push(files[i]);
    files.splice(i,1);
    localStorage.setItem('xilix_files', JSON.stringify(files));
    localStorage.setItem('xilix_trash', JSON.stringify(trash));
    this.render();
  },

  importSample(){
    const files = JSON.parse(localStorage.getItem('xilix_files')||'[]');
    files.push({name:'readme.txt', content:'Welcome to XiliX OS!'});
    localStorage.setItem('xilix_files', JSON.stringify(files));
    this.render();
  }
};
