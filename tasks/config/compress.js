/**
 * Gzip files.
 *
 */

var Path = require("path");

module.exports = function(grunt) {

  grunt.config.set('compress', {
    dev: {
      options: {
        mode: 'gzip',
        level: 9
      },
      files: [{
        expand: true,
        cwd: '.tmp/public',
        src: ['**/*'],
        dest: '.tmp/public',
        suffix: '.gz',
        rename: function(dest, matchedSrcPath, options) {
          var file_name = matchedSrcPath + (options.suffix || "");
          return Path.join(dest, file_name);
        }
      }]
    },
    build: {
      options: {
        mode: 'tgz',
        level: 9,
        archive: 'www.tar.gz'
      },
      files: [{
        expand: true,
        src: ['www/**/*']
      }]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-compress');

};
