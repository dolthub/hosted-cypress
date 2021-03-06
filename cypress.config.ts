import { defineConfig } from "cypress";

export default defineConfig({
  chromeWebSecurity: false,
  video: false,
  e2e: {
    baseUrl: "https://hosted.doltdb.com",
    specPattern: "cypress/integration/**/*.spec.{js,jsx,ts,tsx}",
  },
});
