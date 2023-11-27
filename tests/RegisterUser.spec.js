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
    // Add assertions to verify home page visibility

    await homePage.clickHeaderSighnupLoginBttn();
    // Add assertions to verify 'New User Signup!' section visibility

    await signupLoginPage.enterNameAndEmail();
    // Add assertions to verify name and email entry

    await signupLoginPage.clickSignupBttn();
    // Add assertions to verify 'ENTER ACCOUNT INFORMATION' section visibility

    await signupPage.fillAccountInformation();
    // Add assertions for successful account details submission

    await signupPage.fillAddressInformation();
    // Add assertions for successful account details submission

    await signupPage.selectMrRadioBttn();
    await signupPage.selectNewsletterCheckbox();
    await signupPage.selectSpecialoffersCheckbox();
    await signupPage.pickDayOfBirth();
    await signupPage.pickMonthOfBirth();
    await signupPage.pickYearOfBirth();
    await signupPage.pickCountry();

    await signupPage.clickCreateAccountButton();
    expect(await accountCreationPage.isAccountCreatedVisible()).toBeTruthy();
    await accountCreationPage.clickContinueBttn();
    // Add assertions to verify successful login message

    await homePage.clickHeaderDeleteAccBttn();
    expect(await accountDeletionPage.isAccountDeletedVisible()).toBeTruthy();
    await accountDeletionPage.clickContinueBttn();
    // Add assertions to verify successful deletion and navigation after account deletion
  });
});
