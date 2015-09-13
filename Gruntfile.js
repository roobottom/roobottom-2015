module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-responsive-images');
	grunt.loadNpmTasks('grunt-shell');

	grunt.initConfig({
    
    
	    //process all images.  
	    responsive_images: {
	        resize: {
	            options: {
	                engine: 'im',
	                newFilesOnly: true,
	                sizes: [{
	                    width: 280,
	                    height: 280,
	                    name: 'square',
	                    quality: 50,
	                    aspectRatio: false,  
	                } , {
    	                width: 100,
	                    height: 100,
	                    name: 'thumbnail',
	                    quality: 30,
	                    aspectRatio: false,
    	            } , {
	                    width: 380,
	                    name: 'small',
	                    quality: 50
	                } , {
	                    width: 640,
	                    name: 'medium',
	                    quality: 50
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
	                src: ['/Users/roobottom/Dropbox/Public/roobottom-assets/assets/*/**.{jpg,jpeg,JPG,JPEG,png,PNG,gif,GIF}'],
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
	        },
	        jekyll: {
    	        command: [
        	        'cd /Users/roobottom/git/roobottom.com/',
        	        'jekyll build'
    	        ].join('&&')
	        }
    	},

	});

	grunt.registerTask('publish', ['responsive_images','shell:writeCSV']);


};