import { Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";


export default class homePage {

    private base: PlaywrightWrapper;

    constructor(private page: Page) {
        this.base = new PlaywrightWrapper(page);
    }

    private Elements = {
        PrivathaftpflichtPageURL: "https://www.verivox.de/privathaftpflicht/"
    }

    
    async acceptAllCookies() {
        await this.base.waitAndClick(this.page.getByRole('button', { name: 'Alles Akzeptieren' }));
    }

    async openVersicherungenTab() {
        const versicherungenButtonForChromeAndFirefoxIsAvailable = await this.page.locator("a.page-navigation-text.icn-a-angle-right-outlined.icn-shield-outlined").isVisible();
        if (versicherungenButtonForChromeAndFirefoxIsAvailable) {
            const versicherungenButtonForChromeAndFirefox = this.page.locator("a.page-navigation-text.icn-a-angle-right-outlined.icn-shield-outlined");
            await versicherungenButtonForChromeAndFirefox.hover();
        } else {
            const versicherungenButtonForWebkit = this.page.getByRole('banner').locator('label').filter({ hasText: 'Versicherungen' });
            await versicherungenButtonForWebkit.click();
        };
    }

    async openPrivathaftpflichtPage() {
        await this.openVersicherungenTab();
        const privathaftpflichtButtonForChromeAndFirefoxForChromeAndFirefoxIsAvailable = await this.page.getByText("Privathaftpflicht").first().isVisible();

        if (privathaftpflichtButtonForChromeAndFirefoxForChromeAndFirefoxIsAvailable) {
            const privathaftpflichtButtonForChromeAndFirefox = this.page.getByText("Privathaftpflicht").first();
            await privathaftpflichtButtonForChromeAndFirefox.click();
        } else {
            const privathaftpflichtButtonForWebkit = this.page.getByRole('banner').getByRole('link', { name: 'Privathaftpflicht' });
            await privathaftpflichtButtonForWebkit.click();
        };

        await this.page.waitForURL(this.Elements.PrivathaftpflichtPageURL);
    }

}