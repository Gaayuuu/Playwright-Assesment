import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/PriceIntegrity/LoginPage';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Force QA environment
dotenv.config({ path: path.resolve(process.cwd(), '.env.qa') });

// Validate required variables
['BASE_URL', 'EMAIL', 'PASSWORD'].forEach(v => {
  if (!process.env[v]) throw new Error(`${v} is not defined in .env.qa`);
});

test.describe('Login Tests - QA', () => {

  test('Login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await page.goto(process.env.BASE_URL!);
    await loginPage.goToLogin();
    await loginPage.login(process.env.EMAIL!, process.env.PASSWORD!);
    await loginPage.waitForLoginSuccess(); 


  });

  test('Login fails with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await page.goto(process.env.BASE_URL!);
    await loginPage.goToLogin();
    await loginPage.login('wrong@test.com', 'wrong123');

    await expect(await loginPage.getLoginError()).toBeVisible(); 
  });

});