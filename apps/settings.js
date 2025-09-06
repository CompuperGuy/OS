Apps.settings={
  open(){
    if(this.win){ this.win.style.display="block"; OS.bringToFront(this.win); return; }
    this.win=OS.createWindow({id:"settings",title:"Settings",width:400,height:300,top:220,left:260});
    this.win.style.display="block"; OS.bringToFront(this.win); OS.addTask("settings","Settings");
    this.body=document.getElementById("body-settings");
    this.render();
  },
  render(){
    this.body.innerHTML=`
      <h3>Settings</h3>
      <button onclick="Apps.settings.clearData()">Delete All Data</button><br><br>
      <button onclick="XipPy.showTip('Ask me anything! I’m here to help.')">Ask XipPy</button>
    `;
  },
  clearData(){
    if(confirm("This will delete ALL saved files. Continue?")){
      localStorage.clear();
      alert("All data deleted!");
    }
  }
};
