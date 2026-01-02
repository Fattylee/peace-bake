import crypto from "crypto";

export interface TokenPayload {
  username: string;
  role: string;
  iat: number;
  exp: number;
}

export function validateToken(token: string): TokenPayload | null {
  try {
    // Split token into payload and signature
    const parts = token.split(".");
    if (parts.length !== 2) return null;

    const [payload, signature] = parts;

    // Verify signature
    const secret =
      process.env.AUTH_SECRET || "peace-bake-secret-key-change-in-production";
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(payload)
      .digest("base64");

    if (signature !== expectedSignature) {
      return null;
    }

    // Decode payload
    const decoded = JSON.parse(
      Buffer.from(payload, "base64").toString("utf-8")
    ) as TokenPayload;

    // Check expiration
    if (decoded.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return decoded;
  } catch {
    return null;
  }
}

export function getTokenFromHeader(authHeader: string | null): string | null {
  if (!authHeader) return null;
  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") return null;
  return parts[1];
}
