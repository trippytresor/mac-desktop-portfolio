import { test, expect } from '@playwright/test';

test('verify menu bar items and dropdowns', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Wait for the desktop to load
  await expect(page.locator('button:has-text("Projects")').first()).toBeVisible();

  // Verify "Projects" menu
  const projectsMenu = page.locator('button:has-text("Projects")').first();
  await projectsMenu.click();
  await expect(page.locator('role=menuitem >> text="Portfolio Website"')).toBeVisible();
  await expect(page.locator('role=menuitem >> text="Motion Graphics Showreel"')).toBeVisible();
  await expect(page.locator('role=menuitem >> text="Brand Identity"')).toBeVisible();

  // Click away to close menu
  await page.mouse.click(100, 100);

  // Verify "Edit" menu
  const editMenu = page.locator('button:has-text("Edit")').first();
  await editMenu.click();
  await expect(page.locator('role=menuitem >> text="CV"')).toBeVisible();
  await expect(page.locator('role=menuitem >> text="Contact"')).toBeVisible();
  await expect(page.locator('role=menuitem >> text="Blog"')).toBeVisible();

  // Click away
  await page.mouse.click(100, 100);

  // Verify "View" menu
  const viewMenu = page.locator('button:has-text("View")').first();
  await viewMenu.click();
  await expect(page.locator('role=menuitem >> text="Photo Gallery"')).toBeVisible();

  // Click away
  await page.mouse.click(100, 100);

  // Verify "Help" is gone
  await expect(page.locator('button:has-text("Help")')).not.toBeVisible();

  // Verify Apple Menu cleanup
  const appleMenu = page.locator('header[role="menubar"] button').first();
  await appleMenu.click();

  const forbiddenItems = ["Log out", "Lock screen", "Sleep", "Restart", "Force quit", "Recent items"];
  for (const item of forbiddenItems) {
    await expect(page.locator('role=menuitem').filter({ hasText: new RegExp(item, 'i') })).not.toBeVisible();
  }

  await expect(page.locator('role=menuitem >> text="About This Mac"')).toBeVisible();
  await expect(page.locator('role=menuitem >> text="Shut Down..."')).toBeVisible();
});

test('verify dock stability and animations', async ({ page }) => {
  await page.goto('http://localhost:3000');

  const dock = page.locator('nav').filter({ has: page.locator('button') }).first();
  await expect(dock).toBeVisible();

  // Get initial height
  const box = await dock.boundingBox();
  const initialHeight = box?.height;
  console.log('Initial Dock height:', initialHeight);

  // Hover over various dock items
  const dockItems = dock.locator('button');
  const count = await dockItems.count();

  for (let i = 0; i < count; i++) {
    await dockItems.nth(i).hover();
    await page.waitForTimeout(100); // Wait for potential jump
    const currentBox = await dock.boundingBox();
    // Use a small epsilon for float comparison
    expect(currentBox?.height).toBeCloseTo(initialHeight || 0, 0);
  }
});
