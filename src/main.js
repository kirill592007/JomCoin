const {app, BrowserWindow} = require('electron');
const {autoUpdater} = require('electron-updater')
const path = require('path');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 500,
    height: 839,
    icon: path.join(__dirname, 'icon.ico'),
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  win.setMenuBarVisibility(false);
  win.setTitle('JomCoin');
  win.loadFile('src/index.html');
  autoUpdater.checkForUpdatesAndNotify()
}

autoUpdater.on('update-available', () => {
  console.log('Обновление доступно');
})

autoUpdater.on('update-downloaded', () => {
  console.log('Обновление загружено, готово к установке');
  autoUpdater.quitAndInstall()
})

app.whenReady().then(() => createWindow());
app.on('window-all-closed', () => app.quit());
