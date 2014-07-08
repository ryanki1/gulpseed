'use strict';
// generated on 2014-06-28 using generator-gulp-webapp 0.1.0

var gulp = require('gulp');
var deploy = require('gulp-gh-pages');

// load plugins
var $ = require('gulp-load-plugins')();

gulp.task('deploy', function(){
    gulp.src('dist/**/*')
        .pipe(deploy());
})

gulp.task('styles', function () {
    return gulp.src('app/assets/styles/main.scss')
        .pipe($.rubySass({
            style: 'expanded',
            precision: 10
        }))
        .pipe($.autoprefixer('last 1 version'))
        .pipe(gulp.dest('.tmp/styles'))
        .pipe($.size());
});

gulp.task('scripts', function () {
    return gulp.src('app/assets/scripts/**/*.js')
        .pipe($.jshint())
        .pipe($.jshint.reporter(require('jshint-stylish')))
        .pipe($.size());
});

gulp.task('html', ['styles', 'scripts'], function () {
    var jsFilter = $.filter('**/*.js');
    var cssFilter = $.filter('**/*.css');

    return gulp.src('*.html')
        .pipe($.useref.assets({searchPath: 'app'}))
        .pipe(jsFilter)
        .pipe($.uglify({mangle: false}))
        .pipe(jsFilter.restore())
        .pipe(cssFilter)
        .pipe($.csso())
        .pipe(cssFilter.restore())
        .pipe($.useref.restore())
        .pipe($.useref())
        .pipe(gulp.dest('dist'))
        .pipe($.size());
});

gulp.task('extras', function () {
    return gulp.src(['app/*.*'], { dot: false })
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function () {
    return 
        gulp.src(['.tmp', 'dist'], { read: false })
            .pipe($.clean());
});

gulp.task('build', ['wiredep', 'html', 'extras']);

gulp.task('default', ['clean','build'], function () {
    gulp.start('deploy');
});

gulp.task('connect', function () {
    var connect = require('connect');
    var app = connect()
        .use(require('connect-livereload')({ port: 35729 }))
        .use(connect.static('app'))
        .use(connect.static('.tmp'))
        .use(connect.directory('app'));

    require('http').createServer(app)
        .listen(9000)
        .on('listening', function () {
            console.log('Started connect web server on http://localhost:9000');
        });
});

gulp.task('serve', ['connect', 'styles'], function () {
    require('opn')('http://localhost:9000');
});

// inject bower components
gulp.task('wiredep', function () {
    var wiredep = require('wiredep').stream;

    gulp.src('app/assets/styles/*.scss')
        .pipe(wiredep({
            directory: 'app/bower_components'
        }))
        .pipe(gulp.dest('app/assets/styles'));

    gulp.src('*.html')
        .pipe(wiredep({
            directory: 'app/bower_components',
            exclude: ['bootstrap-sass-official']
        }))
        .pipe(gulp.dest('/'));
});

gulp.task('watch', ['connect', 'serve'], function () {
    var server = $.livereload();

    // watch for changes

    gulp.watch([
        '*.html',
        '.tmp/styles/**/*.css',
        'app/assets/scripts/**/*.js'
    ]).on('change', function (file) {
        server.changed(file.path);
    });

    gulp.watch('app/assets/styles/**/*.scss', ['styles']);
    gulp.watch('app/assets/scripts/**/*.js', ['scripts']);
    gulp.watch('bower.json', ['wiredep']);
});
