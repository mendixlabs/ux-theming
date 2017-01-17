/*
  Gruntfile.js for theming Mendix themes. Source: {{{ repository }}}, version {{{ version }}}
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
