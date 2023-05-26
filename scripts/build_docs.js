const fs = require('fs');
const slim = require('@teleology/slim');
const orderby = require('lodash.orderby');

const README_TEMPLATE = `# svelte-iconz
A slim wrapper around numerous populare svg icons.
View the [catalogue](https://icarus-sullivan.github.io/svelte-iconz/)

## Installation
\`\`\`shell
yarn add svelte-iconz
\`\`\`

## Usage
Packs are split into separate paths. 

\`\`\`javascript
import { FiX } from 'svelte-iconz/fi';

<FiX size="3em" stroke="blue"/>
\`\`\`

## Properties
\`\`\`javascript
export let size = "1em"; 
export let width = size; 
export let height = size; 
export let fill = string
export let stroke = string
export let strokeWidth = string
export let viewBox = "0 0 24 24" // default unless defined by svg 
export let ariaLabel = undefined; 
export let ariaHidden = undefined; 
export let desc = undefined; 
export let title = undefined;
\`\`\`

## Packs

| Name   | Path   | License |
|--------|--------|---------|
{{icons}}`;

const { packages } = require('../manifest');

const replacement = orderby(packages, ['name']).map(
  ({ id, url, name, license }) => {
    const link = `[${name}](${url})`;
    return `| ${[link, id, license].join(' | ')} |`;
  },
);

const out = slim(README_TEMPLATE, {
  icons: replacement.join('\n')
});

fs.writeFileSync('README.md', out, 'utf8');