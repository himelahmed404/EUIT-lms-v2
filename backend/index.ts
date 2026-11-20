/*
 * What Vercel runs. Its Express builder takes the first of app, index and server, here and then in src/, that
 * imports express.
 */
import type { Express } from "express";
import { app } from "./src/app.js";

export default app as Express;
