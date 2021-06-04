const path = require("path");
const nodeExternals = require("webpack-node-externals");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const WebpackShellPluginNext = require("webpack-shell-plugin-next");

const { NODE_ENV = "production" } = process.env;

const plugins = [new CleanWebpackPlugin()];

if (NODE_ENV === "development")
  plugins.push(
    new WebpackShellPluginNext({
      onBuildEnd: {
        scripts: ["nodemon dist/index.js --watch dist"],
        parallel: true,
      },
    })
  );

module.exports = {
  entry: "./src/index.ts",
  mode: NODE_ENV,
  target: "node",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
  },
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      "@server": path.resolve(__dirname, "src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ["ts-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  externalsPresets: { node: true },
  externals: [nodeExternals(), nodeExternals({ modulesDir: path.resolve(__dirname, "../node_modules") })],
  watch: NODE_ENV === "development",
  watchOptions: {
    ignored: ["**/node_modules"],
  },
  plugins,
};
