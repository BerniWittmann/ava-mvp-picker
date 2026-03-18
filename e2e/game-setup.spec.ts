import { test, expect } from "@playwright/test";
import type { Player } from "../src/types";

const BASE = "";

const mockPlayers: Player[] = [
  { id: "p1", name: "Alice", number: "1" },
  { id: "p2", name: "Bob", number: "2" },
  { id: "p3", name: "Charlie", number: "3" },
];

test.beforeEach(async ({ page }) => {
  await page.goto(`${BASE}/game/setup`);
  await page.evaluate((players) => {
    localStorage.setItem("ava_players", JSON.stringify(players));
    localStorage.removeItem("ava_active_session");
  }, mockPlayers);
  await page.reload();
  await page.waitForLoadState("networkidle");
});

test("shows all players as attendance toggles", async ({ page }) => {
  await expect(page.getByText("Alice")).toBeVisible();
  await expect(page.getByText("Bob")).toBeVisible();
  await expect(page.getByText("Charlie")).toBeVisible();
});

test("start button disabled with fewer than 2 players selected", async ({ page }) => {
  const startBtn = page.getByTestId("start-voting-btn");
  await expect(startBtn).toBeDisabled();

  await page.getByTestId("attendance-toggle-p1").click();
  await expect(startBtn).toBeDisabled();

  await page.getByTestId("attendance-toggle-p2").click();
  await expect(startBtn).toBeEnabled();
});

test("shows selected count", async ({ page }) => {
  await expect(page.getByTestId("attendance-count")).toContainText("0 ausgewählt");
  await page.getByTestId("attendance-toggle-p1").click();
  await expect(page.getByTestId("attendance-count")).toContainText("1 ausgewählt");
  await page.getByTestId("attendance-toggle-p2").click();
  await expect(page.getByTestId("attendance-count")).toContainText("2 ausgewählt");
});

test("select all button selects all players", async ({ page }) => {
  await page.getByTestId("select-all-btn").click();
  await expect(page.getByTestId("attendance-count")).toContainText("3 ausgewählt");
});

test("deselecting a player updates count", async ({ page }) => {
  await page.getByTestId("select-all-btn").click();
  await expect(page.getByTestId("attendance-count")).toContainText("3 ausgewählt");
  await page.getByTestId("attendance-toggle-p1").click();
  await expect(page.getByTestId("attendance-count")).toContainText("2 ausgewählt");
});

test("navigates to vote page on start", async ({ page }) => {
  await page.getByTestId("attendance-toggle-p1").click();
  await page.getByTestId("attendance-toggle-p2").click();
  await page.getByTestId("start-voting-btn").click();
  await expect(page).toHaveURL(`${BASE}/game/vote`);
});
