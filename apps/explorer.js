/* Explorer app */
window.Apps = window.Apps || {};
Apps.explorer = {
  open(){
    this.id = 'explorer';
    this.win = OS.createWindow({id:this.id,title:'File Explorer',width:520,height:360,top:120,left:120});
    this.win.style.display='block';
    OS.bringToFront(this.win);
    OS.addTask(this.id,'Explorer');
    this.body = document.getElementById('body-'+this.id);
    this.render();
  },

  close(){ this.win.style.display='none'; OS.removeTask(this.id); },

  render(){
    const files = FileSystem.listFiles();
    this.body.innerHTML = '';
    const controls = document.createElement('div');
    controls.innerHTML = `<button onclick="Apps.explorer.newFile()">New File</button>
                          <button onclick="Apps.explorer.importSample()">Import Sample</button>
                          <button onclick="Apps.explorer.refresh()">Refresh</button>`;
    this.body.appendChild(controls);

    const ul = document.createElement('ul');
    files.forEach((f,i)=>{
      const li = document.createElement('li');
      li.style.cursor='default';
      li.textContent = f.name;
      li.ondblclick = ()=> this.openFile(f.name);
      li.oncontextmenu = (ev)=>{ ev.preventDefault(); this.showContext(f.name); };
      ul.appendChild(li);
    });
    this.body.appendChild(ul);
  },

  refresh(){ this.render(); },

  newFile(){
    const name = prompt('New file name (e.g. myapp.xjs or note.txt):');
    if(!name) return;
    const ext = name.split('.').pop().toLowerCase();
    let content = '';
    if(ext === 'xjs') content = '// XiliX App: '+name+'\nlog("Hello from '+name+'");';
    FileSystem.saveFile(name, content);
    this.render();
  },

  importSample(){
    FileSystem.saveFile('readme.txt','Welcome to XiliX OS!\nDouble-click .xjs files to run them.');
    FileSystem.saveFile('hello.xjs','log("Hello from hello.xjs");');
    this.render();
  },

  openFile(name){
    const content = FileSystem.readFile(name);
    if(!content){ alert('File not found'); return; }
    const ext = name.split('.').pop().toLowerCase();
    if(ext === 'xjs'){ FileSystem.runFile(name); return; }
    // open text file viewer/editor
    const winId = 'file-'+name.replace(/[^a-z0-9_\-\.]/ig,'_');
    const win = OS.createWindow({id:winId, title:name, width:520, height:360, top:140, left:140});
    win.style.display='block'; OS.bringToFront(win); OS.addTask(winId, name);
    const body = document.getElementById('body-'+winId);
    body.innerHTML = `<textarea id="ta-${winId}" style="width:100%;height:80%;">${content}</textarea>
      <div style="margin-top:6px;"><button onclick="Apps.explorer.saveAs('${name}','${winId}')">Save</button>
      <button onclick="Apps.explorer.closeFile('${winId}')">Close</button></div>`;
  },

  saveAs(name, winId){
    const ta = document.getElementById('ta-'+winId);
    if(!ta) return;
    FileSystem.saveFile(name, ta.value);
    alert('Saved');
  },

  closeFile(winId){
    const w = document.getElementById(winId);
    if(w) w.style.display='none';
    OS.removeTask(winId);
  },

  showContext(name){
    if(!confirm('Delete "'+name+'"? (will move to Trash)')) return;
    // move to trash
    const files = JSON.parse(localStorage.getItem('xilix_files')||'[]');
    const trash = JSON.parse(localStorage.getItem('xilix_trash')||'[]');
    const idx = files.findIndex(f=>f.name===name);
    if(idx>=0){ trash.push(files[idx]); files.splice(idx,1); localStorage.setItem('xilix_files', JSON.stringify(files)); localStorage.setItem('xilix_trash', JSON.stringify(trash)); }
    this.render();
  }
};
