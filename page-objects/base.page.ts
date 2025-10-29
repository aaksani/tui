import { Page, Locator } from '@playwright/test';

export abstract class BasePage {
  public page: Page;
  protected readonly cookieAcceptButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cookieAcceptButton = page.locator('[id*="AllowAll"]');
  }

  /**
   * Wait for page to be loaded
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Accept cookies popup
   */
  async acceptCookies(): Promise<void> {
    await this.cookieAcceptButton.click();
  }
}
