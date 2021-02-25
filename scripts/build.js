const configs = require('./config');
const packBuilder = require('./pack-builder');
const fs = require('fs');

const main = [];

(async () => {
  for (const config of configs) {
    await packBuilder(config);
    main.push(`export * from './${config.id}';`);
  }

  fs.writeFileSync(
    'index.js',
    main.join('\n'),
    'utf8'
  );
})();
