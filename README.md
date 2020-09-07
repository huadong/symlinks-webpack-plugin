# webpack-symlink-plugin
A webpack plugin to make symlink of other directory in source directory before compilation.

## Installation

```bash
npm i -D @zhuyin/webpack-symlink-plugin
```

## Usage

In your webpack config:

```js
const SymlinkPlugin = require('webpack-symlink-plugin');

module.exports = {
  // ...etc
  plugins: [
    new SymlinkPlugin({ from: 'index.html', to: '200.html' })
  ]
};
```

This setting makes symbolic link file `[project_root]/200.html` to `[project_root]/index.html`.

### You can give configurations as Array

```js
const SymlinkPlugin = require('webpack-symlink-plugin');

module.exports = {
  // ...etc
  plugins: [
    new SymlinkPlugin([
      { origin: 'index.html', symlink: '200.html' },
      { origin: 'index.html', symlink: '404.html' },
    ])
  ]
};
```

### `force` option (default: `false`)
print logs to stats instead of console.

```js
const SymlinkPlugin = require('webpack-symlink-plugin');

module.exports = {
  // ...etc
  plugins: [
    new SymlinkWebpackPlugin([
      { origin: 'index.html', symlink: '200.html', force: true },
      { origin: 'index.html', symlink: '404.html' },
    ], { stats: true })
  ]
};
```

The plugin doesn't make the symlink if the destination doesn't exist as default.
Passing the option `force: true`, will create it regardless.

### `stats` option (default: `false`)
print logs to stats instead of console.

```js
const SymlinkPlugin = require('webpack-symlink-plugin');

module.exports = {
  // ...etc
  plugins: [
    new SymlinkWebpackPlugin([
      { origin: 'index.html', symlink: '200.html' },
      { origin: 'index.html', symlink: '404.html' },
    ], { stats: true })
  ]
};
```