import { test } from '@playwright/test';

test('final screenshot', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(2000); // Wait for animations
  await page.screenshot({ path: 'screenshots/final_rebranded.png' });

  // Open About Me
  await page.getByLabel('Open About Me').click();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'screenshots/final_about.png' });

  // Open Showreel
  await page.getByLabel('Open Showreel').click();
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'screenshots/final_showreel.png' });
});
