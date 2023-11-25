const { Page } = require("./page")

const accCreatedMssg = '[data-qa="account-created"]'
const continueBttn = '[data-qa="continue-button"]'

class AccountCreationPage extends Page {
    constructor(page) {
        super(page)
        this.page = page
        this.accCreatedMssg = accCreatedMssg;
    }

    async getAccCreatedMssg() {
        return await super.getElement(accCreatedMssg)
    }
    async getContinueBttn() {
        return await super.getElement(continueBttn)
    }
    async clickContinueBttn() {
        return await super.clickElement(continueBttn)
    }
    async isAccountCreatedVisible() {
        const isVisible = await this.isElementVisible(this.accCreatedMssg);
        return isVisible;
    }
}

module.exports = {AccountCreationPage};