import { AngularMruanovaPage } from './app.po';

describe('angular-mruanova App', () => {
  let page: AngularMruanovaPage;

  beforeEach(() => {
    page = new AngularMruanovaPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
