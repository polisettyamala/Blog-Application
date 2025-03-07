import express from "express";
import { authenticate, restrict } from "../auth/verifyToken.js";
import { getAllUsers } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/getallusers", authenticate, restrict(["admin"]), getAllUsers);

export default router;
