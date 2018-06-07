var apiMocker = require("gulp-apimocker");
var browserify = require("browserify");
var gulp = require("gulp");
var hexagon = require("hexagon-js");
var source = require('vinyl-source-stream');
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

gulp.task("build-hexagon", function() {
    hexagon.light.build({
    dest: 'dist/resources/hexagon'
    })
});

var paths = {
    pages: ['src/**/*.html']
};

gulp.task("copy-html", function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest("dist"));
});

gulp.task("default", ["copy-html"], function () {
    return browserify({
        basedir: '.',
        debug: true,
        entries: ['src/pages/accounts/accounts.controller.ts'],
        cache: {},
        packageCache: {}
    })
    .plugin(tsify)
    .bundle()
    .pipe(source('accounts.controller.js'))
    .pipe(gulp.dest("dist/pages/accounts"));
});