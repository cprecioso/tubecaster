const PnpWebpackPlugin = require("pnp-webpack-plugin")

module.exports = {
  target: "serverless",
  webpack(config) {
    config.resolve = config.resolve || {}
    config.resolve.plugins = config.resolve.plugins || []
    config.resolve.plugins.push(PnpWebpackPlugin)

    config.resolveLoader = config.resolveLoader || {}
    config.resolveLoader.plugins = config.resolveLoader.plugins || []
    config.resolveLoader.plugins.push(PnpWebpackPlugin.moduleLoader(module))

    return config
  }
}
