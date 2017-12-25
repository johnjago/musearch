var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var cleanCSS = require('gulp-clean-css');
var minify = require('gulp-minify');

gulp.task('html', function() {
  return gulp.src('src/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});

gulp.task('css', function() {
  return gulp.src('src/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('js', function() {
  gulp.src('src/js/*.js')
    .pipe(minify({
        ext: {
            src:'.not-min.js',
            min:'.js'
        }
    }))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('watch', function() {
  gulp.watch('src/*.html', ['html']);
  gulp.watch('src/css/*.css', ['css']);
  gulp.watch('src/js/*.js', ['js']);
});

gulp.task('default', ['html', 'css', 'js']);
