;; Hello World in WebAssembly (text format, WAT)
(module
  ;; One page (64 KB) of memory, shared with JavaScript
  (memory (export "memory") 1)

  ;; Store the string "Hello, World!" at address 0
  (data (i32.const 0) "Hello, World!")

  ;; Function that returns the length of the string (13)
  (func (export "length") (result i32)
    i32.const 13)
)
