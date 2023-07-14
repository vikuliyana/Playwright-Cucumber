import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";


export default class homePage {

    private base: PlaywrightWrapper;

    constructor(private page: Page) {
        this.base = new PlaywrightWrapper(page);
    }

    // private Elements = {
    //     acceptAllCookiesBtnLocator: "Alles Akzeptieren",
    //     versicherungenBtnForChromeAndFirefoxIsAvailableLocator: "a.page-navigation-text.icn-a-angle-right-outlined.icn-shield-outlined",
    //     versicherungenBtnForWebkitLocator: "Versicherungen",
    //     privathaftpflichtBtnLocator: "Privathaftpflicht"
    // }

    
    async acceptAllCookies() {
        await this.page.waitForTimeout(3000);
        await this.page.getByRole('button', { name: 'Alles Akzeptieren' }).click();
    }

    async openPrivathaftpflichtPage() {
        const versicherungenButtonForChromeAndFirefoxIsAvailable = await this.page.locator("a.page-navigation-text.icn-a-angle-right-outlined.icn-shield-outlined").isVisible();

        if (versicherungenButtonForChromeAndFirefoxIsAvailable) {
            const versicherungenButtonForChromeAndFirefox = this.page.locator("a.page-navigation-text.icn-a-angle-right-outlined.icn-shield-outlined");
            const privathaftpflichtButtonForChromeAndFirefox = this.page.getByText("Privathaftpflicht").first();

            await versicherungenButtonForChromeAndFirefox.hover();
            await privathaftpflichtButtonForChromeAndFirefox.click();
        } else {
            const versicherungenButtonForWebkit = this.page.getByRole('banner').locator('label').filter({ hasText: 'Versicherungen' });
            const privathaftpflichtButtonForWebkit = this.page.getByRole('banner').getByRole('link', { name: 'Privathaftpflicht' });

            await versicherungenButtonForWebkit.click();
            await privathaftpflichtButtonForWebkit.click();
        };
    }

}