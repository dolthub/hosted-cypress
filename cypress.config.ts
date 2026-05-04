import { defineConfig } from "cypress";

export default defineConfig({
  chromeWebSecurity: false,
  video: false,
  expose: {
    LOCAL: !!(process.env.LOCAL || process.env.CYPRESS_LOCAL),
  },
  e2e: {
    baseUrl: "https://hosted.doltdb.com",
    specPattern: "cypress/e2e/**/*.spec.{js,jsx,ts,tsx}",
  },
  viewportWidth: 1440,
  viewportHeight: 900,
});
