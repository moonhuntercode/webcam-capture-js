import "@tensorflow/tfjs";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import { showResult, startWebcam, takePicture } from "./utils.js";
const webcamButton = document.querySelector("#webcam");
const captureButton = document.querySelector("#pause-for-capture");
const videoForWebcamAndCapture = document.querySelector("#first-video");

let model;

const run = async () => {
  model = await cocoSsd.load();
};

webcamButton.onclick = (e) => {
  console.log(e.target.firstChild);
  startWebcam(videoForWebcamAndCapture);
};
captureButton.onclick = (e) => {
  takePicture(videoForWebcamAndCapture, predict);
};

const predict = async (img) => {
  const predictions = await model.detect(img);
  // test
  console.log(predictions);
  showResult(predictions);
};
