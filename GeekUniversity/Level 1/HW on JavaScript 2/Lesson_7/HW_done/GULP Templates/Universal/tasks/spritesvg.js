"use strict";

const gulp = require('gulp'),
	  del  = require('del'),
	  $    = require('gulp-load-plugins')();

module.exports = (options) => {
	return gulp.series(function firstStep() {
		return del(options.dest);
	},function secondStep(){
		return gulp.src(options.src)
			.pipe($.svgSprites({
				templates: {scss: true},
				preview: false,
				svg: {sprite: 'sprite-svg.svg' },
				svgPath: '../img/sprite-svg.svg',
				pngPath: '../img/sprite-svg.png',
				cssFile: "/../../../../sass/_sprite-svg.scss",
				padding: 5
			}))
			.pipe(gulp.dest(options.dest));
	},function thirdStep() {
		return gulp.src(options.svg)
			.pipe(gulp.dest(options.img))
			.pipe($.svg2png())
			.pipe(gulp.dest(options.img))
	},function fourStep() {
		return del(options.dest);
	});
};