const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const GoogleFontsPlugin = require('google-fonts-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

const nodeEnv = process.env.NODE_ENV || 'development'
const isDevelopment = nodeEnv === 'development'
const isProduction = nodeEnv === 'production'

const mode = isDevelopment ? 'development' : 'production'
let output = {
  filename: '[name].[hash].js',
  path: path.resolve(__dirname, 'dist'),
  publicPath: '/',
}
const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(nodeEnv),
    },
  }),

  new HtmlWebpackPlugin({
    template: './src/index.html',
    chunks: ['main'],
  }),

  // https://github.com/SirPole/google-fonts-plugin#readme
  new GoogleFontsPlugin({
    'google-fonts-plugin': {
      fonts: [
        {
          family: 'Roboto',
          variants: ['400', '400i', '700', '700i'],
          subsets: ['latin-ext'],
        },
        {
          family: 'Ubuntu',
          variants: ['300', '400', '500', '700'],
          subsets: ['latin-ext'],
        },
      ],
      formats: ['woff', 'woff2'],
    },
  }),

  new FaviconsWebpackPlugin({
    logo: './src/assets/icon_512.png', // svg works too!
    mode: 'light', // optional can be 'webapp' or 'light' - 'webapp' by default
    devMode: 'light', // optional can be 'webapp' or 'light' - 'light' by default
    favicons: {
      // appName: 'my-app',
      // appDescription: '',
      // developerName: 'Me',
      // developerURL: null, // prevent retrieving from the nearest package.json
      // background: '#ddd',
      // theme_color: '#333',
      icons: {
        coast: false,
        yandex: false,
      },
    },
  }),
]

if (isDevelopment) {
  plugins.push(new webpack.HotModuleReplacementPlugin())
}

if (isProduction) {
  plugins.push(new CleanWebpackPlugin({ verbose: true }))
  output = {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    globalObject: 'this',
  }
}

module.exports = {
  devtool: isDevelopment ? 'cheap-module-inline-source-map' : 'source-map',
  mode: mode,
  entry: { main: ['@babel/polyfill', './src/index.js'] },
  output: output,
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.((glb)|(hdr)|jpe?g|png|gif)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'static/media/',
          name: '[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'react-svg-loader',
            options: {
              jsx: true, // true outputs JSX tags
            },
          },
        ],
      },
    ],
  },
  plugins: plugins,
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,
    hot: isDevelopment,
    host: '0.0.0.0',
    disableHostCheck: true,
    historyApiFallback: true,
  },
}
