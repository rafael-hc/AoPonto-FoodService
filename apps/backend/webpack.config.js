const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin')
const { join } = require('node:path')

module.exports = {
  output: {
    path: join(__dirname, 'dist'),
    clean: true,
    ...(process.env.NODE_ENV !== 'production' && {
      devtoolModuleFilenameTemplate: '[absolute-resource-path]'
    })
  },
  resolve: {
    alias: {
      '@': join(__dirname, 'src/app')
    },
    extensions: ['.ts', '.js']
  },
  externals: [
    '@prisma/client',
    '@prisma/client/one',
    '.prisma/client',
    '@prisma/adapter-pg',
    'pg'
  ],
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: [],
      optimization: false,
      outputHashing: 'none',
      generatePackageJson: false,
      sourceMap: true
    })
  ]
}
