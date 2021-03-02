const path = require('path');
const pascal = require('pascalcase');
const fs = require('fs-extra');

const withDefaults = require('./icon-creator');
const svgo = require('./svgo');

const DEFAULT_FORMATTER = pascal;

module.exports = (dist, config) => async (file) => {
  const { name } = path.parse(file);

  const name1 = config.formatter ? config.formatter(name) : name;
  const formattedName = DEFAULT_FORMATTER(`${config.id}-${name1}`);

  let contents = fs.readFileSync(file);

  if (config.sanitize) {
    contents = await svgo(contents, file); 
  }

  fs.writeFileSync(
    path.resolve(dist, `${formattedName}.svelte`),
    withDefaults(contents),
    'utf8',
  );
  return `export { default as ${formattedName} } from './${formattedName}.svelte';`;
};
