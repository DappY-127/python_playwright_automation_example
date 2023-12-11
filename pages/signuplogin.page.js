const { Page } = require("./page");

const loginEmailAddressField = '[data-qa="login-email"]'
const loginPasswordField = '[data-qa="login-password"]'
const loginBttn = '[data-qa="login-button"]'
const loginInfoLabel = '.login-form h2'
const signupNameField = '[data-qa="signup-name"]'
const signupEmailAddressField = '[data-qa="signup-email"]'
const signupBttn = '[data-qa="signup-button"]'
const signupInfoLabel = '.signup-form h2'
const invalidMailPassMsg = '//*[text()="Your email or password is incorrect!"]'

class SignupLoginPage extends Page {
    constructor(page) {
        super(page)
        this.page = page
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
        const nameField = await super.getElement(signupNameField);
        const emailField = await this.getElement(signupEmailAddressField);
        await nameField.fill(process.env.SIGNUP_NAME);
        await emailField.fill(process.env.SIGNUP_EMAIL);
    }

    async enterEmailAndPassword() {
        const emailField = await super.getElement(loginEmailAddressField);
        const passField = await super.getElement(loginPasswordField);
        await emailField.fill(process.env.VALID_EMAIL);
        await passField.fill(process.env.VALID_PASSWORD);
    }

    async enterInvalidEmailAndPassword() {
        const emailField = await super.getElement(loginEmailAddressField);
        const passField = await super.getElement(loginPasswordField);
        await emailField.fill(process.env.INVALID_EMAIL);
        await passField.fill(process.env.INVALID_PASSWORD);
    }

    async isLoginInfoLabelVisible() {
        const loginLabel = await super.getElement(loginInfoLabel);
        const isVisible = await loginLabel.isVisible();
        return isVisible;
    }

    async isSignupInfoLabelVisible() {
        const signupLabel = await super.getElement(signupInfoLabel);
        const isVisible = await signupLabel.isVisible();
        return isVisible;
    }

    async isIncorrectMailPassErrorMsgVisible() {
        const errorLabel = await super.getElement(invalidMailPassMsg);
        const isVisible = await errorLabel.isVisible();
        return isVisible;
      }
}

module.exports = {SignupLoginPage};