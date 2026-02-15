
import { test, expect } from '@playwright/test';

test('app interactivity', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // 1. Open About Me
  await page.getByLabel('Open About Me').click();
  await expect(page.getByLabel('About Me', { exact: true }).getByText('John Doe')).toBeVisible();

  // 2. Click Experience
  await page.getByRole('button', { name: 'Experience' }).click();
  await expect(page.getByText('TechCorp')).toBeVisible();
  await page.screenshot({ path: 'screenshots/about_experience.png' });

  // 3. Click Skills
  await page.getByRole('button', { name: 'Skills' }).click();
  await expect(page.getByText('Expertise')).toBeVisible();
  await page.screenshot({ path: 'screenshots/about_skills.png' });

  // 4. Open Settings
  await page.getByLabel('Open Settings').click();
  await expect(page.getByRole('heading', { name: 'Appearance', level: 1 })).toBeVisible();

  // 5. Click Wi-Fi
  await page.getByRole('button', { name: 'Wi-Fi' }).click();
  await expect(page.getByText('Settings for Wi-Fi are coming soon')).toBeVisible();
  await page.screenshot({ path: 'screenshots/settings_wifi.png' });
});
