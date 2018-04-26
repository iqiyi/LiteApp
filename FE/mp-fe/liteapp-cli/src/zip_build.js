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
var zip = require('gulp-zip');

var clc = require('cli-color');
var resolve = require('./build/helper').resolve;

function zip_build( argv_cli , argv_config ){
    const { target , name , version } = argv_config;
    const base = {
        dirFrom : resolve.business(`${target}/base/${version.base}/**`),
        zipTo : resolve.business(`${target}/package/base/${version.base}/`)
    }
    const business = {
        dirFrom : resolve.business(`${target}/${name}/**`),
        zipTo : resolve.business(`${target}/package/${name}/`)
    }
    const basePromise = new Promise((res,rej)=>{
        gulp.src([base.dirFrom])
        .pipe(zip('package.zip'))
        .pipe(gulp.dest(base.zipTo))
        .on('end',res);
    })
    const businessPromise = new Promise((res,rej)=>{
        gulp.src([business.dirFrom])
        .pipe(zip('package.zip'))
        .pipe(gulp.dest(business.zipTo))
        .on('end',res);
    })
    return Promise.all([basePromise,businessPromise]).then(data => {
        console.log(clc.red('[zip build] finished'));
    })
}

module.exports = zip_build;
