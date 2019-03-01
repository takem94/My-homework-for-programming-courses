"use strict";

const gulp = require('gulp'),
      $    = require('gulp-load-plugins')();

module.exports = (options) => {
    return () => {
        return gulp.src(options.src)
            .pipe($.rename({
                suffix: options.suffix
            }))
            .pipe($.uglifyjs())
            .pipe(gulp.dest(options.dest));
    };
};