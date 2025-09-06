Apps.browser={
  open(){
    if(this.win){ this.win.style.display="block"; OS.bringToFront(this.win); return; }
    this.win=OS.createWindow({id:"browser",title:"Internet",width:600,height:400,top:240,left:280});
    this.win.style.display="block"; OS.bringToFront(this.win); OS.addTask("browser","Internet");
    this.body=document.getElementById("body-browser");
    this.body.innerHTML="<input id='searchBox' placeholder='Search...' style='width:80%'>"+
      "<button onclick='Apps.browser.search()'>Go</button>"+
      "<iframe id='webview' style='width:100%;height:85%'></iframe>";
  },
  search(){
    let q=document.getElementById("searchBox").value;
    document.getElementById("webview").src="https://duckduckgo.com/?q="+encodeURIComponent(q);
  }
};
