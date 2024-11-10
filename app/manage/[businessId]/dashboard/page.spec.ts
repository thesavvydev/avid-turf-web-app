import { test, expect } from "@playwright/test";

test("has access to dashboard", async ({ page }) => {
  await page.goto("/");
  await page.getByPlaceholder("Email").fill("lbase@example.com");
  await page.getByPlaceholder("Password").fill("Testing1");
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.waitForURL(/manage/);
  await page.waitForURL(
    "http://localhost:3000/manage/a9d3edf9-4ef7-4dc3-9943-938d10f357be/location/1",
  );
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Dashboard");
  await expect(
    page.getByText("Get a summary of whats going on in the business."),
  ).toBeVisible();
});
