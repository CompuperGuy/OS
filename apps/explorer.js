Apps.explorer = {
  open(){
    if(this.win){ this.win.style.display="block"; OS.bringToFront(this.win); return; }
    this.win=OS.createWindow({id:"explorer",title:"Explorer",width:500,height:350,top:180,left:180});
    this.win.style.display="block"; OS.bringToFront(this.win); OS.addTask("explorer","Explorer");
    this.body=document.getElementById("body-explorer");
    this.render();
  },
  close(){ this.win.style.display="none"; OS.removeTask("explorer"); },
  render(){
    let files=FileSystem.listFiles();
    this.body.innerHTML="<h3>Files</h3><ul>"+
      files.map(f=>`<li ondblclick="FileSystem.runFile('${f.name}')">${f.name}</li>`).join("")+
      "</ul><input id='newFileName' placeholder='newfile.txt'>"+
      "<button onclick='Apps.explorer.create()'>Create</button>";
  },
  create(){
    let name=document.getElementById("newFileName").value.trim();
    if(!name) return alert("Enter filename");
    FileSystem.saveFile(name,"");
    this.render();
  }
};
