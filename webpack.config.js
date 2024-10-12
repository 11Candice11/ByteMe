const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Import HtmlWebpackPlugin

module.exports = {
  entry: './src/App.js', // Entry point of your application
  output: {
    filename: 'bundle.js', // Output file name
    path: path.resolve(__dirname, 'dist'), // Output directory
    clean: true, // Cleans the output directory before each build (Webpack 5+)
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Rule for JavaScript files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/, // Rule for CSS files
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i, // Rule for image files
        type: 'asset/resource', // Webpack 5+ handles assets with "asset/resource"
        generator: {
          filename: 'images/[name][hash][ext]', // Output path for images
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // Ensure this points to the src directory
      filename: 'index.html',
    }),
  ],
  mode: 'development', // Set the mode to 'development' for better debugging
  devtool: 'source-map', // Enable source maps for easier debugging
};
