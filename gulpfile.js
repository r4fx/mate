// some faqs:
// https://github.com/gulpjs/gulp/blob/master/docs/recipes/running-tasks-in-series.md

var gulp = require('gulp');
var inject = require("gulp-inject");
var todo = require('gulp-todo');
var sass = require('gulp-ruby-sass');

// sass maps problem: https://github.com/dlmanning/gulp-sass/issues/71
//var sass = require('gulp-sass');

//var concat = require('gulp-concat');
//var uglify = require('gulp-uglify');


var pathsBase = {
    dev: './doc/src',
    build: './doc/build',
    orygin: './src'
};

var paths = {
    dev: dev = {
        html: [pathsBase.dev + '/**/*.html', '!' + pathsBase.dev + '/_partials/*.html'],
        htmlWatch: [pathsBase.dev + '/**/*.html'],
        partialsDir: pathsBase.dev + '/_partials',
        scripts: pathsBase.dev + '/js/**/*.js',
        stylesDir: pathsBase.dev + '/styles/css',
        stylesFiles: pathsBase.dev + '/styles/css/*.css',
        fontsDir: pathsBase.dev + '/fonts',
        fontsFiles: pathsBase.dev + '/fonts/**/*',
        images: pathsBase.dev + '/img/**/*'
    },
    build: build = {
        stylesDir: pathsBase.build + '/styles/css',
        stylesFiles: pathsBase.build + '/styles/css/*.css',
        fontsDir: pathsBase.build + '/fonts',
        images: pathsBase.build + '/img'
    }
};

function injectTransform (filePath, file) {
    return file.contents.toString('utf8')
}

gulp.task('inject', function () {
    gulp.src(paths.dev.html)
        .pipe(inject(gulp.src([paths.dev.partialsDir + '/head.html']), {
            starttag: '<!-- inject:head:{{ext}} -->',
            transform: injectTransform
        }))
        .pipe(inject(gulp.src([paths.dev.partialsDir + '/header.html']), {
            starttag: '<!-- inject:header:{{ext}} -->',
            transform: injectTransform
        }))
        .pipe(inject(gulp.src([paths.dev.partialsDir + '/aside.html']), {
            starttag: '<!-- inject:aside:{{ext}} -->',
            transform: injectTransform
        }))
        .pipe(inject(gulp.src([paths.dev.partialsDir + '/footer.html']), {
            starttag: '<!-- inject:footer:{{ext}} -->',
            transform: injectTransform
        }))
        .pipe(inject(gulp.src([paths.build.stylesFiles], {read: false}, {relative: true}), {
                ignorePath: 'doc/build'
                //addRootSlash: false
            }
        ))
        .pipe(gulp.dest(pathsBase.build));
});

gulp.task('copy', function () {

    // Copy css files compiled by IDE
    gulp.src([paths.dev.stylesFiles])
        .pipe(gulp.dest(paths.build.stylesDir));

    // Copy fonts files
    gulp.src([paths.dev.fontsFiles])
        .pipe(gulp.dest(paths.build.fontsDir));

    // Copy images
    gulp.src([paths.dev.images])
        .pipe(gulp.dest(paths.build.images));
});

gulp.task('todo', function () {
    gulp.src(paths.scripts)
        .pipe(todo())
        .pipe(gulp.dest('./'));
});

gulp.task('scripts', function () {
    return gulp.src([paths.dev.scripts])
        .pipe(concat('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(pathsBase.build));
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
    var client = ['inject', 'copy'];

    // Watch .js files
    //gulp.watch(paths.dev.scripts, client);

    // Watch html files
    gulp.watch(paths.dev.htmlWatch, ['inject']);

    // Watch .scss files
    //gulp.watch('./src/styles/**/*.scss', ['sass']);

    // Watch css files
    gulp.watch(paths.dev.stylesFiles,  function (event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        gulp.start('copy');
    });
});

// Default task
gulp.task('default', ['sass', 'copy', 'inject', 'watch'], function () {
    // Callback

    // Watch .scss files
    //gulp.watch('src/styles/**/*.scss', ['styles']);
});