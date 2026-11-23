# WebAssembly POC

The most basic proof of concept: a **"Hello, World!"** written in WebAssembly and read from JavaScript.

## 1. What is WebAssembly?

WebAssembly (Wasm) is a low-level binary instruction format that runs in a sandboxed virtual machine. It is a compilation target: you write code in languages such as C, C++, Rust or Go, compile it to a `.wasm` file, and run it at near-native speed in web browsers and other runtimes. It is a W3C standard, supported by all major browsers (Chrome, Firefox, Safari, Edge).

It does not replace JavaScript. It works next to it: JavaScript loads the `.wasm` module and calls its functions.

## 2. How does it work?

```
Source code (C / Rust / WAT) --(compiler)--> .wasm file --(browser or runtime)--> runs in a sandbox
                                                                 ^
                                                          JavaScript loads and calls it
```

- **Binary format (`.wasm`)**: compact and fast to download and parse.
- **Text format (`.wat`)**: a human-readable version of the same code, which is what we use here.
- **Sandbox**: a module cannot touch the system. It only has access to what JavaScript gives it.
- **Linear memory**: a block of bytes shared with JavaScript. Wasm only has numeric types, so text is stored as bytes in memory and JavaScript reads it.
- **Exports**: functions and memory that the module offers to the outside.

## 3. Where can we use it?

- **Heavy computation in the browser**: video and image editing, games, 3D, CAD (for example Figma and Google Earth).
- **Reusing existing code**: running C/C++/Rust libraries on the web (for example SQLite, FFmpeg, AutoCAD Web).
- **Servers and edge computing**: Cloudflare Workers, Fastly Compute, Fermyon Spin.
- **Plugins**: safe, portable extensions (for example Envoy proxy filters).
- **Outside the browser**: runtimes like Wasmtime and Wasmer, and WASI (the WebAssembly System Interface) let Wasm run anywhere.

## 4. Who created it and who uses it?

- **Creators**: designed by engineers from **Mozilla, Google, Microsoft and Apple**, building on Mozilla's asm.js and Google's Native Client. Key names include Luke Wagner and Alon Zakai (Mozilla). The first public version (MVP) shipped in all major browsers in 2017.
- **Standard**: developed by the W3C WebAssembly Working Group. It became an official W3C Recommendation in December 2019.
- **Who uses it**: Figma, Google (Earth, Meet), Adobe (Photoshop on the web), Autodesk, Cloudflare, Shopify and many others.

## 5. The POC

### Project structure

```
webassembly-poc/
├── hello.wat          # source code (WebAssembly text format)
├── build.js           # compiles hello.wat -> public/hello.wasm
├── run.js             # runs the module in Node.js
├── server.js          # tiny web server for the browser demo
└── public/
    ├── hello.wasm     # compiled module (binary)
    └── index.html     # browser demo
```

### The code (`hello.wat`)

```wat
(module
  (memory (export "memory") 1)                 ;; 64 KB of memory shared with JavaScript
  (data (i32.const 0) "Hello, World!")         ;; store the text at address 0
  (func (export "length") (result i32)         ;; function that returns the text length
    i32.const 13)
)
```

The JavaScript side reads those bytes from memory and turns them into a string:

```js
const { memory, length } = instance.exports;
const text = new TextDecoder().decode(new Uint8Array(memory.buffer, 0, length()));
```

### Requirements

- [Node.js](https://nodejs.org/) 18 or newer.

### Run it

1. Install the dependency (`wabt`, the tool that compiles `.wat` to `.wasm`):

   ```bash
   npm install
   ```

2. Compile the module (this already exists in `public/hello.wasm`, so this step is optional):

   ```bash
   npm run build
   ```

3. Run it in Node.js:

   ```bash
   npm start
   ```

   Output:

   ```
   Hello, World!
   ```

4. Run it in the browser:

   ```bash
   npm run serve
   ```

   Open <http://localhost:8080>. The page shows **Hello, World!**, read from the WebAssembly module.

## References

- WebAssembly: <https://webassembly.org/>
- MDN guide: <https://developer.mozilla.org/en-US/docs/WebAssembly>
- W3C specification: <https://www.w3.org/TR/wasm-core-2/>
