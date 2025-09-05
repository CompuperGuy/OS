/* Minesweeper - small implementation */
Apps.minesweeper = {
  open(){
    this.id='minesweeper';
    this.win = OS.createWindow({id:this.id,title:'Minesweeper',width:420,height:460,top:160,left:160});
    this.win.style.display='block'; OS.bringToFront(this.win); OS.addTask(this.id,'Minesweeper');
    this.body = document.getElementById('body-'+this.id);
    this.render();
  },

  close(){ this.win.style.display='none'; OS.removeTask(this.id); },

  render(){
    this.rows = 9; this.cols = 9; this.mines = 10;
    this.body.innerHTML = `<div style="margin-bottom:6px;"><button onclick="Apps.minesweeper.start()">New Game</button></div>
      <div id="ms-board"></div>`;
    this.start();
  },

  start(){
    // init board
    this.board = Array(this.rows).fill(0).map(()=>Array(this.cols).fill({mine:false,open:false,flag:false,count:0}));
    // create as mutable objects
    this.board = [];
    for(let r=0;r<this.rows;r++){
      const row=[];
      for(let c=0;c<this.cols;c++) row.push({mine:false,open:false,flag:false,count:0});
      this.board.push(row);
    }
    // place mines
    let placed=0;
    while(placed < this.mines){
      const r = Math.floor(Math.random()*this.rows);
      const c = Math.floor(Math.random()*this.cols);
      if(!this.board[r][c].mine){ this.board[r][c].mine=true; placed++; }
    }
    // counts
    for(let r=0;r<this.rows;r++){
      for(let c=0;c<this.cols;c++){
        if(this.board[r][c].mine) continue;
        let cnt=0;
        for(let dr=-1;dr<=1;dr++) for(let dc=-1;dc<=1;dc++){
          const rr=r+dr, cc=c+dc;
          if(rr>=0 && rr<this.rows && cc>=0 && cc<this.cols) if(this.board[rr][cc].mine) cnt++;
        }
        this.board[r][c].count = cnt;
      }
    }
    this.renderBoard();
  },

  renderBoard(){
    const container = document.getElementById('ms-board');
    container.innerHTML = '';
    const table = document.createElement('table');
    table.style.borderCollapse='collapse';
    for(let r=0;r<this.rows;r++){
      const tr = document.createElement('tr');
      for(let c=0;c<this.cols;c++){
        const td = document.createElement('td');
        td.style.width='28px'; td.style.height='28px'; td.style.border='1px solid #000';
        td.style.textAlign='center'; td.style.cursor='pointer';
        const cell = this.board[r][c];
        td.oncontextmenu = (ev)=>{ ev.preventDefault(); cell.flag = !cell.flag; this.renderBoard(); };
        td.onclick = ()=>{ this.openCell(r,c); };
        if(cell.open){
          td.style.background='#ddd';
          if(cell.mine){ td.textContent='💣'; td.style.background='#f99'; }
          else if(cell.count>0) td.textContent = cell.count;
        } else {
          td.style.background='#bbb';
          if(cell.flag) td.textContent='⚑';
          else td.textContent='';
        }
        tr.appendChild(td);
      }
      table.appendChild(tr);
    }
    container.appendChild(table);
  },

  openCell(r,c){
    const cell = this.board[r][c];
    if(cell.flag || cell.open) return;
    cell.open = true;
    if(cell.mine){ this.revealAll(); alert('BOOM! You lost.'); }
    else {
      if(cell.count===0) this.floodFill(r,c);
      this.renderBoard();
      if(this.checkWin()) { alert('You win!'); }
    }
  },

  floodFill(r,c){
    for(let dr=-1;dr<=1;dr++) for(let dc=-1;dc<=1;dc++){
      const rr=r+dr, cc=c+dc;
      if(rr>=0 && rr<this.rows && cc>=0 && cc<this.cols){
        const cobj = this.board[rr][cc];
        if(!cobj.open && !cobj.mine){ cobj.open=true; if(cobj.count===0) this.floodFill(rr,cc); }
      }
    }
  },

  revealAll(){
    for(let r=0;r<this.rows;r++) for(let c=0;c<this.cols;c++) this.board[r][c].open = true;
    this.renderBoard();
  },

  checkWin(){
    for(let r=0;r<this.rows;r++) for(let c=0;c<this.cols;c++){
      const cell = this.board[r][c];
      if(!cell.mine && !cell.open) return false;
    }
    return true;
  }
};
