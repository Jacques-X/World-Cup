import "server-only";
import { cookies } from "next/headers";
import {
  createSessionToken,
  verifySessionToken,
} from "@/lib/session-token";
import { env } from "@/lib/server/env";

export const ADMIN_COOKIE = "wc26_admin";
const ADMIN_MAX_AGE = 60 * 60 * 12;

export async function sessionState() {
  const store = await cookies();
  const admin = verifySessionToken(
    store.get(ADMIN_COOKIE)?.value,
    "admin",
    env().SESSION_SECRET,
  );
  return { admin };
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
