const fs = require('fs-extra')
const path = require('path')
const zlib = require('zlib')
const rollup = require('rollup')
const uglify = require('uglify-js')
const rollupConfig = require('./rollup.config');

buildEntry(rollupConfig)

function buildEntry( config ){
  const output = config.output
  const { file } = output
  return rollup.rollup(config)
    .then(bundle => bundle.generate(output))
    .then(( { code } ) => {
      var minified = uglify.minify(code,{
        output : {
          ascii_only: true
        }
      }).code;
      return write(file,minified, true)
    })
}
function write (dest, code, zip) {
  return new Promise((resolve, reject) => {
    function report (extra) {
      console.log(blue(path.relative(process.cwd(), dest)) + ' ' + getSize(code) + (extra || ''))
      resolve()
    }

    fs.writeFile(dest, code, err => {
      if (err) return reject(err)
      if (zip) {
        zlib.gzip(code, (err, zipped) => {
          if (err) return reject(err)
          report(' (gzipped: ' + getSize(zipped) + ')')
        })
      } else {
        report()
      }
    })
  })
}
function getSize (code) {
  return (code.length / 1024).toFixed(2) + 'kb'
}
function blue (str) {
  return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m'
}
