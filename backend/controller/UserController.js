import User from "../model/UserModel.js";
import argon2 from "argon2";
import { randomUUID } from "crypto";

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find().select("uuid username img ");
    if (!users || users.length < 1)
      return res.status(404).json({ msg: "Belum Ada User" });
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const uuid = req.params.uuid;
    const user = await User.findOne({ uuid: uuid }).select(
      "uuid username img -_id"
    );
    if (!user) return res.status(404).json({ msg: "User not found" });
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const { username, password, email, img } = req.body;
    if (!username) return res.status(400).json({ msg: "bad request" });

    const isUser = await User.findOne({ username: username });
    if (isUser) return res.status(400).json({ msg: "Username tidak tersedia" });

    const isEmail = await User.findOne({ email: email });
    if (isEmail) return res.status(400).json({ msg: "Email sudah terdaftar" });

    const hashpass = await argon2.hash(password);

    const user = await User.create({
      uuid: randomUUID(),
      username: username,
      password: hashpass,
      email: email,
      img: img,
    });

    return res.status(200).json({ msg: "Berhasil Mendaftar" });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

export const editUser = async (req, res) => {
  try {
    const uuid = req.params.uuid;
    const { newUsername, newImg } = req.body;
    const user = await User.findOne({ uuid: uuid });
    if (!user) return res.status(404).json({ msg: "Something Went Wrong" });
    console.log(user.uuid);

    const curUser = await User.findOne({ uuid: req.session.uuid });
    if (!curUser)
      return res.status(403).json({ msg: "You Must Login to Access" });

    if (user.uuid !== curUser.uuid)
      return res.status(403).json({ msg: "Access Denied" });

    const updateUser = await User.updateOne(
      { uuid: uuid },
      {
        username: newUsername || user.username,
        img: newImg || user.img,
      }
    );

    return res.status(201).json({ msg: "Change Success" });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const uuid = req.params.uuid;
    const curUser = await User.findOne({ uuid: uuid });
    if (!curUser) return res.status(404).json({ msg: "User already Deleted" });

    const { confirm } = req.body;
    if (confirm === false || confirm === "false")
      return res.status(400).json({ msg: "Cancel Delete" });
    const user = await User.deleteOne({ uuid: uuid });
    res.status(201).json({ msg: "User Deleted" });
  } catch (error) {
    if (!confirm) return res.status(400).json({ msg: error.message });
  }
};
