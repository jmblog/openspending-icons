# SVG Icon Gallery for Where Does My Money Go?

[http://jmblog.github.io/openspending-icons/]()

This is a gallery showcasing SVG icons used in [Where Does My Money Go?](http://wheredoesmymoneygo.org/) and its cloned sites (e.g. [http://spending.jp]()). It must be helpful to choice icons when you create an [OpenSpending satellite site](https://github.com/openspending/satellite-template).

## How to build the site?

### Requirements
* [Node.js](http://nodejs.org/)
* [Yeoman](http://yeoman.io)
* [Bower](http://bower.io)
* [Grunt](http://gruntjs.com)
* [Sass](http://sass-lang.com)

### Installation

```bash
$ git clone git@github.com:jmblog/openspending-icons.git
$ cd openspending-icons/
$ npm install
$ bower install
```

### Adding icons

`app/icons` directory is a place of SVG files. If you want add SVG icons for your OpenSpending satellite site, create a sub directory and put them in.

### Preview and build

[Grunt](http://gruntjs.com) is used to preview and build. 

#### Preview

```bash
$ grunt server
```

A local HTTP server starts and a browser opens [http://localhost:9000]() automatically.

#### Building for a production

```bash
$ grunt
```

A optimized version of the site is built in a `dist` directory.

### Deploying to your own GitHub page

If you would like to deploy your web application in the `dist` directory to a GitHub Page, see [https://github.com/yeoman/yeoman/wiki/Deployment]().
