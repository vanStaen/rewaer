import cookieSession from "cookie-session";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: __dirname + "/./../../.env" });

export default cookieSession({
  name: "session",
  keys: [
    process.env.COOKIE_KEY_1,
    process.env.COOKIE_KEY_2,
    process.env.COOKIE_KEY_3,
  ],
  cookie: {
    secure: true, // true for https only
    maxAge: 604800000, // 7day x 24h x 60min x 60sec x 1000ms
  },
});
