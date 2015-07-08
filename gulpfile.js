var gulp        = require('gulp');
var sass        = require('gulp-sass');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;

// Simple compile
gulp.task('sass', function () {
  gulp.src('./src/**/*.scss')
    .pipe(sass('proton.css').on('error', sass.logError))
    .pipe(gulp.dest('./src'));
});

// simple watch
var watchYourSass = gulp.watch(
  './src/**/*.scss',
  [ 'sass', ],
  { cwd: 'src' },
  reload);

// watch files for changes and reload
gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: 'src'
    },
    notify: false
  });
  watchYourSass.on('change', function(event) {
    console.log('Sass File was ' + event.type + ', running tasks...');
  });
  gulp.watch('./src/**/**/**').on('change', reload);
});

// setup defaults
gulp.task('default', [
  'sass',
]);
