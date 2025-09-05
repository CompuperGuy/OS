/* Terminal with JS execution */
Apps.terminal = {
  open(){
    this.id='terminal';
    this.win = OS.createWindow({id:this.id,title:'Terminal',width:560,height:360,top:180,left:180});
    this.win.style.display='block'; OS.bringToFront(this.win); OS.addTask(this.id,'Terminal');
    this.body = document.getElementById('body-'+this.id);
    this.render();
  },

  close(){ this.win.style.display='none'; OS.removeTask(this.id); },

  render(){
    this.body.innerHTML = `<div id="term-out" style="background:#000;color:#0f0;height:220px;padding:6px;font-family:monospace;overflow:auto;"></div>
      <input id="term-in" style="width:100%;" placeholder="Type command (help) and press Enter">`;
    const inp = document.getElementById('term-in');
    inp.addEventListener('keydown', (e)=>{ if(e.key==='Enter'){ this.exec(inp.value); inp.value=''; } });
    this.println('Welcome to XiliX Terminal. Type help');
  },

  println(t){ const o=document.getElementById('term-out'); o.textContent += t + '\n'; o.scrollTop = o.scrollHeight; },

  exec(cmd){
    if(!cmd) return;
    this.println('> '+cmd);
    const parts = cmd.trim().split(' ');
    const c = parts[0].toLowerCase();

    if(c==='help'){ this.println('Commands: help, echo [text], files, notes, clear, reset, js [code], run [file]'); }
    else if(c==='echo'){ this.println(parts.slice(1).join(' ')); }
    else if(c==='files'){ const files = JSON.parse(localStorage.getItem('xilix_files')||'[]'); this.println(files.map(f=>f.name).join('\n')||'[no files]'); }
    else if(c==='notes'){ this.println(localStorage.getItem('xilix_notes')||'[no notes]'); }
    else if(c==='clear'){ document.getElementById('term-out').textContent=''; }
    else if(c==='reset'){ if(confirm('Reset all XiliX data?')){ localStorage.clear(); location.reload(); } }
    else if(c==='js'){
      const code = cmd.slice(3);
      try{
        const result = eval(code);
        if(result !== undefined) this.println(String(result));
      }catch(err){ this.println('Error: '+err.message); }
    }
    else if(c==='run'){
      const fname = parts.slice(1).join(' ');
      if(!fname) return this.println('Usage: run filename.xjs');
      FileSystem.runFile(fname);
    }
    else this.println('Unknown command: ' + c);
  }
};


