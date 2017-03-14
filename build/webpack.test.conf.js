// This is the webpack config used for unit tests.

var utils = require('./utils')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseConfig = require('./webpack.base.conf')

var webpackConfig = merge(baseConfig, {
  // use inline sourcemap for karma-sourcemap-loader
  module: {
    rules: utils.styleLoaders()
  },
  devtool: '#inline-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/test.env')
    }),
    // https://gist.github.com/Couto/b29676dd1ab8714a818f
    new webpack.ProvidePlugin({
        'Promise': 'es6-promise',
        'fetch': 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
    }),
  ]
})

// no need for app entry during tests
delete webpackConfig.entry

module.exports = webpackConfig
