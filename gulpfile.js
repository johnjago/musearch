const { src, dest, watch, parallel, series, task } = require('gulp');
const htmlmin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass');
const purgecss = require('gulp-purgecss');
const uglify = require('gulp-uglify');
const pump = require('pump');

function html() {
  return src('src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('dist'));
}

function css() {
  return src('src/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(purgecss({ content: ['src/**/*.html'] }))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(dest('dist'));
}

function js(cb) {
  pump([
    src('src/*.js'),
    uglify(),
    dest('dist')
  ], cb);
}

function favicon() {
  return src('src/img/favicon-32x32.png')
    .pipe(dest('dist'));
}

function watchAll() {
  watch('src/*.html', html);
  watch('src/*.scss', css);
  watch('src/*.js', js);
}

const build = parallel(html, css, js, favicon);

task('default', build);
task('watch', series(build, watchAll));
