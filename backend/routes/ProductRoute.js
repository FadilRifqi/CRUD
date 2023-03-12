import express from "express";
import {
  createProduct,
  deleteProduct,
  getMyProduct,
  getProduct,
} from "../controller/ProductController.js";

const router = express.Router();

router.get("/product", getProduct);
router.get("product/:uuid", getMyProduct);
router.post("/product", createProduct);
router.delete("/product/:uuid", deleteProduct);

export default router;
