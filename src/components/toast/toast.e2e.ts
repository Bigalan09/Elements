import { newE2EPage } from '@stencil/core/testing';

describe('el-toast', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<el-toast></el-toast>');
    const element = await page.find('el-toast');
    expect(element).toHaveClass('hydrated');
  });

  it('renders open()', async () => {
    const page = await newE2EPage();

    await page.setContent('<el-toast></el-toast>');
    const component = await page.find('el-toast');
    const element = await page.find('el-toast >>> div');
    expect(element.textContent).toEqual(``);

    await component.callMethod('open');
    await page.waitForChanges();
    expect(element.classList.contains('toast--variant-primary')).toBe(true);
  });
});
