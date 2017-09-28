/**
 * Created by MChao on 2017/9/10.
 */
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const srcPath = path.resolve(__dirname, '../src')
const imagesPath = 'assets/images/'
const vConsolePlugin = require('vconsole-webpack-plugin')
const isTestEnv = process.env.RUN_ENV === 'test'

module.exports = {
    entry: {
        app: [path.join(srcPath, 'main.js')]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist/app'),
        publicPath: '/'
    },
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Output Management',
			template: path.resolve(__dirname, '../index.html'),
            chunksSortMode: 'dependency'
		}),
        new webpack.DefinePlugin({   // 将跨平台变量注入前端
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.RUN_ENV': JSON.stringify(process.env.RUN_ENV || 'online')
        }),
        new vConsolePlugin({
            enable: isTestEnv 
        }),
	],
	resolve: {
		extensions: ['.js', '.jsx', '.vue'],
		alias: {
            '~': srcPath,  // 解决静态资源解析问题
			'vue$': 'vue/dist/vue.esm.js',
			'~common': path.join(srcPath, 'common'),
			'~components': path.join(srcPath, 'components'),
			'~directives': path.join(srcPath, 'directives'),
			'~store': path.join(srcPath, 'store'),
			'~pages': path.join(srcPath, 'pages'),
			'assets': path.join(srcPath, 'assets'),
            '~assets': path.join(srcPath, 'assets')
		}
	},
    module: {
        rules:
        [{   // 转换ES6到ES5
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/ // 除了node_modules文件夹
        },
        {   // 打包图片
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]?[hash]'
            }
        }]
    }
}
