import { CoppiaPage } from './app.po';

describe('coppia App', function() {
  let page: CoppiaPage;

  beforeEach(() => {
    page = new CoppiaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
