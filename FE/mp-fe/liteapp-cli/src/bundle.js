/**
 *
 * Copyright 2018 iQIYI.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */


const clc = require('cli-color');

const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpackDevServer = require('webpack-dev-server');
const resolve = require('./build/helper').resolve;

const makeWebpackConfig = require('./build/webpack');

module.exports = buildBundle;

function buildBundle(cli_argv, cli_config) {
    const webpackConfig = makeWebpackConfig(cli_argv, cli_config);

    if(cli_argv.env == 'dev'){
        const baseFrom = resolve.root(`liteapp-base/dist/base-${cli_argv.target}/${cli_config.version.base}`);

        webpackConfig.plugins.push(
            new CopyWebpackPlugin([{
                from: baseFrom,
                to: 'base'
            }])
        )
        webpackConfig.devtool = 'source-map';
        webpackConfig.mode = 'development';
        const compiler = webpack(webpackConfig);
        // webpack-dev-server
        const devServerOptions = Object.assign({}, {
            disableHostCheck: true,
            host: "0.0.0.0",
            port: '8080',
            public : "10.4.130.8",
            stats: {
                colors: true
            }
        });
        const server = new webpackDevServer(compiler, devServerOptions);

        server.listen(8080, '127.0.0.1', () => {
            console.log('Starting server on http://localhost:8080');
        });
    }else{
        console.log(clc.green('[webpackConfig] : '), '\n', webpackConfig);
        return new Promise(resolve => {
            webpack(webpackConfig, (err, stats) => {
                if (err) {
                    console.error('[make bundle] error', err);
                    return;
                }
                const info = stats.toJson();
                if (stats.hasErrors()) {
                    console.log(info.errors.toString());
                }
                console.log(clc.red('[make bundle] finished'));
                resolve();
                //console.log(stats)
            })
        })
    }
}
