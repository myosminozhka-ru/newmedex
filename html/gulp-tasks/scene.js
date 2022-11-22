"use strict";

import { paths } from "../gulpfile.babel";
import gulp from "gulp";
import debug from "gulp-debug";

gulp.task("scene", () => {
    return gulp.src(paths.scene.src)
        .pipe(gulp.dest(paths.scene.dist))
        .pipe(debug({
            "title": "scene config"
        }));
});