import { Page, Locator, expect } from '@playwright/test';
import { cleanPrice } from '../../utils/priceUtils';

export class CheckoutPage {
  private page: Page;

  private locators: {
    cartTotal: Locator;
    productPrice: Locator;
    linePrice: Locator;
    quantityInput: Locator;
    toast: Locator;
    body: Locator;
  };

  constructor(page: Page) {
    this.page = page;

    this.locators = {

      cartTotal: this.page.getByRole('row', { name: /total/i }).locator('td').nth(3),
      productPrice: this.page.getByRole('row').nth(1).locator('td').nth(2),
      linePrice: this.page.getByRole('row').nth(1).locator('td').nth(3),
      quantityInput: this.page.getByRole('spinbutton', { name: /quantity/i }),
      toast: this.page.getByText(/updated/i),
      body: this.page.locator('body'),
    };
  }

  async waitForCheckoutPage() {
    await this.locators.cartTotal.waitFor();
  }

  async getUnitPrice(): Promise<number> {
    return cleanPrice(await this.locators.productPrice.innerText());
  }

  async getLinePrice(): Promise<number> {
    return cleanPrice(await this.locators.linePrice.innerText());
  }

  async getCartTotal(): Promise<number> {
    return cleanPrice(await this.locators.cartTotal.innerText());
  }

  async updateQuantity(quantity: number) {
    await this.locators.quantityInput.fill(String(quantity));
    await this.locators.body.click(); // unchanged as per your request
    await this.locators.toast.waitFor();
  }

  async validateTotalWithQuantity(quantity: number) {
    const unitPrice = await this.getUnitPrice();
    const expected = unitPrice * quantity;

    await expect.poll(() => this.getCartTotal())
      .toBe(expected);

    expect(await this.getLinePrice()).toBe(expected);
  }
}


