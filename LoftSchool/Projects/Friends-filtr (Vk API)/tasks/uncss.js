"use strict";

const gulp = require('gulp'),
      $    = require('gulp-load-plugins')(),
      uncss  = require('uncss'),
      del  = require('del');


module.exports = (options) => {
    return gulp.series(function firstStep() {
        return gulp.src(options.src, { base: options.base })
            .pipe($.cleanCss())
            .pipe($.rename({suffix: options.suffix }))
            .pipe($.sourcemaps.write('.'))
            .pipe(gulp.dest(options.dest));
    },function secondStep() {
        return del(options.dest + 'main.css')
    });
};
