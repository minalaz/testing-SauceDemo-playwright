const { expect } = require("@playwright/test");
import {consts} from "../helpers/consts"
export class ProductPage {
  constructor(page, locators) {
    this.page = page;
    this.locators = locators;
  }
  async navigateToCart() {
    await this.page.click(this.locators.shopingCartLink);
  }
  async checkingUrl() {
    await expect(this.page).toHaveURL(consts.productPageUrl, {
      timeout: 5000,
    });
  }
  async applyFilter(filterType, filterValue) {
    if (filterType === "click") {
      await this.page.click(this.locators.sortButton);
    } else if (filterType === "selectOption") {
      await this.page.selectOption(this.locators.sortButton, {
        value: filterValue,
      });
    }
  }
  async clickAndAssertHamburgerMenu() {
    await this.page.click(this.locators.hamburgerMenuButton);
    await expect(
      this.page.locator(this.locators.allItemsSidebarLink)
    ).toBeVisible();
    await expect(
      this.page.locator(this.locators.aboutSidebarLink)
    ).toBeVisible();
    await expect(
      this.page.locator(this.locators.logoutSidebarLink)
    ).toBeVisible();
    await expect(
      this.page.locator(this.locators.resetSidebarLink)
    ).toBeVisible();
  }

  async assertSortingByNameAsc() {
    const productNames = await this.page.$$eval(
      ".inventory_item_name ",
      (elements) => elements.map((el) => el.textContent)
    );
    const sortedProductNames = [...productNames].sort();
    expect(productNames).toEqual(sortedProductNames);
  }

  async assertSortingByNameDesc() {
    await this.page.waitForSelector(".inventory_item_name", {
      state: "visible",
    });
    const productNames = await this.page.$$eval(
      ".inventory_item_name ",
      (elements) => elements.map((el) => el.textContent)
    );
    const sortedProductNamesDesc = [...productNames].sort().reverse();
    expect(productNames).toEqual(sortedProductNamesDesc);
  }

  async assertSortingByPriceAsc() {
    const productPrices = await this.page.$$eval(
      ".inventory_item_price",
      (elements) =>
        elements.map((el) => parseFloat(el.textContent.replace(/\$/g, "")))
    );
    const sortedProductPrices = [...productPrices].sort((a, b) => a - b);
    expect(productPrices).toEqual(sortedProductPrices);
  }

  async assertSortingByPriceDesc() {
    const productPrices = await this.page.$$eval(
      ".inventory_item_price",
      (elements) =>
        elements.map((el) => parseFloat(el.textContent.replace(/\$/g, "")))
    );
    const sortedProductPricesDesc = [...productPrices]
      .sort((a, b) => a - b)
      .reverse();
    console.log();
    expect(productPrices).toEqual(sortedProductPricesDesc);
  }
  async addProductToCart() {
    await this.page.click(this.locators.firstProductAddCartButton);
  }
}
