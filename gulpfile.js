var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require("gulp-concat");
var sourcemaps = require('gulp-sourcemaps');

var scriptpath = './devtools/scripts/**/*.js';
gulp.task('script',function(){
    return gulp.src(scriptpath)
    .pipe(concat('common.js'))
    .pipe(gulp.dest('./assets/js'));
});

var sasspath = './devtools/sass/**/*.scss';
gulp.task('sass', function() {
    return gulp.src(sasspath)
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./assets/css/'));
});

gulp.task('default', function() {
    gulp.watch(sasspath, ['sass']);
    gulp.watch(scriptpath, ['script']);
});