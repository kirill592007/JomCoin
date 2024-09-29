const {app, BrowserWindow} = require('electron');
const path = require('path');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 500,
    height: 839,
    icon: path.join(__dirname, 'icon.ico'),
    webPreferences: {
      webSecurity: false
    }
  });
  win.setMenuBarVisibility(false);
  win.setTitle('Dot-coin');
  win.loadFile('src/index.html');
}

app.whenReady().then(() => createWindow());
app.on('window-all-closed', () => app.quit());
