// In the renderer process.
const {desktopCapturer} = require('electron')

module.exports = { 
    capture: () => {
    desktopCapturer.getSources({ types: ['window', 'screen'] }).then(async sources => {
      for (const source of sources) {
        if (source.name === 'Screen 2') {
          try {
            const stream = await navigator.mediaDevices.getUserMedia({
              audio: false,
              video: {
                mandatory: {
                  chromeMediaSource: 'desktop',
                  chromeMediaSourceId: source.id,
                }
              }
            })
            handleStream(stream)
          } catch (e) {
            handleError(e)
          }
          return
        }
      }
    })
    
    function handleStream (stream) {
      const video = document.querySelector('video')
      video.srcObject = stream
      video.onloadedmetadata = (e) => video.play()
    }
    
    function handleError (e) {
      console.log(e)
    }
  }
}
