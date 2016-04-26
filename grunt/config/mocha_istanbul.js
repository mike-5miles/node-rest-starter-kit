module.exports = {
  coverage: {
    src: ['dist/tests/**/*.test.js'],
    options: {
      coverageFolder: 'tests/results/coverage'
    }
  },
  coverageCI: {
    src: ['dist/tests/**/*.test.js'],
    options: {
      coverageFolder: 'tests/results/coverage',
      reportFormats: ['clover', 'lcov']
    }
  }
}
