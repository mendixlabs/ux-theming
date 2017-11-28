# Grunt/Gulp for Mendix theming

Make it easier to develop Mendix themes, without the use of [Scout](https://docs.mendix.com/howto/ux/create-a-custom-theme-with-the-mendix-ui-framework) or [Koala](https://docs.mendix.com/howto/ux/setup-mendix-ui-framework-with-koala)

## Prerequisites (only need to do this once)

The following things need to be installed:
* [Node.js](https://nodejs.org/en/) **Please ensure you install the LTS version, 8.x.x**

If you want to use Gulp (recommended):
* [Gulp client](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md) (you can install this after installing Node using ```npm install gulp-cli -g```)

If you want to use Grunt:
* [Grunt client](http://gruntjs.com/getting-started) (you can install this after installing Node using ```npm install grunt-cli -g```)

Note:
> We have provided both Grunt and Gulp, but we recommend you use the **Gulp version**. The reason for this is that Gulp works with pipes, which makes it extremely fast. In a few tests we did, Gulp performed the tasks in 150ms, while Grunt took 4 seconds. Yet, because there are people that use Grunt (and the first version of ux-theming only had a Gruntfile), we include this one as well.

## Installation

1.) Download the latest release (ZIP-file) [here](https://github.com/JelteMX/ux-grunt-theming/releases). **Do NOT download the source files, but choose Gulp.zip or Grunt.zip**

2.) Unzip in your project root folder

3.) Open a terminal and go to your project root folder.

_If you do this on Windows and you encounter errors with installing the dependencies, open your CMD or Powershell as Administrator._

4.) Install dependencies using ``npm install``

(**_If you use this for a Teamserver project, make sure you do not include node dependencies in you team-project: add the ``node_modules`` folder to your SVN ignore_**)

## Usage

Based on your choice between Gulp or Grunt, you have the following options:

* **default**, run from commandline:

```bash
  gulp
```

  or

```bash
  grunt
```

* **dev**, run from commandline:

```bash
gulp dev
```

or

```bash
grunt dev
```

The **default** task will check your theme folder (check Gruntfile.js/Gulpfile.js for the location) and will:
* copy changed .css files to your deployment folder
* when there are changes detected in any ```.scss``` file, run sass and place them in the source folder (on which these files will be copied to deployment as well)

The **dev** task will do the same as default, but it will start your browser through a [Browsersync](http://www.browsersync.io/docs/grunt/) proxy. Any changes that you make in the css files will be automatically injected in your browser. You do not have to manually refresh your browser.

## Modifying parameters

There are a few parameters that you can change. Open your ``Gruntfile.js`` or ``Gulpfile.js``, you can change these values at the top:

* ``sourceStyleFolder``
* ``deploymentStyleFolder``
* ``proxyAddress``

Make sure ``proxyAddress`` is pointed to your local deployment.

## Troubleshooting

* **``npm install`` fails**<br /><br />
  Make sure you have the package.json and Gruntfile.js/Gulpfile.js in your root folder. Also, if there are errors installing (this can happen when you install the Gulp version), make sure you have administrator rights. See point 3 at Installation.

* **"I started the dev task, but my ``localhost:3000`` keeps loading"**<br /><br />
  Have you pointed to the right local deployment address? Check the proxyAddress in your Gulp-/Gruntfile.js. This should correspond to the address of your local deployment.

## Done theming?

Clean your project folder by deleting:
* ```package.json```
* ```Gruntfile.js``` or ```Gulpfile.js```
* ```node_modules``` folder

## TODO

* ~~Check if Sass & Compass are still necessary~~ The later versions of node-sass will download their own binary, so you don't need to install Sass yourself.

## License

The MIT License (MIT)
Copyright (c) 2017 Mendix

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
