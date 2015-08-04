module.exports = function(grunt) {
    
  //load   
  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-jekyll');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.initConfig({
    
    
    //process all images.  
    responsive_images: {
        resize: {
            options: {
                engine: 'im',
                newFilesOnly: true,
                sizes: [{
                    width: 240,
                    height: 240,
                    name: 'square',
                    quality: 60,
                    aspectRatio: false,
                    
                } , {
                    width: 640,
                    name: 'medium',
                    quality: 80
                } , {
                    width: 1024,
                    name: 'large',
                    quality: 90,
                    upscale: true
                }]
            },
            files: [{
                expand: true,
                src: ['assets/*/**.{jpg,jpeg}'],
                custom_dest: '{%= path %}/{%= name %}/'
            }]
        }  
    },
    
    
    // Run Jekyll
    jekyll: {
        dist: {
            options: '_config.yml'
        }
    },
    
    //compile less
    less: {
        compile: {
            options: {
                // These paths are searched when trying to resolve @import in less file
                paths: [
                    'less/*'
                ]
            },
            files: {
                'css/styles.css': 'less/styles.less'
            }
        }
    },
    
    //watch tasks
    watch: {
        styles: {
            files: [
                'less/*'
            ],
            tasks: 'less'
        },
        jekyll: {
            files: [
                'index.html',
                'notes/*',
                'diary/*',
                'gallery/*',
                '_includes/*',
                '_layouts/*'
            ],
            tasks: 'jekyll'
        }
}
    
    
    
  });

  //register tasks
  grunt.registerTask('preflight', ['responsive_images']);
  grunt.registerTask('dev', ['less','jekyll','watch:styles','watch:jekyll']);
  grunt.registerTask('styles', ['less','watch:styles']);
  
  
  // The default task will show the usage
  grunt.registerTask('default', 'Prints usage', function () {
    grunt.log.writeln('');
    grunt.log.writeln('Roobottom.com');
    grunt.log.writeln('------------------------');
    grunt.log.writeln('');
    grunt.log.writeln('* run "grunt dev" to build jekyll and less, and listen for any changes.');
    grunt.log.writeln('* run "grunt preflight"" to package the site, ready for deployment');
    grunt.log.writeln('* run "grunt styles"" to compile and watch less');
  });
  
};