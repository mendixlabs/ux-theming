# Grunt/Gulp for Mendix theming

Make it easier to develop Mendix themes, without the use of [Scout](https://world.mendix.com/display/public/howto50/Create+a+custom+theme+with+the+Mendix+UI+Framework) or [Koala](https://world.mendix.com/display/public/howto50/Setup+Mendix+UI+Framework+with+Koala)

## Prerequisites

The following things need to be installed:
* [Node.js](https://nodejs.org/en/)
* [SASS & Compass](http://thesassway.com/beginner/getting-started-with-sass-and-compass)

If you want to use Grunt:
* [Grunt client](http://gruntjs.com/getting-started) (you can install this after installing Node using ```npm install grunt-cli -g```

If you want to use Gulp:
* [Gulp client](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md) (you can install this after installing Node using ```npm install gulp-cli -g```

## Installation

1.) Download the latest release (ZIP-file) [here](https://github.com/JelteMX/ux-grunt-theming/releases). Do NOT download the source files, but choose Gulp.zip or Grunt.zip

2.) Unzip in your project root folder

3.) Open a terminal and go to your project root folder

4.) Install modules using ```npm install```

(To be sure you do not include node dependencies in you team-project, make sure you add the ``node_modules`` folder to your SVN ignore)

## Usage

Based on your choise between Gulp or Grunt, you have the following options:

### Grunt
Currently, the Gruntfile has two options:

* **default**, run from commandline:

```bash
grunt
```

* **dev**, run from commandline:

```bash
grunt dev
```

The **default** Grunt task will check your theme folder (check Gruntfile.js for the location) and will:
* copy changed .css files to your deployment folder
* when there are changes detected in any ```.scss``` file, run sass and place them in the source folder (on which these files will be copied to deployment as well)

The **dev** Grunt task will do the same as default, but it will start your browser through a [Browsersync](http://www.browsersync.io/docs/grunt/) proxy. Any changes that you make in the css files will be automatically injected in your browser. You do not have to manually refresh your browser.

### Gulp

**TBD**

## Done theming?

Clean your project folder by deleting:
* ```package.json```
* ```Gruntfile.js``` or ```Gulpfile.js```
* ```node_modules``` folder

## Development TODO (will be done in future release):

* Make Compass optional
* Make SASS optional
* Grunt browsersync options

## License

Apache License, Version 2.0, January 2004
