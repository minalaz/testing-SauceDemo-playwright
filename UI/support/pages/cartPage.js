const { expect } = require("@playwright/test");
import {consts} from "../helpers/consts"
export class Cart {
  constructor(page, locators) {
    this.page = page;
    this.locators = locators;
  }

  async checkingUrl() {
    await expect(this.page).toHaveURL(consts.cartUrl, {
      timeout: 5000,
    });
  }
}

