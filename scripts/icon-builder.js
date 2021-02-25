const path = require('path');
const pascal = require('pascalcase');
const fs = require('fs-extra');

const svgo = require('./svgo');

const DEFAULT_FORMATTER = pascal;

module.exports = (dist, config) => async (file) => {
  const { name } = path.parse(file);

  const name1 = config.formatter ? config.formatter(name) : name;
  const formattedName = DEFAULT_FORMATTER(`${config.id}-${name1}`);

  if (config.sanitize) {
    const data = await svgo(file);
    fs.writeFileSync(
      path.resolve(dist, `${formattedName}.svelte`),
      data,
      'utf8',
    );
  } else {
    fs.copyFileSync(file, path.resolve(dist, `${formattedName}.svelte`));
  }

  return `export { default as ${formattedName} } from './${formattedName}.svelte';`;
};
