import { test, expect } from '@playwright/test';

test('App Polishing Verification', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Open About Me
  await page.getByTestId('icon-about').dblclick();
  await page.waitForSelector('text=About Me');
  await page.screenshot({ path: 'screenshots/about_app_polished.png' });

  // Open Settings
  await page.getByLabel('Open Settings').click();
  await page.waitForSelector('text=System Settings');
  await page.screenshot({ path: 'screenshots/settings_app_polished.png' });
});
