/** @type {import('next').NextConfig} */
const semver = require('semver')
const { withSentryConfig } = require('@sentry/nextjs');
const { name, version } = require('./package.json');
const { execSync } = require('child_process');


const moduleExports = {
  // Your existing module.exports
  reactStrictMode: true,
  webpack: (config, { buildId }) => {
    const buildIdStringify = JSON.stringify(buildId)

    let nextVersion = version
    let releaseVersion = ''
    if (process.env.ENVIRONMENT === 'production') {
      releaseVersion = `${name}@${nextVersion}-${buildId}`
    } else {
      nextVersion = semver.inc(version, 'patch')
      let branchName = execSync('git rev-parse --abbrev-ref HEAD').toLocaleString()
      branchName = branchName.replace('/', '-').trim()
      releaseVersion = `${name}@${nextVersion}-${branchName}-${buildId}`
    }

    process.env.SENTRY_RELEASE = releaseVersion
    process.env.APP_VERSION = releaseVersion

    return config
  }
};

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
