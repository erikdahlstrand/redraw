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
        './src/js/tools/text.js'
        ],
    output: {
        path: __dirname,
        filename: './dist/redraw.js'
    },
    plugins: [
        new webpack.dependencies.LabeledModulesPlugin()
    ],
    resolve: {
        modulesDirectories: ['bower_components', 'node_modules']
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
                exclude: /node_modules/
            },
            { test: /\.json$/, loader: "json" }
        ]
    }
};