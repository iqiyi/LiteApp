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


var gulp = require('gulp');
var client = require('scp2');

var clc = require('cli-color');

var resolve = require('./build/helper').resolve;
var HOMEDIR = require('os').homedir();

function pushToServer( argv_cli , argv_config ){
    return new Promise(res=>{
        const { name , target , deploy : { username , host , path } } = argv_config;
        const deployInfo = {
            username,
            host,
            path,
            privateKey:require('fs').readFileSync(HOMEDIR + '/.ssh/id_rsa')
        }
        console.log(clc.red('[deploy] start'));
        console.log(clc.green('[deploy] config : '),deployInfo);

        client.scp(
            resolve.business(`${ target }/package/**`),
            deployInfo,
            res
        );
    }).then(()=>{
        console.log(clc.red('[deploy] finished'));
    })
}

module.exports = pushToServer;
