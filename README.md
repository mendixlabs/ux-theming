# Gulp for Mendix theming

Make it [easier to develop Mendix themes](https://docs.mendix.com/howto/ux/style-with-gulp-and-sass), without the use of [Scout](https://docs.mendix.com/howto/ux/create-a-custom-theme-with-the-mendix-ui-framework) or [Koala](https://docs.mendix.com/howto/ux/setup-mendix-ui-framework-with-koala)

[Using this with Mendix 8? Please read this](#mendix-8-caveats)

## Prerequisites (only need to do this once)

The following things need to be installed:
* [Node.js](https://nodejs.org/en/) **Please ensure you install the LTS version, 10.x.x. This is important!! It will fail on older versions like Node 6.x.x. Version 8 might still work, but is not supported by Node anymore**

If you want to use Gulp (**recommended**):
* [Gulp client](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md) (you can install this after installing Node using ```npm install gulp-cli -g```). **Note: Per version 1.6.0 this is unnecessary, because you can run it using npm**

If you want to use Grunt:
* [Grunt client](http://gruntjs.com/getting-started) (you can install this after installing Node using ```npm install grunt-cli -g```)

Note:
> We have provided both Grunt and Gulp, but we recommend you use the **Gulp version**. The reason for this is that Gulp works with pipes, which makes it extremely fast. In a few tests we did, Gulp performed the tasks in 150ms, while Grunt took 4 seconds. Yet, because there are people that use Grunt (and the first version of ux-theming only had a Gruntfile), we include this one as well.

## Installation

1.) Download the latest release (ZIP-file) [here](https://github.com/JelteMX/ux-grunt-theming/releases). **Do NOT download the source files, but choose Gulp.zip**

2.) Unzip in your project root folder

3.) Open a terminal and go to your project root folder.

_If you do this on Windows and you encounter errors with installing the dependencies, open your CMD or Powershell as Administrator._

4.) Install dependencies using ``npm install``

(**_If you use this for a Teamserver project, make sure you do not include node dependencies in you team-project: add the ``node_modules`` folder to your SVN ignore_**)

## Usage

### 1.6.0 and newer
Per version 1.6.0 you can use the following task using **npm** instead of **gulp**:

* **default**

```bash
  npm run start
```

* **dev**

```bash
  npm run dev
```

### 1.5.1 and older

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

### Tasks:

The **default** task will check your theme folder (check Gruntfile.js/Gulpfile.js for the location) and will:
* copy changed .css files to your deployment folder
* when there are changes detected in any ```.scss``` file, run sass and place them in the source folder (on which these files will be copied to deployment as well)

The **dev** task will do the same as default, but it will start your browser through a [Browsersync](http://www.browsersync.io/docs/grunt/) proxy. Any changes that you make in the css files will be automatically injected in your browser. You do not have to manually refresh your browser.

The **build** task will build all the CSS, minifying everything. This is **important** to do before committing the styling in the project. If you will use the default/dev task, it will keep the source mapping in the CSS, resulting in a huge filesize.

## Modifying parameters

There are a few parameters that you can change. Open your ``Gruntfile.js`` or ``Gulpfile.js``, you can change these values at the top:

* ``sourceStyleFolder``
* ``deploymentStyleFolder``
* ``proxyAddress``

Make sure ``proxyAddress`` is pointed to your local deployment.

## Troubleshooting

### ``npm install`` fails

Make sure you have the package.json and Gruntfile.js/Gulpfile.js in your root folder. Also, if there are errors installing (this can happen when you install the Gulp version), make sure you have administrator rights. See point 3 at Installation.

### "I started the dev task, but my ``localhost:3000`` keeps loading"

Have you pointed to the right local deployment address? Check the proxyAddress in your Gulp-/Gruntfile.js. This should correspond to the address of your local deployment.

### "I use the DEV task, but on reload it is missing styles"

This is a common problem when you are using this in new Mendix Projects where it is using Deeplinks (e.g. http://localhost:3000/link/page). The reason for this is that the paths to the styles are relative in your HTML. Please check the following:

* Open the 'index.html' (or the one that is used, for example 'index2.html')
* In the ``<head>`` section you will find the links to stylesheets:

```html
  <link rel="stylesheet" href="lib/bootstrap/css/bootstrap.min.css?{{cachebust}}">
  <link rel="stylesheet" href="mxclientsystem/mxui/ui/mxui.css?{{cachebust}}">
  <link rel="stylesheet" href="css/custom.css?{{cachebust}}">
  <link rel="stylesheet" href="css/custom/custom.css?{{cachebust}}">
```

* Make sure that any of these links to the stylesheets are prefixed with a ``/``, so it will always refer to the root:

```html
  <link rel="stylesheet" href="/lib/bootstrap/css/bootstrap.min.css?{{cachebust}}">
  <link rel="stylesheet" href="/mxclientsystem/mxui/ui/mxui.css?{{cachebust}}">
  <link rel="stylesheet" href="/css/custom.css?{{cachebust}}">
  <link rel="stylesheet" href="/css/custom/custom.css?{{cachebust}}">
```

This should fix your problem with missing stylesheets after a reload

### "I use the DEV task, but on reload I don't see any changes in Mendix 7"

This happens when the pages have urls (e.g. `http://localhost:3000/p/page_name`) and the HTML page includes relative links to the CSS files.

Mendix 7 uses a `settings.json` in the theme folder to determine which style files it needs to include. Most likely this looks like this:

```json
...
    "cssFiles": [
        "styles/css/lib/lib.css",
        "styles/css/custom/custom.css"
    ],
...
```

The way to fix this issue is to add a slash in front of these files:

```json
...
    "cssFiles": [
        "/styles/css/lib/lib.css",
        "/styles/css/custom/custom.css"
    ],
...
```

### "I get the following error:"

``gulpInst.start.apply(gulpInst, toRun); TypeError: Cannot read property 'apply' of undefined``

Your Gulp is outdated. Please run ``npm install gulp-cli -g`` again. Or use **npm**, see usage for 1.6.0 and newer.

### Mendix 8 caveats

When using UX-theming in Mendix 8, some issues might occur with an infinite loop or folders not being recognized. 

Most likely scenario is that the theme folder has changes. The new Mendix 8 structure (since Beta 3) has a distinct folder for web and for native. Make sure you set the following folders correctly in your Gulpfile:

```js
// What is the name of the style folder in this theme folder?
var sourceStyleFolder = 'theme/styles/web';

// What is the name of the style folder in the deployment folder?
var deploymentStyleFolder = 'styles/web';
```

This should fix most of the issues. If not, keep on reading.

Other issues might occur with SVN and possible rewriting Gulpfile.js. A few things to try:

- Remove node_modules, package.json, package-lock.json and Gulpfile.js. Replace them with a fresh copy downloaded here
- Not only ignore node_modules, but also Gulpfile.js. This means you will have to add the Gulpfile to the project if you download it again or someone in your team is working on it
- Make sure you use the latest LTS version (10.xx.x) of NodeJS

Our current testing indicates it still works in Mendix 8, but might be less reliable. Above workarounds might work, they might not. We're also looking into updating the libraries, to make sure we fix any issues that might arise with that.

## Done theming?

If you do not want the theming files to be part of the project (you can safely commit them, as long as you will add ``node_modules`` to **SVN Ignore**), you can clean your project folder by deleting:
* ```package.json```
* ```Gruntfile.js``` or ```Gulpfile.js```
* ```node_modules``` folder

## TODO

None

## License

The MIT License (MIT)
Copyright (c) 2019 Mendix

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
