Apps.code={
  open(){
    if(this.win){ this.win.style.display="block"; OS.bringToFront(this.win); return; }
    this.win=OS.createWindow({id:"code",title:"Code Editor",width:600,height:400,top:200,left:200});
    this.win.style.display="block"; OS.bringToFront(this.win); OS.addTask("code","Code App");
    this.body=document.getElementById("body-code");
    this.render();
  },
  render(){
    this.body.innerHTML=`
      <h3>Create a new App</h3>
      <input id="code-filename" placeholder="myapp.xjs" style="width:100%;margin-bottom:5px;">
      <textarea id="code-editor" style="width:100%;height:250px;font-family:monospace;"></textarea>
      <br><button onclick="Apps.code.save()">Save</button>
      <button onclick="Apps.code.run()">Run</button>
    `;
  },
  save(){
    const name=document.getElementById("code-filename").value.trim();
    const content=document.getElementById("code-editor").value;
    if(!name.endsWith(".xjs")) return alert("File must end with .xjs");
    FileSystem.saveFile(name,content);
    alert("Saved "+name);
  },
  run(){
    const name=document.getElementById("code-filename").value.trim();
    this.save();
    FileSystem.runFile(name);
  }
};
