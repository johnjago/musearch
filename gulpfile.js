var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var cleanCSS = require('gulp-clean-css');

gulp.task('html', function() {
  return gulp.src('src/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});

gulp.task('css', function() {
  return gulp.src(['src/css/*.css', './node_modules/milligram/dist/milligram.min.css'])
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('js', function() {
  return gulp.src(['src/js/*.js', './node_modules/jquery/dist/jquery.min.js'])
    .pipe(gulp.dest('dist/js/'));
});

gulp.task('watch', function() {
  gulp.watch('src/*.html', ['html']);
  gulp.watch('src/css/*.css', ['css']);
  gulp.watch('src/js/*.js', ['js']);
});

gulp.task('default', ['html', 'css', 'js']);
