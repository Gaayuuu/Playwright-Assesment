//
import { test, expect } from '@playwright/test';

test('Verify product sorting by Name (A-Z)', async ({ page }) => {

  // Open website
  await page.goto('https://practicesoftwaretesting.com/');

  // Select sorting option
  await page.selectOption('select', 'name,asc');

  // Get product names
  const productNames = await page.locator('.card-title').allTextContents();

  // Sort in code
  const sortedNames = [...productNames].sort();

  // Compare
  await expect(productNames).toEqual(sortedNames);

});