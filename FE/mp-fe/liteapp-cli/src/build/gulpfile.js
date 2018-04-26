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


var fs = require('fs-extra');
var gulp = require('gulp');
var connect = require('gulp-connect');
var scp = require('gulp-scp2');
var zip = require('gulp-zip');

var resolve = require('./helper').resolve;
var HOMEDIR = require('os').homedir();

var config = require('./config');

gulp.task('connect', function() {
  connect.server({
    port:8889,
    livereload: true,
    root : '../../'
  });
});

const addAppManifest = function(){
  console.log('addAppManifest')
  return fs.copy(
    resolve.build('_conf/manifest.json'),
    resolve.temp('app/package/conf/manifest.json')
  ).then(()=>{
    console.log('addAppManifest success');
  }).catch(err=>{
    console.error('addAppManifest error',err);
  })
}

const addAppVersion = function(){
  console.log('addAppVersion');
  const json = {
    "version" : config.appVersion,
    "base_version" : config.baseVersion,
    "manifest_url":"/conf/manifest.json",
    "package" : "/package.zip"
  }
  return fs.ensureFile(resolve.deploy('version')).then(()=>{
      fs.writeJson(
          resolve.deploy('version'),
          json
      ).then(()=>{
          console.log('addAppVersion success');
      }).catch(err=>{
          console.error('addAppVersion error',err);
      })
  })
}

gulp.task('buildDeploy',function(){

  gulp.src([resolve.temp('app/**')])
  .pipe(zip('package.zip'))
  .pipe(gulp.dest(resolve.deploy('')));

  gulp.src([resolve.temp('web/**')])
  .pipe(gulp.dest(resolve.deploy('web')));
});

gulp.task('pushToServer', function() {
  gulp.src([resolve.deploy('**')])
  .pipe(scp({
    username:'root',
    host: '10.127.18.211',
    dest: `/home/deploy/www/mini-programe/public-beta/${config.appId}`,
    privateKey:require('fs').readFileSync(HOMEDIR + '/.ssh/id_rsa')
  }))
});

gulp.task('deploy',function(){
  addAppManifest().then(()=>{
    gulp.start('buildDeploy');
  }).then(addAppVersion).then(()=>{
    gulp.start('pushToServer');
  })
})

