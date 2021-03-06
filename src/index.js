const { app ,BrowserWindow, screen , globalShortcut  } = require('electron');
const path = require('path');
const { ipcMain } = require('electron')
// const { capture } = require('./screen');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {

  const displays = screen.getAllDisplays()
  var win = [];
  displays.map((display, i) => {
    if (display){
       win[i] = new BrowserWindow({
        x: display.bounds.x,
        y: display.bounds.y,
        transparent: true,
        frame: false,
        kiosk: true,
        fullscreen: true,
        skipTaskbar: true,
          webPreferences: {
            nodeIntegration: true,
        }
      })
    }
    
    win[i].hide()

    // and load the index.html of the app.
    win[i].loadFile(path.join(__dirname, 'index.html'));
  });

  //take screenshot
  globalShortcut.register('F4', () => {
    displays.map((display, i) => {
      console.log(display, i)
      win[i].webContents.send('snap', {display});
      win[i].show()
      // Open the DevTools.
      // win[i].webContents.openDevTools();    
    })
  })

   //close app
  globalShortcut.register('CommandOrControl+F4', () => {
    console.log('Bye Bye')
    displays.map((display, i) => {
      win[i].hide()
    })
  })

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

