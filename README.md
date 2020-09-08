# webpack-symlink-plugin
A webpack plugin to make symlink of other directory in source directory before compilation.

## Installation

```bash
npm i -D @zhuyin/webpack-symlink-plugin
```

## Usage

```js
// declare
new SymlinkPlugin(sources: {
  from: string; // source
  to: string; // symlink
  force: boolean = false; // always create symlink to from whatever exist
  type: 'file' | 'dir' | 'junction' = 'junction'; // symlink type for windows, used by fs.symlinkSync()
}[] = [], options: {
  stats: boolean = false
})

```

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
      { from: 'index.html', to: '200.html' },
      { from: 'index.html', to: '404.html' },
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
      { from: 'index.html', to: '200.html', force: true },
      { from: 'index.html', to: '404.html' },
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
      { from: 'index.html', to: '200.html' },
      { from: 'index.html', to: '404.html' },
    ], { stats: true })
  ]
};
```