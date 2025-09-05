/* Music player - play a local file or beep */
Apps.music = {
  open(){
    this.id='music';
    this.win = OS.createWindow({id:this.id,title:'Music',width:420,height:220,top:220,left:220});
    this.win.style.display='block'; OS.bringToFront(this.win); OS.addTask(this.id,'Music');
    this.body = document.getElementById('body-'+this.id);
    this.render();
  },

  close(){ this.win.style.display='none'; OS.removeTask(this.id); },

  render(){
    this.body.innerHTML = `<div>
      <input id="music-file" type="file" accept="audio/*">
      <div style="margin-top:8px;">
        <button onclick="Apps.music.play()">Play</button>
        <button onclick="Apps.music.stop()">Stop</button>
        <button onclick="Apps.music.beep()">Beep</button>
      </div>
      <div id="music-status" style="margin-top:8px;"></div>
      <audio id="music-audio"></audio>
    </div>`;
    this.audio = document.getElementById('music-audio');
  },

  play(){
    const fileInput = document.getElementById('music-file');
    const status = document.getElementById('music-status');
    if(fileInput.files && fileInput.files[0]){
      const file = fileInput.files[0];
      const url = URL.createObjectURL(file);
      this.audio.src = url;
      this.audio.play();
      status.textContent = 'Playing: ' + file.name;
    } else {
      status.textContent = 'No file selected';
    }
  },

  stop(){ this.audio.pause(); this.audio.currentTime = 0; document.getElementById('music-status').textContent = 'Stopped'; },

  beep(){
    // simple tone
    try{
      const ctx = new (window.AudioContext||window.webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      o.type='square'; o.frequency.value = 880;
      o.start(); g.gain.setValueAtTime(0.1, ctx.currentTime);
      setTimeout(()=>{ o.stop(); }, 200);
      document.getElementById('music-status').textContent = 'Beep!';
    }catch(e){ alert('Audio not supported'); }
  }
};
