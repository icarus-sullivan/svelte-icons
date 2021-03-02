#! /bin/bash
#
# Clone specific repos and insert them into node_modules

# cleanup
rm -rf node_modules && yarn --frozen-lockfile

# vs code
mkdir node_modules/vscode
git clone https://github.com/microsoft/vscode-codicons node_modules/vscode 

# css.go
mkdir node_modules/cssgo
git clone https://github.com/astrit/css.gg node_modules/cssgo

# boxicons
mkdir node_modules/boxicons
git clone https://github.com/atisawd/boxicons node_modules/boxicons