# Gruntfile for Mendix theming

This Gruntfile makes it easier to develop Mendix themes, without the use of [Scout](https://world.mendix.com/display/public/howto50/Create+a+custom+theme+with+the+Mendix+UI+Framework) or [Koala](https://world.mendix.com/display/public/howto50/Setup+Mendix+UI+Framework+with+Koala)

## Prerequisites

The following things need to be installed:
* [Node.js](https://nodejs.org/en/)
* [SASS & Compass](http://thesassway.com/beginner/getting-started-with-sass-and-compass)

## Installation

1.) Download the latest release (ZIP-file) [here](https://github.com/JelteMX/ux-grunt-theming/releases)

2.) Unzip in your project root folder

3.) Open a terminal and go to your project root folder

4.) Install modules using ```npm install```

## Usage

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

## Done theming?

Clean your project folder by deleting:
* ```package.json```
* ```Gruntfile.js```
* ```node_modules``` folder

## License

Apache License, Version 2.0, January 2004

