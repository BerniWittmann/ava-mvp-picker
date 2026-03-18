import { test, expect } from "@playwright/test";
import type { Player, GameSession } from "../src/types";

const BASE = "";

const mockPlayers: Player[] = [
  { id: "p1", name: "Alice", number: "1" },
  { id: "p2", name: "Bob", number: "2" },
  { id: "p3", name: "Charlie", number: "3" },
];

// Alice wins with 2 votes
const completedSession: GameSession = {
  id: "sess1",
  date: new Date().toISOString(),
  presentPlayerIds: ["p1", "p2", "p3"],
  votes: [
    { voterId: "p1", candidateId: "p1" },
    { voterId: "p2", candidateId: "p1" },
    { voterId: "p3", candidateId: "p2" },
  ],
  status: "completed",
};

// Tie: Alice and Bob each get 1 vote
const tieSession: GameSession = {
  id: "sess2",
  date: new Date().toISOString(),
  presentPlayerIds: ["p1", "p2"],
  votes: [
    { voterId: "p1", candidateId: "p2" },
    { voterId: "p2", candidateId: "p1" },
  ],
  status: "completed",
};

test.beforeEach(async ({ page }) => {
  await page.goto(`${BASE}/game/results`);
  await page.evaluate(
    ({ players, session }) => {
      localStorage.setItem("ava_players", JSON.stringify(players));
      localStorage.setItem("ava_active_session", JSON.stringify(session));
    },
    { players: mockPlayers, session: completedSession }
  );
  await page.reload();
  await page.waitForLoadState("networkidle");
});

test("redirects to home if no completed session", async ({ page }) => {
  await page.evaluate(() => localStorage.removeItem("ava_active_session"));
  await page.reload();
  await page.waitForLoadState("networkidle");
  await expect(page).toHaveURL(`${BASE}`);
});

test("shows winner banner with winner name", async ({ page }) => {
  await expect(page.getByTestId("winner-banner")).toBeVisible();
  await expect(page.getByTestId("winner-banner")).toContainText("Alice");
});

test("shows all result cards", async ({ page }) => {
  await expect(page.getByTestId("result-card-p1")).toBeVisible();
  await expect(page.getByTestId("result-card-p2")).toBeVisible();
  await expect(page.getByTestId("result-card-p3")).toBeVisible();
});

test("shows correct vote counts", async ({ page }) => {
  const aliceCard = page.getByTestId("result-card-p1");
  await expect(aliceCard).toContainText("2");

  const bobCard = page.getByTestId("result-card-p2");
  await expect(bobCard).toContainText("1");
});

test("new game button clears session and goes to home", async ({ page }) => {
  await page.getByTestId("new-game-btn").click();
  await expect(page).toHaveURL(`${BASE}`);

  const session = await page.evaluate(() =>
    localStorage.getItem("ava_active_session")
  );
  expect(session).toBe("null");
});

test("back to home button keeps session", async ({ page }) => {
  await page.getByTestId("back-home-btn").click();
  await expect(page).toHaveURL(`${BASE}`);

  const session = await page.evaluate(() =>
    localStorage.getItem("ava_active_session")
  );
  expect(session).not.toBe("null");
});

test("tie scenario shows both winners", async ({ page }) => {
  await page.evaluate(
    ({ session }) => {
      localStorage.setItem("ava_active_session", JSON.stringify(session));
    },
    { session: tieSession }
  );
  await page.reload();
  await page.waitForLoadState("networkidle");

  await expect(page.getByTestId("winner-banner")).toContainText("Unentschieden");
  await expect(page.getByTestId("winner-banner")).toContainText("Alice");
  await expect(page.getByTestId("winner-banner")).toContainText("Bob");
});
