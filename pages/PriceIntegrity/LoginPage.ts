import { Page, Locator } from '@playwright/test';

export class LoginPage {
  private page: Page;

  private locators: {
    signInLink: Locator;
    email: Locator;
    password: Locator;
    loginBtn: Locator;
    navMenu: Locator;
    errorMsg: Locator;
  };

  constructor(page: Page) {
    this.page = page;

    this.locators = {
      signInLink: this.page.getByRole('link', { name: 'Sign in' }),
      email: this.page.getByRole('textbox', { name: /email/i }),
      password: this.page.locator('[data-test="password"]'),
      loginBtn: this.page.getByRole('button', { name: 'Login' }),
      navMenu: this.page.locator('[data-test="nav-menu"]'),
      errorMsg: this.page.getByText(/invalid/i),
    };
  }

  async goToLogin() {
    await this.locators.signInLink.click();
  }

  async login(email: string, password: string) {
    await this.locators.email.fill(email);
    await this.locators.password.fill(password);
    await this.locators.loginBtn.click();
  }

  async waitForLoginSuccess() {
    await this.locators.navMenu.waitFor();
  }

  async getLoginError() {
    return this.locators.errorMsg;
  }
}


