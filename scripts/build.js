const configs = require('./config');
const packBuilder = require('./pack-builder');
const fs = require('fs');

const main = [];

const createPack = async (config) => {
  if (config.ignore) return '';

  await packBuilder(config);
  return `export * from '../${config.id}';`;
};

(async () => {
  !fs.existsSync('lib') && fs.mkdirSync('lib');

  const main = await Promise.all(configs.map(createPack));

  fs.writeFileSync(
    'lib/index.js',
    main.join('\n'),
    'utf8'
  );
})();
