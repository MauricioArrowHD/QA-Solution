const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    defaultCommandTimeout: 8000,
    pageLoadTimeout: 60000,
    setupNodeEvents(on, config) {
      config.baseUrl = config.env.baseUrl;
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.family === 'chromium') {
          launchOptions.args.push('--disable-application-cache');
          launchOptions.args.push('--disk-cache-size=1');
          launchOptions.args.push('--media-cache-size=1');
        }
        return launchOptions;
      });
      return config;
    },
  },
});
