# Grunt/Gulp for Mendix theming

Make it easier to develop Mendix themes, without the use of [Scout](https://world.mendix.com/display/public/howto50/Create+a+custom+theme+with+the+Mendix+UI+Framework) or [Koala](https://world.mendix.com/display/public/howto50/Setup+Mendix+UI+Framework+with+Koala)

## Prerequisites

The following things need to be installed:
* [Node.js](https://nodejs.org/en/)
* [SASS & Compass](http://thesassway.com/beginner/getting-started-with-sass-and-compass) **<-- this is probably not necessary when using gulp-sass, will check this**

If you want to use Grunt:
* [Grunt client](http://gruntjs.com/getting-started) (you can install this after installing Node using ```npm install grunt-cli -g```)

If you want to use Gulp:
* [Gulp client](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md) (you can install this after installing Node using ```npm install gulp-cli -g```)

Note:
> We have provided both Grunt and Gulp, but we recommend you use the **Gulp version**. The reason for this is that Gulp works with pipes, which makes it extremely fast. In a few tests we did, Gulp performed the tasks in 150ms, while Grunt took 4 seconds. Yet, because there are people that use Grunt (and the first version of ux-theming only had a Gruntfile), we include this one as well.

## Installation

1.) Download the latest release (ZIP-file) [here](https://github.com/JelteMX/ux-grunt-theming/releases). **Do NOT download the source files, but choose Gulp.zip or Grunt.zip**

2.) Unzip in your project root folder

3.) Open a terminal and go to your project root folder

4.) Install modules using ```npm install```

(To be sure you do not include node dependencies in you team-project, make sure you add the ``node_modules`` folder to your SVN ignore)

## Usage

Based on your choise between Gulp or Grunt, you have the following options:

* **default**, run from commandline:

```bash
grunt
```

or 

```bash
gulp
```

* **dev**, run from commandline:

```bash
grunt dev
```

or 

```bash
gulp dev
```

The **default** task will check your theme folder (check Gruntfile.js/Gulpfile.js for the location) and will:
* copy changed .css files to your deployment folder
* when there are changes detected in any ```.scss``` file, run sass and place them in the source folder (on which these files will be copied to deployment as well)

The **dev** task will do the same as default, but it will start your browser through a [Browsersync](http://www.browsersync.io/docs/grunt/) proxy. Any changes that you make in the css files will be automatically injected in your browser. You do not have to manually refresh your browser.

## Done theming?

Clean your project folder by deleting:
* ```package.json```
* ```Gruntfile.js``` or ```Gulpfile.js```
* ```node_modules``` folder

## License

Apache License, Version 2.0, January 2004
