import { test } from '@playwright/test';

test('capture screenshot', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(2000); // Wait for animations
  await page.screenshot({ path: 'screenshot_initial.png', fullPage: true });
});
