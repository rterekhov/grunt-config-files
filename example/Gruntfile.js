module.exports = function(grunt) {
    'use strict';

    grunt.loadNpmTasks('grunt-config-files');

    grunt.initConfig({
        config: {
            options: {
                settingsFile:     'config/settings.js',
                templateFiles:  [ 'app.config.template' ],
                logSettings:      true,
                logTemplateFiles: false
            }
        }
    });
};
