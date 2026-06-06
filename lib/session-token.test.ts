import { describe, expect, it } from "vitest";
import {
  createSessionToken,
  verifySessionToken,
} from "@/lib/session-token";

const secret = "a-test-secret-that-is-at-least-thirty-two-characters";
const now = Date.UTC(2026, 5, 6);

describe("signed sessions", () => {
  it("accepts a valid unexpired session with the correct role", () => {
    const token = createSessionToken("participant", 60, secret, now);
    expect(verifySessionToken(token, "participant", secret, now + 30_000)).toBe(
      true,
    );
    expect(verifySessionToken(token, "admin", secret, now)).toBe(false);
  });

  it("rejects expired and modified sessions", () => {
    const token = createSessionToken("admin", 60, secret, now);
    expect(verifySessionToken(token, "admin", secret, now + 61_000)).toBe(false);
    expect(
      verifySessionToken(`${token.slice(0, -1)}x`, "admin", secret, now),
    ).toBe(false);
  });
});
