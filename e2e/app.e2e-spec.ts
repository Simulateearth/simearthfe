import { SimearthfePage } from './app.po';

describe('simearthfe App', () => {
  let page: SimearthfePage;

  beforeEach(() => {
    page = new SimearthfePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to sme!!');
  });
});
