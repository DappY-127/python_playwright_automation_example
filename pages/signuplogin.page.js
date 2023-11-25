const { Page } = require("./page");

const loginEmailAddressField = '[data-qa="login-email"]'
const loginPasswordField = '[data-qa="login-password"]'
const loginBttn = '[data-qa="login-button"]'
const signupNameField = '[data-qa="signup-name"]'
const signupEmailAddressField = '[data-qa="signup-email"]'
const signupBttn = '[data-qa="signup-button"]'

class SignupLoginPage extends Page {
    constructor(page) {
        super(page)
        this.page = page
    }
    
    // Elements getters
    async getLoginEmailAddressField() {
        return await super.getElement(loginEmailAddressField);
    }
    async getLoginPasswordField() {
        return await super.getElement(loginPasswordField);
    }
    async getLoginBttn() {
        return await super.getElement(loginBttn);
    }
    async getSignupNameField() {
        return await super.getElement(signupNameField);
    }
    async getSignupEmailAddressField() {
        return await super.getElement(signupEmailAddressField);
    }
    async getSignupBttn() {
        return await super.getElement(signupBttn);
    }
    // Elements click's
    async clickLoginEmailAddressField() {
        return await super.clickElement(loginEmailAddressField);
    }
    async clickLoginPasswordField() {
        return await super.clickElement(loginPasswordField);
    }
    async clickLoginBttn() {
        return await super.clickElement(loginBttn);
    }
    async clickSignupNameField() {
        return await super.clickElement(signupNameField);
    }
    async clickSignupEmailAddressField() {
        return await super.clickElement(signupEmailAddressField);
    }
    async clickSignupBttn() {
        return await super.clickElement(signupBttn);
    }

    // Test Methods
    async enterNameAndEmail() {
        const nameField = await this.getSignupNameField();
        const emailField = await this.getSignupEmailAddressField();
        await nameField.fill(process.env.SIGNUP_NAME);
        await emailField.fill(process.env.SIGNUP_EMAIL);
    }
}

module.exports = {SignupLoginPage};