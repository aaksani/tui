import { test, expect } from '../fixtures/test';
import { Randomizer } from '../utils/randomizer';

test.describe('TUI Homepage', () => {
  test('Verify participants configuration', async ({ homePage }) => {
    const airportIndex = Randomizer.getRandomNumber(1, 10);
    
    await homePage.navigateToHomepage();
    await homePage.verifyPageLoaded();
    
    await homePage.selectDepartureAirport(airportIndex);
    await homePage.selectDestination(0);
    await homePage.selectFirstAvailableDate();
    const selectedParticipants = await homePage.configureParticipants();
    await homePage.clickSearchButton();
    await homePage.clickFirstOfferTile();
    await homePage.clickViewOfferButton();
    
    await expect(homePage.page.getByText(selectedParticipants), `Selected participants "${selectedParticipants}" should be visible on the offer page`).toBeVisible();
  });
});
