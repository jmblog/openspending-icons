# SVG Icon Gallery for "Where Does My Money Go?"

[http://jmblog.github.io/openspending-icons/]()

This is a gallery showcasing SVG icons used in [Where Does My Money Go?](http://wheredoesmymoneygo.org/) and its cloned sites (e.g. [http://spending.jp]()). It must be helpful to choice icons when you create an [OpenSpending satellite site](https://github.com/openspending/satellite-template).

## How to build the site?

### Requirements
* [Node.js](http://nodejs.org/)
* [Bower](http://bower.io)
* [Grunt](http://gruntjs.com)
* [Sass](http://sass-lang.com)

### Installation

```bash
$ git clone git@github.com:jmblog/openspending-icons.git
$ cd openspending-icons/
$ npm install && bower install
```

### Adding icons

An `app/icons` directory is a place for SVG files. If you want to add SVG icons for your satellite site, create a sub directory like `app/icons/spending.jp`.

### Preview the site

```bash
$ grunt server
```

A local HTTP server starts and a browser opens [http://localhost:9000]() automatically.

### Building for a production

```bash
$ grunt
```

A optimized set of files is created in a `dist` directory. Copy them to your web server.

### Deploying to your own GitHub page

If you would like to deploy to your GitHub Page, see [https://github.com/yeoman/yeoman/wiki/Deployment]().
