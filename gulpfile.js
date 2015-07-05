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
var eventStream = require("event-stream");

var paths = {
  scripts: ["./src/js/**/*"],
  statics: ["src/*.html", "src/img/**/*", "src/font/**/*"],
  css: ["src/style/css/**/*"],
  less: ["src/style/less/**/*"],
  sass: ["src/style/sass/**/*"]
};

gulp.task('css', function() {
  var css = gulp.src(paths.css).pipe(concat("index.css"));
  var cssSass = gulp.src(paths.sass).pipe(sass.sync().on('error', sass.logError))
  var cssLess = gulp.src(paths.less).pipe(less({
    paths: [ path.join(__dirname, 'less', 'includes') ]
  }));

  return eventStream.concat(css, cssSass, cssLess)
    .pipe(concat('index.css'))
    .pipe(gulp.dest('www/css'));
});

gulp.task("statics", function() {
  gulp.src(paths.statics, {
    base: "src"
  }).pipe(gulp.dest("www"))
  .pipe(connect.reload());
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
    .pipe(gulp.dest("www/js"));
});

gulp.task("default", ["css", "statics", "browserify"], function() {
  connect.server({
    root: "www",
    livereload: true,
    port: 9000
  });
  gulp.watch(paths.sass, ["css", "statics", "browserify"]);
  gulp.watch(paths.statics, ["css", "statics", "browserify"]);
  gulp.watch(paths.less, ["css", "statics", "browserify"]);
  gulp.watch(paths.css, ["css", "statics", "browserify"]);
  gulp.watch(paths.scripts, ["css", "statics", "browserify"]);
});
