module.exports = function (grunt) {
  grunt.registerTask('buildProd', [
    'compileAssets',
    'uglify',
    'cssmin',
    'linkAssetsBuildProd',
    'clean:build',
    'copy:build'
  ]);
};
