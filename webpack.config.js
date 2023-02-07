const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      Utilities: path.resolve(__dirname, "src/Utils/"),
      Objects: path.resolve(__dirname, "src/Objects/"),
    },
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "public/dist"),
  },
};
