import { test, expect, type Page } from '@playwright/test';
import * as path from 'path';

test.beforeEach(async ({ page }) => {
    const filePath = `file://${path.resolve('html/dummy-order.html')}`;
    await page.goto(filePath);
});

async function fillOrderForm(page: Page, username: string, email: string) {
    await page.getByTestId('username').fill(username);
    await page.getByTestId('email').fill(email);
}

test('button disabled initially', async ({ page }) => {
    await expect(page.getByTestId('submit-order')).toBeDisabled();
});

test('button disabled when only username is filled', async ({ page }) => {
    await fillOrderForm(page, 'test-user', '');

    await expect(page.getByTestId('submit-order')).toBeDisabled();
});

test('button disabled when only email is filled', async ({ page }) => {
    await fillOrderForm(page, '', 'test@example.com');

    await expect(page.getByTestId('submit-order')).toBeDisabled();
});

test('button disabled when username contains only spaces', async ({ page }) => {
    await fillOrderForm(page, '   ', 'test@example.com');

    await expect(page.getByTestId('submit-order')).toBeDisabled();
});

test('button enabled after filling correct data', async ({ page }) => {
    await fillOrderForm(page, 'test-user', 'test@example.com');

    await expect(page.getByTestId('submit-order')).toBeEnabled();
});

[
    { email: 'testexample.com', reason: 'without @' },
    { email: 'test@', reason: 'without domain name' },
    { email: 'test@example', reason: 'without domain extension' },
    { email: 'test@example.c', reason: 'with one-letter extension' },
].forEach(({ email, reason }) => {
    test(`button disabled for email ${reason}`, async ({ page }) => {
        await fillOrderForm(page, 'test-user', email);

        await expect(page.getByTestId('submit-order')).toBeDisabled();
    });
});

test('input fields accept typed values', async ({ page }) => {
    await fillOrderForm(page, 'test-user', 'test@example.com');

    await expect(page.getByTestId('username')).toHaveValue('test-user');
    await expect(page.getByTestId('email')).toHaveValue('test@example.com');
});

test('popup is visible', async ({ page }) => {
    await fillOrderForm(page, 'test-user', 'test@example.com');
    await page.getByTestId('submit-order').click();

    await expect(page.locator('#popup-message')).toBeVisible();
    await expect(page.locator('#popup-message')).toHaveText('OK');
});
