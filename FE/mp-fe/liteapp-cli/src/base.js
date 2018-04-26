const fs = require('fs-extra');
const clc = require('cli-color');

const resolve = require('./build/helper').resolve;

module.exports = buildBase;

function buildBase( cli_argv , cli_config ){
    const from = resolve.root(`liteapp-base/dist/base-${cli_argv.target}/${cli_config.version.base}`);
    const to = resolve.business(`${cli_config.target}/base/${cli_config.version.base}/package`);
    console.log(from,to);
    fs.copy(from,to).then(err=>{
        console.log(clc.red(`[base-${cli_argv.target} ${cli_config.version.base}] copied`));
    });
}
