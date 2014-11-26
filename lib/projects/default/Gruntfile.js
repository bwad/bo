var example = require('./connect/example.js');

module.exports = function(grunt) {
    
    // Concatinate scripts
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.config('concat', {
      scripts: {
        src: ['src/models/*.js', 'src/views/*.js', 'src/collections/*.js', 'src/main.js'],
        dest: 'dist/public/js/scripts.js'
      },
      templates: {
        src: 'src/templates/*.jade',
        dest: 'dist/tmp/templates.jade'
      }
    });
  
    // Jade processing of templates
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.config('jade', {
      index: {
        options: { pretty: true },
        files: {
          'dist/public/index.html': 'dist/tmp/index.jade',
        }
      }  
    });
    
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.config('less', {
      less: {
        files: {
          "dist/public/css/style.css": "src/css/style.less"
        }
      }
    });
    
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.config('copy', {
        main: {
          files: [
             {src: 'src/pages/parts/_footer.jade ', dest: 'dist/tmp/_footer.jade'},
             {src: 'src/pages/parts/_header.jade ', dest: 'dist/tmp/_header.jade'},
             {src:'src/pages/index.jade', dest: 'dist/tmp/index.jade'},
             {src:'src/pages/layouts/layout.jade', dest: 'dist/tmp/layout.jade'},
             {src: 'bower_components/jquery/dist/jquery.js', dest: 'dist/public/js/jquery.js'},
             {src: 'bower_components/backbone/backbone.js', dest: 'dist/public/js/backbone.js'},
             {src: 'bower_components/underscore/underscore.js', dest: 'dist/public/js/underscore.js'},
             {src: 'bower_components/bootstrap/dist/css/bootstrap.min.css', dest: 'dist/public/css/bootstrap.min.css'}
          ]
        },
        styles: {
          files: [
            {src: 'src/css/style.css', dest: 'dist/public/css/style.css'}
          ]
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.config('watch', {
      options: {
        livereload: true
      },
      scripts: {
        files: ['src/models/*.js', 'src/views/*.js', 'src/collections/*.js'],
        tasks: ['concat:scripts', 'jade:index'],
      },
      pages: {
        files: ['src/pages/*.jade'],
        tasks: ['concat', 'copy', 'jade'],
      },
      templates: {
        files: ['src/templates/*.jade'],
        tasks: ['concat', 'copy', 'jade'],
      },
      styles: {
        files: ['src/css/*.css'],
        tasks: ['copy:styles']
      }
    });
    
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.config('connect', {
      server: {
        options: {
          port: 3000,
          hostname: 'localhost',
          base: 'dist/public',
          livereload: true,
          open: true,
          middleware: example,
          //keepalive: true
        }
      }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.config('clean', {
      clean: ['dist/tmp/']
    });
  
    // grunt.registerTask('default', ['concat', 'copy', 'jade', 'clean','connect', 'watch']);
    grunt.registerTask('default', ['less', 'concat', 'copy', 'jade', 'connect', 'watch']);

};