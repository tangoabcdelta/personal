// webpac-config.js

const deps = require("./package.json").dependencies;
const { ModuleFederationPlugin } = require("webpack").container;
const {
  NodeFederationPlugin,
  StreamingTargetPlugin,
} = require("@module-federation/node");


module.exports = {
    mode: 'development',
    resolve: {
        extensions: [
            '.tsx',
            '.ts',
            '.jsx',
            '.js',
            '.json'
        ]
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                include: /node_modules/,
                type: 'javascript/auto',
            },
            {
                test: /\.(js|jsx|mjs)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: false,
                        }
                    }
                ]
            }
        ]
    }
}