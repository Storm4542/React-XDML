const base = require('./webpack.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = Object.assign({}, base, {
    mode: 'production',
    entry: {
        example: './example.tsx',
    },
    output: { //输出目录
        path: path.resolve(__dirname, 'doc'), //解决 win（\） 与 mac (/)的目录不同问题
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'example.html',
            filename: 'index.html'
        })
    ],
});
