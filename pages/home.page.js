const { Page } = require("./page");

const homePageLogoBttn = '.logo img'
const headerHomeBttn = '//a[contains(text(), "Home")]'
const headerProductsBttn = '//a[contains(text(), "Products")]'
const headerCartBttn = '//a[contains(text(), "Cart")]'
const headerSighnupLoginBttn = '//a[contains(text(), " Signup / Login")]' 
const headerContactUsBttn = '//a[contains(text(), "Contact us")]'
const subscriptionEmailField = '#susbscribe_email'
const subscriptionBttn = '#subscribe'

class HomePage extends Page {
    constructor(page) {
        super(page)
        this.page = page
    }


    // Elements getters
    async getHomePageLogoBttn() {
        return await super.getElement(homePageLogoBttn);
    }
    async getHeaderHomeBttn() {
        return await super.getElement(headerHomeBttn);
    }
    async getHeaderProductsBttn() {
        return await super.getElement(headerProductsBttn);
    }
    async getHeaderCartBttn() {
        return await super.getElement(headerCartBttn);
    }
    async getHeaderSighnupLoginBttn() {
        return await super.getElement(headerSighnupLoginBttn);
    }
    async getHeaderContactUsBttn() {
        return await super.getElement(headerContactUsBttn);
    }
    async getSubscriptionEmailField() {
        return await super.getElement(subscriptionEmailField);
    }
    async getSubscriptionBttn() {
        return await super.getElement(subscriptionBttn);
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


}

module.exports = {HomePage};