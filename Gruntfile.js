var path = require("path");

module.exports = function(grunt) {

    grunt._reImgPath = /url\((.+?)\)/g;
    grunt._baseImgPath = "/";

    grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),
            concat: {
                dist: {
                    src: ['src/js/require.js', 'src/js/config.js'],
                    dest: 'src/js/require.pack.js'
                }
            },
            sprite: {
                icons: {
                    files: [
                        { dest: "deals.png", src: ["icons/deals/*.png"],
                            css: "src.test.css", retina: true }
                    ],
                    options: {
                        'template': 'conf/sprite.tmpl',
                        'imgPath': function(dest) { return dest; },
                        'padding': 50
                    }
                }
            }
    });

    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadTasks('tasks');

    grunt.registerTask('clean', "Clean Build Files...", function(){
            grunt.file["delete"]("__build");
    });

    grunt.registerTask('replace_image_path', "Replace Image Path In Css", function(){

            var hashes = grunt.file.readJSON("__build/build.json");

            grunt.file.recurse("__build/less", function(abspath, rootdir, subdir, filename){
                    var temp;

                    if((/\.css$/).test(abspath) && (/\-\w{8}\./).test(abspath)) {

                        temp = grunt.file.read(abspath).toString(); 
                        temp = temp.replace(grunt._reImgPath, function(f, p) {

                                var fp = path.relative(grunt._baseImgPath, p);
                                grunt.log.ok(fp + " to " + hashes[fp]);

                                return "url(" + grunt._baseImgPath + hashes[fp] + ")";
                        });

                        grunt.file.write(abspath, temp);
                    }
            });

    });

    grunt.registerTask('lint', ['jshint']);
    grunt.registerTask('build', ['less', 'handlebars:compile', "concat"]);

    grunt.registerTask('default', ['jshint', 'clean', 'build', 'requirejs',
            'cssmin', 'cachebuster', 'replace_image_path']);
    grunt.registerTask('release', ['jshint', 'build', 'requirejs',
            'cssmin', 'cachebuster', 'replace_image_path']);

};
