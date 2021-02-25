module.exports = [
  {
    id: 'fi',
    name: 'Feather',
    url: 'https://feathericons.com/',
    license: 'MIT',
    license: 'https://github.com/feathericons/feather/blob/master/LICENSE',
    files: ['node_modules/feather-icons/dist/icons/*.svg'],
  },
  {
    id: 'md',
    name: 'Material Design icons',
    url: 'http://google.github.io/material-design-icons/',
    license: 'Apache License Version 2.0',
    licenseUrl:
      'https://github.com/google/material-design-icons/blob/master/LICENSE',
    files: ['node_modules/material-design-icons/*/svg/production/*_24px.svg'],
    formatter: (name) => name.replace(/Ic(\w+)24px/i, '$1'),
  },
];
