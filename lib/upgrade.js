// packages:
require('next-node-exec');

var figlet = require('figlet');
var chalk = require('chalk');
var Listr = require('listr');

module.exports = function() {
  var cmd = {};
  cmd.command = 'upgrade';
  cmd.desc = 'Upgrade all cmds';
  cmd.builder = {
    path: {
      alias: 'p',
      describe: 'Your finxos installed path.',
      demand: false
    }
  };
  cmd.handler = function(argv) {
    var localpath = argv.path || process.cwd();
    var tasks = [
      {
        title: 'uploading',
        task: () => {
          return new Promise((resolve) => {
            nx.nodeExec([`cd ${localpath}`, 'git pull', 'npm unlink', 'npm link'].join('&&')).then(
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
