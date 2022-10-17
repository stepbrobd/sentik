export const ENDPOINT =
  process.env.VERCEL_ENV === "production"
    ? "https://api.sentik.xyz"
    : "http://localhost:8080";
