var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin")

const env = process.env.NODE_ENV || development;

module.exports = {
  //devtool: '#source-map',
  entry: {
    // _pages
    'app.thread' : './src/app.thread',
    'app.webview' : './src/app.webview',
    'web' : './src/web'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: `[name].${env === 'production' ? 'min.js':'js'}`
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: ExtractTextPlugin.extract({
              use: [{
                loader: "css-loader"
              }, {
                loader: "sass-loader",
                options: {
                  includePaths: ["./src/common/scss"]
                }
              }],
              fallback: 'vue-style-loader',
            }),
            sass: ExtractTextPlugin.extract({
              use: 'css-loader!sass-loader?indentedSyntax',
              fallback: 'vue-style-loader'
            })
          },
          extractCSS : true
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.json$/, loader: 'json-loader' 
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve:{
    alias:{
      'util' : path.join(__dirname,'src','util','util')
    },
    extensions:['.','.js','.jsx']
  },
  plugins: [
    new ExtractTextPlugin("[name].css")
  ]
}

if(env === 'production'){
  module.exports.plugins = module.exports.plugins.concat([
    // minify JS
    new webpack.optimize.UglifyJsPlugin({
      // beautify: true,
      compress: {
        unused: true,
        drop_console: false,
        drop_debugger: true,
        dead_code: true,
        properties: false,
        warnings: false
      },
      mangle: false,
      comments: false
    })
  ])
}
