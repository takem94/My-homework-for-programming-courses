"use strict";

const gulp = require('gulp'),
      $    = require('gulp-load-plugins')();

module.exports = (options) => {
    return () => {
        return gulp.src(options.src)
            .pipe($.plumber({
                errorHandler: $.notify.onError((err) => {
                    return {
                        title: 'SASS',
                        message: err.message
                    };
                })
            }))
            .pipe($.cached('sass'))
            .pipe($.sourcemaps.init())
            .pipe($.sass())
            .pipe($.groupCssMediaQueries())
            .pipe($.autoprefixer({
                browsers: options.browsers,
                cascade: false
            }))
            .pipe($.sourcemaps.write('.'))
            .pipe(gulp.dest(options.dest));
    };
};