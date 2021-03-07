const { app, BrowserWindow, screen , globalShortcut  } = require('electron');
const path = require('path');
const { capture } = require('./screen');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    transparent: true,
    frame: false,
    kiosk: true,
    fullscreen: true,
    skipTaskbar: true,
    webPreferences: {
      nodeIntegration: true
  }

  });

  mainWindow.setIgnoreMouseEvents(false)

  mainWindow.setFocusable(false);
  
  mainWindow.hide()
  // //remove from toolbar
  // mainWindow.setFocusable(false);

  //take screenshot
  globalShortcut.register('F4', () => {
    console.log('Snap')
    const displays = screen.getAllDisplays()
    // displays.map((display, i) => {
    //   console.log(i, display.bounds.width, display.bounds.height)
    // })

    const externalDisplay = displays.find((display, i) => {
      return display.bounds.x !== 0 || display.bounds.y !== 0
      // console.log(i, display.bounds.width, display.bounds.height)
    })

    console.log(externalDisplay)

    if (externalDisplay) {
      win = new BrowserWindow({
        x: externalDisplay.bounds.x,
        y: externalDisplay.bounds.y,
        transparent: true,
        frame: false,
        kiosk: true,
        fullscreen: true,
        skipTaskbar: true,
        webPreferences: {
          nodeIntegration: true
      }
      })
      win.webContents.executeJavaScript(`capture(1)`)
      win.loadFile(path.join(__dirname, 'index.html'));
    }

    mainWindow.show()
    mainWindow.webContents.executeJavaScript(`capture(0)`)
  })

   //close app
  globalShortcut.register('CommandOrControl+F4', () => {
    console.log('Bye Bye')
    app.quit();
  })

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

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