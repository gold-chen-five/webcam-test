async function getMedia(constraints) {
    let stream = null;
  
    try {
      stream = await navigator.mediaDevices.getUserMedia(constraints);
      /* use the stream */
      const video = document.querySelector('.app_videoFeed')
      video.srcObject  = stream
    } catch(err) {
      /* handle the error */
      console.log(err)
    }
}
function stopWebcam(){
    const video = document.querySelector('.app_videoFeed')
    video.srcObject.getTracks().forEach(track => {
        track.stop();
    })
}
const play_btn = document.querySelector('.btn')
play_btn.addEventListener('click',() => getMedia({ audio: true, video: true }))

const stop_btn = document.querySelector('.stopbtn')
stop_btn.addEventListener('click',() => stopWebcam())