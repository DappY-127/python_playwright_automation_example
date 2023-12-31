const { test, expect } = require("@playwright/test");
const { HomePage } = require("../pages/home.page");
const { SignupLoginPage } = require("../pages/signuplogin.page");
const { SignupPage } = require("../pages/signup.page");
const { AccountCreationPage } = require("../pages/account_created.page");
const { AccountDeletionPage } = require("../pages/account_deleted.page");

test.describe("User Registration and Account Deletion", () => {
  let page;
  let homePage;
  let signupLoginPage;
  let signupPage;
  let accountCreationPage;
  let accountDeletionPage;

  async function userRegistration(homePage, signupLoginPage, signupPage, accountCreationPage) {
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

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    homePage = new HomePage(page);
    signupLoginPage = new SignupLoginPage(page);
    signupPage = new SignupPage(page);
    accountCreationPage = new AccountCreationPage(page);
    accountDeletionPage = new AccountDeletionPage(page);
    await homePage.openUrl(process.env.URL);
  });

  test.afterEach(async () => {
    await page.close();
  });

  test("User should be able to register, log in, delete the account, and observe appropriate messages", async () => {
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
    let homePageTitle = await page.title();
    expect(homePageTitle).toContain('Automation Exercise');
    await userRegistration(homePage, signupLoginPage, signupPage, accountCreationPage);
    await deleteAccount(homePage, accountDeletionPage);
    homePageTitle = await page.title();
    expect(homePageTitle).toContain('Automation Exercise');
  });

});

test.describe("User Registration with existing email", () => {
  let page;
  let homePage;
  let signupLoginPage;
  let signupPage;
  let accountCreationPage;
  let accountDeletionPage;

  async function userCreation(homePage, signupLoginPage, signupPage, accountCreationPage) {
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
    await homePage.clickHeaderLogoutBttn();
  }

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    homePage = new HomePage(page);
    signupLoginPage = new SignupLoginPage(page);
    signupPage = new SignupPage(page);
    accountCreationPage = new AccountCreationPage(page);
    accountDeletionPage = new AccountDeletionPage(page);
    await homePage.openUrl(process.env.URL);
  });

  test.afterEach(async () => {
    // test account deletion after test run 
    await signupLoginPage.enterEmailAndPassword();
    await signupLoginPage.clickLoginBttn();
    expect(await homePage.isUserStatusVisible()).toBeTruthy();
    expect(await homePage.isUserStatusCorrect()).toBeTruthy();

    await homePage.clickHeaderDeleteAccBttn();
    expect(await accountDeletionPage.isAccountDeletedVisible()).toBeTruthy();

    await accountDeletionPage.clickContinueBttn();
    expect(await homePage.isHeaderDeleteAccBttnVisible()).toBeFalsy();
    expect(await homePage.isHeaderLogoutBttnVisible()).toBeFalsy();
    
    await page.close();
  });

  test("User should observe the corresponding error messages when trying to register with an existing email address", async () => {   
    await userCreation(homePage, signupLoginPage, signupPage, accountCreationPage);

    await homePage.openUrl(process.env.URL);
    let homePageTitle = await page.title();
    expect(homePageTitle).toContain('Automation Exercise');

    await homePage.clickHeaderSighnupLoginBttn();
    expect(await signupLoginPage.isSignupInfoLabelVisible()).toBeTruthy();

    await signupLoginPage.enterNameAndEmail();
    await signupLoginPage.clickSignupBttn();
    expect(await signupLoginPage.isMailAlredyExistErrorMsgVisible()).toBeTruthy();
  });

});
