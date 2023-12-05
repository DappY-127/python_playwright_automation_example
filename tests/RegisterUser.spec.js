const { test, expect } = require("@playwright/test");
const { HomePage } = require("../pages/home.page");
const { SignupLoginPage } = require("../pages/signuplogin.page");
const { SignupPage } = require("../pages/signup.page");
const { AccountCreationPage } = require("../pages/account_created.page");
const { AccountDeletionPage } = require("../pages/account_deleted.page");

async function registerAndLogin(homePage, signupLoginPage, signupPage, accountCreationPage) {
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
}

async function deleteAccount(homePage, accountDeletionPage) {
  await homePage.clickHeaderDeleteAccBttn();
  expect(await accountDeletionPage.isAccountDeletedVisible()).toBeTruthy();
  await accountDeletionPage.clickContinueBttn();
  expect(await homePage.isHeaderDeleteAccBttnVisible()).toBeFalsy();
  expect(await homePage.isHeaderLogoutBttnVisible()).toBeFalsy();
}

test.describe("User Registration and Account Deletion", () => {
  let page;
  let homePage;
  let signupLoginPage;
  let signupPage;
  let accountCreationPage;
  let accountDeletionPage;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    homePage = new HomePage(page);
    signupLoginPage = new SignupLoginPage(page);
    signupPage = new SignupPage(page);
    accountCreationPage = new AccountCreationPage(page);
    accountDeletionPage = new AccountDeletionPage(page);
  });

  test.afterEach(async () => {
    await page.close();
  });

  test("User should be able to register, log in, delete the account, and observe appropriate messages", async () => {
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

  test("User should be able to register, log in, delete the account, and observe appropriate messages (using helper functions)", async () => {
    await homePage.openUrl(process.env.URL);   
    let homePageTitle = await page.title();
    expect(homePageTitle).toContain('Automation Exercise');
    await registerAndLogin(homePage, signupLoginPage, signupPage, accountCreationPage);
    await deleteAccount(homePage, accountDeletionPage);
    homePageTitle = await page.title();
    expect(homePageTitle).toContain('Automation Exercise');
  });

  test.skip("Login user with correct email and password, then delete the account", async () => {
    await homePage.openUrl(process.env.URL);
    let homePageTitle = await page.title();
    expect(homePageTitle).toContain('Automation Exercise');
    
    await homePage.clickHeaderSighnupLoginBttn();
    expect(await signupLoginPage.isLoginInfoLabelVisible()).toBeTruthy();
  
    // Test steps as described
    await signupLoginPage.enterCredentials('valid@email.com', 'validPassword');
    await signupLoginPage.clickLoginButton();
    expect(await homePage.isUserLoggedIn()).toBeTruthy(); // Assuming this function exists to check if the user is logged in
  
    await homePage.clickHeaderDeleteAccBttn();
    expect(await accountDeletionPage.isAccountDeletedVisible()).toBeTruthy();
    await accountDeletionPage.clickContinueBttn();
    expect(await homePage.isAccountDeletedMessageVisible()).toBeTruthy(); // Assuming this function exists to check account deletion message
    
    homePageTitle = await page.title();
    expect(homePageTitle).toContain('Automation Exercise');
  });
});
