var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
/**
* This is the Webpack configuration file for production.
*/
module.exports = {
  entry: "./src/za-atoot",

  output: {
    path: __dirname + "/build/",
    filename: "app.js",
    //publicPath: "http://ircs.mako.co.il"
  },

  plugins: [
    new ExtractTextPlugin('style.css', { allChunks: true }),
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings: true
      }
    })
  ],

  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader') },
      { // Loader for images and fonts - if smaller than limit convert to bse64
        test: /\.(png|jpg|gif|svg|ttf|eot|woff)$/,
        exclude: /node_modules/,
        loader: 'url-loader?name=/images/zaatoot/[name].[ext]&limit=20000'
      }
    ]
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.css'],
    root: [
      path.resolve('./src'),
    ]
  },

  postcss: [
    require('autoprefixer'),
    require('postcss-nested')
  ]
}
