const withCSS = require("@zeit/next-css")
const withLess = require("@zeit/next-less")

module.exports = withLess(
  withCSS({
    target: "serverless",
    webpack: config => {
      ;(
        (config.resolve || (config.resolve = {})).alias ||
        (config.resolve.alias = {})
      ).lodash = "lodash-es"
      return config
    }
  })
)
