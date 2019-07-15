// packages:
require('next-node-exec');

var figlet = require('figlet');
var chalk = require('chalk');
var Listr = require('listr');
var appRoot = require('app-root-path').path;

module.exports = function() {
  var cmd = {};
  cmd.command = 'upgrade';
  cmd.desc = 'Upgrade all cmds';
  cmd.builder = {};
  cmd.handler = function(argv) {
    var tasks = [
      {
        title: 'uploading',
        task: () => {
          return new Promise((resolve) => {
            nx.nodeExec([`cd ${appRoot}`, 'git pull', 'npm unlink', 'npm link'].join('&&')).then(
              (res) => {
                resolve();
              }
            );
          });
        }
      }
    ];
    new Listr(tasks).run().then((_) => {
      console.log(
        chalk.green(
          figlet.textSync('success !', {
            horizontalLayout: 'default',
            verticalLayout: 'default'
          })
        )
      );
    });
  };
  return cmd;
};
