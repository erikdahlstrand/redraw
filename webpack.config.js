var path = require('path');
var RewirePlugin = require("rewire-webpack");

module.exports = {
    entry: './src/js/rechartjs.js',
    output: {
        path: __dirname,
        filename: './dist/rechart.js'
    },
    plugins: [
        new RewirePlugin()
    ],
    // resolveLoader: {
    //     root: __dirname
    // },
    // resolve: {
    //     root: __dirname,
    //     modulesDirectories: ['node_modules'],
    //     extensions: ['.js']
    // },
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
            }
        ]
    }
};