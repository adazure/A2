var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require("gulp-concat");
var sourcemaps = require('gulp-sourcemaps');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');

var scriptpath = './devtools/scripts/**/*.js';
gulp.task('script', function() {
    return gulp.src(scriptpath)
        .pipe(concat('common.js'))
        .pipe(gulp.dest('./assets/js'));
});

var sasspath = './devtools/sass/**/*.scss';
gulp.task('sass', function() {
    return gulp.src(sasspath)
        //.pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest('./assets/css/'));
});

var csspath = './assets/css/*.css';
gulp.task('css', function() {
    return gulp.src(csspath)
        .pipe(concat('common.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('./assets/css/min'));
});



gulp.task('default', ['css', 'sass', 'script'], function() {
    gulp.watch(sasspath, ['sass']);
    gulp.watch(csspath, ['css']);
    gulp.watch(scriptpath, ['script']);
});