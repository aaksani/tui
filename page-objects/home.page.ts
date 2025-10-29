import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';
import { Randomizer } from '../utils/randomizer';

export class HomePage extends BasePage {
  private readonly airportDropdown: Locator;
  private readonly airportCheckboxes: Locator;
  private readonly selectButton: Locator;
  private readonly destinationDropdown: Locator;
  private readonly destinationCheckboxes: Locator;
  private readonly dateDropdown: Locator;
  private readonly availableDates: Locator;
  private readonly participantsDropdown: Locator;
  private readonly addChildButton: Locator;
  private readonly birthDateButton: Locator;
  private readonly availableYears: Locator;
  private readonly availableMonths: Locator;
  private readonly availableDays: Locator;
  private readonly searchButton: Locator;
  private readonly offerTiles: Locator;
  private readonly viewOfferButton: Locator;
  private readonly mainHeader: Locator;

  constructor(page: Page) {
    super(page);
    this.airportDropdown = page.locator('[data-testid="dropdown--airport"]');
    this.airportCheckboxes = page.locator('[class*="dropdown-items-list__item checkbox"]');
    this.selectButton = page.locator('[data-testid="dropdown-window-button-submit"]');
    this.destinationDropdown = page.locator('[data-testid="dropdown--region"]');
    this.destinationCheckboxes = page.locator('label.direction-item:has(input[type="checkbox"]:not([disabled]))');
    this.dateDropdown = page.locator('[data-testid="dropdown-field--travel-date"]');
    this.availableDates = page.locator('.react-calendar__tile:enabled');
    this.participantsDropdown = page.locator('[data-testid="dropdown-field--participants"]');
    this.addChildButton = page.locator('[data-testid="person-count-increment-children"]');
    this.birthDateButton = page.locator('[data-testid="birth-date-button"]');
    this.availableYears = page.locator('.react-calendar__tile:enabled');
    this.availableMonths = page.locator('.react-calendar__tile.react-calendar__year-view__months__month:enabled');
    this.availableDays = page.locator('.react-calendar__tile.react-calendar__month-view__days__day:enabled');
    this.searchButton = page.locator('[data-testid="global-search-button-submit"]').first();
    this.offerTiles = page.locator('[data-testid="offer-tile"]');
    this.viewOfferButton = page.locator('[data-testid="offer-tile-button"]').first();
    this.mainHeader = page.locator('[data-testid="main-header"]');
  }

  async navigateToHomepage(): Promise<void> {
    const baseUrl = process.env.TUI_BASE_URL || 'https://www.tui.pl/';
    await this.page.goto(baseUrl);
    await this.acceptCookies();
  }

  async verifyPageLoaded(): Promise<void> {
    await this.mainHeader.waitFor({ state: 'visible' });
  }

  async selectDepartureAirport(index: number): Promise<string> {
    await this.airportDropdown.click();
    const checkboxes = await this.airportCheckboxes.all();
    if (checkboxes.length > 0) {
      await checkboxes[index].click();
      await this.selectButton.click();
      
      // Return the selected airport
      const selectedAirport = await this.airportDropdown.textContent() || '';
      return selectedAirport.trim();
    }
    return '';
  }

  async selectDestination(index: number): Promise<string> {
    await this.destinationDropdown.click();
    const checkboxes = await this.destinationCheckboxes.all();
    if (checkboxes.length > 0) {
      await checkboxes[index].click();
      await this.selectButton.click();
      
      // Return the selected destination
      const selectedDestination = await this.destinationDropdown.textContent() || '';
      return selectedDestination.trim();
    }
    return '';
  }

  async selectFirstAvailableDate(): Promise<void> {
    await this.dateDropdown.click();
    const dates = await this.availableDates.all();
    if (dates.length > 0) {
      await dates[0].click();
      await this.selectButton.click();
    }
  }

  async configureParticipants(): Promise<string> {
    await this.participantsDropdown.click();
    await this.page.waitForLoadState('load');  
    await this.addChildButton.click();
    await this.birthDateButton.waitFor({ state: 'visible' });
    await this.birthDateButton.click();
    await this.page.waitForLoadState('load');
    
    const yearIndex = Randomizer.getRandomIndex(10);
    const monthIndex = Randomizer.getRandomIndex(12);
    const dayIndex = Randomizer.getRandomIndex(28);
    await this.selectChildBirthYear(yearIndex);
    await this.selectChildBirthMonth(monthIndex);
    await this.selectChildBirthDay(dayIndex);
    
    await this.selectButton.waitFor({ state: 'visible' });
    await this.selectButton.click();
    // Return the selected participants
    const selectedParticipants = await this.participantsDropdown.textContent() || '';
    return selectedParticipants.trim();
  }

  /**
   * Selects child birth year. Year selection is flaky, requiring retries with visibility checks.
   * Uses a while loop to continuously check visibility and click once visible, with a 5-second timeout.
   */
  private async selectChildBirthYear(yearIndex: number): Promise<void> {
    await this.page.waitForTimeout(3000);
    const years = await this.availableYears.all();
    if (years.length > 0 && yearIndex < years.length) {
      const yearElement = years[yearIndex];
      const startTime = Date.now();
      const timeout = 5000; // 5 seconds timeout
      
      while (true) {
        const isVisible = await yearElement.isVisible().catch(() => false);
        if (isVisible) {
          await yearElement.click();
          break;
        }
        if (Date.now() - startTime > timeout) {
          break;
        }
        await this.page.waitForTimeout(100);
      }
    }
  }

  private async selectChildBirthMonth(monthIndex: number): Promise<void> {
    const months = await this.availableMonths.all();
    if (months.length > 0 && monthIndex < months.length) {
      await this.page.waitForLoadState('domcontentloaded');
      await months[monthIndex].waitFor({ state: 'visible' });
      await months[monthIndex].click();
    }
  }

  private async selectChildBirthDay(dayIndex: number): Promise<void> {
    const days = await this.availableDays.all();
    if (days.length > 0) {
      await this.page.waitForLoadState('domcontentloaded');
      await days[dayIndex].click();
    }
  }

  async clickSearchButton(): Promise<void> {
    await this.searchButton.click();
  }

  async clickFirstOfferTile(): Promise<void> {
    // Wait for search results to load
    await this.offerTiles.first().waitFor({ state: 'visible' });
    const tiles = await this.offerTiles.all();
    if (tiles.length > 0) {
      await tiles[0].click();
    }
  }

  async clickViewOfferButton(): Promise<void> {
    await this.viewOfferButton.waitFor({ state: 'visible' });
    
    // Wait for new page to open and switch to it
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.viewOfferButton.click()
    ]);
    
    // Switch to the new page
    await newPage.waitForLoadState('networkidle');
    this.page = newPage;
  }
}
