const configs = require('./config');
const path = require('path');
const fs = require('fs-extra');

const CWD = process.cwd();

const clean_directories = [
  ...configs.map((it) => it.id),
  'lib',
];

clean_directories.map((file) => fs.removeSync(path.resolve(CWD, file)));
