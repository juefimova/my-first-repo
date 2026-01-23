// ○ Элементы: заголовок страницы, иконка корзины, список товаров, кнопки
//   Add to cart для каждого товара.
// ○ Методы: addItemToCart(itemName), openCart(), getPageTitle().

export class InventoryPage {
    constructor(page) {
        this.page = page;
        this.title = page.locator('[data-test="title"]');
        this.cart = page.locator('#shopping_cart_container');
        this.items = page.locator('[data-test="inventory-item"]');
    }

    async selectExpensiveItem() {
        const count = await this.items.count();
        let maxPrice = 0;
        let mostExpensiveItem = '';

        for (let i = 0; i < count; i++) {
            const item = this.items.nth(i);
            const priceText = await item.locator('[data-test="inventory-item-price"]').innerText();
            const price = Number(priceText.replace('$', ''));

            if (price > maxPrice) {
                maxPrice = price;
                mostExpensiveItem = await item.locator('[data-test="inventory-item-name"]').innerText();
            }
        }

        return mostExpensiveItem;
    }

    async addToCart(itemName) {
        await this.items.filter({ hasText: itemName }).locator('.btn_inventory').click();
    }


    async openCart() {
        await this.cart.click();
    }

    async getPageTitle() {
        return this.title.innerText();
    }
}

