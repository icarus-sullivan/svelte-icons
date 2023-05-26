const fs = require('fs-extra');
const path = require('path');
const slim = require('@teleology/slim');
const cheerio = require('./cheerio');
const pascal = require('pascalcase');
const glob = require('glob').sync;

const { output, packages } = require('../manifest');

const BUILD_DIR = path.resolve(process.cwd(), output);
const ICON_TEMPLATE = `<script>
export let size = "1em"; 
export let width = size; 
export let height = size; 
export let fill = "{{attrs.fill}}";
export let stroke = "{{attrs.stroke}}";
export let strokeWidth = {{ attrs.strokeWidth || "undefined" }};
export let viewBox = "{{ attrs.viewBox || "0 0 24 24" }}"; 
export let ariaLabel = undefined; 
export let ariaHidden = undefined; 
export let desc = undefined; 
export let title = undefined;

let className = void 0;
export { className as class }
</script>

<svg {fill} {stroke} stroke-width={strokeWidth} class={className} {width} {height} {viewBox} aria-label={ariaLabel} aria-hidden={ariaHidden} xmlns="http://www.w3.org/2000/svg" on:click>
  {#if title} <title>{title}</title> {/if}
  {#if desc} <desc>{desc}</desc> {/if}
  {{data}}
</svg>`;
const ICON_EXPORT_TEMPLATE = `export { default as {{name}} } from './{{name}}.svelte';`;
const PACK_EXPORT_TEMPLATE = `export * from './{{id}}'`;

const processIcon = ({ iconDir, name, file }) => {
  const contents = fs.readFileSync(file, 'utf8');
  const { attrs, data } = cheerio(contents);

  // santizied
  const uncomment = data.replace(/<\!--.*?-->/gm, '')

  const outputFile = path.resolve(iconDir, `${name}.svelte`);
  const output = slim(ICON_TEMPLATE, { name, attrs, data: uncomment });

  fs.writeFileSync(outputFile, output, 'utf8');

  return slim(ICON_EXPORT_TEMPLATE, { name });
}

const parseFile = ({ id, file, formatter }) => {
  const { name } = path.parse(file);

  const name1 = formatter ? formatter({ name, file }) : name;
  return {
    name: pascal(`${id}-${name1}`),
    file,
  };
}

const processPackage = async (package) => {
  const files = [];
  for (const file of package.files) {
    let out;
    if (typeof file === 'string') {
      out = glob(file).map((file) => parseFile({ id: package.id, file }));
    } else {
      const { pattern, formatter } = file;
      out = glob(pattern).map((file) => parseFile({ id: package.id, file, formatter }));
    }
    files.push(out);
  }

  const allFiles = [].concat(...files);

  const names = allFiles.map((it) => it.name.toLowerCase());

  const deduplicatedFiles = allFiles.map((it, i) => {
    if (names.indexOf(it.name.toLowerCase()) !== i) {
      it.name = `${it.name}2`;
    }
    return it;
  });

  const iconDir = path.resolve(BUILD_DIR, package.id);
  fs.mkdirpSync(iconDir);

  const out = await Promise.all(deduplicatedFiles.map((it) => processIcon({ ...it, iconDir })));
  
  const outputFile = path.resolve(iconDir, 'index.js');
  const output = out.join('\n');
  fs.writeFileSync(outputFile, output, 'utf8');
  return slim(PACK_EXPORT_TEMPLATE, package);
}

(async () => {
  // build dir
  if (!fs.existsSync(BUILD_DIR)) {
    fs.mkdirpSync(BUILD_DIR);
  }

  const out = await Promise.all(packages.map(processPackage));
  const outputFile = path.resolve(BUILD_DIR, 'index.js');
  fs.writeFileSync(outputFile, out.join('\n'), 'utf8');
})();