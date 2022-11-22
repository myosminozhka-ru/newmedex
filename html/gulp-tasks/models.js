"use strict";

import { paths } from "../gulpfile.babel";
import gulp from "gulp";
import debug from "gulp-debug";

gulp.task("models", () => {
    return gulp.src(paths.models.src)
        .pipe(gulp.dest(paths.models.dist))
        .pipe(debug({
            "title": "models config"
        }));
});