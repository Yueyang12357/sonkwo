const gulp = require("gulp");
const connect = require("gulp-connect");
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const sass = require('gulp-sass');
gulp.task("html", () => {
    return gulp.src("./sonkwo/*.html")
        .pipe(gulp.dest("dist/"));
});
gulp.task("watch", () => {
    gulp.watch("./sonkwo/*.html", ["html"]);
    gulp.watch("./sonkwo/css/*.css", ["cssmin"]);
    gulp.watch("./sonkwo/js/*.js", ["scripts"]);
    gulp.watch("./sonkwo/sass/*.js", ["sass"]);
});
gulp.task("connect", () => {
    connect.server({
        root: "dist/",
        port: 8888,
        livereload: true
    })
});
gulp.task('scripts', function() {
    return gulp.src(['./sonkwo/js/*.js', "!sonkwo/js/jquery.js"])
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/scripts'));
});
gulp.task('cssmin', function() {
    gulp.src('sonkwo/css/*.css')
        .pipe(cssmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist'));
});
gulp.task('imagemin', () =>
    gulp.src('sonkwo/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
);
gulp.task('sass', function() {
    return gulp.src('./sonkwo/sass/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});
gulp.task("submit", ['html', 'scripts', 'cssmin', 'sass', 'imagemin']);
gulp.task("default", ["connect", "watch"]);