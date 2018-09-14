const { resolve } = require("path")
const del = require("del")
const gulp = require("gulp")
const postcss = require("gulp-postcss")
const pug = require("./scripts/compile-pug")
const pump = require("pump")
const stylus = require("gulp-stylus")
const typescript = require("gulp-typescript")

const outFolder = "lib/"

const paths = {
  styl: "public/**/!(_)*.styl",
  pug: "views/**/!(_)*.pug",
  ts: ["src/**/*.ts", "!src/**/*.d.ts"]
}

gulp.task("build:css", () =>
  pump(
    gulp.src(paths.styl, { base: "." }),
    stylus({
      compress: true,
      include: [__dirname + "/node_modules/"],
      "include css": true
    }),
    postcss(),
    gulp.dest(outFolder)
  )
)

gulp.task("build:views", () =>
  pump(
    gulp.src(paths.pug, { base: "." }),
    pug({ compileDebug: false }),
    gulp.dest(outFolder)
  )
)

gulp.task("build:js", () => {
  const ts = typescript.createProject("tsconfig.json", { rootDir: "." })
  return pump(ts.src(), ts(), gulp.dest(outFolder))
})

gulp.task("build", gulp.parallel("build:js", "build:css", "build:views"))

gulp.task("clean", () => del(outFolder))

gulp.task("watch", () => {
  gulp.watch(paths.pug, gulp.series("build:views"))
  gulp.watch(paths.styl, gulp.series("build:css"))
  gulp.watch(paths.ts, gulp.series("build:js"))
})

gulp.task("dev", gulp.series("clean", "build", "watch"))

gulp.task("prepublishOnly", gulp.series("clean", "build"))
