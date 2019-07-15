require('next-js-core2');
require('ipic-tss-uploader');

var globby = require('globby');
var path = require('path');
var fs = require('fs');
var Listr = require('listr');
var options = { path: 'tucloud/assets/tss-cli-test' };
var tasks = [];
var manifest = { urls: [] };

module.exports = function() {
  var cmd = {};
  cmd.command = 'upload';
  cmd.desc = 'Upload file to remote from local directory';
  cmd.builder = {
    cwd: {
      alias: 'c',
      describe: 'set local path',
      demand: false
    },
    path: {
      alias: 'p',
      describe: 'set remote path',
      demand: false
    },
    recursive: {
      alias: 'r',
      describe: 'check if need recursive',
      demand: false
    }
  };
  cmd.handler = function(argv) {
    var recursive = argv.recursive;
    var cwd = argv.cwd || process.cwd();
    process.chdir(cwd);
    var patterns = recursive ? '**' : '*';
    var dirs = globby.sync([patterns, '!*.md']);

    dirs.forEach((item) => {
      var localpath = argv.dir || process.cwd();
      var filename = path.join(localpath, item);
      var b64 = fs.readFileSync(filename).toString('base64');
      tasks.push({
        title: `uploding ${item}`,
        task: () => {
          return new Promise((resolve) => {
            var fullpath = path.join(argv.path || options.path, path.dirname(item));
            return ipic.TssUploader.upload(b64, path.basename(item), { path: fullpath }).then(
              (url) => {
                manifest.urls.push(url);
                resolve(url);
              }
            );
          });
        }
      });
    });

    new Listr(tasks).run().then((_) => {
      var output = path.join(process.cwd(), 'output.md');
      fs.writeFileSync(output, manifest.urls.join('\n'));
      console.log('Output file created at %s:', output);
    });
  };
  return cmd;
};
