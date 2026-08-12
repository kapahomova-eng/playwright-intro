import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://playwright.dev/');
});
test('has title', async ({ page }) => {
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();
  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
test('GitHub link', async ({ page }) => {
  const githubLink = page.getByRole('link', {
    name: 'GitHub repository',
  });

  await expect(githubLink).toHaveAttribute(
      'href',
      'https://github.com/microsoft/playwright'
  );

});
test('Discord link', async ({ page }) => {
  await page.getByRole('link', { name: 'Discord server' }).click();
  const [discordPage] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByRole('link', { name: 'Discord server' }).click(),
  ]);
  await discordPage.waitForLoadState();
  await expect(discordPage).toHaveURL('https://discord.com/servers/playwright-807756831384403968');
});
test('Switch between dark and light', async ({ page }) => {
  await page.getByRole('button', { name: 'Switch between dark and light' }).click();
  const html = page.locator('html');
  const initialTheme = await html.getAttribute('data-theme');
  await page.getByRole('button', { name: 'Switch between dark and light' }).click();
  const expectedTheme = initialTheme === 'dark' ? 'light' : 'dark';
  await expect(html).toHaveAttribute('data-theme', expectedTheme);
});
