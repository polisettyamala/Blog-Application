import express from "express";
import { login, registerUser } from "../controllers/auth.controller.js";

const route = express.Router();
// http://localhost:8000/registeruser
route.post("/registeruser", registerUser);
route.post("/login", login);

export default route;
