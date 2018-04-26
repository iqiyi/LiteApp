const fs = require('fs-extra');
const clc = require('cli-color');

const resolve = require('./build/helper').resolve;

function buildVersion( cli_argv , cli_config ){
    const { version : { business , base } , target } = cli_config;
    const versionData = {
        version : business,
        base_version : base,
        manifest_url : "/conf/manifest.json"
    }

    const versionUri = resolve.business(`${target}/version`);
    console.log('[versionUri]',versionUri);
    fs.ensureFile(versionUri).then(err=>{
        return fs.writeJson(versionUri,versionData);
    }).then(err=>{
        !!err && console.error(err);
        console.log(clc.red('[manifest] build success'));
    })
    return versionData;
}

module.exports = buildVersion;
