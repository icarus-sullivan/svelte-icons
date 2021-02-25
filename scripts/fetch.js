const path = require('path');
const pascal = require('pascalcase');
const glob = require('glob').sync;
const fs = require('fs-extra');

const { svgo } = require('./svgo');

const config = {
  "id": "fi",
  "name": "Feather",
  url: "https://feathericons.com/",
  license: "MIT",
  license: "https://github.com/feathericons/feather/blob/master/LICENSE",
  "files": [
    'node_modules/feather-icons/dist/icons/*.svg',
  ],
  "steps": [

  ],
  "sanitize": true
};

// before - ensure id dir

// running name of components 

// create pascal case of name
// read file
// svgo it
// expose as component

// after write index.js

const root = process.cwd();
const dir = path.resolve(root, 'dist', config.id);
fs.ensureDirSync(dir);

let names = [];

const doit = async (file) => {
  const { name } = path.parse(file);
  const pascald = pascal(`${config.id}-${name}`);

  names.push(
    `export { default as ${pascald} } from './${pascald}.svelte';`
  );

  const contents = fs.readFileSync(file, 'utf8');

  if (config.sanitize) {
    const { data } = await svgo.optimize(contents);
    fs.writeFileSync(
      path.resolve(dir, `${pascald}.svelte`),
      data,
      'utf8'
    );
  } else {
    fs.copyFileSync(
      file,
      path.resolve(dir, `${pascald}.svelte`)
    );
  }
}

(async () => {
  const files = glob(config.files[0]);

  await Promise.all(
    files.map(doit)
  );

  fs.writeFileSync(
    path.resolve(dir, 'index.js'),
    names.join('\n'),
    'utf8'
  );
})();