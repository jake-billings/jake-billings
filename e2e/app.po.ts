export class JakeBillingsPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('jake-billings-app h1')).getText();
  }
}
