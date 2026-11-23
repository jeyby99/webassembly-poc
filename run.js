// Runs the WebAssembly module in Node.js and prints the message.
const fs = require("fs");

const bytes = fs.readFileSync("public/hello.wasm");
WebAssembly.instantiate(bytes).then(({ instance }) => {
  const { memory, length } = instance.exports;
  const text = new TextDecoder().decode(new Uint8Array(memory.buffer, 0, length()));
  console.log(text);
});
