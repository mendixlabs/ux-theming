/*
  Gulpfile.js for theming Mendix themes. Source: {{{ repository }}}, version {{{ version }}}
*/

/* jshint node:true */
'use strict';

// What is the name of the style folder in this theme folder?
var sourceStyleFolder = '{{{ sourceStyleFolder }}}';

// What is the name of the style folder in the deployment folder?
var deploymentStyleFolder = '{{{ deploymentStyleFolder }}}';

// Browsersync feature, please specify the host & port of the running project (without http://)
var proxyAddress = '{{{ localAddress }}}';

/*
  *************************************************************************
  * Don't try to edit below this line, unless you know what you are doing *
  *************************************************************************/
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

gulp.task('build', function () {
  return gulp.src(sourceSassFolder + '**/*.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(gulp.dest(sourceCssFolder))
    .pipe(gulp.dest(deploymentCssFolder));
});

gulp.task('copy-css', function () {
  return gulp.src(sourceCssFolder + '**/*.css')
    .pipe(gulp.dest(deploymentCssFolder));
});

gulp.task('watch:sass', function () {
  gulp.watch('**/*.scss', { cwd: sourceSassFolder }, gulp.series('build-sass'));
});

gulp.task('watch:css', function () {
  gulp.watch('**/*.css', { cwd: sourceCssFolder }, gulp.series('copy-css'));
});

gulp.task('default', gulp.series(['watch:sass']));
gulp.task('css', gulp.series(['watch:css']));

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
  gulp.watch('**/*.scss', { cwd: sourceSassFolder }, gulp.series('browsersync-sass'));
});

gulp.task('browsersync', function () {
  browserSync.init({
    proxy: {
      target: proxyAddress,
      ws: true
    },
    online: true,
    open: true,
    reloadOnRestart: true,
    notify: true,
    ghostMode: false
  });
});

gulp.task('dev', gulp.parallel(['browsersync-sass', 'watch:browsersync-sass', 'browsersync']));
