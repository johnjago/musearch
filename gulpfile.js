var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var cleanCSS = require('gulp-clean-css');
var minify = require('gulp-minify');
var sass = require('gulp-sass');

gulp.task('html', function() {
  return gulp.src('src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'));
});

gulp.task('css', function() {
  return gulp.src('src/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('dist'));
});

gulp.task('js', function() {
  gulp.src('src/*.js')
    .pipe(minify({ noSource: true, ext: { min: '.js' } }))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  gulp.watch('src/*.html', ['html']);
  gulp.watch('src/*.scss', ['css']);
  gulp.watch('src/*.js', ['js']);
});

gulp.task('default', ['html', 'css', 'js']);
