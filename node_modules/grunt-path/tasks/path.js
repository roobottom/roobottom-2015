/*!
 * grunt-path
 *
 * @author Abashkin Alexander <monolithed@gmail.com>
 * @license MIT, 2014
 */

'use strict';

var crypto = require('crypto');
var fs = require('fs');


module.exports = function (grunt) {
	grunt.registerMultiTask('path', 'File information', function () {
		var options = this.options({
			algorithm: 'md5',
			indent: '\t'
		});

		var data = [];

		this.files.forEach(function (files) {
			files.src.forEach(function (file) {
				if (!grunt.file.isFile(file)) {
					return 0;
				}

				var read = fs.readFileSync(file),
					hash = crypto.createHash(options.algorithm);

				hash.update(read);

				var hex = hash.digest('hex');

				if (!hex) {
					grunt.fail.warn('Can not sum for ' + file);
				}

				data.push({
					file: file,
					hash: hex
				});
			});

			var content = JSON.stringify(data, null, options.indent);

			if (options.process) {
				content = options.process(data, files.src);
			}

			grunt.file.write(files.dest, content);
			grunt.log.writeln('File "' + files.dest + '" created.');
		});
	});
};
