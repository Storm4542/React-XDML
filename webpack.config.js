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
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx']  //支持什么后缀名的文件
    },
    module: { //配置Loader
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader'  // TS loader
            }
        ]
    },
    externals: { //声明为外部依赖
        react: {
            commonjs: 'react', // const react = require('react') 如何引用，配后面的名字
            commonjs2: 'react', //node.js 标准
            amd: 'react', // 浏览器标准
            root: 'React', // <script src = 'xxx/react.js'>  window.React
        },
        'react-dom': {
            commonjs: 'react-dom',
            commonjs2: 'react-dom',
            amd: 'react-dom',
            root: 'ReactDOM',
        },
    },
    plugins: [
        new HtmlWebpackPlugin({ // html插件，在index.html中引入 js
            template: 'index.html'
        })
    ]
};