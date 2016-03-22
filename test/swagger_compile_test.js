'use strict';

var grunt = require('grunt');

/*
 ======== A Handy Little Nodeunit Reference ========
 https://github.com/caolan/nodeunit

 Test methods:
 test.expect(numAssertions)
 test.done()
 Test assertions:
 test.ok(value, [message])
 test.equal(actual, expected, [message])
 test.notEqual(actual, expected, [message])
 test.deepEqual(actual, expected, [message])
 test.notDeepEqual(actual, expected, [message])
 test.strictEqual(actual, expected, [message])
 test.notStrictEqual(actual, expected, [message])
 test.throws(block, [error], [message])
 test.doesNotThrow(block, [error], [message])
 test.ifError(value)
 */

exports.swagger_compile = {
    simple_test: function (test) {
        test.expect(1);

        var filepath = 'simple-swagger';
        var actual = grunt.file.read('tmp/' + filepath + '.yaml');
        var expected = grunt.file.read('test/expected/' + filepath + '.yaml');
        test.equal(actual, expected, 'should convert a Swagger JSON to YAML');

        test.done();
    },
    referencing_test: function (test) {
        test.expect(1);

        var filepath = 'referencing-swagger';
        var actual = grunt.file.read('tmp/' + filepath + '.yaml');
        var expected = grunt.file.read('test/expected/' + filepath + '.yaml');
        test.equal(actual, expected, 'Should include JSON references before converting a Swagger JSON to YAML.');

        test.done();
    }
};
