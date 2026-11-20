import express from "express";
import { photoUploadRouter } from "./modules/me/photo-upload.route.js";
import { authRouter } from "./modules/auth/auth.route.js";
import { notFound } from "./middleware/notFound.js";
import { meRouter } from "./modules/me/me.route.js";
import { accessRouter } from "./modules/access/access.route.js";
import { errorHandler } from "./middleware/errorHandler.js";

import { catalogRouter } from "./modules/catalog/catalog.route.js";

export const app = express();

app.use(photoUploadRouter);
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/me", meRouter);
app.use("/api", catalogRouter);
app.use("/api", accessRouter);
app.use(notFound);
app.use(errorHandler);
