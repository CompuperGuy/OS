Apps.music={
  open(){
    if(this.win){ this.win.style.display="block"; OS.bringToFront(this.win); return; }
    this.win=OS.createWindow({id:"music",title:"Music Player",width:400,height:200,top:320,left:360});
    this.win.style.display="block"; OS.bringToFront(this.win); OS.addTask("music","Music Player");
    this.body=document.getElementById("body-music");
    this.body.innerHTML="<button onclick='Apps.music.play()'>Play Beep</button>";
  },
  play(){
    let ctx=new (window.AudioContext||window.webkitAudioContext)();
    let o=ctx.createOscillator(); o.type="sine"; o.frequency.value=440;
    o.connect(ctx.destination); o.start(); o.stop(ctx.currentTime+1);
  }
};
