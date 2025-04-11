import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4173',
    specPattern: [
      "tests/**/*.cy.js",
    ],
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
