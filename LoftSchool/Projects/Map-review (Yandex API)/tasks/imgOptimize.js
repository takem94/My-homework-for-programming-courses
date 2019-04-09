"use strict";

const gulp     = require('gulp'),
      pngquant = require('imagemin-pngquant'),
      $        = require('gulp-load-plugins')();

module.exports = (options) => {
        return gulp.series(function firstStep() {
            return gulp.src([options.src ,options.filt], { base: options.base })
                .pipe($.plumber({
                    errorHandler: $.notify.onError((err) => {
                        return {
                            title: 'ImageOpt',
                            message: err.message
                        };
                    })
                }))
                .pipe($.cached('imgOptimization'))
                .pipe($.imagemin({
                    progressive: true,
                    use: [pngquant()]
                }))
                .pipe(gulp.dest(options.dest));
        },function secondStep() {
            return gulp.src([options.srcJpg, options.filt], { base: options.base })
                .pipe($.plumber({
                    errorHandler: $.notify.onError((err) => {
                        return {
                            title: 'ImageOpt',
                            message: err.message
                        };
                    })
                }))
                .pipe($.cached('imgOptimizationJpg'))
                .pipe($.image({
                    pngquant: true,
                    optipng: false,
                    zopflipng: true,
                    jpegRecompress: false,
                    jpegoptim: true,
                    mozjpeg: true,
                    gifsicle: true,
                    svgo: true,
                    concurrent: 10
                }))
                .pipe(gulp.dest(options.dest));
            }
        )
};