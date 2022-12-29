"use strict";

import { paths } from "../gulpfile.babel";
import gulp from "gulp";
import gulpif from "gulp-if";
import rename from "gulp-rename";
import debug from "gulp-debug";
import yargs from "yargs";
const minify = require('gulp-minify');

const webpackConfig = require("../webpack.config.js"),
    argv = yargs.argv,
    production = !!argv.production;

gulp.task("scene", () => {
    return gulp.src(paths.scene.src)
        .pipe(gulpif(production, minify({
          ext: {
              min: '.js' // Set the file extension for minified files to just .js
          },
          mangle: true,
          noSource: true,
        })))
        .pipe(gulpif(production, rename({
          suffix: ".min"
        })))
        .pipe(gulp.dest(paths.scene.dist))
        .pipe(debug({
            "title": "scene config"
        }));
});