module.exports = function (grunt) {
  grunt.registerTask('build', ['clean', 'babel', 'copy'])
}
