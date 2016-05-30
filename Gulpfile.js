var gulp = require('gulp');
var zip = require('gulp-zip');

gulp.task('build:grunt', function () {
    return gulp.src('Grunt/*')
        .pipe(zip('Grunt.zip'))
        .pipe(gulp.dest('dist'));
});

gulp.task('build:gulp', function () {
    return gulp.src('Gulp/*')
        .pipe(zip('Gulp.zip'))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['build:grunt', 'build:gulp']);
