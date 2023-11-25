const { Page } = require("./page");

const locators = {
    createAccBttn: '[data-qa="create-account"]',
    mrRadioBttn: '#id_gender1',
    mrsRadioBttn: '#id_gender2',
    nameField: '#name',
    emailField: '#email',
    passwordField: '#password',
    birthDaySelect: '#days',
    birthMontSelect: '#months',
    birthYearSelect: '#years',
    newsletterCheckbox: '#newsletter',
    specialoffersCheckbox: '#optin',
    firsNameField: '#first_name',
    LastNameField: '#last_name',
    CompanyField: '#company',
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

    async fillAccountInformation(accountInfo) {
        // Fill Account Information fields based on the provided object
        await this.page.fill(this.locators.nameField, accountInfo.name);
        await this.page.fill(this.locators.emailField, accountInfo.email);
        // ... fill other fields similarly
    }

    async fillAddressInformation(addressInfo) {
        // Fill Address Information fields based on the provided object
        await this.page.fill(this.locators.firsNameField, addressInfo.firstName);
        await this.page.fill(this.locators.LastNameField, addressInfo.lastName);
        // ... fill other fields similarly
    }

    async clickCreateAccountButton() {
        await this.clickElement(this.locators.createAccBttn);
    }

}

module.exports = {SignupPage};