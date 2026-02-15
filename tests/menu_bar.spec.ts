import { test, expect } from '@playwright/test';

test.describe('Menu Bar', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('should display Showreel 2026 menu by default', async ({ page }) => {
    const activeAppName = page.locator('header[role="menubar"] >> text=Showreel 2026').first();
    await expect(activeAppName).toBeVisible();
  });

  test('should change to Finder when all windows are closed', async ({ page }) => {
    // Close the showreel window
    await page.getByLabel('Close window').first().click();

    const activeAppName = page.locator('header[role="menubar"] >> text=Finder').first();
    await expect(activeAppName).toBeVisible();
    await expect(page.locator('header[role="menubar"] >> text=Go')).toBeVisible();
  });

  test('should change menu content when an app is opened', async ({ page }) => {
    // Open About Me
    await page.getByLabel('About Me').first().dblclick();

    const activeAppName = page.locator('header[role="menubar"] >> text=About Me').first();
    await expect(activeAppName).toBeVisible();

    // Check for About Me specific menus (or lack of Finder specific ones like 'Go')
    await expect(page.locator('header[role="menubar"] >> text=Go')).not.toBeVisible();
    await expect(page.locator('header[role="menubar"] >> text=File')).toBeVisible();
  });

  test('should show apple menu content when apple icon clicked', async ({ page }) => {
    await page.locator('header[role="menubar"] .lucide-apple').first().click();
    await expect(page.getByText('About This Mac')).toBeVisible();
    await expect(page.getByText('Force Quit...')).toBeVisible();
  });
});
