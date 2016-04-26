module.exports = {
  all: {
    expand: true,
    cwd: 'config/',
    src: ['**', '!*.js', '!**/*.js'],
    dest: 'dist/config/'
  }
}
