const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const srcPath = path.resolve(__dirname, '../src')

module.exports = {
  entry: ['webpack-hot-middleware/client?reload=true', path.join(srcPath, 'main.js')],
  devtool: '#cheap-module-source-map',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: '[name].bundle.js'
  },
  plugins: [
      new HtmlWebpackPlugin({
          title: 'Output Management',
          template: path.resolve(__dirname, '../index.html')
      }),
      new webpack.HotModuleReplacementPlugin(),
      new FriendlyErrorsPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '~common': path.join(srcPath, 'common'),
      '~components': path.join(srcPath, 'components'),
      '~directives': path.join(srcPath, 'directives'),
      '~store': path.join(srcPath, 'store'),
      '~pages': path.join(srcPath, 'pages'),
      '~assets': path.join(srcPath, 'assets'),
      'assets': path.join(srcPath, 'assets')
    }
  },
  devServer: {
      contentBase: './dist',
      hot: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
