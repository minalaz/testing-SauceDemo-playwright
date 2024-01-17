const { expect } = require("@playwright/test");
import { consts } from "../helpers/consts";
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
  async assertText() {
    const textContent = await this.page
      .locator(this.locators.inventoryItemName)
      .textContent();

    // Perform the assertion on the retrieved text
    expect(textContent).toContain("Sauce Labs Backpack");
  }
  async navigateToCheckout() {
    await this.page.click(this.locators.checkoutBtn);
  }
}
