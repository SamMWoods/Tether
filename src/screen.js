// In the renderer process.
const {desktopCapturer} = require('electron')


const {ipcRenderer} = require('electron')
ipcRenderer.on('snap', function (evt, screen) {
  const thumbSize = determineScreenShotSize(screen)
  let options = { types: ['screen'], thumbnailSize: thumbSize }
  desktopCapturer.getSources(options).then(sources => {
    sources.map((source, i) => {
      console.log(screen.display.id , sources)
      if(source.display_id == screen.display.id){
        document.getElementById('screenshot-image').src = sources[i].thumbnail.toDataURL()
      }
    })
  })
});

function determineScreenShotSize (screen) {
  const screenSize = screen.display.workAreaSize
  const maxDimension = Math.max(screenSize.width, screenSize.height)
  return {
    width: maxDimension * window.devicePixelRatio,
    height: maxDimension * window.devicePixelRatio
  }
}