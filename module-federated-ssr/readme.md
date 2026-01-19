# SSR with Webpack Module Federation

## Description

3 apps in total:

`shell` is the host application and will also have the SSR server.

`remote1` and `remote2` are 2 remote MFEs that expose separate components.




## Shell

We are building a **Webpack-based Federated MFE**.

Modern Babel and Webpack now handle many features natively and therefore, I am freeing all froms of "bloat" and listing down the usage of the **8 essential packages** that we need to keep our build clean and functional:

### 1. The Core Build Engine

* **`webpack`**: The bundler that links your modules and manages the Module Federation logic.
* **`webpack-cli`**: Required to actually run Webpack commands (like `webpack serve`).
* **`webpack-merge`**: Essential for MFEs to keep your `common`, `dev`, and `prod` configurations organized without repeating code.

### 2. The Babel Translation Layer

* **`@babel/core`**: The actual engine that transforms your code.
* **`babel-loader`**: The piece that plugs Babel into Webpack’s build pipeline.
* **`@babel/preset-env`**: Handles modern JavaScript. It has now swallowed most of those "proposal" plugins (like class properties and rest/spread), so you don't need them individually anymore.
* **`@babel/preset-react`**: Required to turn your JSX into readable JavaScript for the browser.

### 3. The MFE Specialist

* **`@module-federation/node`**: Keep this **only if** you are doing Server-Side Rendering (SSR). If your MFE is purely client-side (runs only in the browser), you can delete this.

---

### 🗑️ What has gone irrelevant and why

| Package | Why it's dead weight |
| --- | --- |
| **`@babel/polyfill`** | Replaced by `core-js`. Most modern MFE targets don't even need it. |
| **`@babel/node`** | Only used for running CLI scripts with Babel; Webpack doesn't use it. |
| **`@babel/cli`** | You are using `webpack-cli` to trigger the build, so you don't need the Babel standalone CLI. |
| **`@babel/plugin-proposal-*`** | All 3 on your list (Class Properties, JSON strings, Rest/Spread) are now **included by default** in `@babel/preset-env`. |
| **`@babel/plugin-syntax-*`** | Dynamic imports and import meta are now natively supported by Webpack 5 and modern Babel; no extra plugins required. |
| **`rimraf`** | Webpack 5 has a built-in feature: `output: { clean: true }`. You no longer need a separate package to delete your `dist` folder. |

### Your Modernized `babel.config.json`

With these essentials, your config becomes much shorter and easier to maintain:

```json
{
  "presets": [
    "@babel/preset-env",
    ["@babel/preset-react", { "runtime": "automatic" }]
  ]
}

```

*(Note: `runtime: automatic` is important. It's what allows you to write React code without having to put `import React from 'react'` at the top of every single file.)*

— — — — — — — — — — —
