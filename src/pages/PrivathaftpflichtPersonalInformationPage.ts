import { expect, Page } from '@playwright/test';
import PlaywrightWrapper from '../helper/wrapper/PlaywrightWrappers';

export default class PrivathaftpflichtPersonalInformationPage {

    private base: PlaywrightWrapper;

    constructor(private page: Page) {
        this.base = new PlaywrightWrapper(page);
    }

    private Elements = {
        jetztVergleichenBtn: "button.button"
    }

    async enterBirthdate(date: string) {
        const birthdateFieldLocator = this.page.getByPlaceholder('TT.MM.JJJJ');
        await this.base.fillTheField(birthdateFieldLocator, date)
    }

    async enterZipCode(zipCode: string) {
        const zipCodeFieldLocator = this.page.locator('#prestep_postcode');
        await this.base.fillTheField(zipCodeFieldLocator, zipCode);
    }

    async goToTheSearchTariffsPage() {
        const jetztVergleichenBtnLocator = this.page.locator(this.Elements.jetztVergleichenBtn)
        await this.base.waitAndClick(jetztVergleichenBtnLocator);
    }
    
}