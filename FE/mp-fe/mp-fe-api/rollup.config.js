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
