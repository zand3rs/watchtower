module.exports = function (grunt) {
	grunt.registerTask('syncAssets', [
		'template:dev',
		'jst:dev',
		'less:dev',
		'sass:dev',
		'sync:dev',
		'coffee:dev',
		'concat:dev'
	]);
};
