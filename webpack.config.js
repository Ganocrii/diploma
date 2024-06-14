const webpack = require('webpack');

module.exports = {
  // Убедитесь, что ваши пути к входным и выходным файлам настроены правильно
  entry: './client/src/app.js', // путь к вашему основному файлу React
  output: {
    path: __dirname + '/client/build', // путь к папке сборки
    filename: 'bundle.js'
  },
  resolve: {
    fallback: {
      "path": require.resolve("path-browserify"),
      "fs": false,
      "os": require.resolve("os-browserify/browser")
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env)
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ]
  }
};