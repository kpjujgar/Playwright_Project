const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const loginData = require('../test-data/loginData.json');

test.describe('Login - JSON-driven tests', () => {
  for (const user of loginData.validUsers) {
    test(`valid login: ${user.description}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      const inventoryPage = new InventoryPage(page);

      await loginPage.open();
      await loginPage.login(user.username, user.password);

      await expect(page).toHaveURL(/inventory\.html/);
      await expect(inventoryPage.pageTitle).toHaveText('Products');
      await expect(inventoryPage.inventoryItems).not.toHaveCount(0);
    });
  }

  for (const user of loginData.invalidUsers) {
    test(`invalid login: ${user.description}`, async ({ page }) => {
      const loginPage = new LoginPage(page);

      await loginPage.open();
      await loginPage.login(user.username, user.password);

      await expect(loginPage.errorMessage).toBeVisible();
      await expect(loginPage.errorMessage).toContainText(user.expectedError);
    });
  }
});
