import { test, expect } from '@playwright/test';

test.describe('Desktop Icon Selection', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('should select an icon on click', async ({ page }) => {
    const icon = page.getByTestId('icon-about');
    await icon.click();

    // Check if it has the selection class (bg-white/30)
    await expect(icon).toHaveClass(/bg-white\/30/);
  });

  test('should deselect when clicking on the desktop background', async ({ page }) => {
    const icon = page.getByTestId('icon-about');
    await icon.click();
    await expect(icon).toHaveClass(/bg-white\/30/);

    // Click on the desktop background (using coordinates to avoid other elements)
    await page.mouse.click(10, 100);

    await expect(icon).not.toHaveClass(/bg-white\/30/);
  });

  test('should change selection when clicking another icon', async ({ page }) => {
    const iconAbout = page.getByTestId('icon-about');
    const iconProjects = page.getByTestId('icon-projects');

    await iconAbout.click();
    await expect(iconAbout).toHaveClass(/bg-white\/30/);
    await expect(iconProjects).not.toHaveClass(/bg-white\/30/);

    await iconProjects.click();
    await expect(iconAbout).not.toHaveClass(/bg-white\/30/);
    await expect(iconProjects).toHaveClass(/bg-white\/30/);
  });
});
