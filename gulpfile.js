var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect');


gulp.task('style', function() {
    return sass('public/src/style/main.scss', {
            style: 'expanded'
        })
        //return gulp.src('src/style/main.scss')
        //.pipe(sass({style:'expanded'}))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
        .pipe(gulp.dest('public/dist/style'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(minifycss())
        .pipe(gulp.dest('public/dist/style'))
        .pipe(connect.reload())
        .pipe(notify({
            message: 'Style task complete'
        }));
})

gulp.task('script', function() {
    return gulp.src('public/src/script/**/*.js')
        //.pipe(jshint('.jshintrc'))
        //.pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('public/dist/script/'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('public/dist/script'))
        .pipe(connect.reload())
        .pipe(notify({
            message: 'script task complete'
        }));
});

gulp.task('image', function() {
    return gulp.src('public/src/images/**/*')
        .pipe(cache(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('public/dist/images'))
        .pipe(connect.reload())
        .pipe(notify({
            message: 'image task complete'
        }));
});

gulp.task('html', function() {
    return gulp.src('public/dist/**/*.html')
        .pipe(connect.reload())
});

gulp.task('clean', function() {
    return gulp.src(['public/dist/style/*.*', 'public/dist/script/*.*', 'public/dist/images/*.*'], {
            read: false
        })
        .pipe(clean());
});



gulp.task('watch', function() {
    gulp.watch('public/src/style/*.scss', ['style']);

    gulp.watch('public/src/script/**/*.js', ['script']);

    gulp.watch('public/src/images/**/*', ['image']);

    gulp.watch('public/**/*.html', ['html']);
});


gulp.task('connect', function() {
    connect.server({
        //root:'angular-to-do-list',
        livereload: true
    });
});


gulp.task('default', ['clean'], function() {
    gulp.start('style', 'script', 'image');
    gulp.start('watch');
    gulp.start('connect');
})
