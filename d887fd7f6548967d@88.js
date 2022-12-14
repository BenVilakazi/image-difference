// https://observablehq.com/@mbostock/image-difference@88
import define1 from "./31ffe21a13ec2663@162.js";

function _1(md){return(
md`# Image Difference

Pick two images to compare. The first image is red, and the second blue.`
)}

function _a(imageInput){return(
imageInput({
  initialUrl: "https://user-images.githubusercontent.com/230541/52751141-45e01980-2fa3-11e9-8662-568baa1b65f0.png"
})
)}

function _b(imageInput){return(
imageInput({
  initialUrl: "https://user-images.githubusercontent.com/230541/52751142-45e01980-2fa3-11e9-8ef0-806d4704e82f.png"
})
)}

function _4(html,a,b){return(
html`
<svg style="position:absolute;">
  <filter id="blue" color-interpolation-filters="sRGB" x="0" y="0" height="100%" width="100%">
    <feColorMatrix
      type="matrix"
      values="1 0 0 0 0 
              1 0 0 0 0  
              1 0 0 0 1 
              0 0 0 1 0" />
  </filter>
  <filter id="red" color-interpolation-filters="sRGB" x="0" y="0" height="100%" width="100%">
    <feColorMatrix
      type="matrix"
      values="1 0 0 0 1 
              1 0 0 0 0  
              1 0 0 0 0 
              0 0 0 1 0" />
  </filter>
</svg>
<figure style="position:relative;max-width:initial;">
  <div style="position:relative;top:0;left:0;filter:url(${window.location}#red);">${a}</div>
  <div style="position:absolute;top:0;left:0;filter:url(${window.location}#blue);mix-blend-mode:multiply;">${b}</div>
</figure>`
)}

function _5(md){return(
md`---

## Appendix`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof a")).define("viewof a", ["imageInput"], _a);
  main.variable(observer("a")).define("a", ["Generators", "viewof a"], (G, _) => G.input(_));
  main.variable(observer("viewof b")).define("viewof b", ["imageInput"], _b);
  main.variable(observer("b")).define("b", ["Generators", "viewof b"], (G, _) => G.input(_));
  main.variable(observer()).define(["html","a","b"], _4);
  main.variable(observer()).define(["md"], _5);
  const child1 = runtime.module(define1);
  main.import("imageInput", child1);
  return main;
}
