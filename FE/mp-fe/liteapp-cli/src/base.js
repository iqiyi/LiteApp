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

module.exports = buildBase;

function buildBase( cli_argv , cli_config ){
    const from = resolve.base(`dist/base-${cli_argv.target}/${cli_config.version.base}`);
    const to = resolve.business(`${cli_config.target}/base/${cli_config.version.base}/package`);
    console.log(from,to);
    return fs.copy(from,to).then(err=>{
        console.log(clc.red(`[base-${cli_argv.target} ${cli_config.version.base}] copied`));
    });
}
