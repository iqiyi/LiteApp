const fs = require('fs-extra');
const clc = require('cli-color');

const resolve = require('./build/helper').resolve;

module.exports = buildManifest;

function buildManifest( cli_argv , cli_config ){
    const { tabbar , pages , res , index , target , version } = cli_config;
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
            path : `/pages/${page.name}`
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

    const manifestUri = resolve.business(`${target}/business/${version.business}/package/conf/manifest.json`);
    console.log('[manifestUri]',manifestUri);
    fs.ensureFile(manifestUri).then(err=>{
        !!err && console.error(err);
        return fs.writeJson(manifestUri,manifest)    
    }).then(err=>{
        !!err && console.error(err);
        console.log(clc.red('[manifest] build success'));
    })

    return manifest;
}
