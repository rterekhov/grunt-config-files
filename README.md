# grunt-config-files [![Build Status](https://travis-ci.org/rterekhov/grunt-config-files.svg?branch=master)](https://travis-ci.org/rterekhov/grunt-config-files)

> Grunt plugin that generates config files from their templates.

## Getting Started

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-config-files --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-config-files');
```

## Overview

This is a solution for situation where your project needs several versions of configuration files for different environments. The solution is based on files and may be applied in any kind of projects, not just JavaScript projects that use grunt as a build tool, but really any kind of projects. The grunt and this plugin are used for generating config files from templates and a set of settings files.

The plugin uses `grunt.template.process` for the templating. It is very lightweight and doesn’t have any dependencies.

## Config task
_Run this task with the `grunt config` command._

Task options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

### Options

#### settingsFile
Type: `String`
Default: `'settings.js'`

Path to the file with configuration settings.

#### templateFiles
Type: `Array`
Default: `[ '**/*.template' ]`

Paths to the configuration file templates to be processed.

#### logSettings
Type: `Boolean`
Default: `true`

Log configuration settings being used in templates.

#### logTemplateFiles
Type: `Boolean`
Default: `true`

Log all found configuration file templates.

## Setting files

Setting files are ordinary nodejs JavaScript files that export object with configuration settings. You may have as many setting files as you need by using suffixes in the file names: `settings.js`, `settings.default.js`, `settings.test.js`, `settings.prod.js`, `settings.common.js` etc. The `settings.js` file is used when no suffix is given in the task. The `settings.default.js` file is used for creating `settings.js` file when it is missing.

## Template files

Configuration file templates are used instead of real configuration files. The templates use placeholders `<%= value %>` for the values that should be different in the different environments.

For more details and examples, see the [documentation for the `_.template()` method](http://lodash.com/docs#template).

## Usage example

Having the configuration files:
```shell
├── app.config.template
└── config
    ├── settings.common.js
    ├── settings.default.js
    ├── settings.prod.js
    └── settings.test.js
```

Use the following plugin options:
```js
config: {
    options: {
        settingsFile:     'config/settings.js',
        templateFiles:  [ 'app.config.template' ],
        logSettings:      true,
        logTemplateFiles: false
    }
}
```

Generate configuration file with:
```shell
$ grunt config
```
This command will create `settings.js` file (if it missing) from `settings.default.js` and then process configuration template with the settings from this file.

You can also generate configuration file with the following commands:
```shell
$ grunt config:default
$ grunt config:test
$ grunt config:prod
```
In this case `settings.js` is not created but rather `settings.default.js`, `settings.test.js` or `settings.prod.js` are used directly.

Generated configuration file `app.config` and `settings.js` should be ignored in `.gitignore` file:
```bash
$ cat .gitignore
# Track config file templates instead of real config files
/app.config

# The file will be created from 'settings.default.js' when missing
/config/settings.js
```
Since `settings.js` is not tracked by git, the file may be adjusted for current development needs. The file will not be overridden when you run `grunt config` task. It is just created from `settings.default.js` when it missing.

Settings defined by an ordinary JavaScript file:
```bash
$ cat config/settings.common.js
module.exports = {
    user: {
        name: 'Administrator',
        email: 'admin@email.com'
    }
};
```

You may process and override settings in any way you like. Put, for example, common settings in a separate file like `settings.common.js` and then import them from another settings file. Use `deep-extend` module to easy add new or override existing settings.
```bash
$ cat config/settings.test.js
var deepExtend = require('deep-extend');

var commonSettings = require('./settings.common');

module.exports = deepExtend(commonSettings, {
    user: {
        email: 'test@email.com'
    },
    connection_string: 'test_connection_string'
});
```

The configuration file template contains placeholders instead of the values itself.
```bash
$ cat app.config.template
<config>
    <name><%= user.name %></name>
    <email><%= user.email %></email>
    <connection_string><%= connection_string %></connection_string>
</config>
```
