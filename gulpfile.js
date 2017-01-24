//**
// *Purpose of a gulpfile is to describe 'tasks' that convert from 'developer mode'
// to production mode'.  Things like converting Sass => CSS, removing comments,' mergin files, etc.*
//HTML index.html --> public/
//CSS --> style.scss-->Sass-->public/
//pipe is passing it through to next box
//gulp.src is starting point, gulp.dest is final destination/public/
//gulp has a website that goes through the plugins
//run public files

//Step 1: import gulp, its a plugin, importing other peoples code 
let gulp = require('gulp');  //npm install gulp
let sass = require('gulp-sass'); //npm install gulp-sass
let browser = require('gulp-browser');

// Step 2: create default tasks //convenient task to run all tasks
gulp.task('default', ['html', 'css', 'js']);

//Step 3: create subtasks, gulp is an object, task is a function with two parameters
gulp.task('html', function () {
    //copy index.html into the public/directory.
    return gulp.src('index.html')
        .pipe(gulp.dest('public/'));
});

gulp.task('css', function() {
    //Convert style.scss into style.css
    //Copy to public/
    return gulp.src('scss/style.scss')
        .pipe(sass()) //requires gulp-sass
        .pipe(gulp.dest('public/'));
});

gulp.task('js', function() {
    //Copy js file into public/
    return gulp.src('js/app.js') //app.js is in js folder
        .pipe(browser.browserify())
        .pipe(gulp.dest('public/'));
});

gulp.task('watch', ['default'], function() {
    gulp.watch('js/*.js', ['js']);  //js is a folder
    gulp.watch('js/*/*.js', ['js']);  //js is a folder
    gulp.watch('scss/*.scss', ['css']); //scss is a folder
    gulp.watch('*.html', ['html']);
});



