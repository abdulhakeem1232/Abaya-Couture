import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "abaya-couture-secret-key-change-me");

export async function signToken(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(secret);
}

export async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}

export function validateCredentials(username, password) {
  const adminUser = process.env.ADMIN_USERNAME ;
  const adminPass = process.env.ADMIN_PASSWORD ;
  return username === adminUser && password === adminPass;
}
