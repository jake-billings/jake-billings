/**
 * Created by jakebillings on 4/28/17.
 */
var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');
var runSequence = require('run-sequence');
var inject = require('gulp-inject-string');
var gulpIf = require('gulp-if');

var ANALYTICS = '<script>(function(i,s,o,g,r,a,m){i[\'GoogleAnalyticsObject\']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)};i[r].l=1*new Date();a=s.createElement(o);m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,\'script\',\'https://www.google-analytics.com/analytics.js\',\'ga\');\nga(\'create\', \'UA-98392131-1\', \'auto\');ga(\'send\', \'pageview\');</script>';

gulp.task('build', function () {
    return gulp.src('./app/**/*')
        .pipe(gulpIf(/.*\.html/,inject.after('<!-- Analytics -->', ANALYTICS)))
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