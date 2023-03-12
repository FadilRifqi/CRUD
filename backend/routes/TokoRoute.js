import express from "express";
import {
  createToko,
  deleteToko,
  getAllToko,
  getMyToko,
  getTokoById,
} from "../controller/TokoController.js";

const router = express.Router();

router.get("/toko/all", getAllToko);
router.get("/toko", getTokoById);
router.get("/toko/:username", getMyToko);
router.post("/toko", createToko);
router.delete("/toko/:uuid", deleteToko);

export default router;
