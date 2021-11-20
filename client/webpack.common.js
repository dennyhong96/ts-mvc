const path = require("path");
const { ProvidePlugin, DefinePlugin } = require("webpack");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const devConfig = require("./webpack.dev.js");
const prodConfig = require("./webpack.prod.js");
require("dotenv").config({ path: "./.env" });

module.exports = (env) => {
  let environmentConfig = devConfig;

  if (env && env.production) {
    environmentConfig = prodConfig;
  }

  const mergedConfig = merge(
    {
      entry: {
        main: "./src/index.ts",
      },

      output: {
        path: path.resolve(__dirname, "dist"),
        clean: true,
        // assetModuleFilename: "assets/[name]_[hash][ext][query]",
        // publicPath: "https://cdn.example.com/",
      },

      module: {
        rules: [
          // TS & Babel
          {
            test: /\.[tj]sx?$/i,
            // exclude: /(node_modules|bower_components)/i,
            include: path.resolve(__dirname, "src"),
            use: [{ loader: "babel-loader" }, { loader: "ts-loader" }],
          },

          // Image files
          {
            test: /\.(jpe?g|png|gif|svg)$/i,
            type: "asset",
            generator: {
              filename: "assets/images/[name]_[hash][ext][query]",
            },
            parser: {
              dataUrlCondition: {
                maxSize: 2 * 1024, // 2kb
              },
            },
          },

          // Font files
          {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: "asset/resource",
            generator: {
              filename: "assets/fonts/[name]_[hash][ext][query]",
            },
          },
        ],
      },

      optimization: {
        // Tree shaking is automatically enabled for prod
        // Tree shaking - to opt out of tree shaking for certain files, use the "sideEffects" key in package.json
        usedExports: true,

        // Don't show performance problems
        // performance: false,

        // Separate runtime code into it's own chunk
        runtimeChunk: {
          name: "runtime",
        },
      },

      resolve: {
        extensions: [".js", ".ts", ".jsx", ".tsx"], // omit extensions when importting files
        alias: {
          "@": path.resolve(__dirname, "src"),
        },
      },

      plugins: [
        new HtmlWebpackPlugin({
          template: "./src/index.html",
        }),

        new ESLintPlugin(),

        // Automatically load modules instead of having to import or require them everywhere.
        new ProvidePlugin({
          h: "hyperscript",
        }),

        new DefinePlugin({
          "process.env": JSON.stringify(process.env),
        }),
      ],
    },
    environmentConfig,
  );

  console.log(mergedConfig);

  return mergedConfig;
};
