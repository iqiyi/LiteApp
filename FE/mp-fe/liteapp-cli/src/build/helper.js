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

const resolve = {
    build : p => path.resolve(__dirname , p),
    business : p => path.resolve( p ),
    base : p => path.resolve( __dirname ,'..' , '..','..','liteapp-base', p ),
    cli : p => path.resolve( __dirname , '..','..',p ),
    root : p => path.resolve( __dirname , '..','..','..',p ),
    deploy : p => path.resolve(__dirname , '../.deploy',p),
    temp : p => path.resolve(__dirname , '../.temp',p),
}
const getEntrys = ( src , pages ) => {
    const entry = {};
    pages.forEach(page=>{
        let { name , path } = page;
        entry[name] = resolve.business(`${src}${path}`);
    })
    return entry;
}
module.exports = {
    getEntrys,
    resolve
};
