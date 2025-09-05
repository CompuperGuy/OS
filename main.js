const OS = {
  zIndexCounter: 10,

  init() {
    // Boot delay
    setTimeout(() => {
      document.getElementById("boot").style.display = "none";
      document.getElementById("desktop").style.display = "block";
      OS.startClock();
    }, 2000);
  },

  openApp(id) {
    if (!window.Apps[id]) return alert("App not found: " + id);
    Apps[id].open();
  },

  closeApp(id) {
    if (Apps[id]) Apps[id].close();
  },

  toggleStart() {
    const menu = document.getElementById("start-menu");
    menu.style.display = menu.style.display === "flex" ? "none" : "flex";
  },

  bringToFront(win) {
    win.style.zIndex = ++OS.zIndexCounter;
  },

  addTaskbar(id, title) {
    if (document.getElementById("tb-" + id)) return;
    const btn = document.createElement("div");
    btn.id = "tb-" + id;
    btn.className = "taskbar-app";
    btn.textContent = title;
    btn.onclick = () => OS.openApp(id);
    document.getElementById("taskbar-apps").appendChild(btn);
  },

  removeTaskbar(id) {
    const btn = document.getElementById("tb-" + id);
    if (btn) btn.remove();
  },

  startClock() {
    function update() {
      const now = new Date();
      const time = now.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
      document.getElementById("taskbar-clock").textContent = time;
    }
    update();
    setInterval(update, 60000);
  }
};

window.onload = OS.init;
