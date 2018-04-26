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


const fs = require('fs-extra');
const clc = require('cli-color');

const resolve = require('./build/helper').resolve;

function buildVersion( cli_argv , cli_config ){
    const { version : { business , base } , target , name } = cli_config;
    const _business = {
        version : {
            version : business,
            base_version : base,
            manifest_url : "/conf/manifest.json"
        },
        uri : resolve.business(`${target}/package/${name}/version`)
    };
    const _base = {
        version : {
            version : base
        },
        uri : resolve.business(`${target}/package/base/${base}/version`)
    }
    console.log(clc.green('[version business]'),_business);
    console.log(clc.green('[version base]'),_base);
    return Promise.all([_business,_base].map(v=>{
        return fs.ensureFile(v.uri).then(err=>{
            return fs.writeJson(v.uri,v.version);
        }).then(err=>{
            !!err && console.error(err);
        })
    })).then(()=>{
        console.log(clc.red('[version] build success')); 
    }).catch(err=>{
        console.error(err);
    })
}

module.exports = buildVersion;
