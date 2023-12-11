const { Page } = require("./page")

const accCreatedMssg = '[data-qa="account-created"]'
const continueBttn = '[data-qa="continue-button"]'

class AccountCreationPage extends Page {
    constructor(page) {
        super(page)
        this.page = page
    }

    async clickContinueBttn() {
        return await super.clickElement(continueBttn)
    }
    async isAccountCreatedVisible() {
        const isVisible = await this.page.isVisible(accCreatedMssg);
        return isVisible;
    }
}

module.exports = {AccountCreationPage};