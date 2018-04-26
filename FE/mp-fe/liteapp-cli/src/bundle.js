const clc = require('cli-color');

const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpackDevServer = require('webpack-dev-server');
const resolve = require('./build/helper').resolve;

const makeWebpackConfig = require('./build/webpack');

module.exports = buildBundle;

function buildBundle(cli_argv, cli_config) {
    const webpackConfig = makeWebpackConfig(cli_argv, cli_config);

    if(cli_argv.env == 'prod'){
        console.log(clc.green('[webpackConfig] : '), '\n', webpackConfig);
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
            //console.log(stats)
        })
    }else{
        const baseFrom = resolve.root(`liteapp-base/dist/base-${cli_argv.target}/${cli_config.version.base}`);

        webpackConfig.plugins.push(
            new CopyWebpackPlugin([{
                from: baseFrom,
                to: 'base'
            }])
        )
        const compiler = webpack(webpackConfig);
        // webpack-dev-server
        const devServerOptions = Object.assign({}, {
            stats: {
                colors: true
            }
        });
        const server = new webpackDevServer(compiler, devServerOptions);

        server.listen(8080, '127.0.0.1', () => {
            console.log('Starting server on http://localhost:8080');
        });
    }
}
