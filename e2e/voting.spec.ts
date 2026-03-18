import { test, expect } from "@playwright/test";
import type { Player, GameSession } from "../src/types";

const BASE = "";

const mockPlayers: Player[] = [
  { id: "p1", name: "Alice", number: "1" },
  { id: "p2", name: "Bob", number: "2" },
  { id: "p3", name: "Charlie", number: "3" },
];

const mockSession: GameSession = {
  id: "sess1",
  date: new Date().toISOString(),
  presentPlayerIds: ["p1", "p2", "p3"],
  votes: [],
  status: "voting",
};

test.beforeEach(async ({ page }) => {
  await page.goto(`${BASE}/game/vote`);
  await page.evaluate(
    ({ players, session }) => {
      localStorage.setItem("ava_players", JSON.stringify(players));
      localStorage.setItem("ava_active_session", JSON.stringify(session));
    },
    { players: mockPlayers, session: mockSession }
  );
  await page.reload();
  await page.waitForLoadState("networkidle");
});

test("redirects to home if no session", async ({ page }) => {
  await page.evaluate(() => localStorage.removeItem("ava_active_session"));
  await page.reload();
  await page.waitForLoadState("networkidle");
  await expect(page).toHaveURL(`${BASE}`);
});

test("shows first voter's ballot", async ({ page }) => {
  await expect(page.getByTestId("voting-ballot")).toBeVisible();
  await expect(page.getByText("Alice")).toBeVisible();
});

test("shows candidates excluding current voter", async ({ page }) => {
  await expect(page.getByTestId("vote-btn-p2")).toBeVisible();
  await expect(page.getByTestId("vote-btn-p3")).toBeVisible();
  await expect(page.getByTestId("vote-btn-p1")).not.toBeVisible();
});

test("shows handoff screen after voting", async ({ page }) => {
  await page.getByTestId("vote-btn-p2").click();
  await expect(page.getByTestId("handoff-screen")).toBeVisible();
});

test("shows next voter on handoff screen", async ({ page }) => {
  await page.getByTestId("vote-btn-p2").click();
  await expect(page.getByTestId("handoff-screen")).toContainText("Bob");
});

test("shows ballot again after handoff ready", async ({ page }) => {
  await page.getByTestId("vote-btn-p2").click();
  await page.getByTestId("handoff-ready-btn").click();
  await expect(page.getByTestId("voting-ballot")).toBeVisible();
});

test("shows progress bar with correct counts", async ({ page }) => {
  await expect(page.getByTestId("progress-bar")).toContainText("0 von 3");
  await page.getByTestId("vote-btn-p2").click();
  await page.getByTestId("handoff-ready-btn").click();
  await expect(page.getByTestId("progress-bar")).toContainText("1 von 3");
});

test("full voting flow redirects to results", async ({ page }) => {
  // Alice votes for Bob
  await page.getByTestId("vote-btn-p2").click();
  await page.getByTestId("handoff-ready-btn").click();

  // Bob votes for Alice
  await page.getByTestId("vote-btn-p1").click();
  await page.getByTestId("handoff-ready-btn").click();

  // Charlie votes for Alice
  await page.getByTestId("vote-btn-p1").click();

  await expect(page).toHaveURL(`${BASE}/game/results`);
});
