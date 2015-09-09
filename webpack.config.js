var webpack = require('webpack');
var path = require('path');
// var RewirePlugin = require("rewire-webpack");

module.exports = {
    entry: './src/js/rechartjs.js',
    output: {
        path: __dirname,
        filename: './dist/rechart.js'
    },
    plugins: [
        // new RewirePlugin(),
        new webpack.dependencies.LabeledModulesPlugin()
    ],
    resolve: {
        // root: '/Users/swanmo/Documents/javascript/rechart.js/',
        modulesDirectories: ['bower_components', 'node_modules'],
        //extensions: ['.js']
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