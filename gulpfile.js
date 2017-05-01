/**
 * Created by jakebillings on 4/28/17.
 */
var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');
var runSequence = require('run-sequence');

gulp.task('build', function () {
    return gulp.src('./app/**/*')
        .pipe(gulp.dest('./dist'));
});

gulp.task('deploy-dist', function() {
    return gulp.src('./dist/**/*')
        .pipe(ghPages());
});

gulp.task('build-and-deploy', function (callback) {
    runSequence(
        'build',
        'deploy-dist',
        callback
    )
});