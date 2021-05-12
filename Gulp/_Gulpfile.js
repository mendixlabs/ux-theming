/*
  Gulpfile.js for theming Mendix themes. Source: {{{ repository }}}, version {{{ version }}}
*/

/* jshint node:true */
'use strict';

// What is the name of the style folder in this theme folder?
const sourceStyleFolder = '{{{ sourceStyleFolder }}}';

// What is the name of the style folder in the deployment folder?
const deploymentStyleFolder = '{{{ deploymentStyleFolder }}}';

// Browsersync feature, please specify the host & port of the running project (without http://)
const proxyAddress = '{{{ localAddress }}}';

/*
 *************************************************************************
 * Don't try to edit below this line, unless you know what you are doing *
 *************************************************************************/

const path = require('path');
const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');

const sourceFolder = './' + sourceStyleFolder + '/';
const sourceSassFolder = sourceFolder + 'sass/';
const sourceCssFolder = sourceFolder + 'css/';

const deploymentFolder = './deployment/web/' + deploymentStyleFolder;
const deploymentCssFolder = deploymentFolder + '/css/';

console.log(`Gulp is using the following folders:
    sourceFolder: ${sourceFolder}
    sourceSassFolder: ${sourceSassFolder}
    sourceCssFolder: ${sourceCssFolder}
    deploymentFolder: ${deploymentFolder}
    deploymentCssFolder: ${deploymentCssFolder}
`);

gulp.task('build-sass', function () {
    return gulp.src(sourceSassFolder + '**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(sourcemaps.write('./maps'))
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
    gulp.watch('**/*.scss', {
        cwd: sourceSassFolder
    }, gulp.series('build-sass'));
});

gulp.task('watch:css', function () {
    gulp.watch('**/*.css', {
        cwd: sourceCssFolder
    }, gulp.series('copy-css'));
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
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(sourceCssFolder))
        .pipe(gulp.dest(deploymentCssFolder))
        .pipe(browserSync.stream());
});

gulp.task('watch:browsersync-sass', function () {
    gulp.watch('**/*.scss', {
        cwd: sourceSassFolder
    }, gulp.series('browsersync-sass'));
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
