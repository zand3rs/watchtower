/**
 * Compiles SASS files into CSS.
 *
 */

module.exports = function(grunt) {

  grunt.config.set('sass', {
    dev: {
      options: {
        style: 'nested',
        lineNumbers: true
      },
      files: [{
        expand: true,
        cwd: 'assets/styles/',
        src: ['*.scss', '*.sass'],
        dest: '.tmp/public/styles/',
        ext: '.css'
      }, {
        expand: true,
        cwd: 'assets/linker/styles/',
        src: ['*.scss', '*.sass'],
        dest: '.tmp/public/linker/styles/',
        ext: '.css'
      }]
    }
  });

  grunt.loadNpmTasks('grunt-sass');

};
