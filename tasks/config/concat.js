/**
 * Concatenate files.
 *
 * ---------------------------------------------------------------
 *
 * Concatenates files javascript and css from a defined array. Creates concatenated files in
 * .tmp/public/contact directory
 * [concat](https://github.com/gruntjs/grunt-contrib-concat)
 *
 * For usage docs see:
 *    https://github.com/gruntjs/grunt-contrib-concat
 */
module.exports = function(grunt) {

  grunt.config.set('concat', {
    dev: {
      files: [{
        src: require('../pipeline').jsFilesToInject,
        dest: '.tmp/public/js/main.js'
      },{
        src: require('../pipeline').cssFilesToInject,
        dest: '.tmp/public/styles/main.css'
      }]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
};
