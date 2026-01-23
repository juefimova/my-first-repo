// ○ Элементы: список добавленных товаров, кнопка Checkout, кнопка Continue Shopping.
// ○ Методы: goToCheckout() и иные на ваше усмотрение.

import {expect} from "@playwright/test";

export class CartPage {
    constructor(page) {
        this.page = page;
        this.items = page.locator('[data-test="inventory-item"]');
        this.checkoutBtn = page.locator('#checkout');
        this.continueBtn = page.locator('#continue-shopping');
        //this.title = page.locator('[data-test="title"]');
        this.productName = page.locator('[data-test="inventory-item-name"]');
    }

    async expectItem(itemName) {
        await expect(this.productName.filter({ hasText: itemName })).toBeVisible();
    }

    async goToCheckout() {
        await this.checkoutBtn.click();
    }


    async continueShopping() {
        await this.continueBtn.click();
    }

}

