const { app, BrowserWindow, ipcMain } = require("electron"); // ← ajoute ipcMain
const path = require("path");

ipcMain.handle("ping", () => {
  return "pong";
});

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    backgroundColor: "#1e1f22",
    title: "Mon Chat App",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadURL("http://localhost:5173");
}

app.whenReady().then(createWindow);
