Apps.minesweeper={
  open(){
    if(this.win){ this.win.style.display="block"; OS.bringToFront(this.win); return; }
    this.win=OS.createWindow({id:"minesweeper",title:"Minesweeper",width:300,height:300,top:280,left:320});
    this.win.style.display="block"; OS.bringToFront(this.win); OS.addTask("minesweeper","Minesweeper");
    this.body=document.getElementById("body-minesweeper");
    this.start();
  },
  start(){
    let size=8,mines=10;
    let grid=[...Array(size)].map(()=>Array(size).fill(0));
    // place mines
    for(let m=0;m<mines;m++){
      let x,y; do{ x=Math.floor(Math.random()*size); y=Math.floor(Math.random()*size); }while(grid[y][x]===-1);
      grid[y][x]=-1;
      for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){
        let ny=y+dy,nx=x+dx; if(grid[ny]&&grid[ny][nx]>=0) grid[ny][nx]++;
      }
    }
    this.grid=grid;
    this.render();
  },
  render(){
    let html="<table style='border-collapse:collapse'>";
    for(let y=0;y<this.grid.length;y++){
      html+="<tr>";
      for(let x=0;x<this.grid[y].length;x++){
        html+=`<td id='ms-${x}-${y}' onclick='Apps.minesweeper.reveal(${x},${y})' 
        style='width:30px;height:30px;border:1px solid gray;text-align:center;background:silver'></td>`;
      }
      html+="</tr>";
    }
    html+="</table>";
    this.body.innerHTML=html;
  },
  reveal(x,y){
    let cell=document.getElementById(`ms-${x}-${y}`);
    if(!cell||cell.textContent) return;
    if(this.grid[y][x]===-1){ cell.textContent="💣"; alert("Game Over!"); return; }
    cell.textContent=this.grid[y][x]||"";
    cell.style.background="white";
  }
};
