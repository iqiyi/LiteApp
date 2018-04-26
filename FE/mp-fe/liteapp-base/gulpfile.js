var gulp = require('gulp');
var watch = require('gulp-watch');
var scp = require('gulp-scp2');
var zip = require('gulp-zip');
var fs = require('fs-extra');
var path = require('path');
var HOMEDIR = require('os').homedir();
var versionData = require('./base/version');
var version = versionData.version;

var target = process.env.TARGET || 'app';
var env = process.env.ENV || 'development';
console.log('[target] : ',target);
console.log('[env] : ',env);

const ext = env === 'production' ? 'min.js' : 'js';

// copy map
var copyMapApp = {
    './base' : '',
    '../mp-fe-component/dist/app.thread.css' : 'component/component.css',
}
copyMapApp[`../mp-fe-api/dist/app.webview.${ext}`] = 'static/api.webview.js';
copyMapApp[`../mp-fe-component/dist/app.webview.${ext}`] = 'component/component.webview.js';
copyMapApp[`../mp-fe-core/dist/qy/qy.webview.${ext}`] = 'core/qy.webview.js';
var threadCombineApp = [
  // core
  `../mp-fe-core/dist/qy/qy.thread.${ext}`,
  // api
  `../mp-fe-api/dist/app.thread.${ext}`,
  // component
  `../mp-fe-component/dist/app.thread.${ext}`
]
var copyMapWeb = {
    './base' : '',
    '../mp-fe-component/dist/web.css' : 'component/component.css',
}
copyMapWeb[`../mp-fe-core/dist/qy/qy.webview.${ext}`] = 'core/qy.webview.js';
var threadCombineWeb = [
  // core
  `../mp-fe-core/dist/qy/qy.thread.${ext}`,
  // api
  `../mp-fe-api/dist/web.${ext}`,
  // component
  `../mp-fe-component/dist/web.${ext}`
]
var copyMap = target === 'app' ? copyMapApp : copyMapWeb;
var threadCombine = target === 'app' ? threadCombineApp : threadCombineWeb;

// get core and component from other project
const init = function(){
  var basePath = `./dist/base-${target}/${version}`;
  // copy file used in template.html
  fs.ensureDirSync(basePath)
  Object.keys(copyMap).forEach(from=>{
    var to = copyMap[from];
    fs.copy(
      path.join(__dirname,from), 
      path.join(__dirname,basePath,to), 
      (err)=>{
        if(err)console.log(err);
        console.log(`[mp-fe-dist] copy ${from} to ${to} finished`)
      }
    );
  })
  // combine thread.js to core/qy.thread.js
  var qyThreadJsPath = path.join(__dirname,basePath,'core','qy.thread.js');
  // get str
  return Promise.all(
    threadCombine.map(
      v => fs.readFile(
        path.join(__dirname,v),
        'UTF-8'
      )
    )
  ).then((dataArr)=>{
    // combine
    threadCombineStr = dataArr.join('');
    // write
    return fs.outputFile(qyThreadJsPath , threadCombineStr)
  }).then(()=>{
    console.log('[thread combine] success');
  }).catch(err=>{
    console.log('[thread combine] error',err);
  })
}
gulp.task('watch',function(){
  init();
  return watch(Object.keys(copyMap).concat(threadCombine),()=>{
    init();
  })
})

// base/** to package.zip( unzip result = package dir )
gulp.task('build',function(){
  var from = path.join(__dirname,'dist','base-app',version);
  var to = path.join(__dirname,'.temp',version);
  // mkdir .temp
  init().then(()=>{
    return fs.copy(
      from,
      path.join(to,'package')
    )
  })
  .catch(err=>console.log(err))
  .then(()=>{
    return new Promise((res,rej)=>{
      console.log('gulp')
      // zip
      gulp.src([path.join(to,'**'),`!${path.join(to,'package','version')}`])
          .pipe(zip('package.zip'))
          .pipe(gulp.dest(`.deploy/${version}`))
          .on('end',res);
    })
  })
  .then(()=>{
    //copy version to .deploy
    return fs.copy(
      path.join(from,'version.json'),
      path.join(__dirname,`.deploy/${version}/version`)
    )
  })
  .then(()=>{
    console.log('[mp-fe-dist] .deploy/version ready')
  })
  .then(()=>{
    if(target === 'web'){
      gulp.start('web');
    }
  })
  .then(()=>{
      console.log('remove')
    // remove .temp
      return fs.remove(
        path.join(__dirname,'.temp')
      ).then(()=>{
      console.log('[mp-fe-dist] .deploy/package.zip ready')
    })
  })
});

gulp.task('web',function(){
  var from = path.join(__dirname,'dist','base-web',version);
  var deploy = path.join(__dirname,'.deploy',version,'web');
  fs.ensureDir(deploy)
  .then(()=>{
    return fs.copy(from,deploy)
    .then(()=>{
      console.log('[mp-fe-dist] .deploy/web ready')
    })
    .catch(err=>{
      console.log('.deploy/web error',err)
    })
  })
})
gulp.task('deploy', function() {
  console.log('[dist deploy] target : ','/home/deploy/www/mini-programe/public-beta/base/' + version)
  gulp.src([`.deploy/${version}/**`])
  .pipe(scp({
    username:'root',
    host: '10.127.18.211',
    dest: '/home/deploy/www/mini-programe/public-beta/base/' + version,
    privateKey:require('fs').readFileSync(HOMEDIR + '/.ssh/id_rsa')
  }))
});

gulp.task('default', ['connect']);

