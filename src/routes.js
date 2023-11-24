/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import { Router } from "express";
import multer from "multer";
import multerConfig from "./config/multer";

import users from "./app/controllers/UsersController";
import sessions from "./app/controllers/SessionController";
import files from "./app/controllers/FileController";

// import auth from "./app/middleware/auth";

const routes = new Router();
const upload = multer(multerConfig);

routes.post("/users", users.create);
routes.get("/users/:id", users.show);

// Session
routes.post("/sessions", sessions.create);

// Controla o acesso desse ponto

// User

routes.put("/users/:id", users.update);

// File
routes.post("/files", upload.single("file"), files.create);

// routes.use(auth);

export default routes;
