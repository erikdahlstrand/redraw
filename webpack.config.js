var webpack = require('webpack');
var path = require('path');


module.exports = {
    entry: [
      './src/js/redraw.js',
      './src/js/tools/arrow.js',
      './src/js/tools/box.js',
      './src/js/tools/pixelate.js',
      './src/js/tools/clear-tool.js',
      './src/js/tools/horizontal-line-tool.js',
      './src/js/tools/remove-tool.js',
      './src/js/tools/text.js',
      './src/js/tools/setup/arrow-setup.js',
      './src/js/tools/setup/box-setup.js',
      './src/js/tools/setup/pixelate-setup.js',
      './src/js/tools/setup/clear-setup.js',
      './src/js/tools/setup/horizontal-line-setup.js',
      './src/js/tools/setup/remove-setup.js',
      './src/js/tools/setup/text-setup.js'

        ],
    output: {
        path: __dirname,
        filename: './dist/redraw.js'
    },
    plugins: [
        new webpack.dependencies.LabeledModulesPlugin()/*,
        new webpack.optimize.UglifyJsPlugin({minimize: true})*/
    ],
    resolve: {
        modulesDirectories: ['bower_components', 'node_modules']
    },
    externals: {
        "fabric": "fabric"
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: "style!css"
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules|bower_components/
            },
            { test: /\.json$/, loader: "json" }
        ]
    }
};
