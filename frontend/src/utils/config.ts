export const ENDPOINT =
  process.env.NODE_ENV === "production"
    ? "https://api.sentik.xyz"
    : "http://localhost:8080";
