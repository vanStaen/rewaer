const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

module.exports = {
  devtool: "source-map",
  devServer: {
    historyApiFallback: true,
  },
  entry: { index: "./src/index.js" },
  mode: "production",
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new webpack.DefinePlugin({
      "process.env.API_URL": JSON.stringify("https://rewaer.com"),
      "process.env.HOST_URL": JSON.stringify("https://www.rewaer.com"),
      "process.env.PROD": true,
    }),
    new CopyPlugin({
      patterns: [
        { from: "public/rewaer_logo_24.png" },
        { from: "public/rewaer_logo_128.png" },
        { from: "public/rewaer_logo_512.png" },
        { from: "public/manifest.webmanifest" },
      ],
    }),
  ],
  resolve: {
    extensions: ["*", ".js", ".jsx", ".tsx", ".ts"],
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        loader: require.resolve("babel-loader"),
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: ["file-loader", "image-webpack-loader"],
      },
    ],
  },
};
