import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber"
import { expect, defineConfig, Locator } from "@playwright/test"
import { pageFixture } from "../hooks/pageFixture";

setDefaultTimeout(60 * 1000 * 2);


Given('that I can open www.verivox.de', async function () {
    await pageFixture.page.goto(process.env.BASEURL);
    await pageFixture.page.waitForTimeout(5000);
    await pageFixture.page.getByRole('button', { name: 'Alles Akzeptieren' }).click();
  });

When('I navigate to Versicherungen and select Privathaftpflicht', async function () {
    const versicherungenButtonForChromeAndFirefoxIsAvailable = await pageFixture.page.locator("a.page-navigation-text.icn-a-angle-right-outlined.icn-shield-outlined").isVisible();

    if (versicherungenButtonForChromeAndFirefoxIsAvailable) {
      const versicherungenButtonForChromeAndFirefox = pageFixture.page.locator("a.page-navigation-text.icn-a-angle-right-outlined.icn-shield-outlined");
      const privathaftpflichtButtonForChromeAndFirefox = pageFixture.page.getByText("Privathaftpflicht").first();

      await versicherungenButtonForChromeAndFirefox.hover();
      await privathaftpflichtButtonForChromeAndFirefox.click();
    } else {
      const versicherungenButtonForWebkit = pageFixture.page.getByRole('banner').locator('label').filter({ hasText: 'Versicherungen' });
      const privathaftpflichtButtonForWebkit = pageFixture.page.getByRole('banner').getByRole('link', { name: 'Privathaftpflicht' });

      await versicherungenButtonForWebkit.click();
      await privathaftpflichtButtonForWebkit.click();
    };
  });

  When('I enter my age and Single ohne Kinder', async function () {
    const familienstandField = pageFixture.page.locator("select.float-label-select");

    await pageFixture.page.fill("input[name='age']", "23");
    await expect(familienstandField).toHaveValue("singleWithoutChild");
  });

Then('I go to the Privathaftpflicht personal information page', async function () {
    const jetztVergleichenButton = pageFixture.page.locator("xpath = //button[text()='Jetzt vergleichen']");

    await jetztVergleichenButton.click();
  });

Then('I enter my birthdate', async function () {
    await pageFixture.page.getByPlaceholder('TT.MM.JJJJ').click()
    await pageFixture.page.getByPlaceholder('TT.MM.JJJJ').fill('25.12.2000');
  });

Then('I enter my zip code', async function () {
    await pageFixture.page.locator('#prestep_postcode').click();
    await pageFixture.page.locator('#prestep_postcode').fill('13088');
  });

Then('I click the Jetzt vergleichen button', async function () {
    const jetztVergleichenButton = pageFixture.page.locator("button.button");

    await pageFixture.page.waitForTimeout(5000);
    await jetztVergleichenButton.click();
  });

Then('I should see a page that lists the available tariffs for my selection', async function () {
    await pageFixture.page.locator("xpath = //product-list[@class='product-list comparison-footer-is-open']//product").first().waitFor();
    const numberOfAvailableTarrifsInTheList: number = await pageFixture.page.locator("xpath = //product-list[@class='product-list comparison-footer-is-open']//product").count();
    const selectionInformation: string = await pageFixture.page.locator("xpath = (//div[@class='filter-header']//div)[1]").textContent();

    expect(selectionInformation).toContain('Single ohne Kinder' && '13088');
    expect(numberOfAvailableTarrifsInTheList).toBeGreaterThanOrEqual(4);
  });


When('I display the tariff Result List page', async function () {
    const resultList = pageFixture.page.locator("results-container"); 
    
    await resultList.isVisible();
    });

Then('I should see the total number of available tariffs listed above all the result list', async function () {
    const totalNumberOFAvailableTariffsHint = pageFixture.page.locator("xpath = filtered-products-hint");

    await totalNumberOFAvailableTariffsHint.isVisible();  
    });
  

When('I scroll to the end of the result list page', async function () {
    await pageFixture.page.keyboard.down('End');
    });
  

Then('I should see only the first 20 tariffs displayed', async function () {
    const numberOfAvailableTarrifsInTheList: number = await pageFixture.page.locator("xpath = //product-list[@class='product-list comparison-footer-is-open']//product").count(); 
    
    expect(numberOfAvailableTarrifsInTheList).toEqual(20);
    });

When('I click on the button labeled 20 weitere Tarife laden', async function () {
    const loadMoreButton = pageFixture.page.locator("a.button.load-more-button");

    await loadMoreButton.click();  
    });


