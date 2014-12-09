// some faqs:
// https://github.com/gulpjs/gulp/blob/master/docs/recipes/running-tasks-in-series.md

var gulp = require('gulp');
var inject = require("gulp-inject");
var todo = require('gulp-todo');
var sass = require('gulp-ruby-sass');
var assemble = require('gulp-assemble');

// sass maps problem: https://github.com/dlmanning/gulp-sass/issues/71
//var sass = require('gulp-sass');

//var concat = require('gulp-concat');
//var uglify = require('gulp-uglify');

var paths = {
    sources: {
        html: ['doc/src/**/*.html', '!doc/src/_partials/*.html'],
        htmlWatch: 'doc/src/**/*.html',
        scripts: 'doc/src/js/**/*.js',
        stylesDir: 'doc/src/styles/css',
        stylesFiles: 'doc/src/styles/css/*.css',
        fontsDir: 'doc/src/fonts',
        fontsFiles: 'doc/src/fonts/**/*',
        images: 'doc/src/images/**/*'
    },
    build: {
        stylesDir: 'doc/www/styles/css',
        stylesFiles: 'doc/www/styles/css/*.css',
        fontsDir: 'doc/www/fonts',
        images: 'doc/www/images',
        www: 'doc/www/'
    }
};

function transform (filePath, file) {
    return file.contents.toString('utf8')
}
var options = {
    data: ['doc/src/data/*.{json,yml}'],
    assets: 'doc/www/',
    layouts: ['doc/src/layouts/**/*.hbs'],
    layout: 'default',
    partials: ['doc/src/partials/**/*.hbs']
};
// build documentation site
gulp.task('assemble', function () {


    gulp.src('doc/src/pages/**/*.hbs')
        .pipe(assemble(options))
        .pipe(gulp.dest(paths.build.www));
});

gulp.task('copy', function () {

    // Copy css files compiled by IDE
    gulp.src([paths.sources.stylesFiles])
        .pipe(gulp.dest(paths.build.stylesDir));

    // Copy fonts files
    gulp.src([paths.sources.fontsFiles])
        .pipe(gulp.dest(paths.build.fontsDir));

    // Copy images
    gulp.src([paths.sources.images])
        .pipe(gulp.dest(paths.build.images));
});

gulp.task('todo', function () {
    gulp.src(paths.sources.scripts)
        .pipe(todo())
        .pipe(gulp.dest('./'));
});

gulp.task('scripts', function () {
    return gulp.src([paths.sources.scripts])
        .pipe(concat('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.build.www));
});

//gulp.task('sass', function () {
//    return gulp.src('./doc/src/styles/scss/*.scss')
//        .pipe(sass())
//        .pipe(gulp.dest(paths.build.stylesDir));
//});

gulp.task('sass', function () {
    gulp.src('./doc/src/styles/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest(paths.build.stylesDir));
});

// Watch for changes
gulp.task('watch', function () {
    var client = [/*'inject',*/ 'copy'];

    // Watch .js files
    //gulp.watch(paths.dev.scripts, client);

    // Watch html files
    //gulp.watch(paths.dev.htmlWatch, ['assemble']);

    // Watch .scss files
    //gulp.watch('./src/styles/**/*.scss', ['sass']);

    // Watch css files
    gulp.watch(paths.dev.stylesFiles,  function (event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        gulp.start('copy');
    });
});

// Default task
//gulp.task('default', ['assemble', 'sass', 'copy', 'watch'], function () {
gulp.task('default', ['assemble'], function () {
    // Callback

    // Watch .scss files
    //gulp.watch('src/styles/**/*.scss', ['styles']);
});