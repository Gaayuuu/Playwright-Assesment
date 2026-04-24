import { test } from '@playwright/test';
import { SearchPage } from '../pages/Search/search';
import searchData from '../fixtures/searchData.json';

test.describe('Search relevance & result integrity', () => {

  test('Exact search', async ({ page }) => {
    const searchPage = new SearchPage(page);

    await searchPage.navigate();
    await searchPage.searchProduct(searchData.searchTerms.exact);
    await searchPage.validateSearchResults(searchData.searchTerms.exact);
  });

  test('Partial search', async ({ page }) => {
    const searchPage = new SearchPage(page);

    await searchPage.navigate();
    await searchPage.searchProduct(searchData.searchTerms.partial);
    await searchPage.validateSearchResults(searchData.searchTerms.partial);
  });

  test('Case insensitive search', async ({ page }) => {
    const searchPage = new SearchPage(page);

    await searchPage.navigate();
    await searchPage.searchProduct(searchData.searchTerms.caseInsensitive);
    await searchPage.validateSearchResults(searchData.searchTerms.caseInsensitive);
  });

  test('Invalid search', async ({ page }) => {
    const searchPage = new SearchPage(page);

    await searchPage.navigate();
    await searchPage.searchProduct(searchData.searchTerms.invalid);
    await searchPage.validateNoResults();
  });

  test('Result integrity validation', async ({ page }) => {
    const searchPage = new SearchPage(page);

    await searchPage.navigate();
    await searchPage.searchProduct(searchData.searchTerms.integrity);
    await searchPage.validateProductIntegrity();
  });

});

