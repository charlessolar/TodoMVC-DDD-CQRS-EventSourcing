const {series, crossEnv, concurrent, rimraf} = require('nps-utils')

module.exports = {
  scripts: {
    default: 'nps webpack',
    test: {
      default: 'nps test.jest',
      jest: {
        default: series(
          rimraf('test/coverage-jest'),
          'jest'
        ),
        accept: 'jest -u',
        watch: 'jest --watch',
      },


      lint: {
        default: 'eslint src',
        fix: 'eslint --fix'
      },
      all: concurrent({
        jest: 'nps test.jest',
        lint: 'nps test.lint'
      })
    },
    build: 'nps webpack.build',
    webpack: {
      default: 'nps webpack.server',
      build: {
        before: rimraf('dist'),
        default: 'nps webpack.build.development',
        development: {
          default: series(
            'nps webpack.build.before',
            crossEnv('NODE_ENV=development webpack --progress -d --env.development')
          ),
          extractCss: series(
            'nps webpack.build.before',
            crossEnv('NODE_ENV=development webpack --progress -d --env.extractCss --env.development')
          ),
          serve: series.nps(
            'webpack.build.development',
            'serve'
          ),
        },
        staging: {
          default: series(
            'nps webpack.build.before',
            crossEnv('NODE_ENV=staging webpack -d')
          ),
          extractCss: series(
            'nps webpack.build.before',
            crossEnv('NODE_ENV=staging webpack -d --env.extractCss')
          ),
          serve: series.nps(
            'webpack.build.development',
            'serve'
          ),
        },
        production: {
          inlineCss: series(
            'nps webpack.build.before',
            crossEnv('NODE_ENV=production webpack --env.production')
          ),
          default: series(
            'nps webpack.build.before',
            crossEnv('NODE_ENV=production webpack --env.production --env.extractCss')
          ),
          serve: series.nps(
            'webpack.build.production',
            'serve'
          ),
        }
      },
      server: {
        default: crossEnv(`NODE_ENV=development webpack-dev-server -d --inline --hot --colors --env.server`),
        extractCss: crossEnv(`NODE_ENV=development webpack-dev-server -d --inline --colors --env.server --env.extractCss`)
      },
    },
    serve: 'http-server dist --cors',
  },
}
