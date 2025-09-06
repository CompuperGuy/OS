Apps.calculator={
  open(){
    if(this.win){ this.win.style.display="block"; OS.bringToFront(this.win); return; }
    this.win=OS.createWindow({id:"calc",title:"Calculator",width:220,height:300,top:300,left:340});
    this.win.style.display="block"; OS.bringToFront(this.win); OS.addTask("calc","Calculator");
    this.body=document.getElementById("body-calc");
    this.body.innerHTML="<input id='calc-display' style='width:100%;margin-bottom:5px'>" +
      "<div id='calc-buttons'></div>";
    let b=document.getElementById("calc-buttons");
    let keys=["7","8","9","/","4","5","6","*","1","2","3","-","0",".","=","+"];
    keys.forEach(k=>{
      let btn=document.createElement("button"); btn.textContent=k;
      btn.onclick=()=>this.press(k);
      b.appendChild(btn);
    });
  },
  press(k){
    let d=document.getElementById("calc-display");
    if(k==="="){ try{ d.value=eval(d.value); }catch{ d.value="Error"; } }
    else d.value+=k;
  }
};
