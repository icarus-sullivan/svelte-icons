const icons = require('feather-icons/dist/icons.json');
const fs = require('fs');
const path = require('path');

const title = (it) => it.slice(0, 1).toUpperCase() + it.slice(1);

const pascal = (name) => name.split('-').map(title).join('');

const wrap = (parts) => `<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">${parts}</svg>`;

const dir = path.resolve(__dirname, 'out');

const named = Object.keys(icons).reduce((a, b) => (a[b] = pascal(b), a), {});

// create export file
const exportCode = Object.values(named).map((n) => `export { default as ${n} } from './${n}.svelte';`).join('\n');
fs.writeFileSync(path.resolve(dir, 'index.js'), exportCode, 'utf8');

// create icons
Object.entries(named).forEach(([name, pasc]) => {
  fs.writeFileSync(path.resolve(dir, `${pasc}.svelete`), wrap(icons[name]), 'utf8');
});

