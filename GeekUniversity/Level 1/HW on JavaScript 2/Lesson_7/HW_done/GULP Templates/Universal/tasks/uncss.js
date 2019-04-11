"use strict";

const gulp = require('gulp'),
      $    = require('gulp-load-plugins')(),
      del  = require('del');


module.exports = (options) => {
    return gulp.series(function firstStep() {
        return gulp.src(options.src, { base: options.base })
            .pipe($.sourcemaps.init())
            .pipe($.uncss({
                html: [ options.html ]
            }))
            .pipe(gulp.dest(options.dest))
            .pipe($.minifyCss())
            .pipe($.rename({suffix: options.suffix }))
            .pipe($.sourcemaps.write('.'))
            .pipe(gulp.dest(options.dest));
    },function secondStep() {
        return del(options.dest + 'main.css')
    });
};
