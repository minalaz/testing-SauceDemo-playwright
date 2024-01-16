const { test } = require("@playwright/test");
import { ProductPage } from "../support/pages/productPage";
import { productPageLocators } from "../support/locators/productPageLocators";
import { LoginPage } from "../support/pages/loginPage";
import { loginLocators } from "../support/locators/loginLocators";
import { consts } from "../support/helpers/consts";
import { Cart } from "../support/pages/cartPage";
import { cartLocators } from "../support/locators/cartLocators";

const validCredentials = require("../support/fixtures/validCredentials.json");

test.describe("Product page tests", () => {
  let productPage;
  let loginPage;
  let cartPage;
  test.beforeEach("SetUp", async ({ page }) => {
    productPage = new ProductPage(page, productPageLocators);
    loginPage = new LoginPage(page, loginLocators);
    cartPage = new Cart(page, cartLocators);
    await page.goto(consts.loginUrl);
    await loginPage.submitLoginForm(
      validCredentials.username,
      validCredentials.password
    );
  });
  test.afterEach("CleanUp", async ({ page }) => {
    await page.evaluate(() => localStorage.clear());
  });
  test("should navigate to the correct cart URL", async () => {
    await productPage.navigateToCart();
    await cartPage.checkingUrl();
  });
});
