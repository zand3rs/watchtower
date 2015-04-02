module.exports = function (grunt) {
  grunt.registerTask('compileAssets', [
    'clean:dev',
    'template:dev',
    'jst:dev',
    'less:dev',
    'sass:dev',
    'copy:dev',
    'coffee:dev',
    'concat:dev',
    'uglify:dev',
    'compress:dev'
  ]);
};
