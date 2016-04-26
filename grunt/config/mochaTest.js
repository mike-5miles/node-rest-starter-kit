module.exports = {
  test: {
    src: ['tests/unit/**/*.test.js'],
    options: {
      require: [ 'babel-core/register' ],
      reporter: 'spec'
    }
  },
  testCI: {
    src: ['dist/tests/unit/**/*.test.js'],
    options: {
      reporter: 'tap',
      captureFile: 'tests/results/test.tap'
    }
  }
}
