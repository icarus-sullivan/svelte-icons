const path = require('path');
const glob = require('glob').sync;
const fs = require('fs-extra');

const iconBuilder = require('./icon-builder');

module.exports = async (config) => {
  const root = process.cwd();
  const dir = path.resolve(root, config.id);
  
  fs.removeSync(dir);
  fs.ensureDirSync(dir);

  const a = config.files.map((p) => glob(p));
  const files = [].concat(...a);

  const iconb = iconBuilder(dir, config);

  const exportedStrings = await Promise.all(files.map(iconb));

  const uniqueExportedStrings = exportedStrings.filter((a, i, self) => self.indexOf(a) === i);

  fs.writeFileSync(path.resolve(dir, 'index.js'), uniqueExportedStrings.join('\n'), 'utf8');
}