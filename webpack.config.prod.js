var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
require('es6-promise').polyfill()

var localIdentName = "localIdentName=[name]-[local]_[hash:base64:5]"
var cssLoaderString = "css?modules&importLoaders=1&" + localIdentName + "!postcss"

var postcss_modules_value = require('postcss-modules-values')
var precss = require('precss')
var post_cssnext = require('postcss-cssnext')

function postcss() {
  return [
    postcss_modules_value,
    precss,
    post_cssnext,
  ]
}

module.exports = {
  entry: {
    bundle: './src/client.js'
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
    chunkFilename: '[id].[name].js',
    publicPath: '/build/'
  },
  plugins: [
    new webpack.DefinePlugin({ 
      'process.env.NODE_ENV': '"production"'
    }),
    new ExtractTextPlugin('[name].css', {allChunks: true, disable: false}),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    }),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          "presets": ["es2015", "react", "stage-0"]
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style", cssLoaderString)
      }
    ]
  },
  postcss: postcss
}


