module.exports = {
  configureWebpack: {
    plugins: [],
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
      }
    },
    module: {
      rules: [
        {
          test: /\.pug$/,
          loader: 'pug-plain-loader',
        },
        {
          test: /\.ts?$/,
          loader: 'ts-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/]
          }
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: {
              ts: 'ts-loader'
            },
            esModule: true
          }
        },
      ],
    }
  }
}
