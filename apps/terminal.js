/* Terminal app with JS execution */
Apps.terminal = {
  open(){
    this.win = OS.createWindow({id:'terminal', title:'Terminal', width:500, height:320, top:180, left:180});
    this.win.style.display='block'; 
    OS.bringToFront(this.win); 
    OS.addTask('terminal','Terminal');
    this.body = document.getElementById('body-terminal');
    this.render();
  },

  close(){ this.win.style.display='none'; OS.removeTask('terminal'); },

  render(){
    this.body.innerHTML = `
      <div id="term-out" style="background:#000; color:#0f0; height:200px; padding:6px; font-family:monospace; overflow:auto;"></div>
      <input id="term-in" style="width:100%;" placeholder="type command (help for list)">`;
    document.getElementById('term-in').addEventListener('keydown', (e)=>{
      if(e.key==='Enter'){ this.exec(e.target.value); e.target.value=''; }
    });
    this.println('Welcome to XiliX Terminal. Type help');
  },

  println(t){ 
    const o = document.getElementById('term-out'); 
    o.textContent += t + '\n'; 
    o.scrollTop = o.scrollHeight; 
  },

  exec(cmd){
    this.println('> ' + cmd);
    const parts = cmd.trim().split(' ');
    const c = parts[0].toLowerCase();

    if(c==='help'){ 
      this.println('Commands: help, echo [text], files, notes, clear, reset, js [code]');
    }
    else if(c==='echo'){ 
      this.println(parts.slice(1).join(' ')); 
    }
    else if(c==='files'){ 
      const files = JSON.parse(localStorage.getItem('xilix_files')||'[]'); 
      this.println(files.map(f=>f.name).join('\n')||'[no files]'); 
    }
    else if(c==='notes'){ 
      this.println(localStorage.getItem('xilix_notes') || '[no notes]'); 
    }
    else if(c==='clear'){ 
      document.getElementById('term-out').textContent = ''; 
    }
    else if(c==='reset'){ 
      if(confirm('Reset all XiliX data?')){ localStorage.clear(); location.reload(); } 
    }
    else if(c==='js'){ 
      const code = cmd.slice(3); // everything after "js "
      try {
        const result = eval(code);
        if(result !== undefined) this.println(String(result));
      } catch(err){
        this.println("Error: " + err.message);
      }
    }
    else {
      this.println('Unknown command: ' + c);
    }
  }
};

