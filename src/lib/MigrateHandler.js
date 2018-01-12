const fs = require('fs'),
  logger  = require('../logger'),
  async = require('async');

const absoluteScriptPath = 'src/scripts/',
  relativeScriptPath = '../scripts/',
  finishWord = 'done';

class MigrateHandler {
  
  constructor() {
    this.scripts = [];
    this.scriptNames = [];
  }

  start() {
    return Promise.resolve()
      .then(() => {
        return this.getScripts()
      })
      .then(() => {
         return this.invokeScripts();
      })
      .catch(err => {
        return Promise.reject(err);
      });
  }

  getScripts() {
    return new Promise((resolve, reject) => {
      fs.readdir(absoluteScriptPath, (err, files) => {
        if (Array.isArray(files)) {
          for (const file of files) {
            if (!file.includes(finishWord)) {
              this.scriptNames.push(file);
              this.scripts.push(
                require(relativeScriptPath + file))
            }
          }
        }

        resolve();
      });
    });
  }

  invokeScripts() {
    return new Promise((resolve, reject) => {
      async.eachOf(this.scripts, (script, index, callback) => {
        script()
          .then(result => {
            logger.info('Script ' + this.scriptNames[index] + ' processed succesfuly');
            this.toggleScriptState(this.scriptNames[index]);
            callback(null);
          }).catch(err => {
            logger.info('Script ' + this.scriptNames[index] + ' processed with error: ', err);
            callback(err);
          });
      }, (err) => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
  }

  toggleScriptState(scriptname) {
    fs.rename(absoluteScriptPath + scriptname,absoluteScriptPath + finishWord + scriptname, 
      (err) => {
        if (err) {
          throw err;
        }
      });
  }
};

module.exports = MigrateHandler;
