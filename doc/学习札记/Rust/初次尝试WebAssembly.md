# 初次尝试WebAssembly

在学习Rust和前端的过程中，时不时会接触到与WebAssembly相关的内容，逐渐地也就对这门技术好奇了起来，今天终于下定决心来尝试一下。

以下内容主要参考了这本[《WebAssembly in Rust》](https://rustwasm.github.io/docs/book/introduction.html)中的新手教程，教程中前端用的是npm+webpack，我这里用的是pnpm+vite，所以有些地方需要做些调整。

## 前置工作

工欲善其事，必先利其器，捣鼓WebAssembly首先当然是要安装相关的工具和依赖了。Rust和pnpm的安装就不赘述了，具体可以参考[《Rust中文文档》](https://www.rust-lang.org/zh-CN/install.html)和[《pnpm中文文档》](https://pnpm.io/zh/installation)。

搞定Rust和pnpm之后，接着用`cargo install`命令分别安装wasm-pack和cargo-generate，前者主要用于构建、测试和发行WebAssembly文件，非常非常重要，后者主要用于快速生成Rust项目的模板，如果想自己一步步搭建项目，可以不安装。

```bash
cargo install wasm-pack
cargo install cargo-generate
```

## 创建项目

说是创建项目，实际上就是用`cargo generate`从github拉取一个项目模板，简直保姆级贴心有木有！

```bash
cargo generate --git https://github.com/rustwasm/wasm-pack-template
```

项目构成大体上就是一个lib包，核心文件就是这个`src/lib.rs`，目前版本模板文件内容与教程中有些许不同，但不影响后续操作。

lib.rs文件内容如下，其中`greet`函数被我稍微改了下：

```rust
mod utils;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str) {
    alert(&format!("Hello, {}!", name));
}
```

## 构建WebAssembly文件

本以为构建WebAssembly文件会比较复杂，但实际上一条命令就可以搞定，感谢各位大佬辛勤制作的工具链！

```bash
wasm-pack build
```

如果构建不出错，那么就可以在项目根目录看到`pkg`文件夹，这就是我们需要的构建产物啦。

## 运行WebAssembly文件

WebAssembly文件既然已经有了，接着只要搞个运行时就OK了，这里跟着教程走用浏览器当运行时。

用vite创建一个项目，因为只是体验一下，我选的是原生+js+pnpm。

接下来，到`package.json`中添加本地依赖，也就是`pkg`文件夹，添加后的`package.json`文件内容如下：

```json
{
  "name": "game-of-life",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "wasm-game-of-life": "file:../pkg"
  },
  "devDependencies": {
    "vite": "^5.2.0",
    "vite-plugin-wasm": "^3.3.0"
  }
}
```

再接着到`main.js`中文件引入我们在lib.rs中定义的`greet`函数，并调用它，大体内容如下：

```javascript
import * as wasm from "wasm-game-of-life";

wasm.greet('yomiko451');
```

然后就是重点了，vite目前不直接支持wasm，所以需要安装一个叫`vite-plugin-wasm`的插件，安装完成后在vite配置文件（没有就在前端根目录新建一个）中添加如下内容：

```javascript
import wasm from "vite-plugin-wasm";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [
        wasm()
    ]
});
```

配置完成后，直接运行`pnpm install`+`pnpm run dev`，OHHHHHH！顺利跑起来了！不过按照教程上说，在配置完成后，如果修改Lib.rs中的函数内容，只要用wasm-pack重新构建一下前端就可以同步修改，但我这边并不行，重新构建后还需要手动删了node_modules中的相应文件夹再重新执行`pnpm install`，然后浏览器页面需要ctrl+f5刷新才行，感觉是哪里没有配置好导致不能热加载。嘛，人生不如意十有八九啦！等什么时候有时间了来具体研究下。
