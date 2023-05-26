# svelte-iconz
A slim wrapper around numerous populare svg icons.
View the [catalogue](https://icarus-sullivan.github.io/svelte-iconz/)

## Installation
```shell
yarn add svelte-iconz
```

## Usage
Packs are split into separate paths. 

```javascript
import { FiX } from 'svelte-iconz/fi';

<FiX size="3em" stroke="blue"/>
```

## Properties
```javascript
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
```

## Packs

| Name   | Path   | License |
|--------|--------|---------|
| [Ant Design Icons](https://github.com/ant-design/ant-design-icons) | ai | MIT |
| [Bootstrap Icons](https://github.com/twbs/icons) | bs | MIT |
| [BoxIcons](https://github.com/atisawd/boxicons) | bx | CC BY 4.0 License |
| [Device Icons](https://github.com/vorillaz/devicons) | di | MIT |
| [Feather](https://feathericons.com/) | fi | MIT |
| [Font Awesome](https://fontawesome.com/) | fa | CC BY 4.0 License |
| [Game Icons](https://github.com/delacannon/game-icons-inverted) | gi | CC BY 3.0 |
| [Github Octicons](https://github.com/primer/octicons) | go | MIT |
| [Hero Icons](https://github.com/tailwindlabs/heroicons) | hi | MIT |
| [IcoMoon](https://github.com/Keyamoon/IcoMoon-Free) | im | CC BY 4.0 License |
| [Ionicons 5](https://github.com/ionic-team/ionicons) | io | MIT |
| [Material Design Icons](http://google.github.io/material-design-icons/) | md | Apache License Version 2.0 |
| [Remix Icons](https://github.com/Remix-Design/RemixIcon) | ri | Apache 2.0 |
| [Simple Icons](https://simpleicons.org/) | si | CC0 1.0 Universal |
| [Typeicons](https://github.com/stephenhutchings/typicons.font) | ti | CC BY 4.0 License |
| [VS Code Icons](https://github.com/microsoft/vscode-codicons) | vsc | CC BY 4.0 |
| [Weather Icons](https://github.com/erikflowers/weather-icons) | wi | MIT |
| [css.gg](https://github.com/astrit/css.gg) | cg | MIT |