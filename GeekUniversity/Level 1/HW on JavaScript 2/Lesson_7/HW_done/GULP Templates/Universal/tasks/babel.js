"use strict";

const gulp         = require('gulp'),
      $            = require('gulp-load-plugins')();

module.exports = (options) => {
    return () => {
        return gulp.src( options.src )
			.pipe($.plumber({
                errorHandler: $.notify.onError((err) => {
                    return {
                        title: 'Babel',
                        message: err.message
                    };
                })
            }))
            .pipe($.babel({
                presets: ['babel-preset-env']
            }))
            .pipe(gulp.dest(options.dest));
    };
};