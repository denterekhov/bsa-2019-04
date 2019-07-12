const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: './index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [path.resolve('./src'), 'node_modules']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.jpe?g|png|svg|mp3$/,
        use: {
          loader:  'url-loader',
        },
      },
    ]
  },
  devServer: {
    inline: true
  },
};