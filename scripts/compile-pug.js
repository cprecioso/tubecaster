const gulpPug = require("gulp-pug")
const through = require("through2").obj
const pumpify = require("pumpify").obj

const wrapper = through((file, _, cb) => {
  const contents = `const pug = require("pug-runtime");
${file.contents.toString("utf8")}
module.exports = template;
`

  file.contents = Buffer.from(contents, "utf8")
  file.extname = ".pug.js"
  cb(null, file)
})

module.exports = (options = {}) => {
  const realOptions = {
    ...options,
    client: true,
    inlineRuntimeFunctions: false
  }
  return pumpify(gulpPug(realOptions), wrapper)
}
