Apps = window.Apps || {};
Apps.explorer = {
  open() {
    if (!this.win) {
      this.win = this.createWindow();
    }
    this.win.style.display = "block";
    OS.bringToFront(this.win);
    OS.addTaskbar("explorer", "Explorer");
    this.refreshFiles();
  },

  close() {
    this.win.style.display = "none";
    OS.removeTaskbar("explorer");
  },

  createWindow() {
    const win = document.createElement("div");
    win.className = "window";
    win.style.top = "100px"; win.style.left = "100px";
    win.style.width = "350px"; win.style.height = "250px";
    win.innerHTML = `
      <div class="title-bar" onmousedown="dragStart(event,this.parentElement)">
        <div class="title-bar-text">File Explorer</div>
        <div class="title-bar-controls"><button onclick="Apps.explorer.close()"></button></div>
      </div>
      <div class="window-body">
        <button onclick="Apps.explorer.createFile()">New File</button>
        <ul id="file-list"></ul>
      </div>`;
    document.body.appendChild(win);
    return win;
  },

  createFile() {
    let files = JSON.parse(localStorage.getItem("files") || "[]");
    const name = prompt("File name:");
    if (name) files.push({ name, content: "" });
    localStorage.setItem("files", JSON.stringify(files));
    this.refreshFiles();
  },

  refreshFiles() {
    const list = document.getElementById("file-list");
    if (!list) return;
    list.innerHTML = "";
    const files = JSON.parse(localStorage.getItem("files") || "[]");
    files.forEach((f, i) => {
      const li = document.createElement("li");
      li.textContent = f.name;
      li.onclick = () => {
        const newContent = prompt("Edit file:", f.content);
        if (newContent !== null) {
          f.content = newContent;
          files[i] = f;
          localStorage.setItem("files", JSON.stringify(files));
          this.refreshFiles();
        }
      };
      li.oncontextmenu = ev => {
        ev.preventDefault();
        let trash = JSON.parse(localStorage.getItem("trash") || "[]");
        trash.push(f);
        files.splice(i, 1);
        localStorage.setItem("files", JSON.stringify(files));
        localStorage.setItem("trash", JSON.stringify(trash));
        this.refreshFiles();
      };
      list.appendChild(li);
    });
  }
};

// drag function for all windows
function dragStart(e, win) {
  const offsetX = e.clientX - win.offsetLeft;
  const offsetY = e.clientY - win.offsetTop;
  function drag(ev) {
    win.style.left = ev.clientX - offsetX + "px";
    win.style.top = ev.clientY - offsetY + "px";
    OS.bringToFront(win);
  }
  document.onmousemove = drag;
  document.onmouseup = () => (document.onmousemove = null);
}
