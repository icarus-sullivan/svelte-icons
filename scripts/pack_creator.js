const { output, packages } = require('./config');
const path = require('path');
const fs = require('fs-extra');
const pascal = require('pascalcase');
const glob = require('glob').sync;
const icon_creator = require('./icon_creator');

const create_npm_package = require('./package-creator');

const BUILD_DIR = path.resolve(process.cwd(), output);

const pack_directory_create = (config) => {
  const dir = path.resolve(BUILD_DIR, config.id);

  fs.removeSync(dir);
  fs.ensureDirSync(dir);
  return dir;
};

const pack_get_file_params = ({ id, formatter, file }) => {
  const { name } = path.parse(file);

  const name1 = formatter ? formatter(name) : name;
  return {
    name: pascal(`${id}-${name1}`),
    file,
  };
};

const pack_get_file_search_args = (it) => {
  if (typeof it !== 'string') {
    const { formatter, pattern } = it;
    return {
      formatter,
      pattern,
    };
  }

  return {
    pattern: it,
  };
};

const pack_get_files = (config) => {
  const files = [];
  for (const it of config.files) {
    const { formatter, pattern } = pack_get_file_search_args(it);
    const sub_files = glob(pattern).map((file) =>
      pack_get_file_params({ id: config.id, formatter, file }),
    );

    files.push(sub_files);
  }

  return [].concat(...files);
};

const pack_create = async (config) => {
  if (config.ignore) return '';

  const dir = pack_directory_create(config);
  const files = pack_get_files(config);

  const exports = await Promise.all(
    files.map((options) => icon_creator({ config, dir, ...options })),
  );

  // const { files: _, ...rest } = config;
  // exports.push(`export default ${JSON.stringify(rest)}`);

  // ensure uniqueness
  const unique_exports = exports.filter((a, i, self) => self.indexOf(a) === i);

  const pack_index_file = path.resolve(dir, 'index.js');
  fs.writeFileSync(pack_index_file, unique_exports.join('\n'), 'utf8');

  return `export * from './${config.id}';`;
};

(async () => {
  !fs.existsSync(BUILD_DIR) && fs.mkdirSync(BUILD_DIR);

  const exports = await Promise.all(packages.map(pack_create));

  const packs_index_file = path.resolve(BUILD_DIR, 'index.js');
  fs.writeFileSync(packs_index_file, exports.join('\n'), 'utf8');

  create_npm_package({ BUILD_DIR });
})();
