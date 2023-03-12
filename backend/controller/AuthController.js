import User from "../model/UserModel.js";
import argon2 from "argon2";

export const getMe = async (req, res) => {
  try {
    if (!req.session.uuid) {
      return res.status(401).json({ msg: "You Must Login to Access" });
    }
    const user = await User.findOne({ uuid: req.session.uuid }).select(
      "uuid username img -_id"
    );
    if (!user) return res.status(404).json({ msg: "Something Went Wrong" });

    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const login = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username) return res.status(400).json({ msg: "Fill Username or email" });
  if (!email) return res.status(400).json({ msg: "Fill Username or email" });
  if (!password) return res.status(400).json({ msg: "Fill password option" });

  const user = await User.findOne({
    $or: [{ username: username }, { email: email }],
  });

  const verPass = argon2.verify(user.password, password);
  if (!verPass) return res.status(403).json({ msg: "Wrong Password" });

  req.session.uuid = user.uuid;

  return res.status(200).json({
    user: { uuid: user.uuid, username: user.username, img: user.img },
  });
};

export const logout = async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) return res.status(400).json({ msg: err });
    });

    res.status(200).json({ msg: "Logout Success" });
  } catch (error) {}
};
