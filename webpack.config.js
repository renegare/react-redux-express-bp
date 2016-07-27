const webpack = require('webpack');
const path = require('path');
const debug = require('debug')('webpack')
const fs = require('fs')
const babelPresets = JSON.parse(fs.readFileSync('./.babelrc', 'utf8'))
const extractTextPlugin = require("extract-text-webpack-plugin")
const autoprefixer = require('autoprefixer')

const BUILD = process.env.BUILD

var config = {
  entry: './src/app',
  output: {
    path: path.join(__dirname, 'tmp', 'build', 'client'),
    filename: 'app.bundle.js'
  },

  resolve: {
    alias: {
      src: path.join(__dirname, 'src')
    }
  },

  module : {
    loaders : [
      {
        test: /\.jsx?/,
        loader : 'babel',
        exclude: /node_modules/,
        include: __dirname + '/src',
        query: babelPresets
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file?name=fonts/[name].[ext]'
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: "url-loader?limit=10000&name=images/[name].[ext]"
      },
      {
        test: /\.(scss|css|sass)$/,
        loader: extractTextPlugin.extract('style', [
          'css',
          'postcss',
          'sass?sourceMap'
        ].join('!'))
      }
    ]
  },
  plugins: [
    new extractTextPlugin("styles.css", {
      allChunks: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ].concat(BUILD === 'production' ? [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true
      },
      comments: false,
      sourceMap: true
    })
  ] : [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin()
  ]),
  postcss: [
    autoprefixer({
      browsers: ['last 2 versions']
    })
  ],

  devtool: 'cheap-module-source-map'
};

module.exports = config
