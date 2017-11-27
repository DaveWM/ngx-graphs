import { NgxGraphsDemoPage } from './app.po';

describe('ngx-graphs-demo App', () => {
  let page: NgxGraphsDemoPage;

  beforeEach(() => {
    page = new NgxGraphsDemoPage ();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
