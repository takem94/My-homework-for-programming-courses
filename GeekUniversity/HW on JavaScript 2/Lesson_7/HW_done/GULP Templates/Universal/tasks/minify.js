"use strict";

const gulp = require('gulp'),
      $    = require('gulp-load-plugins')();

module.exports = (options) => {
    return () => {
        return gulp.src( options.src )
            .pipe($.cached('minifys'))
            .pipe($.sourcemaps.init())
            .pipe($.minifyCss())
            .pipe($.rename({ suffix: options.suffix }))
            .pipe($.sourcemaps.write('.'))
            .pipe(gulp.dest(options.dest));
    };
};