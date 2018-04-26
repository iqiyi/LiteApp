var path = require('path');

const resolve = {
    build : p => path.resolve(__dirname , p),
    business : p => path.resolve( p ),
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
