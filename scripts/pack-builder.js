const path = require('path');
const glob = require('glob').sync;
const fs = require('fs-extra');

const iconBuilder = require('./icon-builder');

module.exports = async (config) => {
  const root = process.cwd();
  const dir = path.resolve(root, 'dist', config.id);
  
  fs.removeSync(dir);
  fs.ensureDirSync(dir);

  const a = config.files.map((p) => glob(p));
  const files = [].concat(...a);

  const iconb = iconBuilder(dir, config);

  const exportStr = await Promise.all(files.map(iconb));

  fs.writeFileSync(path.resolve(dir, 'index.js'), exportStr.join('\n'), 'utf8');
}