const path = require('path');
module.exports = {
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
            },
            {
                test: /\.svg?$/,
                loader: 'svg-sprite-loader'  // SVG loader
            },
            {
                test: /\.s[ac]ss?$/,
                use: ['style-loader', 'css-loader', 'sass-loader']  // scss loader
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {},
                    },
                ],
            },

        ]
    },
};
