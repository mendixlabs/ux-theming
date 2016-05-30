/* global require*/
'use strict';

/*
    These variables may be changed
 */

// What is the name of the style folder in this theme folder?
var sourceStyleFolder = 'theme/styles';

// What is the name of the style folder in the deployment folder?
var deploymentStyleFolder = 'styles';

// Browsersync feature, please specify the host & port of the running project (without http://)
var proxyAddress = 'localhost:8081';

/*
  *************************************************************************
  * Don't try to edit below this line, unless you know what you are doing *
  *************************************************************************
                                                                              */

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    path = require('path'),
    sourcemaps = require('gulp-sourcemaps');

var sourceFolder = './' + sourceStyleFolder + '/',
    sourceSassFolder = sourceFolder + 'sass/',
    sourceCssFolder = sourceFolder + 'css/';

var deploymentFolder = './deployment/web/' + deploymentStyleFolder,
    deploymentCssFolder = deploymentFolder + '/css/';

gulp.task('build-sass', function () {
  return gulp.src(sourceSassFolder + '**/*.scss')
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(gulp.dest(sourceCssFolder))
    .pipe(gulp.dest(deploymentCssFolder));
});

gulp.task('copy-css', function () {
  return gulp.src(sourceCssFolder + '**/*.css')
    .pipe(gulp.dest(deploymentCssFolder));
});

gulp.task('watch:sass', function () {
  gulp.watch(sourceSassFolder + '**/*.scss', ['build-sass']);
});

gulp.task('watch:css', function () {
  gulp.watch(sourceCssFolder + '**/*.css', ['copy-css']);
});

gulp.task('default', ['watch:sass']);
gulp.task('css', ['watch:css']);
gulp.task('build', ['build-sass']);

// Browsersync
gulp.task('browsersync-sass', function () {
  return gulp.src(sourceSassFolder + '**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(sourceCssFolder))
    .pipe(gulp.dest(deploymentCssFolder))
    .pipe(browserSync.stream());
});

gulp.task('watch:browsersync-sass', function () {
  gulp.watch(sourceSassFolder + '**/*.scss', ['browsersync-sass']);
});

gulp.task('dev', ['browsersync-sass', 'watch:browsersync-sass'], function () {

  browserSync.init({
    proxy: proxyAddress
  });

});
