const path = require('path');
const fs = require('fs-extra');
const cheerio = require('../utils/cheerio');
const svgo = require('../utils/svgo');

const icon_sanitize_contents = async ({ config, file }) => {
  let contents = fs.readFileSync(file);
  if (config.sanitize) {
    contents = await svgo(contents, file);
  }

  return contents;
};

const icon_build = (contents) => {
  const { svg_attributes, svg_contents } = cheerio(contents);

  return `<svg {...$$props} ${svg_attributes} style="min-width: 1em; min-height: 1em" on:click>${svg_contents}</svg>`;
};

module.exports = async ({ config, dir, file, name }) => {
  const outfile = path.resolve(dir, `${name}.svelte`);
  const contents = await icon_sanitize_contents({ config, file });
  const output = icon_build(contents);

  fs.writeFileSync(outfile, output, 'utf8');

  return `export { default as ${name} } from './${name}.svelte';`;
};
