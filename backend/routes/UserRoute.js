import express from "express";
import { createUser, getAllUser } from "../controller/UserController.js";
const router = express.Router();

router.get("/user", getAllUser);
router.post("/user", createUser);

export default router;
