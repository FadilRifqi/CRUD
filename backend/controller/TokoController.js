import Toko from "../model/TokoModel.js";
import { randomUUID } from "crypto";
import User from "../model/UserModel.js";

export const getAllToko = async (req, res) => {
  try {
    const toko = await Toko.find().select(
      "uuid tokoname owner product rating location -_id"
    );

    res.status(200).json({ toko });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const getTokoById = async (req, res) => {
  try {
    const uuid = req.query.uuid;
    const toko = await Toko.findOne({ uuid: uuid });
    if (!toko) return res.status(404).json({ msg: "Shop Not Found" });
    res.status(200).json({ toko });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const getMyToko = async (req, res) => {
  try {
    const username = req.params.username;
    const myToko = await Toko.find({ "owner.name": username }).select(
      "-_id -__v"
    );

    if (!myToko) return res.status(404).json({ msg: "You Dont have Shop yet" });
    res.status(200).json({ myToko });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const createToko = async (req, res) => {
  try {
    const rand_uuid = randomUUID();
    const { tokoname, owner_name, owner_uuid, location } = req.body;
    const owner = await User.findOne({ username: owner_name }).select("_id");
    if (!owner)
      return res.status(403).json({ msg: "You must login to access" });
    const toko = await Toko.create({
      uuid: rand_uuid,
      tokoname: tokoname,
      owner: {
        name: owner_name,
        uuid: owner_uuid,
        _id: owner._id,
      },
      location: location || "",
    });
    res.status(200).json({ msg: "Toko created Successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteToko = async (req, res) => {
  try {
    const uuid = req.params.uuid;
    const toko = await Toko.findOne({ uuid: uuid });
    if (!toko) return res.status(404).json({ msg: "Shop Already Deleted" });
    const del = await Toko.deleteOne({ uuid: uuid });
    res.status(201).json({ msg: "Shop Deleted Successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
