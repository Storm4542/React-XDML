const base = require('./webpack.config');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // html插件，在index.html中引入 js
module.exports = Object.assign({}, base, {
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({ // html插件，在index.html中引入 js
            template: 'index.html'
        })
    ]
});