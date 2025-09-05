Apps = window.Apps || {};
Apps.browser = {
  open() {
    if (!this.win) this.win = this.createWindow();
    this.win.style.display = "block";
    OS.bringToFront(this.win);
    OS.addTaskbar("browser", "Internet");
  },

  close() {
    this.win.style.display = "none";
    OS.removeTaskbar("browser");
  },

  createWindow() {
    const win = document.createElement("div");
    win.className = "window";
    win.style.top = "150px"; win.style.left = "150px";
    win.style.width = "600px"; win.style.height = "400px";
    win.innerHTML = `
      <div class="title-bar" onmousedown="dragStart(event,this.parentElement)">
        <div class="title-bar-text">Internet Explorer</div>
        <div class="title-bar-controls"><button onclick="Apps.browser.close()"></button></div>
      </div>
      <div class="window-body" style="display:flex; flex-direction:column; height:100%;">
        <div style="margin-bottom:5px;">
          <input id="browser-input" type="text" placeholder="Search the web" style="width:80%;">
          <button onclick="Apps.browser.search()">Go</button>
        </div>
        <iframe id="browser-frame" style="flex:1; border:2px inset white;" src="https://duckduckgo.com" sandbox="allow-scripts allow-same-origin allow-forms allow-popups"></iframe>
      </div>
    `;
    document.body.appendChild(win);
    return win;
  },

  search() {
    const query = document.getElementById("browser-input").value;
    const url = "https://duckduckgo.com/?q=" + encodeURIComponent(query);
    document.getElementById("browser-frame").src = url;
  }
};
