// ○ Элементы: информация о заказе, итоговая сумма, кнопка &quot;Finish&quot;.
// ○ Методы: finishCheckout().

export class CheckoutStepTwoPage {
    constructor(page) {
        this.page = page;
        this.finishButton = page.locator('#finish');
        this.paymentInfo = page.locator('[data-test="payment-info-value"]');
        this.shippingInfo = page.locator('[data-test="shipping-info-value"]');
        this.totalPrice = page.locator('[data-test="total-label"]');
    }

    async finishCheckout() {
        await this.finishButton.click();
    }
}