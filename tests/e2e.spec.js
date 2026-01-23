import { test, expect } from '@playwright/test';
import { LoginPage } from "../pages/login.page";
import {InventoryPage} from "../pages/inventory.page";
import {CartPage} from "../pages/cart.page";
import * as Test from "node:test";
import {CheckoutStepOnePage} from "../pages/checkout.step.one.page";
import {CheckoutStepTwoPage} from "../pages/checkout.step.two.page";
import {CheckoutCompletePage} from "../pages/checkout.complete.page";

test('Успешный логин, проверка страниц товаров, корзины, успешная покупка', async({page}) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutStepOnePage = new CheckoutStepOnePage(page);
    const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);

    await loginPage.open();
    await loginPage.login('standard_user','secret_sauce');

    const pageTitle = await inventoryPage.getPageTitle();
    await expect(pageTitle).toBe('Products');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    const expensiveItem = await inventoryPage.selectExpensiveItem();
    await inventoryPage.addToCart(expensiveItem);

    await inventoryPage.openCart();
    await cartPage.expectItem(expensiveItem);
    await cartPage.goToCheckout();

    await checkoutStepOnePage.fillUserInfo('Test', 'User', '12345');

    await expect(checkoutStepTwoPage.shippingInfo).toBeVisible();
    await expect(checkoutStepTwoPage.paymentInfo).toBeVisible();
    await expect(checkoutStepTwoPage.totalPrice).toBeVisible();
    await checkoutStepTwoPage.finishCheckout();

    await expect(checkoutCompletePage.successTitle).toHaveText('Checkout: Complete!');
    const completionMes = await checkoutCompletePage.getCompletionMessage();
    await expect(completionMes).toContain('Thank you for your order!');
    await checkoutCompletePage.goBackHome();

})



