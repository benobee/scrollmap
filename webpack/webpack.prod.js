const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const optimization = require("./components/optimization.js");

module.exports = merge(common, optimization, {
    mode: 'production',
    entry: ['../src/scrollmap.js'],
    devtool: 'source-map',
    plugins: [
        // new UglifyJSPlugin({
        //     sourceMap: true
        // }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]
});