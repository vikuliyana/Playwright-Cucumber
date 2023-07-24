import { expect, Locator, Page } from '@playwright/test';
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
       totalNumberOFAvailableTariffsHintLocator: "xpath = filtered-products-hint",
       loadMoreBtnLocator: "a.button.load-more-button",
       NumberOFAvailableTariffsHintLocator: "xpath = (//div[@class='filtered']//span)[1]",
       tariffDetailsSectionLocator: ".tab-container"
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
        await this.page.waitForTimeout(3000);
    }

    async totalNumberOFAvailableTariffsToEqual(totalNumber: number) {
        const numberOfAvailableTarrifsInTheList: number = await this.page.locator(this.Elements.availableTariffsLocator).count(); 
        expect(numberOfAvailableTarrifsInTheList).toEqual(totalNumber);
    }

    async waitForNewAvailableTariffs(newTariffs: number) {
        await this.page.locator(this.Elements.availableTariffsLocator).nth(newTariffs).waitFor();
    }

    async loadMoreBtnClick() {
        const loadMoreButton = this.page.locator(this.Elements.loadMoreBtnLocator);
        await this.base.waitAndClick(loadMoreButton);
    }

    async loadAllAvailableTariffs() {
        const loadMoreButton = this.page.locator(this.Elements.loadMoreBtnLocator);
        const totalNumberOFAvailableTariffsHint: string = await this.page.locator(this.Elements.NumberOFAvailableTariffsHintLocator).textContent();
        let numberOfAvailableTariffsCount: number = await this.page.locator(this.Elements.availableTariffsLocator).count();

        while (await loadMoreButton.isVisible()) {
            await loadMoreButton.click(); 
            await this.page.locator(this.Elements.availableTariffsLocator).nth(numberOfAvailableTariffsCount).waitFor();
            numberOfAvailableTariffsCount = numberOfAvailableTariffsCount + 20;
            await this.page.keyboard.down('End');
        };
  
        const numberOfAllAvailableTarrifsInTheList: number = await this.page.locator("xpath = //product-list[@class='product-list comparison-footer-is-open']//product").count();
        const numberOfAllAvailableTarrifsInTheListAsString: string = String(numberOfAllAvailableTarrifsInTheList);

        expect(totalNumberOFAvailableTariffsHint).toContain(numberOfAllAvailableTarrifsInTheListAsString);
        await expect(loadMoreButton).not.toBeVisible();
    }

    async tariffDetailsSectionIsVisible(section: Locator) {
        const tariffDetailsSection = this.page.locator(this.Elements.tariffDetailsSectionLocator);
        await this.base.waitAndClick(section);
        await expect(section).toHaveClass('active');
        await tariffDetailsSection.isVisible();
    }
}