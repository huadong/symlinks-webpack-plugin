import { existsSync, statSync, readlinkSync, symlinkSync, unlinkSync } from 'fs';
import { mkdirsSync } from 'fs-extra';
import { relative, resolve, dirname } from 'path';

class SymlinkPlugin {
  constructor(config = []) {
    this.sources = Array.isArray(config) ? config : [config];
  }

  apply(compiler) {
    const pluginName = this.constructor.name;

    compiler.hooks.thisCompilation.tap(pluginName, (compilation) => {
      const logger = compilation.getLogger ? compilation.getLogger('webpack-symlink-plugin') : console;

      logger.debug('start to create symlinks.');

      const baseDir = process.cwd();
      this.sources.forEach(source => {
        let { from, to } = source;
        from = resolve(baseDir, from);
        to = resolve(baseDir, to);

        const relativePath = relative(dirname(to), from);
        // create target dirs
        mkdirsSync(dirname(to));
        process.chdir(dirname(to));
        // create symlink
        let created = false;
        if (existsSync(to)) {
          if (statSync(to).isSymbolicLink()) {
            // check exist symlink
            const oldPath = readlinkSync(to);
            if (resolve(dirname(to), oldPath) !== from) {
              unlinkSync(to);
            } else {
              created = true;
            }
          } else {
            throw new Error(`failed create symlink: ${to} -> ${from}, ${to} already exists.`);
          }
        } 
        if (!created) {
          logger.info(`sreate symlink: ${to} -> ${from}`);
          symlinkSync(relativePath, to);
        }
      });
      // restore to base dir
      process.chdir(baseDir);
    });
  }
}

module.exports = SymlinkPlugin;