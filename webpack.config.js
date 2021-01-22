const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const loader = require("sass-loader");

console.log(process.env.NODE_ENV);
const isDev = process.env.NODE_ENV === "development";
const optimization = () => {
    const config = {
        splitChunks: {
            chunks: "all"
        }
    };

    if (! isDev) {
        config.minimizer = [new OptimizeCssAssetsPlugin(), new TerserWebpackPlugin(),];
    }

    return config;
};

const cssLoaders = (extra) => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                publicPath: ""
            }
        }, {
            loader: "css-loader"
        },
    ]

    if (extra) {
        loaders.push(extra)
    }

    return loaders;
}

console.log('IsDev:', isDev);

module.exports = {
    context: path.resolve(__dirname, "src"),
    entry: path.join(__dirname, "src", "index.js"),
    output: {
      filename: "[name].[contenthash].js",
      path: path.resolve(__dirname, "dist"),
    },
    optimization: optimization(),
    devServer: {
      port: 4200,
    },
    plugins: [
      new HTMLWebpackPlugin({
        template: "./index.html",
        minify: {
          collapseWhitespace: !isDev,
        },
      }),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: "[name].[contenthash].css",
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: cssLoaders(),
        },
        {
          test: /\.s[ac]ss$/,
          use: cssLoaders('sass-loader'),
        }
      ],
    },
  };
