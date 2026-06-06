import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

export type SessionRole = "participant" | "admin";

type SessionPayload = {
  role: SessionRole;
  exp: number;
  nonce: string;
};

function sign(body: string, secret: string) {
  return createHmac("sha256", secret).update(body).digest("base64url");
}

export function createSessionToken(
  role: SessionRole,
  maxAge: number,
  secret: string,
  now = Date.now(),
) {
  const payload: SessionPayload = {
    role,
    exp: Math.floor(now / 1000) + maxAge,
    nonce: randomBytes(8).toString("hex"),
  };
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${body}.${sign(body, secret)}`;
}

export function verifySessionToken(
  value: string | undefined,
  role: SessionRole,
  secret: string,
  now = Date.now(),
) {
  if (!value) return false;
  const [body, signature] = value.split(".");
  if (!body || !signature) return false;

  const actual = Buffer.from(signature);
  const expected = Buffer.from(sign(body, secret));
  if (
    actual.length !== expected.length ||
    !timingSafeEqual(actual, expected)
  ) {
    return false;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(body, "base64url").toString("utf8"),
    ) as SessionPayload;
    return (
      payload.role === role && payload.exp > Math.floor(now / 1000)
    );
  } catch {
    return false;
  }
}
