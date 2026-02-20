import { test, expect } from '@playwright/test';

test('capture verification screenshots', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Wait for desktop
  await expect(page.locator('button:has-text("Projects")').first()).toBeVisible();

  // Take a general screenshot of the desktop
  await page.screenshot({ path: '/home/jules/verification/desktop.png' });

  // Open Projects menu and take screenshot
  await page.locator('button:has-text("Projects")').first().click();
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/home/jules/verification/projects_menu.png' });

  // Open Edit menu and take screenshot
  await page.mouse.click(100, 100);
  await page.locator('button:has-text("Edit")').first().click();
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/home/jules/verification/edit_menu.png' });

  // Open View menu and take screenshot
  await page.mouse.click(100, 100);
  await page.locator('button:has-text("View")').first().click();
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/home/jules/verification/view_menu.png' });

  // Check Dock
  const dock = page.locator('nav').filter({ has: page.locator('button') }).first();
  const dockItems = dock.locator('button');
  await dockItems.nth(2).hover();
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/home/jules/verification/dock_hover.png' });
});
