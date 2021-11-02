const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  mode: "production",

  output: {
    filename: "[name].[contenthash].bundle.js",
    chunkFilename: "[name].[contenthash].chunk.js",
  },

  devtool: "source-map", // or "cheap-module-source-map"

  module: {
    rules: [
      // CSS Modules -> <name>.module.scss
      {
        test: /\.modules\.(css|s[ac]ss)$/i,
        use: [
          MiniCSSExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { importLoaders: 2, modules: true },
          },
          "sass-loader",
          "postcss-loader",
        ],
      },

      // Global CSS -> <name>.scss
      {
        test: /\.(css|s[ac]ss)$/i,
        use: [
          MiniCSSExtractPlugin.loader,
          { loader: "css-loader", options: { importLoaders: 2 } },
          "sass-loader",
          "postcss-loader",
        ],
      },
    ],
  },

  optimization: {
    // Code splitting
    splitChunks: {
      chunks: "all", // Split both static and async dynamic imports
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          filename: "vendors.[contenthash].js",
        },
      },
    },

    minimizer: [
      `...`, // extend existing minimizers (i.e. `terser-webpack-plugin`)
      new CssMinimizerPlugin(),
    ],
  },

  plugins: [
    new MiniCSSExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[name].[contenthash].chunk.css",
    }),
  ],
};
