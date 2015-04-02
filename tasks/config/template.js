/**
 * Interpolate template files.
 *
 */

var config = loadConfig();

module.exports = function(grunt) {

  grunt.config.set("template", {
    dev: {
      options: {
        data: {
          version: config.assets.version || "1",
          base_url: config.assets.base_url || ""
        }
      },
      files: {
        "assets/styles/config/_version.scss": ["assets/styles/config/_version.scss.tpl"],
        "assets/styles/config/_base-url.scss": ["assets/styles/config/_base-url.scss.tpl"]
      }
    }
  });

  grunt.loadNpmTasks("grunt-template");

};

function loadConfig() {
  var config = { assets: {} };
  var env = process.env.NODE_ENV || "development";
  var _ = require("sails/node_modules/lodash");

  try {
    var _config = require(process.cwd() + "/config/assets");
    if (_.isObject(_config.assets)) {
      _.merge(config.assets, _config.assets);
    }
  } catch (e) {}

  try {
    var _config = require(process.cwd() + "/config/env/" + env);
    if (_.isObject(_config.assets)) {
      _.merge(config.assets, _config.assets);
    }
  } catch (e) {}

  try {
    var _config = require(process.cwd() + "/config/local");
    if (_.isObject(_config.assets)) {
      _.merge(config.assets, _config.assets);
    }
  } catch (e) {}

  return config;
}
