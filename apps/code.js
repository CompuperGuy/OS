/* Code app - create .xjs files that run in XiliX runtime */
Apps.code = {
  open(){
    this.id='code';
    this.win = OS.createWindow({id:this.id,title:'Code App',width:720,height:520,top:120,left:120});
    this.win.style.display='block'; OS.bringToFront(this.win); OS.addTask(this.id,'Code App');
    this.body = document.getElementById('body-'+this.id);
    this.render();
  },

  close(){ this.win.style.display='none'; OS.removeTask(this.id); },

  render(){
    const files = FileSystem.listFiles();
    this.body.innerHTML = `<div style="display:flex;gap:8px;">
      <div style="width:260px;">
        <div style="margin-bottom:6px;"><button onclick="Apps.code.newFile()">New</button>
          <button onclick="Apps.code.save()">Save</button>
          <button onclick="Apps.code.run()">Run</button>
        </div>
        <div><strong>Files</strong>
          <ul id="code-file-list" style="height:380px;overflow:auto;border:1px solid #000;padding:4px;"></ul>
        </div>
      </div>
      <div style="flex:1;display:flex;flex-direction:column;">
        <input id="code-filename" placeholder="myapp.xjs" style="margin-bottom:6px;">
        <textarea id="code-editor" style="flex:1;font-family:monospace;"></textarea>
      </div>
    </div>`;
    this.refreshFileList();
  },

  refreshFileList(){
    const ul = document.getElementById('code-file-list');
    ul.innerHTML = '';
    const files = FileSystem.listFiles();
    files.forEach(f=>{
      const li = document.createElement('li'); li.textContent = f.name; li.style.cursor='pointer';
      li.onclick = ()=> { document.getElementById('code-filename').value = f.name; document.getElementById('code-editor').value = f.content || ''; };
      ul.appendChild(li);
    });
  },

  newFile(){ document.getElementById('code-filename').value = ''; document.getElementById('code-editor').value = '// new xjs app\nlog(\"Hello from XiliX\");'; },

  save(){
    const name = document.getElementById('code-filename').value.trim();
    const content = document.getElementById('code-editor').value;
    if(!name){ alert('Enter filename'); return; }
    if(!name.endsWith('.xjs')){ alert('Filename must end with .xjs'); return; }
    FileSystem.saveFile(name, content);
    this.refreshFileList();
    alert('Saved');
  },

  run(){
    const name = document.getElementById('code-filename').value.trim();
    if(!name) return alert('Enter filename to run');
    FileSystem.saveFile(name, document.getElementById('code-editor').value);
    FileSystem.runFile(name);
  }
};
