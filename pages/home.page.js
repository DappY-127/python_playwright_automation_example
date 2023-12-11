const { Page } = require("./page");

const homePageLogoBttn = '.logo img'
const headerHomeBttn = '//a[contains(text(), "Home")]'
const headerProductsBttn = '//a[contains(text(), "Products")]'
const headerCartBttn = '//a[contains(text(), "Cart")]'
const headerSighnupLoginBttn = '//a[contains(text(), " Signup / Login")]' 
const headerContactUsBttn = '//a[contains(text(), "Contact us")]'
const headerLogoutBttn = '//a[contains(text(), " Logout")]'
const headerDeleteAccBttn = '//a[contains(text(), " Delete Account")]'
const subscriptionEmailField = '#susbscribe_email'
const subscriptionBttn = '#subscribe'
const userStatus = '//a[contains(text(), "Logged in as")]'

class HomePage extends Page {
    constructor(page) {
        super(page)
        this.page = page
    }

    // Elements click's
    async clickHomePageLogoBttn() {
        return await super.clickElement(homePageLogoBttn);
    }
    async clickHeaderHomeBttn() {
        return await super.clickElement(headerHomeBttn);
    }
    async clickHeaderProductsBttn() {
        return await super.clickElement(headerProductsBttn);
    }
    async clickHeaderCartBttn() {
        return await super.clickElement(headerCartBttn);
    }
    async clickHeaderSighnupLoginBttn() {
        return await super.clickElement(headerSighnupLoginBttn);
    }
    async clickHeaderContactUsBttn() {
        return await super.clickElement(headerContactUsBttn);
    }
    async clickSubscriptionEmailField() {
        return await super.clickElement(subscriptionEmailField);
    }
    async clickSubscriptionBttn() {
        return await super.clickElement(subscriptionBttn);
    }
    async clickHeaderLogoutBttn() {
        return await super.clickElement(headerLogoutBttn);
    }
    async clickHeaderDeleteAccBttn() {
        return await super.clickElement(headerDeleteAccBttn);
    }
    // Test methods
    async isHeaderLogoutBttnVisible() {
        const logoutBttn = await super.getElement(headerLogoutBttn);
        const isVisible = await logoutBttn.isVisible();
        return isVisible;
    }
    async isHeaderDeleteAccBttnVisible() {
        const deleteAccBttn = await super.getElement(headerDeleteAccBttn);
        const isVisible = await deleteAccBttn.isVisible();
        return isVisible;
    }
    async isUserStatusVisible() {
        const userStatusElement = await super.getElement(userStatus);
        const isVisible = await userStatusElement.isVisible();
        return isVisible;
    }
    async isUserStatusCorrect() {
        const userStatusElement = await super.getElement(userStatus);
        const userStatusText = await userStatusElement.textContent();
        const userName = process.env.SIGNUP_NAME;
        const expectedUserStatus = ' Logged in as ' + userName;

        if (userStatusText === expectedUserStatus) {
            return true;
        } else {
            throw new Error(`User status incorrect. Expected: ${expectedUserStatus}. Actual: ${userStatusText} -----`);
        }
    }
}

module.exports = {HomePage};