const { Page } = require("./page")

const accDeletedMssg = '[data-qa="account-deleted"]'
const continueBttn = '[data-qa="continue-button"]'

class AccountDeletionPage extends Page {
    constructor(page) {
        super(page)
        this.page = page
    }

    async getAccDeletedMssg() {
        return await super.getElement(accDeletedMssg)
    }
    async getContinueBttn() {
        return await super.getElement(continueBttn)
    }
    async clickContinueBttn() {
        return await super.clickElement(continueBttn)
    }
}

module.exports = {AccountDeletionPage};