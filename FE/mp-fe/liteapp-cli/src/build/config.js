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


var path = require('path');
var helper = require('./helper');
var resolve = helper.resolve;
var getEntrys = helper.getEntrys;

module.exports = makeConfig;

function makeConfig( cli_argv , cli_config ){
    const { src , pages , target , name , version } = cli_config;
    // pathConfig，利于扩展
    const pathConfig = {
        dev : {
            web : {
                output : resolve.business(`${target}/${name}/package/`),
                template : resolve.build('template/web.dev.html')
            },
            app : {
                output : resolve.business(`${target}/${name}/package/`),
                template : resolve.build('template/app.dev.html')
            }
        },
        test : {
            web : {
                output : resolve.business(`${target}/${name}/package/`),
                template : resolve.build('template/web.prod.html'),
            },
            app : {
                output : resolve.business(`${target}/${name}/package/`),
                template : resolve.build('template/app.prod.html'),
            }
        },
        prod : {
            web : {
                output : resolve.business(`${target}/${name}/package/`),
                template : resolve.build('template/web.prod.html'),
            },
            app : {
                output : resolve.business(`${target}/${name}/package/`),
                template : resolve.build('template/app.prod.html'),
            }
        }
    };
    const bundleConfig = {
        entrys : getEntrys(src,pages),
        pathConfig : pathConfig[cli_argv.env][cli_argv.target]
    }
    return bundleConfig;
}
