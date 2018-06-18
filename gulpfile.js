var apiMocker = require("gulp-apimocker");
var browserify = require("browserify");
var del = require("del");
var glob = require("glob");
var gulp = require("gulp");
var gulpSequence = require('gulp-sequence')
var hexagon = require("hexagon-js");
var source = require('vinyl-source-stream');
var rename = require('gulp-rename');
var ts = require("gulp-typescript");
var tsify = require("tsify");

var tsProject = ts.createProject("tsconfig.json");

gulp.task("hello", function() {
    console.log("Hello world")
});

gulp.task("mock-backend-server", function() {
    return apiMocker.start({
        config: 'mocks/backend/config.json',
        mockDirectory: 'mocks/backend/mocks'
    })
});

gulp.task("build-hexagon", ["clean"], function() {
    hexagon.light.build({
    dest: 'dist/resources/hexagon'
    })
});

gulp.task("clean", function() {
    return del("dist");
})

gulp.task("copy-html", ["clean"], function () {
    return glob("src/**/*.html", function(err, files) {
        if (err) {
            done(err);
        }
        gulp.src(files).pipe(gulp.dest("dist"));
    });
});

gulp.task("compile", ["clean"], function () {
    return glob("src/**/*controller.ts", function(err, files) {
        if (err) {
            done(err);
        }
        files.map(function(file) {
            browserify({
                basedir: '.',
                debug: true,
                entries: [file],
                cache: {},
                packageCache: {}
            })
            .plugin(tsify)
            .bundle()
            .pipe(source(file))
            .pipe(rename({
                dirname: '',
                extname: '.js'
            }))
            .pipe(gulp.dest("dist"));
            }
        )
    });
});

gulp.task("dist", gulpSequence('clean', ['build-hexagon', 'copy-html', 'compile']));