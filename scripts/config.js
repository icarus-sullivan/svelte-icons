module.exports = [
  {
    id: 'bs',
    name: 'Bootstrap Icons',
    files: [
      {
        pattern: 'node_modules/bootstrap-icons/icons/*!(-reverse)-fill.svg',
        formatter: (name) => `Fill${name}`,
      },
      {
        pattern: 'node_modules/bootstrap-icons/icons/*-reverse!(-fill).svg',
        formatter: (name) => `Reverse${name}`,
      },
      {
        pattern:
          'node_modules/bootstrap-icons/icons/*!(-fill|-reverse|reverse-).svg',
      },
    ],
    url: 'https://github.com/twbs/icons',
    license: 'MIT',
    licenseUrl: 'https://opensource.org/licenses/MIT',
  },
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
    files: [
      {
        pattern:
          'node_modules/material-design-icons/*/svg/production/*_24px.svg',
        formatter: (name) => name.replace(/Ic(\w+)24px/i, '$1'),
      },
    ],
  },
  {
    id: 'bx',
    name: 'BoxIcons',
    files: [
      {
        pattern: 'node_modules/boxicons/svg/regular/*.svg',
        formatter: (name) => name.replace('bx', ''),
      },
    ],
    url: 'https://github.com/atisawd/boxicons',
    license: 'CC BY 4.0 License',
  },
  {
    id: 'cg',
    name: 'css.gg',
    files: ['node_modules/cssgo/icons/svg/*.svg'],
    url: 'https://github.com/astrit/css.gg',
    license: 'MIT',
    licenseUrl: 'https://opensource.org/licenses/MIT',
  },
  {
    id: 'vsc',
    name: 'VS Code Icons',
    url: 'https://github.com/microsoft/vscode-codicons',
    license: 'CC BY 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    files: ['node_modules/vscode/src/icons/*.svg'],
  },
];
