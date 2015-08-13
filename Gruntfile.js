module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-responsive-images');
	grunt.loadNpmTasks('grunt-image-size');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-convert');

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
    	            imageFolder: '/Users/roobottom/Dropbox/Public/roobottom-assets/',
	                expand: true,
	                src: ['/Users/roobottom/Dropbox/Public/roobottom-assets/assets/*/**.{jpg,jpeg}'],
	                custom_dest: '{%= path %}/{%= name %}/'
	            }]
	        }  
	    },

	    //run shell tasks to write CSV sidecar files
	    shell: {
	        writeCSV: {
	            command: [
	                'cd /Users/roobottom/Dropbox/Public/roobottom-assets/assets/notes/',
	                'exiftool -csv -ImageWidth -ImageHeight *.jpg > /Users/roobottom/git/roobottom.com/_data/notes.csv',
	                'cd /Users/roobottom/Dropbox/Public/roobottom-assets/assets/diary/',
	                'exiftool -csv -ImageWidth -ImageHeight *.jpg > /Users/roobottom/git/roobottom.com/_data/diary.csv',
	                'cd /Users/roobottom/Dropbox/Public/roobottom-assets/assets/gallery/',
	                'exiftool -csv -ImageWidth -ImageHeight *.jpg > /Users/roobottom/git/roobottom.com/_data/gallery.csv',
	            ].join('&&')
	        }
    	},

	});

	grunt.registerTask('publish', ['responsive_images','shell:writeCSV']);


};