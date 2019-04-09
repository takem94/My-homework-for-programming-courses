"use strict";

const gulp         = require('gulp'),
      source       = require('vinyl-source-stream'),
      buffer       = require('vinyl-buffer'),
      browserify   = require('browserify'),
      babelify     = require('babelify');


module.exports = (options) => {
    return () => {
         return browserify({
				  debug: true,
				entries: [options.src]
			 })
			.transform(babelify.configure({
				"presets": [
					["@babel/preset-env", {
					  "useBuiltIns": false,
					}],
				],
				"plugins": [ "@babel/plugin-transform-runtime"]
			}))
			.bundle()
			.on('error', function(err){
				console.log(err.message);
				this.emit('end');
			})
			.pipe(source(options.map))
			.pipe(buffer())
			.pipe(gulp.dest(options.dest));
	}
};