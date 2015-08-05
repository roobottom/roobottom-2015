module.exports = function(grunt) {
    
  //load dependencies
  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-jekyll');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-concurrent');
  require('time-grunt')(grunt);

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
                    'less/**'
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
                'less/**'
            ],
            tasks: ['less','shell:copyCss']
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
            tasks: ['jekyll','less','shell:copyCss']
        }
    },
    
    
    //shell tasks
    shell: {
        copyCss: {
            command: 'cp css/styles.css _site/css/styles.css'
        }
    },
    
    //concurrent tasks
    concurrent: {
        options: {
            logConcurrentOutput: true
        },
        dev: {
            tasks: ['watch:styles', 'watch:jekyll']
        }
    }
    
    
    
    
    
  });

  //register tasks
  grunt.registerTask('preflight', ['responsive_images']);
  grunt.registerTask('dev', ['concurrent:dev']);
  grunt.registerTask('styles', ['less','shell:copyCss','watch:styles']);
  
  
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