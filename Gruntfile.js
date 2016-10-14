module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: true
            },
            all: [
                '**/*.js',
                '!**/node_modules/**'
            ]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', ['jshint']);
};
