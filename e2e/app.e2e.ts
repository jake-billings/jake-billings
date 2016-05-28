import { JakeBillingsPage } from './app.po';

describe('jake-billings App', function() {
  let page: JakeBillingsPage;

  beforeEach(() => {
    page = new JakeBillingsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('jake-billings works!');
  });
});
