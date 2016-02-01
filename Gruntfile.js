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

var sourceFolder = './' + sourceStyleFolder + '/',
    sourceSassFolder = sourceFolder + 'sass/',
    sourceCssFolder = sourceFolder + 'css/';

var deploymentFolder = './deployment/web/' + deploymentStyleFolder,
    deploymentCssFolder = deploymentFolder + '/css/';


module.exports = function (grunt) {
    var pkg = grunt.file.readJSON("package.json");
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
            // dev: {
            //   options: {
            //       style: 'expanded'
            //     },
            //     files: {
            //       './theme/styles/css/custom/custom.css': './theme/styles/sass/custom/custom.scss',
            //       './theme/styles/css/lib/lib.css': './theme/styles/sass/lib/lib.scss'
            //     }
            // },
            dev: {
                options: {
                    style: 'expanded',
                    compass: true
                },
                files: [{
                    expand: true,
                    cwd: sourceSassFolder,
                    src: ['**/*.scss'],
                    dest: sourceCssFolder,
                    ext: '.css'
                }]
            }
        },
        copy: {
            dev: {
                files: [
                    {
                        dest: deploymentCssFolder,
                        cwd: sourceCssFolder,
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

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');

    grunt.registerTask("default", "Default task", [ "sass:dev", "watch" ]);

    grunt.registerTask("dev", "BROWSERSYNC", [ "sass:dev", "browserSync", "watch" ]);
};
