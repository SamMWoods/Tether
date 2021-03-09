// In the renderer process.
const {desktopCapturer} = require('electron')

module.exports = { 
    capture: (screenId) => {
      console.log(screenId)
      desktopCapturer.getSources({ types: ['window', 'screen'], thumbnailSize: { width: 1920, height: 1080 }}).then(async sources => {
        console.log(sources)
        sources.map((source, i) => {
          console.log(source.display_id, screenId)
          if(source.display_id == screenId){
            document.getElementById('screenshot-image').src = sources[i].thumbnail.toDataURL()

          }
        })
      })
  }
}
