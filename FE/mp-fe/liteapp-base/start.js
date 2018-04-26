var path = require('path');
var fs = require('fs-extra')

var copyMap = {
  '../mp-fe-core/dist/qy' : './base/core',
  '../mp-fe-component/dist/native.js' : './base/component/native.js',
  '../mp-fe-component/dist/native.css' : './base/component/native.css',
}

Object.keys(copyMap).forEach(from=>{
  var to = copyMap[from];
  fs.copy(
    path.join(__dirname,from), 
    path.join(__dirname,to), 
    (err)=>{
      if(err)console.log(err);
      console.log(`[mp-fe-dist] copy ${from} to ${to} finished`)
    }
  );
})
