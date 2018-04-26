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


const path = require('path');
const buble = require('rollup-plugin-buble');
const commonjs = require('rollup-plugin-commonjs');

const resolve = p => path.resolve(__dirname,'./',p)

const target = process.env.TARGET || 'web';
const env = process.env.ENV || 'development';

console.log('[rollup build] |env|target|',env,target);

module.exports = {
  input : resolve(`src/api-${target}.js`),
  output : {
    name : `api-${target}`,
    file : resolve(`dist/${target}${env === 'production' ? '.min.js' : '.js'}`),
    env,
    format : 'umd'
  },
  plugins : [
    commonjs(),
    buble()
  ],
  watch:{
    clearScreen : true
  }
}
