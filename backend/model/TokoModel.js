import mongoose from "mongoose";
const ownerType = {
  name: String,
  uuid: String,
};

const TokoSchema = new mongoose.Schema({
  uuid: { type: String, required: [true, "cant be blank"] },
  tokoname: { type: String, required: [true, "cant be blank"] },
  owner: {
    type: ownerType,
    required: [true, "cant be blank"],
  },
  product: { type: Array, default: [{}] },
  rating: { type: Number, default: 0 },
  location: { type: String, default: "" },
});

const Toko = new mongoose.model("Toko", TokoSchema);

export default Toko;
