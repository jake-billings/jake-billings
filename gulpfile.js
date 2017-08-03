/**
 * Created by jakebillings on 4/28/17.
 */
var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');
var runSequence = require('run-sequence');
var inject = require('gulp-inject-string');
var gulpIf = require('gulp-if');
var uglify = require('gulp-uglify');
var cleanCss = require('gulp-clean-css');
var useref = require('gulp-useref');
var flatten = require('gulp-flatten');
var clean = require('gulp-clean');
var deleteLines = require('gulp-delete-lines');
var replace = require('gulp-replace');
var foreach = require('gulp-foreach');

var ANALYTICS = '<script>(function(i,s,o,g,r,a,m){i[\'GoogleAnalyticsObject\']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)};i[r].l=1*new Date();a=s.createElement(o);m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,\'script\',\'https://www.google-analytics.com/analytics.js\',\'ga\');\nga(\'create\', \'UA-98392131-1\', \'auto\');ga(\'send\', \'pageview\');</script>';

gulp.task('build-resources', function () {
    return gulp.src(['./app/**/*', '!./app/index.html', '!*.js', '!*.css'])
        .pipe(gulpIf(/.*\.html/, inject.after('<!-- Analytics -->', ANALYTICS)))
        .pipe(gulp.dest('./dist'));
});
gulp.task('build-fonts', function () {
    return gulp.src(['./app/**/*.html', '!./app/vendor/**/*'])
        .pipe(foreach(function (stream, file) {
            var dest = './dist/' + file.path.slice(file.path.lastIndexOf('/app/') + 5, file.path.lastIndexOf('/'));
            return gulp.src(['./app/**/fonts/*', '*.woff', '*.ttf'])
                .pipe(flatten())
                .pipe(gulp.dest(dest+'/fonts'));
        }));
});

gulp.task('build-dependencies', function () {
    return gulp.src(['./app/**/*.html', '!./app/vendor/**/*'])
        .pipe(foreach(function (stream, file) {
            var dest = './dist/' + file.path.slice(file.path.lastIndexOf('/app/') + 5, file.path.lastIndexOf('/'));
            console.info('Compressing ', dest);
            return stream
                .pipe(useref())
                .pipe(gulpIf('*.js', uglify()))
                .pipe(gulpIf('*.css', deleteLines({
                    'filters': [
                        /@import/
                    ]
                })))
                .pipe(gulpIf('*.css', cleanCss({debug: true}, function (details) {
                    console.log(details.name + ': ' + details.stats.originalSize);
                    console.log(details.name + ': ' + details.stats.minifiedSize);
                })))
                .pipe(gulpIf('*.html', gulp.dest('./dist'), gulp.dest(dest)));
        }));
});


gulp.task('deploy-dist', function () {
    return gulp.src('./dist/**/*')
        .pipe(ghPages());
});

gulp.task('build', function (callback) {
    runSequence(
        'build-resources',
        'build-dependencies',
        'build-fonts',
        callback
    )
});

gulp.task('clean', function () {
    return gulp.src('dist/*', {read: false})
        .pipe(clean())
});

gulp.task('clean-build', function (cb) {
    runSequence(
        'clean',
        'build',
        cb);
});


gulp.task('deploy', function (callback) {
    runSequence(
        'clean',
        'build',
        'deploy-dist',
        callback
    )
});