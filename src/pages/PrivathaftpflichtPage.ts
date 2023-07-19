import { expect, Page } from '@playwright/test';
import PlaywrightWrapper from '../helper/wrapper/PlaywrightWrappers';

export default class homePage {

    private base: PlaywrightWrapper;

    constructor(private page: Page) {
        this.base = new PlaywrightWrapper(page);
    }

    private Elements = {
        familienstandFieldLocator: "select.float-label-select",
        ageField: "input[name='age']",
        jetztVergleichenBtnLocator: "xpath = //button[text()='Jetzt vergleichen']"
    }

    async enterAge(age: string) {
        await this.page.fill(this.Elements.ageField, age);
    }

    async checkFamilienstandFieldValue(familienstandFieldValue: string) {
        const familienstandField = this.page.locator(this.Elements.familienstandFieldLocator);
        await expect(familienstandField).toHaveValue(familienstandFieldValue);
    }

    async goToThePrivathaftpflichtPersonalInformationPage() {
        const jetztVergleichenBtn = this.page.locator(this.Elements.jetztVergleichenBtnLocator)
        await this.base.waitAndClick(jetztVergleichenBtn);
    }
}
