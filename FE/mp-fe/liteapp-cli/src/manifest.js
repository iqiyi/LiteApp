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

module.exports = buildManifest;

function buildManifest( cli_argv , cli_config ){
    const { tabbar , pages , res , index , target , version , name } = cli_config;
    const manifest = {
        pages : [],
        index : '',
        tabbar : {
            items : []
        }
    };
    // index
    manifest.index = index;
    // pages
    Array.isArray(pages) && pages.forEach(page=>{
        let manifestPage = {
            name : page.name,
            path : `/pages/${page.name}/`
        }
        manifest.pages.push(manifestPage);
    })
    // tabbar
    tabbar && Array.isArray(tabbar.items) && tabbar.items.forEach(item=>{
        let tabbarItem = {
            title : item.title,
            path : item.path,
            selectedIcon : `${res}${item.selectedIcon}`,
            unselectedIcon : `${res}${item.unselectedIcon}`,
        }
        manifest.tabbar.items.push(tabbarItem);
    })

    const manifestUri = resolve.business(`${target}/${name}/package/conf/manifest.json`);
    console.log(clc.green('[manifest]'),manifest);
    return fs.ensureFile(manifestUri).then(err=>{
        !!err && console.error(err);
        return fs.writeJson(manifestUri,manifest)    
    }).then(err=>{
        !!err && console.error(err);
        console.log(clc.red('[manifest] build success'));
    })
}
