module.exports = function (grunt) {
  grunt.initConfig({
    i18n: {
      dist: {
        options: {
          baseDir: 'public',
          outputDir: 'public/',
          files: '*.html'
        },
      },
      options: {
        fileFormat: 'json',
        exclude: ['components/'],
        locales: ['en', 'pt'],
        locale: '',
        localesPath: 'locales',
      },
    },
  });
  grunt.loadNpmTasks('grunt-i18n-static');
};
