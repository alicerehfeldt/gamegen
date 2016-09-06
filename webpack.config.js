var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var path = require('path');

module.exports = {
  resolve: {
    root: [
      path.resolve('./src')
    ]
  },
  entry: {
    init: './src/index.js'
  },
  output: {
    path: './dist',
    filename: '[name].js',
    libraryTarget: 'var',
    library: 'GameGen'
  },
  module: {
    wrappedContextCritical: false,
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel', 
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        loader: 'json',
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "gamegen test page",
      favicon: '',
      inject: 'head'
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   }
    // })
  ]

}
