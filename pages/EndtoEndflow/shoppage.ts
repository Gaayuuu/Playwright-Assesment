import { Page, expect } from '@playwright/test';
import { ShopPageLocators } from '../Locators/shoppagelocators';

export class ShopPage {
  constructor(private page: Page) { }

  async gotoHome() {
    console.log('Navigating to Home Page...');
    await this.page.goto(process.env.BASE_URL || 'https://practicesoftwaretesting.com/');
    console.log('Home Page loaded successfully.');
  }

  async selectFirstProduct() {
    console.log('Selecting the first product...');
    await this.page.locator(ShopPageLocators.home.productCard).first().click();
    console.log('First product selected.');
  }

  async addToCart() {
    console.log('Adding product to cart...');
    await this.page.locator(ShopPageLocators.home.addToCartButton).click();
    console.log('Product added to cart.');
  }

  async openCart() {
    console.log('Opening cart...');
    await this.page.locator(ShopPageLocators.home.cartLink).click();
    await expect(this.page).toHaveURL(/.*checkout/);
    console.log('Cart opened and checkout page verified.');
  }

  async proceedToCheckout() {
    console.log('Proceeding to checkout...');
    await this.page.locator(ShopPageLocators.checkout.step1).click();
    console.log('Checkout step 1 completed.');
  }

  async fillCheckoutDetails(user: any) {
    console.log('Filling checkout details for guest user...');
    await this.page.getByRole('tab', { name: 'Continue as Guest' }).click();
    await this.page.fill(ShopPageLocators.checkout.guestEmail, user.email);
    await this.page.fill(ShopPageLocators.checkout.guestFirstName, user.firstname);
    await this.page.fill(ShopPageLocators.checkout.guestLastName, user.lastname);

    console.log('Guest details filled. Submitting...');
    await this.page.locator(ShopPageLocators.checkout.guestSubmit).click();
    await this.page.locator(ShopPageLocators.checkout.step2Guest).click();

    console.log('Filling address details...');
    await this.page.fill(ShopPageLocators.checkout.country, user.country);
    await this.page.fill(ShopPageLocators.checkout.postalCode, user.zip);
    await this.page.fill(ShopPageLocators.checkout.housenumber, user.housenumber);
    await this.page.fill(ShopPageLocators.checkout.street, user.street);
    await this.page.fill(ShopPageLocators.checkout.city, user.city);
    await this.page.fill(ShopPageLocators.checkout.state, user.state);

    console.log('Address details filled. Proceeding to step 3...');
    await this.page.locator(ShopPageLocators.checkout.step3).click();
  }

  async fillPayment(method: string) {
    console.log(`Selecting payment method: ${method}...`);
    await this.page.selectOption(ShopPageLocators.payment.method, { value: 'cash-on-delivery' });

    if (method === 'cash-on-delivery') {
      console.log('Cash on Delivery selected.');
    }

    console.log('Finishing payment...');
    await this.page.locator(ShopPageLocators.payment.finish).click();
  }

  async verifyConfirmation() {
    console.log('Verifying confirmation message...');
    await expect(this.page.locator(ShopPageLocators.payment.successMessage)).toBeVisible();
    console.log('Order confirmation verified successfully.');
  }
}
