import express from "express";
import { getMe, login, logout } from "../controller/AuthController.js";

const router = express.Router();

router.get("/me", getMe);
router.post("/login", login);
router.delete("/logout", logout);

export default router;
