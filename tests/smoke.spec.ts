import { test, expect } from "@playwright/test";

test.describe("Smoke tests", () => {
  test("homepage loads with title and main sections", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/AHOGNI/);
    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
    await expect(page.locator("#apropos")).toBeAttached();
    await expect(page.locator("#competences")).toBeAttached();
  });

  test("dark mode toggle works", async ({ page }) => {
    await page.goto("/");
    const toggle = page.locator("#themeToggle");
    await toggle.click();
    const theme = await page.evaluate(() => document.documentElement.getAttribute("data-theme"));
    expect(theme).toBe("dark");
    await toggle.click();
    const theme2 = await page.evaluate(() => document.documentElement.getAttribute("data-theme"));
    expect(theme2).toBe("light");
  });

  test("search modal opens with Ctrl+K", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Control+k");
    const overlay = page.locator("#searchOverlay");
    await expect(overlay).toHaveAttribute("aria-hidden", "false");
    await expect(page.locator("#searchInput")).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(overlay).toHaveAttribute("aria-hidden", "true");
  });

  test("publications page loads", async ({ page }) => {
    await page.goto("/publications");
    await expect(page.locator("h1")).toContainText("Publication");
  });

  test("blog page loads", async ({ page }) => {
    await page.goto("/blog");
    await expect(page.locator("h1")).toContainText("Blog");
  });

  test("contact page loads", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.locator("h1")).toContainText("Contact");
  });

  test("speaking page loads", async ({ page }) => {
    await page.goto("/speaking");
    await expect(page.locator("h1")).toContainText("Conférences");
  });

  test("navigation links work", async ({ page }) => {
    await page.goto("/");
    await page.click('a[href="/publications"]');
    await expect(page).toHaveURL(/publications/);
    await page.click('a[href="/blog"]');
    await expect(page).toHaveURL(/blog/);
    await page.click('a[href="/contact"]');
    await expect(page).toHaveURL(/contact/);
  });

  test("RSS feed is accessible", async ({ page }) => {
    const res = await page.request.get("/rss.xml");
    expect(res.status()).toBe(200);
    const ct = res.headers()["content-type"] || "";
    expect(ct).toContain("xml");
  });

  test("manifest.json is accessible", async ({ page }) => {
    const res = await page.request.get("/manifest.json");
    expect(res.status()).toBe(200);
    const json = await res.json();
    expect(json.name).toContain("AHOGNI");
  });

  test("404 page works", async ({ page }) => {
    const res = await page.request.get("/nonexistent-page");
    expect(res.status()).toBe(404);
  });
});
