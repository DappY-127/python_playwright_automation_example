const { test, expect } = require("@playwright/test");
const { HomePage } = require("../pages/home.page");
const { SignupLoginPage } = require("../pages/signuplogin.page");
const { SignupPage } = require("../pages/signup.page");
const { AccountCreationPage } = require("../pages/account_created.page");
const { AccountDeletionPage } = require("../pages/account_deleted.page");

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

test.describe("User Login", () => {
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
        await homePage.openUrl(process.env.URL);
    });

    test.afterEach(async () => {
        await page.close();
    });

    test("Login User with correct email and password", async () => {
        await userCreation(homePage, signupLoginPage, signupPage, accountCreationPage);

        await homePage.openUrl(process.env.URL);
        let homePageTitle = await page.title();
        expect(homePageTitle).toContain('Automation Exercise');

        await homePage.clickHeaderSighnupLoginBttn();
        expect(await signupLoginPage.isLoginInfoLabelVisible()).toBeTruthy();
    
        await signupLoginPage.enterEmailAndPassword();
        await signupLoginPage.clickLoginBttn();
        expect(await homePage.isUserStatusVisible()).toBeTruthy();
        expect(await homePage.isUserStatusCorrect()).toBeTruthy();

        await homePage.clickHeaderDeleteAccBttn();
        expect(await accountDeletionPage.isAccountDeletedVisible()).toBeTruthy();

        await accountDeletionPage.clickContinueBttn();
        expect(await homePage.isHeaderDeleteAccBttnVisible()).toBeFalsy();
        expect(await homePage.isHeaderLogoutBttnVisible()).toBeFalsy();
    });

    test("Login User with incorrect email and password", async () => {
        let homePageTitle = await page.title();
        expect(homePageTitle).toContain('Automation Exercise');

        await homePage.clickHeaderSighnupLoginBttn();
        expect(await signupLoginPage.isLoginInfoLabelVisible()).toBeTruthy();

        await signupLoginPage.enterInvalidEmailAndPassword();
        await signupLoginPage.clickLoginBttn();
        expect(await signupLoginPage.isIncorrectMailPassErrorMsgVisible()).toBeTruthy();
    });

});

// test.describe("User Logout", () => {

// });