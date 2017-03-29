/*
Tu Hoang

Webpack config

*/

var webpack = require('webpack');
var path = require('path');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve('./dist'),
    filename: 'leaflet-view.js'
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, use: 'babel-loader' }
      // , {
      //   test: /\.less$/,
      //   use: ExtractTextPlugin.extract({
      //     fallback: 'style-loader',
      //     use: ['css-loader', 'less-loader']
      //   })
      // }
      , {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader']
        })
      },
      {
        test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
        use: [{
          loader: "file-loader"
        }]
      }, {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'url-loader?limit=10000',
          'img-loader'
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({ //for css extraction
      filename: "./leaflet-view-style.css",
      // disable: process.env.NODE_ENV === "development",
      allChunks: true
    })
    // new webpack.optimize.UglifyJsPlugin({
    //   beautify: false,
    //   mangle: {
    //     screw_ie8: true,
    //     keep_fnames: true
    //   },
    //   compress: {
    //     screw_ie8: true
    //   },
    //   comments: false
    // })
  ]
};
