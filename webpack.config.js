const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const loader = require("sass-loader");

console.log(process.env.NODE_ENV);
console.log(__dirname);
console.log(path.join(__dirname, 'src', '/assets/img/header/call-img.svg'));
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
        path: path.resolve(__dirname, "dist")
    },
    optimization: optimization(),
    devServer: {
        port: 4200
    },
    plugins: [
        new HTMLWebpackPlugin(
            {
                title: 'Evermix',
                template: "./template.html",
                favicon: path.resolve(__dirname, 'favicon.ico'),
                minify: {
                    collapseWhitespace: ! isDev
                }
            }
        ),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(
            {filename: "src/styles/[name].[contenthash].css"}
        ),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoaders()
            }, {
                test: /\.s[ac]ss$/,
                use: cssLoaders('sass-loader')
            },
            {
                test: /\.(ico|gif|png|jpg|jpeg|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '/src/assets/img/[name].[ext]',
                    publicPath: ''
                }
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ["file-loader"],
            },
        ]
    }
};
