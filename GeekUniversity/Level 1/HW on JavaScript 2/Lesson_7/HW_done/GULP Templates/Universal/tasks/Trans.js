"use strict";

const gulp = require('gulp');

module.exports = (options) => {
    return () => {
        return gulp.src( options.src , { base: options.base })
            .pipe(gulp.dest(options.dest));
    };
};