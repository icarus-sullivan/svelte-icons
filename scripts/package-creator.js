const fs = require('fs-extra');
const path = require('path');
const rootPackge = require('../package.json');

module.exports = ({ BUILD_DIR }) =>
  fs.writeFileSync(
    path.resolve(BUILD_DIR, 'package.json'),
    JSON.stringify(
      {
        name: 'svelte-iconz',
        version: rootPackge.version,
        main: 'index.js',
        license: 'MIT',
        author: 'Chris Sullivan <chrissullivan.dev@gmail.com>',
      },
      null,
      2,
    ),
    'utf8',
  );
