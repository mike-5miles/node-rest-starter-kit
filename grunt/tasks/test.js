module.exports = function (grunt) {
  grunt.registerTask('test', ['env:test', 'mochaTest:test'])
}
