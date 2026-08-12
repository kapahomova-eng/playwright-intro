import {test, expect, type Page, Locator} from '@playwright/test';
import {faker} from "@faker-js/faker";
const randomUsername = faker.internet.username()
const randomPassword = faker.internet.password();

test.beforeEach(async ({ page }) => {
    await page.goto(process.env['BASE_URL']!);
});

async function attemptLogin(page: Page, username: string, password: string) {
    await page.getByTestId('username-input').fill(username);
    await page.getByTestId('password-input').fill(password);

    const signIn = page.getByTestId('signIn-button');
    if (await signIn.isEnabled()) {
        await signIn.click();
    }
}

async function expectNotLoggedIn(page: Page, signInUrl: string) {

    const popupMessage: Locator = page.getByTestId('authorizationError-popup');
    await expect(page.getByTestId('signIn-button')).toBeVisible();
    await expect(popupMessage).toHaveText('×Incorrect credentials')
    await expect(page).toHaveURL(signInUrl);

}
test('check locale', async ({ page }) => {
    console.log('Browser language:', await page.evaluate(() => navigator.language));
    console.log('Languages:', await page.evaluate(() => navigator.languages));
});

test('login fails when only username is filled', async ({ page }) => {
    await attemptLogin(page, randomUsername, '');
    await expect(page.getByTestId('signIn-button')).toBeDisabled()
});

test('login fails when only password is filled', async ({ page }) => {
    await attemptLogin(page, '', randomPassword);
    await expect(page.getByTestId('signIn-button')).toBeDisabled()
});

[
    { username: 'no-such-user', password: randomPassword, caseName: 'nonexistent user with wrong password' },
    { username: '  student  ', password: randomPassword, caseName: 'username surrounded by spaces' },
    { username: 'a'.repeat(512), password: 'b'.repeat(512), caseName: 'excessively long credentials' },
    { username: '!@#$%^&*()', password: '<>?:"{}|', caseName: 'special characters only' },
].forEach(({ username, password, caseName }) => {
    test(`login fails for ${caseName}`, async ({ page }) => {
        const signInUrl = `${process.env.BASE_URL}signin`;
        await attemptLogin(page, username, password);
        await expectNotLoggedIn(page, signInUrl);
    });
});

test('login fails when one symbol in user-name', async ({ page }) => {
    await page.getByTestId('username-input').fill('s');
    await expect(page.getByTestId('username-input-error').nth(0)).toHaveText('The field must contain at least of characters: 2')

});
test('login fails when one symbol in password', async ({ page }) => {

    await page.getByTestId('password-input').fill('s');
    await expect(page.locator('xpath=//*[@id="root"]/div/div[1]/main/form/fieldset[2]/span'))
        .toHaveText('The field must contain at least of characters: 8')
});