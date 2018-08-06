const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    module: {
        rules: [
            // @rule: JS
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    "babel-loader",
                    {
                        loader: "eslint-loader",
                        options: {
                            emitWarning: true,
                            fix: true
                        }
                    },
                ]
            },
            // @rule: LESS
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: './build-utils/postcss.config.js'
                            }
                        },
                    },
                    'less-loader',
                ]
            },
            // @rule: CSS
            {
                test: /\.css$/,
                use: [
                    'postcss-loader'
                ]
            },
            // @rule: JSON
            {
                test: /\.json$/,
                use: "json-loader"
            }
        ]
    }
}