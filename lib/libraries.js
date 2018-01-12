var config = require('../config/config');
var path = require('path');
var fs = require('fs');
/**
 * merge core config with custom config
 * @author dangvh <dangvh@rikkeisoft.com>
 * @type {function}
 */
exports.mergeConfig = function() {
    var rootPath = path.dirname(require.main.filename || process.mainModule.filename) + '/../';
    if (fs.existsSync(config.webpack.file)) {
        try {
            configReaded = JSON.parse(fs.readFileSync(config.webpack.file).toString());
            if (!configReaded.entry) {
                throw 'Missing entry in config.';
            }
            if (typeof configReaded.entry == "string") {
                config.webpack.entry.push(path.join(rootPath, configReaded.entry));
            }
            if (typeof configReaded.entry == "object") {
                for (var i = 0; i < configReaded.entry.length; i++) {
                    config.webpack.entry.push(path.join(rootPath, configReaded.entry[i]));
                }
            }
            if (configReaded.output) {
                if (configReaded.output.script) {
                    config.webpack.output.script = configReaded.output.script;
                }
                if (configReaded.output.style) {
                    config.webpack.output.style = configReaded.output.style;
                }
            }
            if (configReaded.notify === false) {
                config.notify = false;
            }
        } catch (e) {
            throw 'Error reading config.';
        }
    }
    return config;
}