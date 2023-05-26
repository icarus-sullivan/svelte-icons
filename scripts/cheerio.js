const cheerio = require('cheerio');

const keyValueToAttributes = ([k, v]) => `${k}="${v}"`;

module.exports = (contents) => {
  const $ = cheerio.load(contents, { xmlMode: true });

  const { attribs } = $('svg')[0];

  delete attribs.class;
  delete attribs.style;

  return {
    attrs: {
      viewBox: attribs?.viewBox,
      strokeWidth: attribs?.['stroke-width'],
      fill: attribs?.fill || "currentColor",
      stroke: attribs?.stroke || "currentColor",
    },
    data: $('svg').html().trim(),
  };
};
