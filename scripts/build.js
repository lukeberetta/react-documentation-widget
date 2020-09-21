process.env.NODE_ENV = "production";

const webpack = require("webpack");
const defaults = require("react-scripts/config/webpack.config.js");
const ManifestPlugin = require("webpack-manifest-plugin");

let config = defaults("production");

// Turn of code splitting
config.optimization.splitChunks = {
  cacheGroups: {
    default: false,
  },
};
config.optimization.runtimeChunk = false;

// Remove has from JS file names
config.output.filename = `[name].js`;
config.output.chunkFilename = `[name].chunk.js`; // We shouldn't have chunks anyway

// Remove has from CSS file names
config.plugins[5].options.filename = "[name].css";

// Remove plugins that generate service-worker and manifest files
config.plugins = config.plugins
  .filter((item) => !(item instanceof ManifestPlugin))
  .filter(
    (item) =>
      !(item && item.config && item.config.swDest === "service-worker.js")
  );

// This is very brittle, but less annoying than having to eject create-react-app
// Modify url-loader output so that image files are not within /static/media/ and do not have hashes in the name.
config.module.rules[2].oneOf[0].test.push(/\.svg$/);
config.module.rules[2].oneOf[0].options.name = "[name].[ext]";

// Use style-loader to include CSS in JS bundle
config.module.rules[2].oneOf[3].use[0] = {
  loader: require.resolve("style-loader"),
};

try {
  // console.log(JSON.stringify(config, null, "\t"));
  webpack(config).run();
} catch (e) {
  console.log(e);
}
