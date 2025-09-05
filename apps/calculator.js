/* Calculator - simple */
Apps.calculator = {
  open(){
    this.id='calculator';
    this.win = OS.createWindow({id:this.id,title:'Calculator',width:260,height:320,top:200,left:200});
    this.win.style.display='block'; OS.bringToFront(this.win); OS.addTask(this.id,'Calculator');
    this.body = document.getElementById('body-'+this.id);
    this.render();
  },

  close(){ this.win.style.display='none'; OS.removeTask(this.id); },

  render(){
    this.body.innerHTML = `<input id="calc-display" style="width:100%;font-size:20px;text-align:right;" readonly>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-top:6px;">
      ${['7','8','9','/',
         '4','5','6','*',
         '1','2','3','-',
         '0','.','=','+'].map(b=>`<button onclick="Apps.calculator.press('${b}')">${b}</button>`).join('')}
      </div>`;
    this.value = '';
    this.update();
  },

  press(k){
    if(k === '='){
      try{ this.value = String(eval(this.value)); }
      catch(e){ this.value = 'Error'; }
    } else this.value += k;
    this.update();
  },

  update(){ document.getElementById('calc-display').value = this.value; }
};
