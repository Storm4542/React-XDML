const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // html插件，在index.html中引入 js
module.exports = {
    mode: 'production', // development || production
    entry: {  //入口文件 index.tsx
        index: './lib/index.tsx'
    },
    output: { //输出目录
        path: path.resolve(__dirname, 'dist/lib'), //解决 win（\） 与 mac (/)的目录不同问题
        library: 'StormUI', //输出库的名字 可以显示在index.html 的 title 标签中 <title><%= htmlWebpackPlugin.options.title %></title>
        libraryTarget: 'umd', //库的输出格式 umd || amd(requires) || commonjs
    },
    module: { //配置Loader
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader'  // TS 转换器
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ // html插件，在index.html中引入 js
            template: 'index.html'
        })
    ]
};