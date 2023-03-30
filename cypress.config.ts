import { defineConfig } from "cypress";


export default defineConfig({

  // Configuration for Cypress

  // Turn off chrome security
  chromeWebSecurity: false,

  // General configuration
  waitForAnimations: true,
  defaultCommandTimeout: 10000,
  requestTimeout: 10000,
  responseTimeout: 10000,
  projectId: 'justaproject',
  video: true,
  experimentalStudio: true,
  e2e: {
    // Imported default cypress plugin
    setupNodeEvents(on, config) {
      require('./cypress/plugins/index.ts')(on, config);
      return config;

    },
    baseUrl: 'https://beta-app.zujudigital.com',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',

    // Isolate tests with each other
    testIsolation: true,
  },
})
