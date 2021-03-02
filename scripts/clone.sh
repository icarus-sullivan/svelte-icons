#! /bin/bash
#
# Clone specific repos and insert them into node_modules

# vs code
rm -rf node_modules/vscode ; mkdir node_modules/vscode
git clone https://github.com/microsoft/vscode-codicons node_modules/vscode 

# css.go
rm -rf node_modules/cssgo ; mkdir node_modules/cssgo
git clone https://github.com/astrit/css.gg node_modules/cssgo

# boxicons
rm -rf node_modules/boxicons ; mkdir node_modules/boxicons
git clone https://github.com/atisawd/boxicons node_modules/boxicons