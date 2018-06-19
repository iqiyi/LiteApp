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

        Promise.all([
            /*** base ***/
            require('./base')(argv,config),
            /*** business ***/
            require('./manifest')(argv,config),
            require('./version')(argv,config),
            require('./bundle')(argv, config)
        ]).then(result => {
          require('./zip_build')(argv,config).then(() => {
            if(!!argv.deploy){
              require('./deploy').call(this,argv,config)
            }
          }).then(()=>{
                console.log(clc.red('[cli finished]'));
            })
        })

    }
}).catch(err => {
    console.error(err);
})
