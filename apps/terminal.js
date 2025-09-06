Apps.terminal={
  open(){
    if(this.win){ this.win.style.display="block"; OS.bringToFront(this.win); return; }
    this.win=OS.createWindow({id:"terminal",title:"Terminal",width:500,height:300,top:200,left:220});
    this.win.style.display="block"; OS.bringToFront(this.win); OS.addTask("terminal","Terminal");
    this.body=document.getElementById("body-terminal");
    this.body.innerHTML="<pre id='term-output' style='height:80%;background:black;color:lime;overflow:auto'></pre>"+
      "<input id='term-input' style='width:100%;box-sizing:border-box'>";
    document.getElementById("term-input").addEventListener("keydown",e=>{
      if(e.key==="Enter") this.exec(e.target.value);
    });
  },
  exec(cmd){
    let out=document.getElementById("term-output");
    out.textContent+="\n> "+cmd;
    try{
      let result=eval(cmd);
      out.textContent+="\n"+result;
    }catch(err){
      out.textContent+="\nError: "+err.message;
    }
    out.scrollTop=out.scrollHeight;
    document.getElementById("term-input").value="";
  }
};
