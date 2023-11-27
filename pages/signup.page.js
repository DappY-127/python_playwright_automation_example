const { Page } = require("./page");

const locators = {
    createAccBttn: '[data-qa="create-account"]',
    mrRadioBttn: '#id_gender1',
    mrsRadioBttn: '#id_gender2',
    nameField: '#name',
    emailField: '#email',
    passwordField: '#password',
    birthDaySelect: '#days',
    birthMonthSelect: '#months',
    birthYearSelect: '#years',
    newsletterCheckbox: '#newsletter',
    specialoffersCheckbox: '#optin',
    firsNameField: '#first_name',
    lastNameField: '#last_name',
    companyField: '#company',
    addressField: '#address1',
    address2Field: '#address2',
    countrySelect: '#country',
    stateField: '#state',
    cityField: '#city',
    zipField: '#zipcode',
    mobileNumberField: '#mobile_number'
  };
  
class SignupPage extends Page {
    constructor(page) {
        super(page)
        this.page = page
        this.locators = locators
    }

    async fillAccountInformation() {
        // Fill Account Information fields based on the provided object
        await this.page.fill(this.locators.nameField, process.env.VALID_NAME);
        // await this.page.fill(this.locators.emailField, process.env.VALID_EMAIL);
        await this.page.fill(this.locators.passwordField, process.env.VALID_PASSWORD);
    }

    async fillAddressInformation() {
        // Fill Address Information fields based on the provided object
        await this.page.fill(this.locators.firsNameField, process.env.VALID_FIRST_NAME);
        await this.page.fill(this.locators.lastNameField, process.env.VALID_LAST_NAME);
        await this.page.fill(this.locators.companyField, process.env.VALID_COMPANY);
        await this.page.fill(this.locators.addressField, process.env.VALID_ADDRESS);
        await this.page.fill(this.locators.address2Field, process.env.VALID_ADDRESS_2);
        await this.page.fill(this.locators.stateField, process.env.VALID_STATE);
        await this.page.fill(this.locators.cityField, process.env.VALID_CITY);
        await this.page.fill(this.locators.zipField, process.env.VALID_ZIP);
        await this.page.fill(this.locators.mobileNumberField, process.env.VALID_MOBILE_NUMBER);
 
    }

    async clickCreateAccountButton() {
        await this.clickElement(this.locators.createAccBttn);
    }

    async selectNewsletterCheckbox() {
        await this.checkElement(this.locators.newsletterCheckbox);
    }
    async selectSpecialoffersCheckbox() {
        await this.checkElement(this.locators.specialoffersCheckbox);
    }
    async selectMrRadioBttn() {
        await this.clickElement(this.locators.mrRadioBttn);
    }
    async selectMrsRadioBttn() {
        await this.clickElement(this.locators.mrsRadioBttn);
    }
    async pickDayOfBirth() {
        await this.page.selectOption(this.locators.birthDaySelect, process.env.VALID_DAY);
    }
    async pickMonthOfBirth() {
        await this.page.selectOption(this.locators.birthMonthSelect, process.env.VALID_MONTH);
    }
    async pickYearOfBirth() {
        await this.page.selectOption(this.locators.birthYearSelect, process.env.VALID_YEAR);
    }
    async pickCountry() {
        await this.page.selectOption(this.locators.countrySelect, process.env.VALID_COUNTRY);
    }

}

module.exports = {SignupPage};