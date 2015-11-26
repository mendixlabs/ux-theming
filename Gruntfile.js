'use strict';


/*
    These variables may be changed
 */

// What is the name of the style folder in this theme folder?
var sourceStyleFolder = 'theme/styles';
// What is the name of the style folder in the deployment folder?
var deploymentStyleFolder = 'styles';

// Browsersync feature, please specify the host & port of the running project (without http://)
var proxyAddress = 'localhost:8080';

/*
    Run this Gruntfile from your project folder as:

    > grunt
    (default configuration, watches for changes in sass files and copies changes in css files to deployment)

    > grunt dev
    (dev configuration, does the same as default, but opens a browser in browsersync modus)

        *************************************************************************
        * Don't try to edit below this line, unless you know what you are doing *
        *************************************************************************
                                                                                                                */

var path = require('path'),
    shelljs = require('shelljs');

function getPathFromHere (p) {
    return path.join(shelljs.pwd(), p);
}

var sourceFolder = './' + sourceStyleFolder + '/';
var deploymentFolder = getPathFromHere('./deployment/web/' + deploymentStyleFolder);


module.exports = function (grunt) {
    var pkg = grunt.file.readJSON("package.json");
    grunt.verbose;
    grunt.initConfig({
        watch: {
            sass: {
                "files": [ sourceFolder + '**/*.scss' ],
                "tasks": [ "sass:dev" ],
                options: {
                    debounceDelay: 250
                }
            },
            css: {
                "files": [ sourceFolder + '**/*.css' ],
                "tasks": [ "copy:dev" ],
                options: {
                    debounceDelay: 250
                }
            }
        },
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'styles',
                    src: ['*.scss'],
                    dest: '../public',
                    ext: '.css'
                }]
            },
            dev: {
                options: {
                    style: 'expanded',
                    compass: true
                },
                files: [{
                    expand: true,
                    cwd: sourceFolder,
                    src: ['*.scss'],
                    dest: sourceFolder,
                    ext: '.css'
                }]
            }
        },
        copy: {
            dev: {
                files: [
                    {
                        dest: deploymentFolder,
                        cwd: sourceFolder,
                        src: ["**/*.css*"],
                        expand: true
                    }
                ]
            }
        },
        browserSync: {
            bsFiles: {
                src : [
                    deploymentFolder + '/**/*.css'
                ]
            },
            options: {
                watchTask: true,
                proxy: proxyAddress
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy')
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');

    grunt.registerTask("default", "Default task", [ "sass:dev", "watch" ]);

    grunt.registerTask("dev", "BROWSERSYNC", [ "sass:dev", "browserSync", "watch" ]);
};
