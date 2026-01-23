// CheckoutCompletePage: Страница с сообщением об успешном заказе.
// ○ Элементы: заголовок &quot;Thank you for your order!&quot;, кнопка &quot;Back Home&quot;.
// ○ Методы: getCompletionMessage().

export class CheckoutCompletePage {
    constructor(page) {
        this.page = page;
        this.successTitle = page.locator('[data-test="title"]');
        this.thanksMessage = page.locator('[data-test="complete-header"]');
        this.backHomeBtn = page.locator('[data-test="back-to-products"]');
    }

    async getCompletionMessage() {
        return await this.thanksMessage.innerText();
    }
    async goBackHome() {
        await this.backHomeBtn.click();
    }

    async getPageTitle() {
        return await this.successTitle.innerText();
    }

}