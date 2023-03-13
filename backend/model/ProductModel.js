import mongoose from "mongoose";
import { OwnerType } from "../interface/Owner.js";
import { randomUUID } from "crypto";

const ProductSchema = new mongoose.Schema({
  uuid: {
    type: String,
    default: randomUUID(),
  },
  name: { type: String, required: [true, "cant be blank"] },
  img: { type: String, required: [true, "cant be blank"] },
  description: { type: String, required: [true, "cant be blank"] },
  category: { type: String, required: [true, "cant be blank"] },
  creator: { type: OwnerType, required: [true, "cant be blank"] },
  property: { type: Object, default: {} },
});

const Product = mongoose.model("Product", ProductSchema);

export default Product;
