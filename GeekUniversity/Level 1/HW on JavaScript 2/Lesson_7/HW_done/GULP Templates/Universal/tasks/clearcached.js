"use strict";

const $ = require('gulp-load-plugins')();

module.exports = (options) => {
    return () => {
        return $.cached.caches = {};
    };
};
