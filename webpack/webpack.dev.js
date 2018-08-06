const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    entry: ['../test/test.js'],
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './test'
    }
});