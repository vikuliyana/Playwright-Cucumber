import { expect, Page } from '@playwright/test';
import PlaywrightWrapper from '../helper/wrapper/PlaywrightWrappers';

export default class homePage {

    private base: PlaywrightWrapper;

    constructor(private page: Page) {
        this.base = new PlaywrightWrapper(page);
    }

    private Elements = {
        familienstandField: "select.float-label-select",
        ageField: "input[name='age']",
        jetztVergleichenBtn: "xpath = //button[text()='Jetzt vergleichen']"
    }

    async enterAge(age: string) {
        await this.page.fill(this.Elements.ageField, age);
    }

    async checkFamilienstandFieldValue(familienstandFieldValue: string) {
        const familienstandFieldLocator = this.page.locator(this.Elements.familienstandField);
        await expect(familienstandFieldLocator).toHaveValue(familienstandFieldValue);
    }

    async goToThePrivathaftpflichtPersonalInformationPage() {
        const jetztVergleichenBtnLocator = this.page.locator(this.Elements.jetztVergleichenBtn)
        await this.base.waitAndClick(jetztVergleichenBtnLocator);
    }
}
