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
                output : resolve.business(`${target}/business/${version.business}/package/`),
                template : resolve.build('template/web.dev.html')
            },
            app : {
                output : resolve.business(`${target}/business/${version.business}/package/`),
                template : resolve.build('template/app.dev.html')
            }
        },
        prod : {
            web : {
                output : resolve.business(`${target}/business/${version.business}/package/`),
                template : resolve.build('template/web.prod.html'),
            },
            app : {
                output : resolve.business(`${target}/business/${version.business}/package/`),
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
