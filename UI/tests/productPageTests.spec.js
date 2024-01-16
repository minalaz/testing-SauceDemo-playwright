const { test } = require("@playwright/test");
import { ProductPage } from "../support/pages/productPage";
import { productPageLocators } from "../support/locators/productPageLocators";
import { LoginPage } from "../support/pages/loginPage";
import { loginLocators } from "../support/locators/loginLocators";
import { consts } from "../support/helpers/consts";

const validCredentials = require("../support/fixtures/validCredentials.json");

test.describe("Product page tests", () => {
  let productPage;
  let loginPage;

  test.beforeEach("SetUp", async ({ page }) => {
    productPage = new ProductPage(page, productPageLocators);
    loginPage = new LoginPage(page, loginLocators);
    await page.goto(consts.loginUrl);
    await loginPage.submitLoginForm(
      validCredentials.username,
      validCredentials.password
    );
  });
  test.afterEach("CleanUp", async ({ page }) => {
    await page.evaluate(() => localStorage.clear());
  });
  test("should navigate to the correct productPage URL", async () => {
    await productPage.checkingUrl();
  });
  test("should open the hamburger menu successfully", async () => {
    await productPage.clickAndAssertHamburgerMenu();
  });
  test("should correctly sort items by name in ascending order", async () => {
    await productPage.applyFilter("click", "az");
    await productPage.assertSortingByNameAsc();
  });
  test("should correctly sort items by name in descending order", async () => {
    await productPage.applyFilter("selectOption", "za");
    await productPage.assertSortingByNameDesc();
  });
  test("should correctly sort items by price in ascending order", async () => {
    await productPage.applyFilter("selectOption", "lohi");
    await productPage.assertSortingByPriceAsc();
  });
  test("should correctly sort items by price in descending order", async () => {
    await productPage.applyFilter("selectOption", "hilo");
    await productPage.assertSortingByPriceDesc();
  });
});
