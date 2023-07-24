import { Locator, Page } from "@playwright/test";

export default class PlaywrightWrapper {

    constructor(private page: Page) { }

    async waitAndClick(element: Locator) {
        await this.page.waitForTimeout(2000);
        await element.click();
    };

    async fillTheField(field: Locator, value: string) {
        await this.page.waitForTimeout(2000);
        await field.click();
        await field.fill(value);
    }
 
}