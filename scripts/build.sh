#! /bin/bash
#
# Run build

# Clean up old build
rm -rf build 

# Install node_modules
yarn --frozen-lockfile

# Clone non-modules
function clone() {
  rm -rf node_modules/$1 ; mkdir node_modules/$1
  git clone $2 node_modules/$1
}

clone vscode https://github.com/microsoft/vscode-codicons.git &

clone cssgo https://github.com/astrit/css.gg.git &

clone boxicons https://github.com/atisawd/boxicons.git &

clone icomoon https://github.com/Keyamoon/IcoMoon-Free.git &

clone ionicons https://github.com/ionic-team/ionicons.git 

# Build it
node ./scripts/pack_creator.js