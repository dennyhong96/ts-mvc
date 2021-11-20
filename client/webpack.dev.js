const { HotModuleReplacementPlugin } = require("webpack");

module.exports = {
  mode: "development",

  devtool: "eval-cheap-module-source-map",

  output: {
    filename: "[name].bundle.js",
    chunkFilename: "[name].chunk.js",
  },

  devServer: {
    static: "./dist",
    open: true,
    hot: true,
    port: 3000,
  },

  module: {
    rules: [
      // CSS Modules -> <name>.module.scss
      {
        test: /\.modules\.(css|s[ac]ss)$/i,
        use: [
          "style-loader",
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
          "style-loader",
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
          filename: "vendors.js",
        },
      },
    },
  },

  plugins: [new HotModuleReplacementPlugin()],
};
