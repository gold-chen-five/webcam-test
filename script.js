

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
const video = document.querySelector('.app_videoFeed')
function stopWebcam(){
    
    video.srcObject.getTracks().forEach(track => {
        track.stop();
    })
}

let image_data
function takePicture(){
  const canvas = document.querySelector('.canvas')
  canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height)
  let image_data_url = canvas.toDataURL('image/jpeg');
  image_data = image_data_url
  //console.log(image_data_url);
}
const play_btn = document.querySelector('.btn')
play_btn.addEventListener('click',() => getMedia({ audio: true, video: true }))

const stop_btn = document.querySelector('.stopbtn')
stop_btn.addEventListener('click',() => stopWebcam())

const take_photo = document.querySelector('.takephoto')
take_photo.addEventListener('click',() => takePicture()) 


//上傳
const upload_mage_by_base64 = async () => {
  const res = await fetch('http://localhost:3000/sendimage_by_base64',{
    method: 'POST',
    body: JSON.stringify({data: image_data}),
    headers: {'Content-Type': 'application/json'}
  })
  const res_json = await res.json()
  console.log(res_json)
  
}
const upload = document.querySelector('.upload_poo_poo')
upload.addEventListener('click',() => upload_mage_by_base64())
