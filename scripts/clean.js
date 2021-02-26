const fs = require('fs-extra');

const files = [
  'fi',
  'md',
  'lib'
];

for (const file of files)  {
  if (fs.existsSync(file)) {
    fs.rmdirSync(file);
  }
}