var path = require('path')
var clc = require('cli-color')

// webpack module
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var UglifyJsPlugin = require('uglifyjs-webpack-plugin')

// custom module
var makeConfig = require('./config');
var helper = require('./helper');
var resolve = helper.resolve;

module.exports = function makeWebpackConfig(cli_argv, cli_config) {
    const { entrys, pathConfig } = makeConfig(cli_argv, cli_config);
    const webpackConfig = {
        //devtool: '#source-map',
        entry: entrys,
        output: {
            path: pathConfig.output,
            publicPath: '/',
            filename: 'pages/[name]/bundle.js'
        },
        module: {
            rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        scss: ExtractTextPlugin.extract({
                            use: [{
                                loader: "css-loader"
                            }, {
                                loader: "sass-loader"
                            }],
                            fallback: 'vue-style-loader',
                        }),
                        sass: ExtractTextPlugin.extract({
                            use: 'css-loader!sass-loader?indentedSyntax',
                            fallback: 'vue-style-loader'
                        })
                    },
                    extractCSS: true
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    //publicPath: pathConfig.publicPath.static,
                    name: `${cli_config.res}/images/[name].[ext]?[hash]`
                }
            }
            ]
        },
        resolve: {
            alias: {},
            extensions: ['.', '.js', '.jsx']
        },
        resolveLoader: {
            modules: [resolve.cli('node_modules'),'node_modules'],
            extensions: ['.', '.js', '.json'],
            mainFields: ['loader', 'main']
        },
        plugins: [
            new ExtractTextPlugin("pages/[name]/bundle.css"),
            new CopyWebpackPlugin([{
                from: cli_config.res,
                to: path.resolve(pathConfig.output, cli_config.res)
            }])
        ]
    }
    // add template
    if( cli_argv.target == 'web' ){
        webpackConfig.plugins = webpackConfig.plugins.concat(
            // bundle can be get from custom plugin's data , delay to do 
            cli_config.pages.map(function({ name }) {
                return new HtmlWebpackPlugin({
                    inject: false,
                    filename: path.resolve(pathConfig.output, `./pages/${name}/${cli_argv.target}.html`),
                    template: pathConfig.template,
                    params: {
                        name,
                        base_version: cli_config.version.base
                    }
                });
            })
        )
    }
    // add alias for res
    webpackConfig.resolve.alias[cli_config.res] = resolve.business(cli_config.res);
    if (cli_argv.env === 'prod') {
        webpackConfig.plugins.push(
            new UglifyJsPlugin({
                uglifyOptions : {
                    compress: {
                        drop_console: true
                    }
                }
            })
        )
    }
    return webpackConfig;
}
