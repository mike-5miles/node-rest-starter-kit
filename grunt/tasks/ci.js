module.exports = function (grunt) {
  grunt.registerTask('ci', [
    'build',
    'eslint',
    'env:test',
    'mochaTest:testCI'])
}
