import { ConsolePage } from './app.po';

describe('console App', function() {
  let page: ConsolePage;

  beforeEach(() => {
    page = new ConsolePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
