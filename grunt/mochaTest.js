module.exports = {
  test: {
    options: {
      require: [ 'babel-core/register' ],
      reporter: 'spec'
    },
    src: ['tests/unit/**/*.test.js']
  }
}
