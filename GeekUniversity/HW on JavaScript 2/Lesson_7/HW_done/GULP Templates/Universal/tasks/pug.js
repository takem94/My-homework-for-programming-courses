const gulp = require('gulp'),
      $    = require('gulp-load-plugins')();

module.exports = (options) => {
    return () => {
        return gulp.src(options.src)
            .pipe($.plumber({
                errorHandler: $.notify.onError((err) => {
                    return {
                        title: 'PUG',
                        message: err.message
                    };
                })
            }))
            .pipe($.pug({
                pretty: true
            }))
            .pipe(gulp.dest(options.dest))
    };
};


