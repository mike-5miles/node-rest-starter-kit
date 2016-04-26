module.exports = {
  options: {
    sourceMap: true
  },
  src: {
    files: [{
      expand: true,
      cwd: 'src',
      src: ['**/*.js'],
      dest: 'dist/src'
    }]
  },
  config: {
    files: [{
      expand: true,
      cwd: 'config',
      src: ['*.js', '**/*.js'],
      dest: 'dist/config'
    }]
  },
  tests: {
    files: [{
      expand: true,
      cwd: 'tests',
      src: ['**/*.js'],
      dest: 'dist/tests'
    }]
  }
}
