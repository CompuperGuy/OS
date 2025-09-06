Apps.notes={
  open(){
    if(this.win){ this.win.style.display="block"; OS.bringToFront(this.win); return; }
    this.win=OS.createWindow({id:"notes",title:"Notes",width:400,height:300,top:150,left:200});
    this.win.style.display="block"; OS.bringToFront(this.win); OS.addTask("notes","Notes");
    this.body=document.getElementById("body-notes");
    this.body.innerHTML="<textarea id='notes-area' style='width:100%;height:90%'></textarea>"+
      "<br><button onclick='Apps.notes.save()'>Save</button>";
    document.getElementById("notes-area").value=FileSystem.readFile("notes.txt")||"";
  },
  close(){ this.win.style.display="none"; OS.removeTask("notes"); },
  save(){
    let text=document.getElementById("notes-area").value;
    FileSystem.saveFile("notes.txt",text);
    alert("Notes saved!");
  }
};
