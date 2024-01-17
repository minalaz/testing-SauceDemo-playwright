const { expect } = require("@playwright/test");
import { consts } from "../helpers/consts";

export class Checkout {
  constructor(page, locators) {
    this.page = page;
    this.locators = locators;
  }
  async checkingUrl(url) {
    await expect(this.page).toHaveURL(url, {
      timeout: 5000,
    });
  }
  async fillAndSubmitCheckoutForm(firstName, lastName, postalCode) {
    await this.page.fill(this.locators.firstNameInputField, firstName);
    await this.page.fill(this.locators.lastNameInputField, lastName);
    await this.page.fill(this.locators.zipCodeInputField, postalCode);
    await this.page.click(this.locators.continueBtn);
  }
}
