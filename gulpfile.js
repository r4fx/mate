// Faqs:
// https://github.com/gulpjs/gulp/blob/master/docs/recipes/running-tasks-in-series.md

var gulp = require('gulp');
var assemble = require('gulp-assemble');
var todo = require('gulp-todo');
//var sass = require('gulp-sass');
var sass = require('gulp-ruby-sass');
//var concat = require('gulp-concat');
//var uglify = require('gulp-uglify');


/* Configuration
 / ===========================================*/
var paths = {
    sources: {
        docScripts: 'doc/www/js/**/*.js',
        docStylesDir: 'doc/www/styles/css',
        docStylesFiles: 'doc/www/styles/css/*.css',
        docPages: 'doc/src/pages/**/*.hbs'
    },
    build: {
        docStylesDir: 'doc/www/styles/css',
        www: 'doc/www/'
    }
};

/* Helpers
/ ===========================================*/

// UTF8 file coding
function transform (filePath, file) {
    return file.contents.toString('utf8')
}


/* Tasks
/ ===========================================*/

// Assemble Mate documentation page
gulp.task('assemble', function () {
    var options = {
        data: 'doc/src/data/*.{json,yml}',
        layouts: 'doc/src/layouts/**/*.hbs',
        layout: 'default',
        partials: 'doc/src/partials/**/*.hbs'
    };

    gulp.src(paths.sources.docPages)
        .pipe(assemble(options))
        .pipe(gulp.dest(paths.build.www));
});

// Compile SASS files
gulp.task('sass', function () {
    gulp.src('doc/www/styles/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest(paths.build.docStylesDir));
});

// Concat & uglify js files
gulp.task('scripts', function () {
    return gulp.src([paths.sources.docScripts])
        .pipe(concat('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.build.www));
});

// Copy files
//gulp.task('copy', function () {
//    // Copy css files compiled by IDE
//    gulp.src([paths.sources.docStylesFiles])
//        .pipe(gulp.dest(paths.build.docStylesDir));
//});

// Generate todo list (mate/src/TODO.md)
gulp.task('todo', function () {
    gulp.src([
        'src/js/**/*.js',
        'src/styles/scss/**/*.scss'
        ])
        .pipe(todo())
        .pipe(gulp.dest('src/'));
});

// Watch for changes
gulp.task('watch', function () {

    // Watch Documentation WWW files (pages & config)
    gulp.watch('doc/src/**/*', function (event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        gulp.start('assemble');
    });

    // Watch Mate source styles and recompile Documentation WWW styles
    gulp.watch('src/styles/css/*.css', function (event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        gulp.start('sass');
    });
});

// Default task
gulp.task('default', ['assemble', 'sass', 'watch'], function () {
    // Callback

    // Watch .scss files
    //gulp.watch('src/styles/**/*.scss', ['styles']);
});