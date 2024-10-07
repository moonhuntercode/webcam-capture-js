// Part 2
// -----------

export const startWebcam = (video) => {
  let track;
  return navigator.mediaDevices
    .getUserMedia({
      audio: false,
      video: { width: 320, height: 185 },
    })
    .then((stream) => {
      video.srcObject = stream;
      track = stream.getTracks()[0];
      video.onloadedmetadata = () => video.play();
    })
    .catch((err) => {
      /* handle the error */
      console.log(err);
    });
};

export const takePicture = (video, callback) => {
  const predictButton = document.getElementById("predict");
  const canvas = document.getElementById("canvas");
  // const width = 320; // We will scale the photo width to this
  // const height = 185;
  const width = IMAGE_SIZE; // We will scale the photo width to this
  const height = IMAGE_SIZE;
  const context = canvas.getContext("2d");
  canvas.width = width;
  canvas.height = height;
  context.drawImage(video, 0, 0, width, height);

  const outputEl = document.getElementById("predictions");
  // outputEl.appendChild(photo);
  outputEl.appendChild(canvas);

  predictButton.disabled = false;

  predictButton.onclick = async () => {
    await callback(canvas);
  };
};

// Part 3
// -----------

export const drawFaceBox = (photo, faces) => {
  // Draw box around the face detected ⬇️
  // ------------------------------------
  const faceCanvas = document.createElement("canvas");
  faceCanvas.width = IMAGE_SIZE;
  faceCanvas.height = IMAGE_SIZE;
  faceCanvas.style.position = "absolute";
  faceCanvas.style.left = photo.offsetLeft;
  faceCanvas.style.top = photo.offsetTop;
  const ctx = faceCanvas.getContext("2d");
  ctx.beginPath();
  ctx.strokeStyle = "red";
  ctx.strokeRect(
    faces[0].box.xMin,
    faces[0].box.yMin,
    faces[0].box.width,
    faces[0].box.height
  );

  const webcamSection = document.getElementById("webcam-section");
  webcamSection.appendChild(faceCanvas);
};
