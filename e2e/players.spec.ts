import { test, expect } from "@playwright/test";

const BASE = "";

test.beforeEach(async ({ page }) => {
  await page.goto(`${BASE}/players`);
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.waitForLoadState("networkidle");
});

test("shows empty state when no players", async ({ page }) => {
  await expect(page.getByText("Noch keine Spieler")).toBeVisible();
});

test("adds a player", async ({ page }) => {
  await page.getByTestId("player-name-input").fill("Max Mustermann");
  await page.getByTestId("player-number-input").fill("7");
  await page.getByTestId("player-submit-btn").click();

  await expect(page.getByText("Max Mustermann")).toBeVisible();
  await expect(page.getByText("7")).toBeVisible();
});

test("submit button disabled for empty name", async ({ page }) => {
  const btn = page.getByTestId("player-submit-btn");
  await expect(btn).toBeDisabled();
  await page.getByTestId("player-name-input").fill("Anna");
  await expect(btn).toBeEnabled();
});

test("edits a player", async ({ page }) => {
  await page.getByTestId("player-name-input").fill("Alter Name");
  await page.getByTestId("player-submit-btn").click();
  await expect(page.getByText("Alter Name")).toBeVisible();

  await page.getByRole("button", { name: /bearbeiten/i }).first().click();

  const nameInput = page.getByTestId("player-name-input").last();
  await nameInput.fill("Neuer Name");
  await page.getByTestId("player-submit-btn").last().click();

  await expect(page.getByText("Neuer Name")).toBeVisible();
  await expect(page.getByText("Alter Name")).not.toBeVisible();
});

test("deletes a player", async ({ page }) => {
  await page.getByTestId("player-name-input").fill("Zu Löschen");
  await page.getByTestId("player-submit-btn").click();
  await expect(page.getByText("Zu Löschen")).toBeVisible();

  await page.getByRole("button", { name: /löschen/i }).first().click();
  await expect(page.getByText("Zu Löschen")).not.toBeVisible();
});

test("navigates back to home", async ({ page }) => {
  await page.getByTestId("back-home").click();
  await expect(page).toHaveURL(`${BASE}`);
});
