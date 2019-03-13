const base = require('./webpack.config');
module.exports = Object.assign({}, base, {
    mode: 'production',
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
});