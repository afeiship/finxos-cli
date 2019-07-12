#!/usr/bin/env node

require('next-js-core2');
require('ipic-tss-uploader');

var globby = require('globby');
var path = require('path');
var fs = require('fs');
var Listr = require('listr');
var dirs = globby.sync('**');
var options = { path: 'tucloud/assets/tss-cli-test' };
var tasks = [];
var result = { urls: [] };

dirs.forEach((item) => {
  var filename = path.join(process.cwd(), item);
  var b64 = fs.readFileSync(filename).toString('base64');
  tasks.push({
    title: `uploding ${item}`,
    task: () => {
      return new Promise((resolve) => {
        var fullpath = path.join(options.path, path.dirname(item));
        return ipic.TssUploader.upload(b64, path.basename(item), { path: fullpath }).then((url) => {
          result.urls.push(url);
          resolve(url);
        });
      });
    }
  });
});

new Listr(tasks).run().then((_) => {
  var output = path.join(process.cwd(), 'output.md');
  fs.writeFileSync(output, result.urls.join('\n'));
  console.log('File created in %s:', output);
});
