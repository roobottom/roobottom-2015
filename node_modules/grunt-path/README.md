# grunt-path

[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

[![NPM](https://nodei.co/npm/grunt-path.png?downloads=true)](https://nodei.co/npm/grunt-path/)


> Returns information about each file in the specified directory

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-path --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-path');
```

## Path task
_Run this task with the `grunt path` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

### Options

#### algorithm
Type: `String`
Default: `md5`

algorithm is dependent on the available algorithms supported by the version of OpenSSL on the platform.
Examples are 'sha1', 'md5', 'sha256', 'sha512', etc. On recent releases, `openssl list-message-digest-algorithms` will display the available digest algorithms.


#### indent
Type: `String`
Default: `\t`

The indent argument may be used to control spacing in the final string. If it is a number, successive levels in the stringification will each be indented by this many space characters (up to 10). If it is a string, successive levels will indented by this string (or the first ten characters of it).


#### process
Type: `Function(/* [ ...{ file, hex } ], [ ...files ] */)`

This option as an advanced way to control the file contents that are created.


### Usage Example

```js
var yaml = require('js-yaml');

module.exports = function (grunt) {
	grunt.config.init({
		path: {
			options: {
				// Use SHA1 algorithm
				algorithm: 'sha1',

				// Save file in YAML format
				process: function (content, files) {
					return yaml.safeDump(content);
				}
			},

			build: {
				files: [
					{
						'build/files.json': ['folder/**/*', 'files/**/*.{js,css}']
					}
				]
			}
		}
	});

	grunt.loadNpmTasks('grunt-path');
	grunt.registerTask('default', ['path']);
};

```

This task supports all the file mapping format Grunt supports. Please read [Globbing patterns](http://gruntjs.com/configuring-tasks#globbing-patterns) and [Building the files object dynamically](http://gruntjs.com/configuring-tasks#building-the-files-object-dynamically) for additional details.


### Output

##### File structure

```
├── path
│   ├── file

```

##### Output file

```
[
	{
		"file": "path/file.json",
		"hash": "d8e8fca2dc0f896fd7cb4cb0031ba249"
	}
]
```

Task submitted by [Alexander Abashkin](https://github.com/monolithed)
