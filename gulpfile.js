// FAQ:
// https://github.com/gulpjs/gulp/blob/master/docs/recipes/running-tasks-in-series.md

var gulp = require('gulp');
var assemble = require('assemble');
var gulpAssemble = require('gulp-assemble');
var extname = require('gulp-extname');
var todo = require('gulp-todo');
var sass = require('gulp-sass');
var sassRuby = require('gulp-ruby-sass');
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
    var options = {
        layout: 'default.hbs',
        layoutdir: 'doc/src/layouts',
        partials: 'doc/src/partials/**/*.hbs',
        data: 'doc/src/data/*.{json,yml}'
    };

    gulp.src(paths.sources.pages)
        .pipe(gulpAssemble(assemble, options))
        .pipe(extname())
        .pipe(gulp.dest(paths.build.www));
});

// Compile SASS files
gulp.task('sass', function () {
    gulp.src('doc/www/styles/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest(paths.build.stylesDir));
});

// sass-ruby
gulp.task('sassRuby', function () {
    return sass('doc/www/styles/scss/*.scss')
    .on('error', function (err) {
        console.error('Error!', err.message);
    })
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
gulp.task('default', ['assemble', 'sassRuby', 'watch'], function () {
    // Callback

    // Watch .scss files
    //gulp.watch('src/styles/**/*.scss', ['styles']);
});