// ○ Элементы: поле для имени, поле для фамилии, поле для почтового
// индекса, кнопка &quot;Continue&quot;.
// ○ Методы: fillUserInfo(firstName, lastName, postalCode).

export class CheckoutStepOnePage {
    constructor(page) {
        this.page = page;
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCode = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
    }

    async fillUserInfo(firstName, lastName, postalCode) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCode.fill(postalCode);
        await this.continueButton.click();
    }
}