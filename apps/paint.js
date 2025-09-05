/* Paint - simple pixel painter */
Apps.paint = {
  open(){
    this.id='paint';
    this.win = OS.createWindow({id:this.id,title:'Paint',width:520,height:440,top:140,left:140});
    this.win.style.display='block'; OS.bringToFront(this.win); OS.addTask(this.id,'Paint');
    this.body = document.getElementById('body-'+this.id);
    this.render();
  },

  close(){ this.win.style.display='none'; OS.removeTask(this.id); },

  render(){
    const saved = localStorage.getItem('xilix_paint') || '';
    this.body.innerHTML = `<div style="margin-bottom:6px;">
      <button onclick="Apps.paint.save()">Save</button>
      <button onclick="Apps.paint.clear()">Clear</button>
      <button onclick="Apps.paint.export()">Export PNG</button>
      <input id="paint-size" type="range" min="4" max="24" value="12" onchange="Apps.paint.resizeGrid(this.value)">
      </div>
      <canvas id="paint-canvas" width="480" height="320" style="border:1px solid #000;"></canvas>`;
    this.canvas = this.body.querySelector('#paint-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.grid = 12;
    this.isDown = false;
    this.setupEvents();
    if(saved) this.loadFromData(saved);
    else this.clear();
  },

  setupEvents(){
    this.canvas.onmousedown = (e)=>{ this.isDown=true; this.paintAt(e); };
    this.canvas.onmousemove = (e)=>{ if(this.isDown) this.paintAt(e); };
    document.addEventListener('mouseup', ()=>{ this.isDown=false; });
  },

  paintAt(e){
    const rect = this.canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / this.grid) * this.grid;
    const y = Math.floor((e.clientY - rect.top) / this.grid) * this.grid;
    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(x,y,this.grid,this.grid);
  },

  clear(){ this.ctx.fillStyle='#ffffff'; this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height); },

  save(){
    const data = this.canvas.toDataURL();
    localStorage.setItem('xilix_paint', data);
    alert('Drawing saved');
  },

  loadFromData(data){
    const img = new Image();
    img.onload = ()=> this.ctx.drawImage(img,0,0);
    img.src = data;
  },

  export(){
    const a = document.createElement('a');
    a.href = this.canvas.toDataURL('image/png');
    a.download = 'xilix-paint.png';
    a.click();
  },

  resizeGrid(v){
    // no complex rescale; just set grid size used for painting
    this.grid = Number(v);
  }
};
