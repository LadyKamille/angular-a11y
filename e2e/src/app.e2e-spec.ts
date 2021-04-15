import { browser, logging } from 'protractor';
import * as axe from 'axe-core';

import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });

  it('should display welcome message', async () => {
    await page.navigateTo();
    expect(await page.getTitleText()).toEqual('angular-a11y app is running!');
  });

  it('should have no accessibility violations', async (done) => {
    await page.navigateTo();

    browser.executeScript(axe.source);

    // Run A11Y tests in the browsers event loop.
    browser.executeAsyncScript((resolve: any) => {
      return new Promise<axe.AxeResults>(res => {
        axe.run(document, {}, resolve)
      });
    }).then((results: any) => {
      console.log('results', results);
      if (results?.violations?.length > 0) {
        console.log(results.violations);
      }
      expect(results?.violations?.length).toBe(0);
      done();
    });
  });
});
