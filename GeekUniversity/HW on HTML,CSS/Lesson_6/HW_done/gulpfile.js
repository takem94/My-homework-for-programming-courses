let gulp          = require('gulp'),
    browserSync   = require('browser-sync').create(),
    sass          = require('gulp-sass'),
    autoPrefixer  = require('gulp-autoprefixer'),
    concatCss     = require('gulp-concat'),
    cleanCss      = require('gulp-clean-css');

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', () => {
    return gulp.src("src/scss/**/*.scss")
        .pipe(sass())
        .pipe(autoPrefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))
        .pipe(concatCss('style.css'))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task('serve', gulp.series('sass', () => {
    browserSync.init({
        server: "./src/"
    });

    gulp.watch("src/scss/*.scss").on('change', gulp.series('sass'));
    gulp.watch("src/*.html").on('change', browserSync.reload); 
}));

gulp.task('default', gulp.series('serve'));


gulp.task('minify-css', () => {
    return gulp.src('src/css/*.css', { since: gulp.lastRun('minify-css') })
      .pipe(cleanCss({compatibility: 'ie8'}))
      .pipe(gulp.dest('dist/css'));
});

gulp.task('fonts', () => {
    return gulp.src('src/fonts/**/*.*')
      .pipe(gulp.dest('dist/fonts'));
});

gulp.task('js', () => {
    return gulp.src('src/js/**/*.*')
      .pipe(gulp.dest('dist/js'));
});

gulp.task('images', () => {
    return gulp.src('src/img/**/*.*')
      .pipe(gulp.dest('dist/img'));
});

gulp.task('html', () => {
    return gulp.src('src/**/*.html')
      .pipe(gulp.dest('dist/'));
});

gulp.task('build', gulp.series('minify-css','html','js' ,'fonts','images'));



