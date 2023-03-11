import User from "../model/UserModel.js";
import argon2 from "argon2";
import { randomUUID } from "crypto";
import dotenv from "dotenv";

dotenv.config();

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    if (!users || users.length < 1)
      return res.status(404).json({ msg: "Belum Ada User" });
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(400).json({ error });
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
    return res.status(400).json({ msg: error });
  }
};
