module.exports = function (grunt) {
  grunt.registerTask('coverage', [
    'env:test',
    'mocha_istanbul:coverageCI'])
}
