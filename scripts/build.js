var exec = require('shelljs').exec;
var echo = require('shelljs').echo;
var fs = require('fs');
var browserify = './node_modules/.bin/browserify';
var derequire = './node_modules/.bin/derequire';
var terser = './node_modules/.bin/terser';

// ok somehow,
// for deploys, we want the 'browser' field
// but that messes with browserify...
// so temporarily remove it during builds.
// ¯\_(ツ)_/¯
var pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

//make a small file for our version number
fs.writeFileSync('./src/_version.js', `module.exports = '${pkg.version}'`);

//final build locations
var banner = '/* compromise-coreference v' + pkg.version + '\n   github.com/nlp-compromise/compromise-coreference\n   MIT\n*/\n';
var uncompressed = './builds/compromise-coreference.js';
var compressed = './builds/compromise-coreference.min.js';

//cleanup. remove old builds
exec('rm -rf ./builds && mkdir builds');

//add a header, before our sourcecode
echo(banner).to(uncompressed);
echo(banner).to(compressed);

//browserify + derequire
var cmd = browserify + ' ./src/index.js --standalone coreference';
cmd += ' -t [ babelify --presets [ @babel/preset-env ] ]';
cmd += ' | ' + derequire;
cmd += ' >> ' + uncompressed;
exec(cmd);

//uglify
cmd = terser + ' ' + uncompressed + ' --mangle --compress ';
cmd += ' >> ' + compressed;
exec(cmd);
