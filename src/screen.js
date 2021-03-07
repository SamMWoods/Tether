// In the renderer process.
const {desktopCapturer} = require('electron')

module.exports = { 
    capture: (screenNum) => {
      desktopCapturer.getSources({ types: ['window', 'screen'], thumbnailSize: { width: 1920, height: 1080 }}).then(async sources => {
        document.getElementById('screenshot-image').src = sources[screenNum].thumbnail.toDataURL()
      })
  }
}
