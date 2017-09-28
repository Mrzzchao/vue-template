/**
 * Created by MChao on 2017/9/10.
 */
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')   // 打包成一个css文件
const CopyWebpackPlugin = require('copy-webpack-plugin')
const base = require('./webpack.base.config.js')

module.exports = merge(base, {
	plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
		new ExtractTextPlugin({
			filename: 'style.css',
			disable: false,
			allChunks: true
		}),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vue',
            filename: 'vue.js'
        }),
		new CopyWebpackPlugin([
			// {output}/to/file.txt
			{ from: '../public/*', to: '../dist/' }],
			 {
				 ignore: [
				// Doesn't copy any files with a txt extension
				'*.html',
				{ glob: '**/*', dot: false }
			],

			// By default, we only copy modified files during
			// a watch or webpack-dev-server build. Setting this
			// to `true` copies all files.
			copyUnmodified: true
		})
	],
	module: {
		rules:
        [{   // vue组件加载器
			test: /\.vue$/,
			loader: 'vue-loader',
			options: {
				extractCSS: true,
				preserveWhitespace: false,
				postcss: [
					require('autoprefixer')({
						browsers: ['last 3 versions']
					})
				]
			}
		},
        {   // 将css注入到Html文件
			test: /\.css$/,
			use: ['css-loader?minimize', 'vue-style-loader']
		}]
	},
    performance: {
        maxEntrypointSize: 300000,
        hints: 'warning'
    }
})
