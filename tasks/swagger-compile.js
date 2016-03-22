/*
 * grunt-swagger-utils
 * https://github.com/Ergosign/grunt-swagger-compile
 *
 * Copyright (c) 2016 Al Briggs
 * Licensed under the MIT license.
 */

'use strict';

var SwaggerParser = require('swagger-parser');
var YAML = SwaggerParser.YAML;

module.exports = function (grunt) {

    grunt.task.registerTask('swagger-compile', 'A task to compile multiple swagger files into a single file', function (arg1, arg2) {

        var done = this.async();

        var options = this.options();

        var swaggerFiles = grunt.file.expand([options.src]);

        var compileRuns = 0;
        var compileError;

        var swaggerOptions = {
            $refs: {
                circular: false,
                internal: false
            }
        };


        swaggerFiles.forEach(function (filePath) {
            SwaggerParser.dereference(filePath, swaggerOptions, function (err, newApi) {
                if (err) {
                    compileError = err;
                }
                else {
                    var targetFileName = options.target + filePath.substring(filePath.lastIndexOf('/'), filePath.lastIndexOf('.')) + '.yaml';
                    console.log("Compiled Swagger JSON: " + filePath + ' to target YAML : ' + targetFileName);

                    //write each object to the target directory
                    // var jsonString = JSON.stringify(newApi,null,2);
                    var yamlString = YAML.stringify(newApi);

                    grunt.file.write(targetFileName, yamlString);
                }
                compileRuns = compileRuns + 1;
                if (compileRuns >= swaggerFiles.length) {
                    done(compileError);
                }
            });

        });

    });

};
