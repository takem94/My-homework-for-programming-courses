"use strict";

const browserSync  = require('browser-sync');

module.exports = (options) => {
    return () => {
        return browserSync({
            server: {
                baseDir: options.dir
            },
            notify: false,
            port: options.port
        });
    };
};