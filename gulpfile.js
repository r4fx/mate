// FAQ:
// https://github.com/gulpjs/gulp/blob/master/docs/recipes/running-tasks-in-series.md

var gulp = require('gulp');
var assemble = require('assemble');
var gulpAssemble = require('gulp-assemble');
var extname = require('gulp-extname');
var todo = require('gulp-todo');
var sourcemaps = require('gulp-sourcemaps');
var sassRuby = require('gulp-ruby-sass');
//var sass = require('gulp-sass');
//var concat = require('gulp-concat');
//var uglify = require('gulp-uglify');


/* Configuration
 / ===========================================*/
var paths = {
    sources: {
        scripts: 'doc/www/js/**/*.js',
        stylesDir: 'doc/www/styles/css',
        stylesFiles: 'doc/www/styles/css/*.css',
        pages: 'doc/src/pages/**/*.hbs'
    },
    build: {
        stylesDir: 'doc/www/styles/css',
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

    // Setup items on the assemble object
    assemble.data(['doc/src/data/*.{json,yml}']);
    assemble.layouts(['doc/src/layouts/**/*.hbs']);
    assemble.partials(['doc/src/partials/**/*.hbs']);
    assemble.option({
        layout: 'default'
    });

    gulp.src(paths.sources.pages)
        .pipe(gulpAssemble(assemble))
        .pipe(extname())
        .pipe(gulp.dest(paths.build.www));
});

// Compile SASS files
//gulp.task('sass', function () {
//    gulp.src('doc/www/styles/scss/*.scss')
//        .pipe(sass())
//        .pipe(gulp.dest(paths.build.stylesDir));
//});

// Compile SASS files by sass-ruby
gulp.task('sassRuby', function () {
    //return sassRuby('doc/www/styles/scss/*.scss')
    return sassRuby('doc/www/styles/scss/mate-doc.scss', {sourcemap: true})
        .on('error', function (err) {
        console.error('Error!', err.message);
    })

    .pipe(sourcemaps.write('../css/', {
        includeContent: false
    }))

    .pipe(gulp.dest(paths.build.stylesDir));
});

// Concat & uglify js files
gulp.task('scripts', function () {
    return gulp.src([paths.sources.scripts])
        .pipe(concat('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.build.www));
});

// Copy files
//gulp.task('copy', function () {
//    // Copy css files compiled by IDE
//    gulp.src([paths.sources.stylesFiles])
//        .pipe(gulp.dest(paths.build.stylesDir));
//});

// Generate to-do list (mate/src/TODO.md)
gulp.task('todo', function () {
    gulp.src([
        'src/js/**/*.js',
        'src/styles/scss/**/*.scss'
        ])
        .pipe(todo())
        .pipe(gulp.dest('./'));
});

// Watch for changes
gulp.task('watch', function () {

    // Watch Documentation WWW files (pages & config)
    gulp.watch('doc/src/**/*', function (event) {
        console.log('Watcher: file ' + event.path + ' was ' + event.type + ', running task...');
        gulp.start('assemble');
    });

    // Watch Mate source styles and recompile Documentation WWW styles
    gulp.watch('src/styles/css/*.css', function (event) {
        console.log('Watcher: file ' + event.path + ' was ' + event.type + ', running task...');
        gulp.start('sassRuby');
    });

    // Watch TODO tasks
    gulp.watch('src/styles/scss/**/*.scss', function (event) {
        console.log('Watcher: file ' + event.path + ' was ' + event.type + ', running task...');
        gulp.start('todo');
    });

});

// Default task
gulp.task('default', ['assemble', 'sassRuby', 'todo', 'watch'], function () {
    // Callback

    // Watch .scss files
    //gulp.watch('src/styles/**/*.scss', ['styles']);
});