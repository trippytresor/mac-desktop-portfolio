import { test, expect } from '@playwright/test';

test.describe('Window Clamping', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('should not allow dragging window above menu bar', async ({ page }) => {
    const windowTitle = page.getByText('Showreel 2026').first();
    const windowHandle = page.locator('[data-window-id="showreel"]');

    // Get initial position
    const box = await windowHandle.boundingBox();
    if (!box) throw new Error('Could not find window');

    // Drag to top
    await windowTitle.hover();
    await page.mouse.down();
    await page.mouse.move(box.x + box.width / 2, -100); // Try to drag way above
    await page.mouse.up();

    const newBox = await windowHandle.boundingBox();
    if (!newBox) throw new Error('Could not find window after drag');

    expect(newBox.y).toBeGreaterThanOrEqual(28);
  });

  test('should not allow dragging window completely off-screen (sides)', async ({ page }) => {
    const windowTitle = page.getByText('Showreel 2026').first();
    const windowHandle = page.locator('[data-window-id="showreel"]');

    const viewport = page.viewportSize();
    if (!viewport) throw new Error('No viewport');

    const box = await windowHandle.boundingBox();
    if (!box) throw new Error('Could not find window');

    // Drag to the far right
    await windowTitle.hover();
    await page.mouse.down();
    await page.mouse.move(viewport.width + 500, box.y + 10);
    await page.mouse.up();

    const newBoxRight = await windowHandle.boundingBox();
    expect(newBoxRight!.x).toBeLessThanOrEqual(viewport.width - 40);

    // Drag to the far left
    await windowTitle.hover();
    await page.mouse.down();
    await page.mouse.move(-box.width - 100, box.y + 10);
    await page.mouse.up();

    const newBoxLeft = await windowHandle.boundingBox();
    expect(newBoxLeft!.x).toBeGreaterThanOrEqual(-box.width + 40);
  });
});
