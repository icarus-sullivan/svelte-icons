const configs = require('./config');
const packBuilder = require('./pack-builder');
const fs = require('fs');

const main = [];

(async () => {
  !fs.existsSync('lib') && fs.mkdirSync('lib');

  for (const config of configs) {
    await packBuilder(config);
    main.push(`export * from '../${config.id}';`);
  }

  fs.writeFileSync(
    'lib/index.js',
    main.join('\n'),
    'utf8'
  );
})();
