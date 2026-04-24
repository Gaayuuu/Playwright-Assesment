import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  private page: Page;

  private locators: {
    pageTitle: Locator;
    navMenu: Locator;
    homeLink: Locator;
    productList: Locator;
    addToCartBtn: Locator;
    toast: Locator;
    cartLink: Locator;
  };

  constructor(page: Page) {
    this.page = page;

    this.locators = {
      pageTitle: this.page.getByRole('heading', { name: 'My account' }),
      navMenu: this.page.locator('[data-test="nav-menu"]'),
      homeLink: this.page.getByRole('link', { name: 'Home' }),
      productList: this.page.locator('[data-test^="product-"]'),
      addToCartBtn: this.page.locator('#btn-add-to-cart'),
      toast: this.page.locator('#toast-container'),
      cartLink: this.page.getByRole('link', { name: /cart/i }),
    };
  }

  async validateAndGoToHome() {
    await expect(this.locators.pageTitle).toHaveText('My account');
    await expect(this.locators.navMenu).toBeVisible();

    await this.locators.homeLink.click();
    await this.locators.productList.first().waitFor();
  }

  async selectFirstProduct() {
    await this.locators.productList.first().click();
  }

  async addFirstProductToCart() {
    await this.locators.addToCartBtn.click();
  }

  async validateAddToCartToast() {
    await expect(this.locators.toast).toBeVisible();
    await expect(this.locators.toast).toContainText('added');
  }

  async openCart() {
    await this.locators.cartLink.click();
  }
}





















