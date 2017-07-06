import { browser, by, element } from 'protractor';

export class SimearthfePage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('sme-root h1')).getText();
  }
}
