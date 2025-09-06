Apps.paint={
  open(){
    if(this.win){ this.win.style.display="block"; OS.bringToFront(this.win); return; }
    this.win=OS.createWindow({id:"paint",title:"Paint",width:500,height:400,top:260,left:300});
    this.win.style.display="block"; OS.bringToFront(this.win); OS.addTask("paint","Paint");
    this.body=document.getElementById("body-paint");
    this.body.innerHTML="<canvas id='paint-canvas' width='480' height='300' style='border:1px solid black;background:white'></canvas>"+
      "<br><button onclick='Apps.paint.clear()'>Clear</button>";
    let c=document.getElementById("paint-canvas");
    let ctx=c.getContext("2d");
    let drawing=false;
    c.onmousedown=()=>drawing=true;
    c.onmouseup=()=>drawing=false;
    c.onmousemove=e=>{
      if(drawing){
        let rect=c.getBoundingClientRect();
        ctx.fillRect(e.clientX-rect.left,e.clientY-rect.top,4,4);
      }
    };
  },
  clear(){ let c=document.getElementById("paint-canvas"); c.getContext("2d").clearRect(0,0,c.width,c.height); }
};
