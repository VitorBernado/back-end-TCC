/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import { Router } from "express";
import multer from "multer";
import multerConfig from "./config/multer";

import users from "./app/controllers/UsersController";
import sessions from "./app/controllers/SessionController";
import files from "./app/controllers/FileController";

import auth from "./app/middleware/auth";

const routes = new Router();
const upload = multer(multerConfig);

routes.post("/users", users.create);

// Session
routes.post("/sessions", sessions.create);

// Controla o acesso desse ponto
routes.use(auth);

// User
routes.put("/users/:id", users.update);

// File
routes.post("/files", upload.single("file"), files.create);

export default routes;
