const merge = require('webpack-merge');
const rules = require("./components/rules.js");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = merge(rules, {
    context: __dirname,
    node: {
        dns: 'mock',
        net: 'mock',
        fs: 'empty'
    },
    plugins: [
        new webpack.ProvidePlugin({
            'Promise': 'es6-promise',
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        })
    ],
    output: {
        publicPath: '/',
        path: __dirname + "./dist",
        filename: "scrollmap.js"
    }
});