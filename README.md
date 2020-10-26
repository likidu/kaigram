# Kaigram

A Telegram for your KaiOS device

---

Tested using Firefox 59 with asm.js enabled.

## Build

### TDLib

WSL2 with Ubuntu 20.04, using Clang.

* Install build environment

    ```bash
    sudo apt update && sudo apt upgrade -y
    sudo apt install -y make git zlib1g-dev libssl-dev gperf php clang-10 libc++-dev libc++abi-dev
    ```

* Install latest CMake from [https://apt.kitware.com/](https://apt.kitware.com/)

* Build TDLib

    ```bash
    gh repo clone tdlib/td.git

    cd td

    rm -rf build && mkdir build && cd build

    export CXXFLAGS="-stdlib=libc++"

    CC=/usr/bin/clang-10 CXX=/usr/bin/clang++-10 cmake -G "Ninja" -DCMAKE_BUILD_TYPE=Release -DCMAKE_INSTALL_PREFIX:PATH=../tdlib ..

    cmake --build . --target 
    
    cd ../..

    ls -l td/tdlib
    ```

### TDWeb with only ASM.js

Refer to the `tdlib/example/web` [README](https://github.com/tdlib/td/tree/master/example/web) to build the **tdweb** for **asm.js**

* Install [Emscripten SDK](https://github.com/emscripten-core/emsdk)

    ```bash
    gh repo clone emscripten-core/emsdk

    cd emsdk

    ./emsdk install 2.0.6

    ./emsdk activate 2.0.6

    source ./emsdk_env.sh
    ```

* Comment out those WASM lines in `build-tdlib.sh` and `copy-tdlib.sh`.

* Comment out those WASM lines in [`tdweb/src/worker.js`](https://github.com/tdlib/td/blob/master/example/web/tdweb/src/worker.js). Also remember to update the default mode:

    ```js
    # From
    const mode = options.mode || 'wasm';
    # To
    const mode = options.mode || 'asmjs';
    ```

* Change `packages.json` to enable ASM.js by default:

    ```js
    # From
    "WebAssembly": true
    # To
    "WebAssembly": false
    ```

* Edit `build-openssl.sh` to use OpenSSL v1.1.1h, and also applies to `build-tdlib.sh` as it looks the 1.1.0j could not find the `bn.h` file.

* Build the tdweb with only ASM.js support

    ```bash
    cd <path to TDLib sources>/example/web

    ./build-openssl.sh

    CC=/usr/bin/clang-10 CXX=/usr/bin/clang++-10 ./build-tdlib.sh

    ./copy-tdlib.sh

    ./build-tdweb.sh
    ```

* The built package is now located in the `tdweb` directory.


### tdweb

_Looking for a shareable component template? Go here --> [sveltejs/component-template](https://github.com/sveltejs/component-template)_

---

# svelte app

This is a project template for [Svelte](https://svelte.dev) apps. It lives at https://github.com/sveltejs/template.

To create a new project based on this template using [degit](https://github.com/Rich-Harris/degit):

```bash
npx degit sveltejs/template svelte-app
cd svelte-app
```

_Note that you will need to have [Node.js](https://nodejs.org) installed._

## Patch TDWeb

Modify `node_modules/tdweb/dist/130f0ecf36ff90c87239.worker.js`

```javascript
mode = options.mode || 'wasm';

# to

mode = options.mode || 'asmjs';
```

## Get started

Install the dependencies...

```bash
cd svelte-app
npm install
```

...then start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.

By default, the server will only respond to requests from localhost. To allow connections from other computers, edit the `sirv` commands in package.json to include the option `--host 0.0.0.0`.

## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```

You can run the newly built app with `npm run start`. This uses [sirv](https://github.com/lukeed/sirv), which is included in your package.json's `dependencies` so that the app will work when you deploy to platforms like [Heroku](https://heroku.com).

## Single-page app mode

By default, sirv will only respond to requests that match files in `public`. This is to maximise compatibility with static fileservers, allowing you to deploy your app anywhere.

If you're building a single-page app (SPA) with multiple routes, sirv needs to be able to respond to requests for _any_ path. You can make it so by editing the `"start"` command in package.json:

```js
"start": "sirv public --single"
```

## Using TypeScript

This template comes with a script to set up a TypeScript development environment, you can run it immediately after cloning the template with:

```bash
node scripts/setupTypeScript.js
```

Or remove the script via:

```bash
rm scripts/setupTypeScript.js
```

## Deploying to the web

### With [Vercel](https://vercel.com)

Install `vercel` if you haven't already:

```bash
npm install -g vercel
```

Then, from within your project folder:

```bash
cd public
vercel deploy --name my-project
```

### With [surge](https://surge.sh/)

Install `surge` if you haven't already:

```bash
npm install -g surge
```

Then, from within your project folder:

```bash
npm run build
surge public my-project.surge.sh
```
