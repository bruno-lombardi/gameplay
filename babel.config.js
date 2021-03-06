module.exports = function (api) {
  api.cache(true)
  const rootImportOpts = {
    paths: [
      {
        root: __dirname,
        rootPathPrefix: '~/',
        rootPathSuffix: 'src'
      }
    ]
  }

  return {
    presets: ['babel-preset-expo'],
    plugins: [['babel-plugin-root-import', rootImportOpts], ['inline-dotenv']]
  }
}
