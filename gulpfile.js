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
gulp.task("font", () => {
    return gulp.src("./sonkwo/font/iconfont.css")
        .pipe(gulp.dest("dist/font"));
});
gulp.task("watch", () => {
    gulp.watch("./sonkwo/*.html", ["html"]);
    gulp.watch("./sonkwo/css/*.css", ["cssmin"]);
    gulp.watch("./sonkwo/scripts/*.js", ["scripts"]);
    gulp.watch("./sonkwo/sass/*.scss", ["sass"]);
});
gulp.task("connect", () => {
    connect.server({
        root: "dist/",
        port: 8888,
        livereload: true
    })
});
gulp.task('json', function() {
    return gulp.src('./sonkwo/scripts/*.json')
        .pipe(gulp.dest("./dist/scripts"));
});
gulp.task('scripts', function() {
    return gulp.src(['./sonkwo/scripts/*.js', "!sonkwo/scripts/jquery-3.3.1.js", "!sonkwo/scripts/jquery.pagination.js", '!sonkwo/scripts/jquery.cookie.js'])
        .pipe(babel({
            presets: ['@babel/env']
        }))
        // .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/scripts'));
});
gulp.task('cssmin', function() {
    gulp.src('sonkwo/css/*.css')
        .pipe(cssmin())
        // .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./dist/css'));
});
gulp.task('imagemin', () =>
    gulp.src('sonkwo/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/images'))
);
gulp.task('sass', function() {
    return gulp.src('./sonkwo/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'));
});
gulp.task("submit", ['html', 'scripts', 'cssmin', 'sass', 'imagemin', 'font', 'json']);
gulp.task("default", ["connect", "watch"]);