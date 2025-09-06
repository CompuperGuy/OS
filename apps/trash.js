/* Trash app */
Apps.trash={
  open(){
    if(this.win){ this.win.style.display="block"; OS.bringToFront(this.win); return; }
    this.win=OS.createWindow({id:"trash",title:"Trash Bin",width:400,height:250,top:180,left:240});
    this.win.style.display="block"; OS.bringToFront(this.win); OS.addTask("trash","Trash Bin");
    this.body=document.getElementById("body-trash");
    this.render();
  },
  render(){
    this.body.innerHTML="<h3>Trash Bin</h3><button onclick='Apps.trash.clear()'>Empty Trash</button>";
  },
  clear(){
    if(confirm("Delete ALL files?")){
      localStorage.removeItem("xilix_files");
      FileSystem.files=[];
      alert("Trash emptied. All files deleted.");
    }
  }
};

