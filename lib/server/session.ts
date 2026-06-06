import "server-only";
import { timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import {
  createSessionToken,
  verifySessionToken,
} from "@/lib/session-token";
import { env } from "@/lib/server/env";

export const ACCESS_COOKIE = "wc26_access";
export const ADMIN_COOKIE = "wc26_admin";
const ACCESS_MAX_AGE = 60 * 60 * 24 * 30;
const ADMIN_MAX_AGE = 60 * 60 * 12;

export async function sessionState() {
  const store = await cookies();
  const participant = verifySessionToken(
    store.get(ACCESS_COOKIE)?.value,
    "participant",
    env().SESSION_SECRET,
  );
  const admin = verifySessionToken(
    store.get(ADMIN_COOKIE)?.value,
    "admin",
    env().SESSION_SECRET,
  );
  return { participant: participant || admin, admin };
}

export async function setParticipantSession() {
  const store = await cookies();
  store.set(
    ACCESS_COOKIE,
    createSessionToken("participant", ACCESS_MAX_AGE, env().SESSION_SECRET),
    {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ACCESS_MAX_AGE,
    },
  );
}

export async function setAdminSession() {
  const store = await cookies();
  store.set(
    ADMIN_COOKIE,
    createSessionToken("admin", ADMIN_MAX_AGE, env().SESSION_SECRET),
    {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ADMIN_MAX_AGE,
    },
  );
}

export async function clearAdminSession() {
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
}

export function safeTokenEqual(received: string, expected: string) {
  const receivedBuffer = Buffer.from(received);
  const expectedBuffer = Buffer.from(expected);
  return (
    receivedBuffer.length === expectedBuffer.length &&
    timingSafeEqual(receivedBuffer, expectedBuffer)
  );
}
