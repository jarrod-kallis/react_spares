import path from 'path';
import webpack from 'webpack';

export default {
  devtools: 'eval-source-map',

  entry: [
    'webpack-hot-middleware/client',
    path.join(__dirname, '/client/index.js')
  ],

  output: {
    // webpack middleware doesn't actually care about the
    // path because it serves the files from memory
    // (not a physical location)
    path: '/',
    publicPath: '/'
  },

  plugins: [
    // Handles (compiler) error messages in a cleaner way
    new webpack.NoErrorsPlugin(),
    // Ensures consistent build hashes??? Still to figure what this means
    new webpack.optimize.OccurenceOrderPlugin(),
    // Plugin for hot reloading of code
    new webpack.HotModuleReplacementPlugin()
  ],

  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'jscs-loader',
        // exclude: /node_modules/,
        include: [
          path.join(__dirname, 'client'),
          path.join(__dirname, 'shared'),
          path.join(__dirname, 'server')
        ]
      }
    ],

    loaders: [
      {
        // User loader for .js extentions
        test: /\.js$/,
        // Only include the js file inside client folder
        include: [
          path.join(__dirname, 'client'),
          path.join(__dirname, 'shared')
        ],
        // Loader to transpile ES6 code
        loaders: [ 'react-hot', 'babel' ]
      }
    ]
  },

  resolve: {
    extentions: [ '', '.js' ]
  }

  // Required for jsonwebtoken on client side (so prefer to use jwt-decode)
  // node: {
  //   net: 'empty',
  //   dns: 'empty'
  // }
};
