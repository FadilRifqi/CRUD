import express from "express";
import {
  createUser,
  getAllUser,
  editUser,
  getUser,
  deleteUser,
} from "../controller/UserController.js";
const router = express.Router();

router.get("/user", getAllUser);
router.get("/user/:uuid", getUser);
router.post("/user", createUser);
router.patch("/user/:uuid", editUser);
router.delete("/user/:uuid", deleteUser);

export default router;
