import { Page, Locator, expect } from '@playwright/test';
import { searchLocators } from '../Locators/searchloactors';

export class SearchPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly productNames: Locator;
  readonly productCards: Locator;
  readonly noResultsText: Locator;

  constructor(page: Page) {
    this.page = page;

    this.searchInput = page.getByPlaceholder(searchLocators.searchInputPlaceholder);
    this.productNames = page.locator(searchLocators.productName);
    this.productCards = page.locator(searchLocators.productCard);
    this.noResultsText = page.locator(searchLocators.noResults);
  }

  async navigate() {
    await this.page.goto('https://practicesoftwaretesting.com/#/');
  }

  async searchProduct(product: string) {
    await this.searchInput.fill(product);
    await this.searchInput.press('Enter');
  //  await this.page.waitForLoadState('networkidle');
  }

  async validateSearchResults(keyword: string) {
    const count = await this.productNames.count();

    for (let i = 0; i < count; i++) {
      const text = await this.productNames.nth(i).textContent();
      expect(text?.toLowerCase()).toContain(keyword.toLowerCase());
    }
  }

  async validateNoResults() {
    await expect(this.noResultsText).not.toBeVisible();
  }

  async validateProductIntegrity() {
    const count = await this.productCards.count();

    for (let i = 0; i < count; i++) {
      const card = this.productCards.nth(i);

      const name = card.locator(searchLocators.productName);
      const price = card.locator(searchLocators.productPrice);

      await expect(name).toBeVisible();
      await expect(price).toBeVisible();
    }
  }
}