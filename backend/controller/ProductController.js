import Product from "../model/ProductModel.js";
import User from "../model/UserModel.js";

export const createProduct = async (req, res) => {
  try {
    const { name, img, category, owner_name, stock, description } = req.body;
    const owner_uuid = req.session.uuid;
    const user = await User.findOne({ uuid: owner_uuid }).select("_id");
    if (!user) return res.status(403).json({ msg: "You must Login to Access" });
    const product = await Product.create({
      name: name,
      img: img,
      category: category,
      description: description,
      "owner.name": owner_name,
      "owner.uuid": owner_uuid,
      "owner._id": user._id,
      "property.stock": stock,
    });
    res.status(201).json({ msg: "Product Created Successfuly" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const getProduct = async (req, res) => {
  if (req.query.uuid) {
    try {
      const uuid = req.query.uuid;
      const product = await Product.findOne({ uuid: uuid }).select("-_id -__v");
      if (!product) return res.status(404).json({ msg: "Product Not Found" });
      res.status(200).json({ product });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  } else {
    try {
      const products = await Product.find().select("-_id -__v");
      if (!products || products.length < 1)
        return res.status(404).json({ msg: "No Product Available" });
      res.status(200).json(products);
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  }
};

export const getMyProduct = async (req, res) => {
  try {
    const uuid = req.params.id;
    const products = await Product.find({ "owner.uuid": uuid });
    if (!products)
      return res.status(404).json({ msg: "You Dont Have Product yet" });
    res.status(200).json({ products });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const uuid = req.params.uuid;
    const product = await Product.findOne({ uuid: uuid });
    if (!product)
      return res.status(404).json({ msg: "Product Already Deleted" });

    await Product.deleteOne({ uuid: uuid });
    res.status(201).json({ msg: "Product deleted Successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
