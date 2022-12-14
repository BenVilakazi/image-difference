// https://observablehq.com/@mbostock/file-input@162
function _1(md){return(
md`# File Input

<p style="background: #fffced; box-sizing: border-box; padding: 10px 20px;">***Update Aug. 2021:*** *Observable now supports [**file attachments**](/@observablehq/file-attachments)! Please see my [Local File Input](/@mbostock/localfile) for an example of how to use an input that points to a local file while supporting the full FileAttachment API.*</p>

This reusable input allows an image file to be specified either by URL or by choosing a file from disk. A JSON file input and a generic file input are also available below. To use them in your notebook:

\`\`\`js
import {fileInput} from "@mbostock/file-input"
\`\`\``
)}

async function _image(imageInput,FileAttachment){return(
imageInput({
  crossOrigin: "anonymous",
  initialUrl: await FileAttachment("beastie-boys.jpg").url()
})
)}

function _3(image){return(
image
)}

async function _data(jsonInput,FileAttachment){return(
jsonInput({
  initialUrl: await FileAttachment("points.json").url()
})
)}

function _5(data){return(
data
)}

function _6(md){return(
md`---

## Implementation`
)}

function _fileInput(html){return(
function fileInput({
  initialUrl, // e.g., "https://example.com/file.txt"
  accept, // e.g., ".txt,.md"
  load = value => value // A function to specify which value is exposed.
}) {
  let file = null;
  const form = html`<form>
  ${Object.assign(html`<input name=url>`, {value: initialUrl})}
  <button>Submit</button>
  ${Object.assign(html`<input data-type=file name=file type=file>`, {accept})}
`;
  form.onsubmit = event => {
    form.value = load(form.url.value);
    form.dispatchEvent(new CustomEvent("input"));
    event.preventDefault();
  };
  form.url.oninput = event => {
    event.stopPropagation();
  };
  form.file.oninput = () => {
    if (file !== null) URL.revokeObjectURL(file);
    file = URL.createObjectURL(form.file.files[0]);
    form.value = load(form.url.value = file);
  };
  if (initialUrl !== undefined) {
    form.value = load(initialUrl);
  }
  return form;
}
)}

function _imageInput(fileInput){return(
function imageInput({initialUrl, width, height, crossOrigin, accept = ".png,.jpg,.gif,.webp"}) {
  return fileInput({
    initialUrl,
    accept,
    load(url) {
      return new Promise((resolve, reject) => {
        const image = new Image;
        image.style.display = "block";
        if (width !== undefined) image.width = width;
        if (height !== undefined) image.height = height;
        if (crossOrigin !== undefined) image.crossOrigin = crossOrigin;
        image.onload = () => resolve(image);
        image.onerror = reject;
        image.src = url;
      });
    }
  });
}
)}

function _jsonInput(fileInput){return(
function jsonInput({initialUrl, init, accept = ".json"}) {
  return fileInput({
    initialUrl,
    accept,
    load(url) {
      return fetch(url, init).then(response => {
        if (!response.ok) throw new Error(response.status + " " + response.statusText);
        return response.json();
      });
    }
  });
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["beastie-boys.jpg", {url: new URL("./files/049d28b90a46079a7017946b2c23b9f8530d4e2d9cc49aa50c9b509067e24819af275341d5935584817c940946c5dea050d0826a9350a2aa657aa397a7581e42.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["points.json", {url: new URL("./files/bd9f1e7151bfd64d616ae6b7502a8d57b95f1d4b39e36185a0d9b1f31d1e45847b11bcbb6e3cab4bb766369d5e8926dbd686d4fb2a052330b39f0fc26dd47d86.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof image")).define("viewof image", ["imageInput","FileAttachment"], _image);
  main.variable(observer("image")).define("image", ["Generators", "viewof image"], (G, _) => G.input(_));
  main.variable(observer()).define(["image"], _3);
  main.variable(observer("viewof data")).define("viewof data", ["jsonInput","FileAttachment"], _data);
  main.variable(observer("data")).define("data", ["Generators", "viewof data"], (G, _) => G.input(_));
  main.variable(observer()).define(["data"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("fileInput")).define("fileInput", ["html"], _fileInput);
  main.variable(observer("imageInput")).define("imageInput", ["fileInput"], _imageInput);
  main.variable(observer("jsonInput")).define("jsonInput", ["fileInput"], _jsonInput);
  return main;
}
