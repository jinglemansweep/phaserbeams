const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: './src/client/game.ts',
    mode: 'none',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
            test: /\.less$/i,
            use: [
              // compiles Less to CSS
              "style-loader",
              "css-loader",
              "less-loader",
            ],
        },        
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist/client'),
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          { from: 'src/server/index.html', to: './index.html' }
        ]
      })
    ]
};