Then('I should see the next 20 tariffs displayed', async function () {
    await pageFixture.page.locator("xpath = //product-list[@class='product-list comparison-footer-is-open']//product").nth(20).waitFor();
    const numberOfAvailableTarrifsInTheList: number = await pageFixture.page.locator("xpath = //product-list[@class='product-list comparison-footer-is-open']//product").count();

    expect(numberOfAvailableTarrifsInTheList).toEqual(40);  
    await pageFixture.page.keyboard.down('End');
    });


Then('I can continue to load any additional tariffs until all tariffs have been displayed', async function () {
    const loadMoreButton = pageFixture.page.locator("a.button.load-more-button");
    const totalNumberOFAvailableTariffsHint: string = await pageFixture.page.locator("xpath = (//div[@class='filtered']//span)[1]").textContent();
    let numberOfAvailableTariffsCount: number = await pageFixture.page.locator("xpath = //product-list[@class='product-list comparison-footer-is-open']//product").count();

    while (await loadMoreButton.isVisible()) {
      await loadMoreButton.click(); 
      await pageFixture.page.locator("xpath = //product-list[@class='product-list comparison-footer-is-open']//product").nth(numberOfAvailableTariffsCount).waitFor();
      numberOfAvailableTariffsCount = numberOfAvailableTariffsCount + 20;
      await pageFixture.page.keyboard.down('End');
    };
    
    const numberOfAllAvailableTarrifsInTheList: number = await pageFixture.page.locator("xpath = //product-list[@class='product-list comparison-footer-is-open']//product").count();
    const numberOfAllAvailableTarrifsInTheListAsString: string = String(numberOfAllAvailableTarrifsInTheList);

    expect(totalNumberOFAvailableTariffsHint).toContain(numberOfAllAvailableTarrifsInTheListAsString);
    });
    

Given('I display the tariff result list page', async function () {
    const resultList = pageFixture.page.locator("results-container"); 
    
    await resultList.isVisible();     
    });
  

Then('I should see the tariff price of the first tariff', async function () {
    const priceOfTheFirstTaiff = pageFixture.page.locator(".group-price").first();

    await priceOfTheFirstTaiff.isVisible();      
    });
  

When('I open tariff details', async function () {
    const tariffDetailsButton = pageFixture.page.locator("xpath = (//button[text()='Tarifdetails'])[1]");

    await pageFixture.page.waitForTimeout(3000);
    await tariffDetailsButton.click();
    });


Then('I see tariff details sections: “Weitere Leistungen”, “Allgemein“, „ Tätigkeiten und Hobbys“', async function () {
    await pageFixture.page.locator(".navigation").waitFor();
    const waitereLeistungenSection = pageFixture.page.locator("xpath = //ul[@class='navigation']//li[1]");
    const allgemeinSection = pageFixture.page.locator("xpath = (//ul[@class='navigation']//li)[2]");
    const tatigkeitenUndHobbysSection = pageFixture.page.locator("xpath = (//ul[@class='navigation']//li)[3]");
    const tariffDetailsSection = pageFixture.page.locator('.tab-container');
  
    await expect(waitereLeistungenSection).toHaveClass('active');
    await tariffDetailsSection.isVisible();

    await allgemeinSection.click();
    await expect(allgemeinSection).toHaveClass('active');
    await tariffDetailsSection.isVisible();

    await tatigkeitenUndHobbysSection.click();
    await expect(tatigkeitenUndHobbysSection).toHaveClass('active');
    await tariffDetailsSection.isVisible();
    });


Then('I see tariff details sections: “Miete & Immobilien” and “Dokumente”', async function () {
    const mieteImmobilienSection = pageFixture.page.locator("xpath = (//ul[@class='navigation']//li)[4]");
    const documenteSection = pageFixture.page.locator("xpath = (//ul[@class='navigation']//li)[5]");
    const tariffDetailsSection = pageFixture.page.locator('.tab-container');

    await mieteImmobilienSection.click();
    await expect(mieteImmobilienSection).toHaveClass('active');
    await tariffDetailsSection.isVisible();

    await documenteSection.click();
    await expect(documenteSection).toHaveClass('active');
    await tariffDetailsSection.isVisible();
    });


Then('I see the ZUM ONLINE-ANTRAG button', async function () {
    const zumOnlineAntragButton = pageFixture.page.locator("xpath = (//button[text()='Zum Online-Antrag'])[1]");

    await zumOnlineAntragButton.isVisible();  
    });

