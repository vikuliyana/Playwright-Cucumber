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
        const birthdateField = this.page.getByPlaceholder('TT.MM.JJJJ');
        await this.base.fillTheField(birthdateField, date)
    }

    async enterZipCode(zipCode: string) {
        const zipCodeField = this.page.locator('#prestep_postcode');
        await this.base.fillTheField(zipCodeField, zipCode);
    }

    async goToTheSearchTariffsPage() {
        const jetztVergleichenBtn = this.page.locator(this.Elements.jetztVergleichenBtn)
        await this.base.waitAndClick(jetztVergleichenBtn);
    }
    
}