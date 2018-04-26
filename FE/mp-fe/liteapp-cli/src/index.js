const fs = require('fs-extra');
const parseArgs = require('minimist');
const clc = require('cli-color');

const argv = parseArgs(process.argv.slice(2));

console.log(clc.red('[cli_argv]'), '\n', argv);

// --config configPath --target app/web --env dev/prod
fs.readJson(argv.config).then(config => {
    if(argv.env == 'dev'){
        // bundle - js,css,html
        require('./bundle')(argv, config);
    }else{
        console.log(clc.red('[cli_config]'), '\n', config);
        /*** base ***/
        require('./base')(argv,config);
        /*** business ***/
        // manifest
        const manifest = require('./manifest')(argv,config);
        console.log(clc.green('[manifest]'),'\n',manifest);
        // version
        const version = require('./version')(argv,config);
        console.log(clc.green('[version]'),'\n',version);
        require('./bundle')(argv, config);
    }
}).catch(err => {
    console.error(err);
})
