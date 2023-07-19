import { expect, Page } from '@playwright/test';
import PlaywrightWrapper from '../helper/wrapper/PlaywrightWrappers';

export default class SearchTariffsPage {

    private base: PlaywrightWrapper;

    constructor(private page: Page) {
        this.base = new PlaywrightWrapper(page);
    }

    private Elements = {
       availableTariffsLocator: "xpath = //product-list[@class='product-list comparison-footer-is-open']//product",
       selectionInformationLocator: "xpath = (//div[@class='filter-header']//div)[1]",
       resultListLocator: "results-container",
       totalNumberOFAvailableTariffsHintLocator: "xpath = filtered-products-hint"
    }

    async waitForTheFirstTariffToBeAvailable() {
        await this.page.locator(this.Elements.availableTariffsLocator).first().waitFor();
    }

    async availableTariffsCorrespondToTheSelectedData(children: string, zipCode: string) {
        const numberOfAvailableTarrifsInTheList: number = await this.page.locator(this.Elements.availableTariffsLocator).count();
        const selectionInformation: string = await this.page.locator(this.Elements.selectionInformationLocator).textContent();

        expect(selectionInformation).toContain(children && zipCode);
        expect(numberOfAvailableTarrifsInTheList).toBeGreaterThanOrEqual(4);
    }

    async resultListIsVisible() {
        const resultList = this.page.locator(this.Elements.resultListLocator);
        await resultList.isVisible();
    }

    async totalNumberOFAvailableTariffsHintIsVisible() {
        const totalNumberOFAvailableTariffsHint = this.page.locator(this.Elements.totalNumberOFAvailableTariffsHintLocator);
        await totalNumberOFAvailableTariffsHint.isVisible();
    }

    async scrollToTheEndOfThePage() {
        await this.page.keyboard.down('End');
        await this.page.waitForTimeout(2000);
    }
}