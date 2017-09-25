/**
 * Created by MChao on 2017/9/10.
 */
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const srcPath = path.resolve(__dirname, '../src')
const imagesPath = 'assets/images/'

module.exports = {
    entry: {
        app: [path.join(srcPath, 'main.js')]
    },
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Output Management',
			template: path.resolve(__dirname, '../index.html'),
            chunksSortMode: 'dependency'
		}),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
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
                name: imagesPath + '[name].[ext]?[hash]'
            }
        }]
    }
}
