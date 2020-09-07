import { existsSync, lstatSync, readlinkSync, symlinkSync, unlinkSync } from 'fs';
import { mkdirsSync } from 'fs-extra';
import { relative, resolve, dirname } from 'path';

class SymlinkPlugin {
  constructor(config = [], options = {stats: false}) {
    this.sources = Array.isArray(config) ? config : [config];
    this.options = options || {};
  }

  apply(compiler) {
    const pluginName = this.constructor.name;

    compiler.hooks.thisCompilation.tap(pluginName, (compilation) => {
      const logger = (compilation.getLogger && this.options.stats) ? compilation.getLogger('webpack-symlink-plugin') : console;

      logger.debug('start to create symlinks.');

      const baseDir = process.cwd();
      this.sources.forEach(source => {
        let { from, to } = source;
        from = resolve(baseDir, from);
        to = resolve(baseDir, to);

        if (source.force || existsSync(from)) {
          const relativePath = relative(dirname(to), from);
          // create target dirs
          mkdirsSync(dirname(to));
          process.chdir(dirname(to));
          // create symlink
          let created = false;
          
          if (existsSync(to)) {
            // check exist symlink
            const stats = lstatSync(to);
            if (stats.isSymbolicLink()) {
              const oldPath = readlinkSync(to);
              if (resolve(dirname(to), oldPath) !== from) {
                logger.info(`delete symlink ${to} -> ${oldPath}`);
                unlinkSync(to);
              } else {
                logger.info(`symlink: ${to} -> ${from} already exist`);
                created = true;
              }
            } else {
              throw new Error(`failed to create symlink: ${to} -> ${from}, ${to} already exist.`);
            }
          } else {
            try {
              // delete broken symlink
              unlinkSync(to);
            } catch (e) {
            }
          }

          if (!created) {
            logger.info(`create symlink: ${to} -> ${from}`);
            symlinkSync(relativePath, to);
          }
        } else {
          logger.warn(`failed to create symlink: ${to} -> ${from}, ${from} doesn't exist.`);
        }
      });
      // restore to base dir
      process.chdir(baseDir);
    });
  }
}

module.exports = SymlinkPlugin;