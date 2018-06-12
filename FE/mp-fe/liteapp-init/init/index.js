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


const fs = require('fs');
const path = require('path');
const sep = path.sep;
const child_process = require('child_process');

function copyDir(src, dist) {
    child_process.exec(`cp -r ${src} ${dist}`);	
}

// from & to
const from = path.resolve(__dirname , './package');
const to = process.cwd();

// set name to json
const appJson = require('./package/app.json');
const packageJson  = require('./package/package.json');
const name = process.cwd().split(sep).reverse()[0];
appJson.name = name;
packageJson.name = name;

// app.json
fs.writeFile(path.resolve(to,'./app.json'),JSON.stringify(appJson),err => {
    !!err && console.log(err);
})
// package.json & npm install
fs.writeFile(path.resolve(to,'./package.json'),JSON.stringify(packageJson),err => {
    !!err && console.log(err);
})
// src
copyDir(path.resolve(from,'src'),to)
// res
copyDir(path.resolve(from,'res'),to)
// dist
const distPath = path.resolve(process.cwd() , 'dist');
fs.access(distPath, err => {
    if(err){
        //mkdir if not exist
        fs.mkdir(distPath,err => {
            !!err && console.error(err)
        });
    }
});
