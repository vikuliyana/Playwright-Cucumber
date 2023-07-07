import { Before, After, BeforeAll, AfterAll, Status} from "@cucumber/cucumber"
import { Browser, BrowserContext } from "@playwright/test"
import { pageFixture } from "./pageFixture"
import { invokeBrowser } from "../../helper/browsers/BrowserManager";
import { getEnv } from "../../helper/env/env";

let browser: Browser;
let contex: BrowserContext;

BeforeAll( async function () {
    getEnv();
    browser = await invokeBrowser();
});

Before( async function () {
    contex = await browser.newContext();
    const page = await contex.newPage();
    pageFixture.page = page;
});

After( async function () {
    await pageFixture.page.close();
    await contex.close();
});
 
AfterAll( async function () {
    await browser.close();
});