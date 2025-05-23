import type { Configuration } from 'webpack'
import { merge } from 'webpack-merge'
import type { Config } from 'webpack-v5-chain'
import type { WebpackBundlerOptions } from './types.js'

export const resolveWebpackConfig = ({
  config,
  options,
  isServer,
  isBuild,
}: {
  config: Config
  options: WebpackBundlerOptions
  isServer: boolean
  isBuild: boolean
}): Configuration => {
  // allow modifying webpack config via `chainWebpack`
  options.chainWebpack?.(config, isServer, isBuild)

  // generate webpack config from webpack-v5-chain
  const webpackConfig = config.toConfig()

  // allow modifying webpack config via `configureWebpack`
  const configureWebpackResult = options.configureWebpack?.(
    webpackConfig,
    isServer,
    isBuild,
  )

  // if `configureWebpack` returns a configuration object,
  // use webpack-merge to merge it
  if (configureWebpackResult) {
    return merge(webpackConfig, configureWebpackResult)
  }

  return webpackConfig
}
