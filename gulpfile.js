var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');


var sasspath = './assets/sass/**/*.scss';
gulp.task('sass', function() {
    return gulp.src(sasspath)
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./assets/css/'));
});

gulp.task('default', function() {
    gulp.watch(sasspath, ['sass']);
});