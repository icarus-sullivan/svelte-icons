const configs = require('./config');
const packBuilder = require('./pack-builder');

(async () => {
  for (const config of configs) {
    await packBuilder(config);
  }
})();