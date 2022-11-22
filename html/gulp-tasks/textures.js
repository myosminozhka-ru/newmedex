"use strict";

import { paths } from "../gulpfile.babel";
import gulp from "gulp";
import debug from "gulp-debug";

gulp.task("textures", () => {
    return gulp.src(paths.textures.src)
        .pipe(gulp.dest(paths.textures.dist))
        .pipe(debug({
            "title": "textures config"
        }));
});