
const webpack = require("webpack");
const path = require('path');
//https://symfony.com/doc/current/frontend/encore/legacy-apps.html
//https://stackoverflow.com/questions/37656592/define-global-variable-with-webpack
module.exports = {
  entry: './app/scripts/Flojo.js',
  output: {
    filename: 'Flojo.js',
    path: path.resolve(__dirname, 'tmp/scripts')
  },
  mode: 'development'

  // resolve: {
  // 	extensions: ['', '.js'],
  //   alias: {
  //     'Flojo': path.resolve(__dirname, './scripts/Flojo')  // <-- When you build or restart dev-server, you'll get an error if the path to your utils.js file is incorrect.
  //   }
  // },
  
};