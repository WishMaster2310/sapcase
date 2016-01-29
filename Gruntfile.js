module.exports = function(grunt) {

grunt.initConfig({
	express: {
		options: {},
		dev: {
			options: {
				script: "bin/www"
			}
		}
	},

	less: {
		dev: {
			options: {
				paths: ["public/stylesheets"]
			},
			files: {
				"public/stylesheets/style.css": "public/less/style.less"
			}
		},
		prod: {
			options: {
				paths: ["public/less"],
				compress: true,
				sourceMap: true,
				sourceMapFilename: 'public/stylesheets/style.css.map',
				syncImport: true,
				plugins: [
					new (require('less-plugin-autoprefix'))({browsers: ['> 0.1%', 'IE 8', 'IE 9']})
					//new (require('less-plugin-clean-css'))()
				]
			},
			files: {
				"public/stylesheets/style.css": "public/less/style.less"
			}
		}
	},
	sprite: {
		main: {
			src: 'public/__icons/*',
			dest: 'public/images/sprite-main.png',
			destCss: 'public/less/core/sprite.less',
			cssTemplate: 'sprite.css.hbs',
			padding: 10
		}
	},
	watch: {
		express: {
			files:  ['views/*.html', 'views/*/*.html', 'public/javascripts/*.js',],
			tasks:  [ 'express:dev'],
			options: {
				spawn: false
			}
		},
		less: {
			files:  ['public/less/*.less', 'public/less/*/*.less'],
			tasks:  ['less:prod']
		}
	}
});

grunt.loadNpmTasks('grunt-spritesmith');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-less');
grunt.loadNpmTasks('grunt-express-server');
grunt.loadNpmTasks('grunt-nunjucks');

// Default task(s).
grunt.registerTask('icons', ['sprite:main']);
grunt.registerTask('default', [ 'express:dev', 'watch' ]);

}
