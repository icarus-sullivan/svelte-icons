const cheerio = require('cheerio');

module.exports = (contents) => {
  const $ = cheerio.load(contents, { xmlMode: true });

  const { attribs } = $('svg')[0];

  const attrs = {
    stroke: 'currentColor',
    fill: 'currentColor',
    ['stroke-width']: 0,
    ...attribs,
    height: '1em',
    width: '1em',
    xmlns: "http://www.w3.org/2000/svg"
  }
  
  delete attrs['class'];
  delete attrs['style'];

  const svgAttrs = Object.entries(attrs).map(([k, v]) => `${k}="${v}"`).join(' ');
  const childContent = $('svg').html();
  return `<style>
  svg { min-width: 1em; min-height: 1em; }  
</style>
<script>
  let className = '';
  export { className as class };
</script>
<svg ${svgAttrs} class={className} on:click>
  ${childContent}
</svg>`;
}