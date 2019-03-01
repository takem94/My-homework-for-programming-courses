let gulp          = require('gulp'),
    browserSync   = require('browser-sync').create(),
    sass          = require('gulp-sass'),
    autoPrefixer  = require('gulp-autoprefixer'),
    concat        = require('gulp-concat'),
    rename        = require('gulp-rename'),
    imagemin      = require('gulp-imagemin'),
    uglify        = require('gulp-uglify'),
    cleanCss      = require('gulp-clean-css');

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', () => {
    return gulp.src("src/scss/**/*.scss")
        .pipe(sass())
        .pipe(autoPrefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))
        .pipe(concat('style.css'))
        .pipe(gulp.dest("src/css"));
});

gulp.task('minify-css', () => {
    return gulp.src("src/css/style.css", { since: gulp.lastRun('minify-css') })
        .pipe(cleanCss({compatibility: 'ie8'}))
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

gulp.task('fonts', () => {
    return gulp.src('src/fonts/**/*.*')
      .pipe(gulp.dest('dist/fonts'));
});

gulp.task('json', () => {
    return gulp.src('src/json/**/*.json')
      .pipe(gulp.dest('dist/json'));
});

gulp.task('trans-css', () => {
    return gulp.src('src/css/**/*.css')
      .pipe(gulp.dest('dist/css'));
});


gulp.task('js-src', () => {
    return gulp.src('src/js/Src/**/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('src/js'))
        .pipe(uglify())
        .pipe(rename('main.min.js'))
        .pipe(gulp.dest('src/js'));
});

gulp.task('js-main', () => {
    return gulp.src('src/js/*.js')
        .pipe(gulp.dest('dist/js'));
});

gulp.task('js-libs', () => {
    return gulp.src('src/js/Libs/*.js')
        .pipe(gulp.dest('dist/js/Libs'));
});

gulp.task('images', () => {
    return gulp.src('src/img/**/*.*')
	  .pipe(imagemin())
      .pipe(gulp.dest('dist/img'));
});

gulp.task('html', () => {
    return gulp.src('src/**/*.html')
      .pipe(gulp.dest('dist/'));
});

// Static Server + watching scss/html/js files
gulp.task('server', gulp.series('sass', () => {
    browserSync.init({
        server: "./src/"
    });

    gulp.watch("src/scss/*.scss").on('change', gulp.series('sass'));
    gulp.watch("src/css/style.css").on('change', gulp.series('minify-css'));
    gulp.watch("src/*.html").on('change', browserSync.reload);
    gulp.watch("src/js/Src/**/*.js").on('change', gulp.series('js-src'));

    gulp.watch("src/js/Libs/*.js").on('change', browserSync.reload);
    gulp.watch("src/js/*.js").on('change', browserSync.reload);
}));

gulp.task('default', gulp.series('server'));

gulp.task('build', gulp.series('sass', 'minify-css', 'trans-css', 'json', 'html', 'js-src', 'js-libs', 'js-main', 'fonts', 'images'));



