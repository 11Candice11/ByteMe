const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Import HtmlWebpackPlugin

module.exports = {
  entry: './src/index.js', // Entry point of your application
  output: {
    filename: 'bundle.js', // Output file name
    path: path.resolve(__dirname, 'dist'), // Output directory
    clean: true, // Cleans the output directory before each build (Webpack 5+)
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'), // Correct way to specify the static files directory
    },
    historyApiFallback: true,  // This tells the server to serve index.html for all routes
    compress: true,  // Enable gzip compression for everything served
    port: 8080,      // Port for the dev server
    open: true       // Automatically opens the browser when the server starts
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
      template: './dist/index.html', // Path to your HTML template file
      filename: 'index.html', // Output file name
    }),
  ],
  mode: 'development', // Set the mode to 'development' for better debugging
  devtool: 'source-map', // Enable source maps for easier debugging
};
