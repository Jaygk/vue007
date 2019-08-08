const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const vueLoaderPlugin = require('vue-loader/lib/plugin'); // Vue Loader v15 现在需要配合一个 webpack 插件才能正确使用

// 这个配置文件,其实就是一个js文件,通过Node中的模块操作向外暴露了一个配置对象
module.exports = {
    entry: path.join(__dirname, './src/main.js'),
    output: {
        path: path.join(__dirname, './dist/'),
        filename: 'bundle.js'
        // publicPath: '/asset/'
    },
    devServer: { // webpack-dev-sever 的配置
        contentBase: path.resolve(__dirname, './src/'),
        inline: true,
        open: true,
        hot: true
    },
    plugins: [ // 插件
        new webpack.HotModuleReplacementPlugin(), // hot插件
        new htmlWebpackPlugin({ // 将html文件加载到内存中, 同时会在正确的位置导入bundle.js文件
            template: path.join(__dirname, './src/index.html'),
            filename: 'index.html'
        }),
        new vueLoaderPlugin()
    ],
    module: { // 用于配置所有的第三方模块加载器
        rules: [
            { test: /\.css$/, use: ['style-loader', 'css-loader'] }, // 处理css文件
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] }, // 处理less文件
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] }, // 处理sass或scss文件
            { test: /\.(gif|jpeg|png|jpg)$/, use: 'url-loader?limit=141800&name=[hash:8]-[name].[ext]' }, // 处理图片
            { test: /\.(ttf|eot|svg|woff|woff2|otf)$/, use: 'url-loader' }, // 处理字体文件
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }, // 配置Babel来转换高级的ES6+语法
            { test: /\.vue$/, use: 'vue-loader' }
        ]
    },
    resolve: {
        alias: { // 修改 Vue 被导入时候的包的路径
            // "vue$": "vue/dist/vue.js"
        }
    },
    mode: 'development' // 开发模式
}