// webpack.config.js
const path = require('path');
const { ProvidePlugin } = require('webpack');

module.exports = {
  // Autres configurations...

  resolve: {
    alias: {
      'fs': path.resolve(__dirname, 'src/mocks/fs.js'), // Chemin vers le mock fs
      'mkdirp': path.resolve(__dirname, 'src/mocks/mkdirp.js'), // Chemin vers le mock mkdirp
      'tar': path.resolve(__dirname, 'src/mocks/tar.js'), // Chemin vers le mock tar
    },
    fallback: {
      path: require.resolve('path-browserify'),
      assert: require.resolve('assert/'),
      crypto: require.resolve('crypto-browserify')
    }
  },
  plugins: [
    new ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  ]
};
