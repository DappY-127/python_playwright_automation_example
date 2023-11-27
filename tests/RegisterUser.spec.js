const { test, expect } = require("@playwright/test");
const { HomePage } = require("../pages/home.page");
const { SignupLoginPage } = require("../pages/signuplogin.page");
const { SignupPage } = require("../pages/signup.page");
const { AccountCreationPage } = require("../pages/account_created.page");
const { AccountDeletionPage } = require("../pages/account_deleted.page");

test.describe("User Registration and Account Deletion", () => {
  let page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
  });

  test.afterAll(async () => {
    await page.close();
  });

  test("User should be able to register, log in, delete the account, and observe appropriate messages", async () => {
    const homePage = new HomePage(page);
    const signupLoginPage = new SignupLoginPage(page);
    const signupPage = new SignupPage(page);
    const accountCreationPage = new AccountCreationPage(page);
    const accountDeletionPage = new AccountDeletionPage(page);

    await homePage.openUrl(process.env.URL);
    let homePageTitle = await page.title();
    expect(homePageTitle).toContain('Automation Exercise');
    await homePage.clickHeaderSighnupLoginBttn();
    expect(await signupLoginPage.isSignupInfoLabelVisible()).toBeTruthy();
    await signupLoginPage.enterNameAndEmail();
    await signupLoginPage.clickSignupBttn();
    await signupPage.fillAccountInformation();
    await signupPage.selectMrRadioBttn();
    await signupPage.fillAddressInformation();
    await signupPage.clickCreateAccountButton();
    expect(await accountCreationPage.isAccountCreatedVisible()).toBeTruthy();
    await accountCreationPage.clickContinueBttn();
    expect(await homePage.isUserStatusVisible()).toBeTruthy();
    expect(await homePage.isUserStatusCorrect()).toBeTruthy();
    await homePage.clickHeaderDeleteAccBttn();
    expect(await accountDeletionPage.isAccountDeletedVisible()).toBeTruthy();
    await accountDeletionPage.clickContinueBttn();
    expect(await homePage.isHeaderDeleteAccBttnVisible()).toBeFalsy();
    expect(await homePage.isHeaderLogoutBttnVisible()).toBeFalsy();
    homePageTitle = await page.title();
    expect(homePageTitle).toContain('Automation Exercise');
  });
});
