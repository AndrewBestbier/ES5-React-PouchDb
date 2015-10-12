"use strict";

var webpack = require('webpack');
var path = require('path');

var port = process.env.HOT_LOAD_PORT || 8888;

var config = {
    cache: true,
    resolve: {
        extensions: ['', '.js']
    },
    entry: [
        'webpack-dev-server/client?http://localhost:' + port,
        'webpack/hot/dev-server',
        './src/client.js'
    ],
    output: {
        path: path.join(__dirname, '/build/'),
        filename: 'client.js',
        publicPath: 'http://localhost:' + port + '/build/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loaders: ['react-hot', 'babel-loader?experimental&optional=selfContained']
        }]
    }
};

module.exports = config;