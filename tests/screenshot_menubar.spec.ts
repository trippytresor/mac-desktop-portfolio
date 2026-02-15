import { test, expect } from '@playwright/test';

test('screenshot menubar', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.screenshot({ path: 'menubar_default.png' });

  // Click apple menu
  await page.locator('header[role="menubar"] .lucide-apple').first().click();
  await page.screenshot({ path: 'menubar_apple_open.png' });
});
