module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json')
  })

  grunt.config('mochaTest', require('./grunt/mochaTest.js'))
  grunt.config('mocha_istanbul', require('./grunt/mocha_istanbul.js'))

  grunt.loadNpmTasks('grunt-mocha-test')
  grunt.loadNpmTasks('grunt-mocha-istanbul')

  grunt.registerTask('default', ['mochaTest'])
  grunt.registerTask('coverage', ['mocha_istanbul:coverage'])
}
