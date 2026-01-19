# Sample Webpack config

A basic  file primarily defines the entry point for your application and the output location for the bundled file. [1, 2, 3, 4]  
Basic  
This configuration tells webpack to take  as the entry file and output a bundled file named  into the  directory.

•  is a core Node.js module used to resolve absolute paths, which the  property requires.
•  sets the environment, which automatically enables specific optimizations for either "development" or "production".
•  specifies the starting point of the application's module dependency graph.
•  tells webpack where to emit the bundles it creates and how to name them.
•  is an output option that automatically cleans the  folder before a new build, managing old assets. [5, 8, 9, 10, 11]  

Advanced Sample with Loaders and Plugins
For most real-world applications, you'll need additional configurations to handle assets like CSS, images, or different JavaScript versions using loaders and plugins.

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      // Rule for handling JavaScript/JSX with Babel
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      // Rule for handling CSS files
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      // Rule for handling images
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    // Generates an HTML file and injects the bundle
    new HtmlWebpackPlugin({
      template: './src/index.html', // Path to your source HTML template
      title: 'Webpack Sample App',
    }),
  ],
  devServer: {
    static: './dist', // Serve files from the dist directory
    hot: true, // Enable Hot Module Replacement (HMR)
    open: true, // Open the browser after the server starts
  },
};

```

•  defines how different types of modules (files) should be treated.

 •  is used to transpile modern JavaScript (e.g., ES6+) into a backwards-compatible version.
 •  and  are used together to import CSS files into your JavaScript and inject them into the DOM.

•  are used to perform a wide range of tasks and are a cornerstone of webpack's ecosystem. The  simplifies the creation of HTML files to serve your webpack bundles.
•  provides a basic web server with live reloading and other development features, which is essential for a smooth development experience. [2, 8, 9, 11, 14]  

For more extensive options, refer to the official webpack documentation. [5, 15, 16]  

AI responses may include mistakes.

[1] <https://webpack.js.org/concepts/configuration/>
[2] <https://www.youtube.com/watch?v=HNb6bapmsyI>
[3] <https://saurabhnativeblog.medium.com/react30-project23-setting-up-a-react-project-using-webpack-and-babel-f4ca5554dfec>
[4] <https://www.trevorlasn.com/blog/easy-guide-for-webpack-2-0-from-scratch>
[5] <https://webpack.js.org/configuration/>
[6] <https://medium.com/swlh/understand-basic-webpack-from-scratch-6a1976565ae0>
[7] <https://www.robinwieruch.de/webpack-setup-tutorial/>
[8] <https://blog.logrocket.com/versatile-webpack-configurations-react-application/>
[9] <https://webpack.js.org/guides/development/>
[10] <https://webpack.js.org/concepts/entry-points/>
[11] <https://webpack.js.org/concepts/>
[12] <https://www.freecodecamp.org/news/how-to-style-a-react-app/>
[13] <https://intellipaat.com/blog/webpack-in-react/>
[14] <https://codefinity.com/blog/Optimizing-Web-Performance-with-Webpack>
[15] <https://dev.to/antonmelnyk/how-to-configure-webpack-from-scratch-for-a-basic-website-46a5>
[16] <https://jscrambler.com/blog/easy-custom-webpack-setup-for-react-js-applications>
