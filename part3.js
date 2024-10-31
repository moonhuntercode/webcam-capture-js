// part 3- main.js
import "@mediapipe/face_detection";
import "@tensorflow/tfjs-core";
// register webgl backend
import "@tensorflow/tfjs-backend-webgl";
import "@tensorflow/tfjs";
import * as faceDetection from "@tensorflow-models/face-detection";
import { drawFaceBox, startWebcam, takePicture } from "./utils.js";

const webcamButton = document.querySelector("#webcam");
const captureButton = document.querySelector("#pause-for-capture");
const videoForWebcamAndCapture = document.querySelector("#first-video");
let model, detector;

const init = async () => {
  try {
    model = faceDetection.SupportedModels.MediaPipeFaceDetector;
    const detectorConfig = {
      runtime: "mediapipe",
      solutionPath: "https://cdn.jsdelivr.net/npm/@mediapipe/face_detection",
    };
    detector = await faceDetection.createDetector(model, detectorConfig);
    console.log("Detector initialized:", detector);
  } catch (error) {
    console.error("Error initializing detector:", error);
  }
};

webcamButton.onclick = (e) => {
  console.log(e.target.firstChild);
  startWebcam(videoForWebcamAndCapture);
};

captureButton.onclick = () => {
  takePicture(videoForWebcamAndCapture, predict);
};

const predict = async (photo) => {
  if (!detector) {
    console.error("Detector is not initialized.");
    return;
  }

  try {
    const faces = await detector.estimateFaces(photo, {
      flipHorizontal: false,
    });
    console.log(faces);
    drawFaceBox(photo, faces);
  } catch (error) {
    console.error("Error predicting faces:", error);
  }
};

init();
