const { Page } = require("./page")

const accDeletedMssg = '[data-qa="account-deleted"]'
const continueBttn = '[data-qa="continue-button"]'

class AccountDeletionPage extends Page {
    constructor(page) {
        super(page)
        this.page = page
    }

    async clickContinueBttn() {
        return await super.clickElement(continueBttn)
    }
    async isAccountDeletedVisible() {
        const isVisible = await this.page.isVisible(accDeletedMssg);
        return isVisible;
    }
}

module.exports = {AccountDeletionPage};