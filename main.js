import "./style.css";
import javascriptLogo from "./javascript.svg";
import viteLogo from "/vite.svg";
import { setupCounter } from "./counter.js";

document.querySelector("#app").innerHTML =
  /*html*/
  `
  <hr>
  <section>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    
    <div class="card">
    <button id="pause-animation">pause animation</button>
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </section>
`;

setupCounter(document.querySelector("#counter"));
const circle = document.querySelector("#circle_of_notification_container");
const animation = circle.animate([{ transform: "scale(2)" }, { transform: "scale(1)" }], {
  duration: 1000,
  iterations: Infinity,
});
console.log(animation);
const buttomOfPause = document.querySelector("#pause-animation");
buttomOfPause.addEventListener("click", () => {
  animation.pause();
});