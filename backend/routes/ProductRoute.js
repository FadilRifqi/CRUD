import express from "express";
import {
  createProduct,
  deleteProduct,
  getMyProduct,
  getProduct,
} from "../controller/ProductController.js";
import { auth } from "../middleware/Auth.js";
import { TokoAuth } from "../middleware/TokoAuth.js";

const router = express.Router();

router.get("/product", getProduct);
router.get("product/:uuid", getMyProduct);
router.post("/product", auth, TokoAuth, createProduct);
router.delete("/product/:uuid", auth, TokoAuth, deleteProduct);

export default router;
