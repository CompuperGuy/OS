window.FileSystem = {
  files: JSON.parse(localStorage.getItem("xilix_files") || "[]"),
  saveFile(name, content){
    let f=this.files.find(f=>f.name===name);
    if(f) f.content=content; else this.files.push({name,content});
    this.sync();
  },
  readFile(name){ let f=this.files.find(f=>f.name===name); return f?f.content:null; },
  deleteFile(name){ this.files=this.files.filter(f=>f.name!==name); this.sync(); },
  listFiles(){ return this.files; },
  sync(){ localStorage.setItem("xilix_files", JSON.stringify(this.files)); },
  runFile(name){
    const code=this.readFile(name);
    if(!code) return alert("File not found");
    if(name.endsWith(".xjs")){
      const win=OS.createWindow({id:"run-"+name,title:"Running "+name,width:400,height:300});
      win.style.display="block"; OS.bringToFront(win);
      const out=document.getElementById("body-run-"+name);
      out.innerHTML=`<pre style="background:#000;color:#0f0;height:100%;overflow:auto;"></pre>`;
      const log=(...a)=>out.querySelector("pre").textContent+=a.join(" ")+"\n";
      try{ new Function("log", code)(log); }catch(err){ log("Error: "+err.message); }
    } else {
      alert("Unknown file type: "+name);
    }
  }
};
