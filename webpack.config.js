const webpack = require('webpack');
const path = require('path');


module.exports = {
  entry: [
    './src/js/redraw.js',
    './src/js/tools/arrow/arrow-tool.js',
    './src/js/tools/arrow/arrow-setup.js',
    './src/js/tools/delete/delete-tool.js',
    './src/js/tools/delete/delete-setup.js',
    './src/js/tools/horizontalLine/horizontalLine-tool.js',
    './src/js/tools/horizontalLine/horizontalLine-setup.js',
    './src/js/tools/pixelate/pixelate-tool.js',
    './src/js/tools/pixelate/pixelate-setup.js',
    './src/js/tools/rectangle/rectangle-tool.js',
    './src/js/tools/rectangle/rectangle-setup.js',
    './src/js/tools/reset/reset-tool.js',
    './src/js/tools/reset/reset-setup.js',
    './src/js/tools/text/text-tool.js',
    './src/js/tools/text/text-setup.js'  ],
  output: {
    path: __dirname,
    filename: './dist/redraw.js'
  },
  plugins: [
    new webpack.dependencies.LabeledModulesPlugin(),
    new webpack.IgnorePlugin(/jsdom$/)
  ],
  resolve: {
    modulesDirectories: ['node_modules']
  },
  externals: {
    fabric: 'fabric'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules|bower_components/
      },
      { test: /\.json$/, loader: 'json' }
    ]
  }
};
