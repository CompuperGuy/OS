window.OS = {
  z: 10,
  toggleStart(){
    let menu=document.getElementById("start-menu");
    menu.style.display=menu.style.display==="block"?"none":"block";
  },
  bringToFront(win){ this.z++; win.style.zIndex=this.z; },
  createWindow({id,title,width=400,height=300,top=100,left=100}){
    let win=document.createElement("div");
    win.className="window"; win.id=id;
    win.style.width=width+"px"; win.style.height=height+"px";
    win.style.top=top+"px"; win.style.left=left+"px";
    win.innerHTML=`
      <div class="title-bar" onmousedown="OS.dragStart(event,this.parentElement)">
        <div class="title-bar-text">${title}</div>
        <div class="title-bar-controls"><button onclick="OS.closeApp('${id}')"></button></div>
      </div>
      <div class="window-body" id="body-${id}" style="padding:5px;height:${height-40}px;overflow:auto;"></div>`;
    document.body.appendChild(win); return win;
  },
  openApp(name){ if(Apps[name]) Apps[name].open(); },
  closeApp(id){ let el=document.getElementById(id); if(el) el.style.display="none"; },
  addTask(id,label){
    let bar=document.getElementById("taskbar-apps");
    if(document.getElementById("task-"+id)) return;
    let btn=document.createElement("button");
    btn.id="task-"+id; btn.textContent=label;
    btn.onclick=()=>OS.openApp(id);
    bar.appendChild(btn);
  },
  removeTask(id){ let b=document.getElementById("task-"+id); if(b) b.remove(); },
  dragStart(e,win){
    e.preventDefault();
    let offsetX=e.clientX-win.offsetLeft,offsetY=e.clientY-win.offsetTop;
    function move(ev){ win.style.left=(ev.clientX-offsetX)+"px"; win.style.top=(ev.clientY-offsetY)+"px"; }
    function up(){ document.removeEventListener("mousemove",move);document.removeEventListener("mouseup",up); }
    document.addEventListener("mousemove",move);document.addEventListener("mouseup",up);
  }
};

// Boot sequence
window.onload=function(){
  let p=0; let bar=document.getElementById("boot-progress");
  let int=setInterval(()=>{
    p+=10; bar.style.width=p+"%";
    if(p>=100){ 
      clearInterval(int); 
      document.getElementById("boot").style.display="none"; 
      document.getElementById("desktop").style.display="block"; 
      XipPy.start(); 
    }
  },300);
};

window.Apps = {};

// XipPy Assistant
window.XipPy={
  tips:[
    "Hi! I’m XipPy, your assistant!",
    "Double-click an icon to open an app.",
    "Use Notes to jot down ideas.",
    "The Code App lets you make your own programs!",
    "You can delete all data from Settings.",
    "Try Minesweeper if you’re bored.",
    "The Internet app lets you search the web."
  ],
  current:0,
  start(){
    this.showTip(this.tips[this.current]);
    setInterval(()=>{ 
      this.current=(this.current+1)%this.tips.length; 
      this.showTip(this.tips[this.current]); 
    },15000);
  },
  showTip(msg){ document.getElementById("xippy-bubble").textContent=msg; }
};
