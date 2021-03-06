const fs = require('fs');

const base = fs.readFileSync('readme_template.md', 'utf8');
const { packages } = require('./config');

const replacement = packages.map(
  ({ id, name, license }) => `| ${[name, id, license].join(' | ')} |`,
);

const out = base.replace('{{}}', replacement.join('\n'));

fs.writeFileSync('README.md', out, 'utf8');