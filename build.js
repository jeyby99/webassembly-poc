// Compiles hello.wat (text) into hello.wasm (binary) using the "wabt" library.
const fs = require("fs");
const wabt = require("wabt");

wabt().then((w) => {
  const module = w.parseWat("hello.wat", fs.readFileSync("hello.wat", "utf8"));
  const { buffer } = module.toBinary({});
  fs.writeFileSync("public/hello.wasm", buffer);
  console.log("Created public/hello.wasm (" + buffer.length + " bytes)");
});
