import type { App } from '@vuepress/core'
import { fs } from '@vuepress/utils'
import type { Config } from 'webpack-v5-chain'

/**
 * Set webpack entry
 */
export const handleEntry = ({
  app,
  config,
}: {
  app: App
  config: Config
}): void => {
  // set client app as entry point
  config.entry('app').add(
    app.dir.client(
      (
        fs.readJsonSync(app.dir.client('package.json')) as {
          exports: { './app': string }
        }
      ).exports['./app'],
    ),
  )
}
