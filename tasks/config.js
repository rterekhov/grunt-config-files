/* global module, require */
module.exports = function(grunt) {
    'use strict';

    var path = require('path');

    grunt.registerTask('config', 'Generates config files from their templates.', function(settingsFileSuffix) {
        // Help function
        var removeExtension = function(filepath) {
            return filepath.substr(0, filepath.lastIndexOf('.'));
        };

        // Default options
        var options = this.options({
            settingsFile: 'settings.js',
            templateFiles: [ '**/*.template' ],
            logSettings: true,
            logTemplateFiles: true
        });

        // Select settings file
        var settingsFile = options.settingsFile;

        if (settingsFileSuffix) {
            settingsFile = removeExtension(settingsFile) + '.' + settingsFileSuffix + '.js';

            if  (!grunt.file.exists(settingsFile)) {
                grunt.fail.fatal('Cannot find settings file "' + settingsFile + '"');
            }
        }
        else {
            if (!grunt.file.exists(settingsFile)) {
                var defaultSettingsFile = removeExtension(settingsFile) + '.default.js';

                grunt.file.copy(
                    defaultSettingsFile,
                    settingsFile
                );

                grunt.log.writeln('Copied "' + defaultSettingsFile + '" to "' + settingsFile + '"');
            }
        }

        grunt.log.writeln('Use "' + settingsFile + '" settings file');

        // Get settings
        var settings = require(removeExtension(path.resolve(settingsFile)));

        // Log settings
        if (options.logSettings === true) {
            grunt.log.writeln();
            grunt.log.writeln('Settings:');
            grunt.log.writeln(JSON.stringify(settings, null, '  '));
        }

        // Find template files
        var templateFiles = grunt.file.expand(options.templateFiles);

        // Log template files
        if (options.logTemplateFiles === true) {
            grunt.log.writeln();
            grunt.log.writeln('Template files:');

            for (var i = 0, l = templateFiles.length; i < l; i++) {
                grunt.log.writeln(templateFiles[i]);
            }
            if (templateFiles.length === 0) {
                grunt.log.error('No template files found');
            }
        }

        // Process template files
        for (var i = 0, l = templateFiles.length; i < l; i++) {
            var templateFile = templateFiles[i];
            var resultFile   = removeExtension(templateFile);

            var template = grunt.file.read(templateFile);

            var result = grunt.template.process(template, { data: settings } );

            grunt.file.write(resultFile, result);
        }
    });
};
