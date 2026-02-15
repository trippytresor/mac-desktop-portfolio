
import { test, expect } from '@playwright/test';

test('window minimization and recovery', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // 1. Check if Showreel window is visible initially
  const showreelWindow = page.locator('[data-window-id="showreel"]');
  await expect(showreelWindow).toBeVisible();

  // 2. Click minimize button
  await page.getByLabel('Minimize window').click();

  // 3. Check if window is hidden (it has 'invisible' class and opacity 0)
  // Since I used CSS classes, toBeHidden() should work if it's display:none or visibility:hidden
  await expect(showreelWindow).not.toBeVisible();

  // Check if active app in menu bar is Finder
  const menuBar = page.locator('header');
  await expect(menuBar).toContainText('Finder');

  // 4. Click Showreel in dock
  await page.getByLabel('Open Showreel').click();

  // 5. Check if window is visible again
  await expect(showreelWindow).toBeVisible();
});
