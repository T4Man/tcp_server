'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const files = ['lib/*.js', '/gulpfile.js', '!node_modules/**'];

gulp.task('mocha:test', () => {
  return gulp.src('./test/*.js')
  .pipe(mocha());
});

gulp.task('lint:test', () => {
  return gulp.src('./test/*.js')
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('lint:nontest', () => {
  return gulp.src(files)
  .pipe(eslint())
  .pipe(eslint.format());
});

gulp.task('watch', () => {
  gulp.watch('./test/*.js', ['lint:test']);
  gulp.watch(files, ['lint:nontest']);
});

gulp.task('lint', ['lint:test', 'lint:nontest']);
gulp.task('mochaTest', ['mocha:test']);
gulp.task('default', ['lint', 'mochaTest']);
