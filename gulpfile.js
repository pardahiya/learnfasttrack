const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const sourcemaps = require("gulp-sourcemaps");
const cleanCSS = require("gulp-clean-css");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const npmdist = require("gulp-npm-dist");
const removeSourcemaps = require("gulp-remove-sourcemaps");

function styles() {
   return (
      gulp
         .src("./assets/scss/**/*.scss")
         //   .pipe(sourcemaps.init())
         .pipe(sass().on("error", sass.logError))
         .pipe(
            autoprefixer({
               cascade: false,
            })
         )
         .pipe(cleanCSS({ compatibility: "ie8" }))
         .pipe(rename({ suffix: ".min" })) // Add rename pipe here
         //   .pipe(sourcemaps.write("./"))
         .pipe(gulp.dest("./public/css"))
   );
}

// New task to copy node modules
function copyModules() {
   //    return gulp.src("./node_modules/**/*").pipe(gulp.dest("./public/libs/"));
   return gulp
      .src(npmdist(), {
         base: "./node_modules",
      })
      .pipe(removeSourcemaps())
      .pipe(gulp.dest("./public/libs/"));
}

function scripts() {
   return gulp
      .src("./assets/js/**/*.js")
      .pipe(concat("theme.min.js"))
      .pipe(uglify())
      .pipe(gulp.dest("./public/js"));
}

exports.styles = styles;
exports.copyModules = copyModules;
exports.scripts = scripts;
exports.watch = function () {
   gulp.watch("./assets/scss/**/*.scss", styles);
   gulp.watch("./assets/js/**/*.js", scripts);
};

// Define publish task
exports.publish = gulp.parallel(styles, copyModules, scripts);
