const { devices } = require("@playwright/test");

module.exports = {
  use: {
    baseURL: "https://www.saucedemo.com/",
    viewport: { width: 1280, height: 720 },
  },
  projects: [
    {
      name: "Chromium",
      use: {
        ...devices["Desktop Chrome"],
        headless: true,
      },
    },
    {
      name: "Microsoft Edge",
      use: {
        ...devices["Desktop Edge"],
        channel: "msedge",
        headless: true,
      },
    },
  ],
};
