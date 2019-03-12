const path = require('path');
module.exports = {
    mode: 'production', // development || production
    entry: {  //入口文件 index.tsx
        index: './lib/index.tsx'
    },
    output: { //输出目录
        path: path.resolve(__dirname, 'dist/lib'), //解决 win（\） 与 mac (/)的目录不同问题
        library: 'StormUI', //输出库的名字
        libraryTarget: 'umd', //库的输出格式 umd || amd(requires) || commonjs
    },
    module: { //配置Loader
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader'
            }
        ]
    }
};