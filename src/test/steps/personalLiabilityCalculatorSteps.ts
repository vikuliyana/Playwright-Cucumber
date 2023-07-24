import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber"
import { expect, Locator } from "@playwright/test"
import { pageFixture } from "../hooks/pageFixture";
import HomePage from "../../pages/HomePage";
import PrivathaftpflichtPage from "../../pages/PrivathaftpflichtPage";
import PrivathaftpflichtPersonalInformationPage from "../../pages/PrivathaftpflichtPersonalInformationPage";
import SearchTariffsPage from "../../pages/SearchTariffsPage";
import * as data from "../../helper/test-data/testDataInformation.json";

setDefaultTimeout(50 * 1000 * 2);

let homePage: HomePage;
let privathaftpflichtPage: PrivathaftpflichtPage;
let privathaftpflichtPersonalInformationPage: PrivathaftpflichtPersonalInformationPage;
let searchTariffsPage: SearchTariffsPage;

Given('that I can open www.verivox.de', async function () {
    homePage = new HomePage(pageFixture.page);
    await pageFixture.page.goto(process.env.BASEURL);
    await homePage.acceptAllCookies();
  });

When('I navigate to Versicherungen and select Privathaftpflicht', async function () {
    await homePage.openVersicherungenTab();
    await homePage.openPrivathaftpflichtPage();
  });

  When('I enter my age and Single ohne Kinder', async function () {
    privathaftpflichtPage = new PrivathaftpflichtPage(pageFixture.page);
    await privathaftpflichtPage.enterAge(data.age);
    await privathaftpflichtPage.checkFamilienstandFieldValue(data.FamilienstandFieldValue);
  });

Then('I go to the Privathaftpflicht personal information page', async function () {
    await privathaftpflichtPage.goToThePrivathaftpflichtPersonalInformationPage();
  });

Then('I enter my birthdate', async function () {
    privathaftpflichtPersonalInformationPage = new PrivathaftpflichtPersonalInformationPage(pageFixture.page);
    await privathaftpflichtPersonalInformationPage.enterBirthdate(data.birthdate);
  });

Then('I enter my zip code', async function () {
    await privathaftpflichtPersonalInformationPage.enterZipCode(data.zip_code);
  });

Then('I click the Jetzt vergleichen button', async function () {
    await privathaftpflichtPersonalInformationPage.goToTheSearchTariffsPage();
  });

Then('I should see a page that lists the available tariffs for my selection', async function () {
    searchTariffsPage = new SearchTariffsPage(pageFixture.page);
    await searchTariffsPage.waitForTheFirstTariffToBeAvailable();
    await searchTariffsPage.availableTariffsCorrespondToTheSelectedData(data.children, data.zip_code);
  });


When('I display the tariff Result List page', async function () {
    await searchTariffsPage.resultListIsVisible();
    });

Then('I should see the total number of available tariffs listed above all the result list', async function () {
    await searchTariffsPage.totalNumberOFAvailableTariffsHintIsVisible();
    });
  

When('I scroll to the end of the result list page', async function () {
    await searchTariffsPage.scrollToTheEndOfThePage();
    });
  

Then('I should see only the first 20 tariffs displayed', async function () {
    await searchTariffsPage.totalNumberOFAvailableTariffsToEqual(20);
    });

When('I click on the button labeled 20 weitere Tarife laden', async function () {
    await searchTariffsPage.loadMoreBtnClick();
    await searchTariffsPage.scrollToTheEndOfThePage();
    });


Then('I should see the next 20 tariffs displayed', async function () {
    // await pageFixture.page.locator("xpath = //product-list[@class='product-list comparison-footer-is-open']//product").nth(20).waitFor();
    await pageFixture.page.waitForTimeout(2000);
    await searchTariffsPage.totalNumberOFAvailableTariffsToEqual(40); 
    });


Then('I can continue to load any additional tariffs until all tariffs have been displayed', async function () {
    await searchTariffsPage.loadAllAvailableTariffs();
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
  
    await searchTariffsPage.tariffDetailsSectionIsVisible(waitereLeistungenSection);
    await searchTariffsPage.tariffDetailsSectionIsVisible(allgemeinSection);
    await searchTariffsPage.tariffDetailsSectionIsVisible(tatigkeitenUndHobbysSection);
    });


Then('I see tariff details sections: “Miete & Immobilien” and “Dokumente”', async function () {
    const mieteImmobilienSection = pageFixture.page.locator("xpath = (//ul[@class='navigation']//li)[4]");
    const documenteSection = pageFixture.page.locator("xpath = (//ul[@class='navigation']//li)[5]");

    await searchTariffsPage.tariffDetailsSectionIsVisible(mieteImmobilienSection);
    await searchTariffsPage.tariffDetailsSectionIsVisible(documenteSection);
    });


Then('I see the ZUM ONLINE-ANTRAG button', async function () {
    const zumOnlineAntragButton = pageFixture.page.locator("xpath = (//button[text()='Zum Online-Antrag'])[1]");

    await zumOnlineAntragButton.isVisible();  
    });

