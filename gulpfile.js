var gulp = require("gulp");
var apiMocker = require("gulp-apimocker");

gulp.task("hello", function() {
    console.log("Hello world")
});

gulp.task("mock-backend-server", function() {
    return apiMocker.start({
        config: 'mocks/backend/config.json',
        mockDirectory: 'mocks/backend/mocks'
    })
})