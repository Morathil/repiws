var gulp = require("gulp");
var plugins = require("gulp-load-plugins")();
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var reactify = require("reactify");
var path = require('path');
var connect = require("gulp-connect");
var concat = require("gulp-concat");
var less = require("gulp-less");
var sass = require("gulp-sass");

var paths = {
  scripts: ["src/js/**/*"],
  vendor: ["src/vendor/**/*"],
  statics: ["src/*.html", "src/img/**/*", "src/css/**/*", "src/font/**/*"],
  less: ["src/less/**/*"],
  sass: ["src/sass/**/*"]
};

gulp.task('less', function() {
  gulp.src(paths.less)
    .pipe(less({
      paths: [path.join(__dirname, 'less', 'includes')]
    }))
    .pipe(gulp.dest('www/css'))
    .pipe(connect.reload());
});

gulp.task("sass", function () {
  gulp.src(paths.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest("www/css"))
    .pipe(connect.reload());
});

gulp.task("statics", function() {
  gulp.src(paths.statics, {
    base: "src"
  })
    .pipe(gulp.dest("www"));
});

gulp.task("browserify", function() {
  var bundleStream = browserify()
    .add("src/js/index.js")
    .transform(reactify)
    .bundle();

  bundleStream.on("error", function(error) {
    plugins.util.log(plugins.util.colors.red(error));
  });

  bundleStream.pipe(source("index.js"))
    .pipe(gulp.dest("www/js"))
    .pipe(connect.reload());
});

gulp.task("default", ["less", "sass", "statics", "browserify"], function() {
  connect.server({
    root: "www",
    livereload: true,
    port: 9000
  });
  gulp.watch(paths.scripts, ["less", "sass", "statics", "browserify"]);
  gulp.watch(paths.sass, ["less", "sass", "statics", "browserify"]);
  gulp.watch(paths.statics, ["less", "sass", "statics", "browserify"]);
  gulp.watch(paths.less, ["less", "sass", "statics", "browserify"]);
});
