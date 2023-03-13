import Toko from "../model/TokoModel.js";
import User from "../model/UserModel.js";

export const TokoAuth = async (req, res, next) => {
  try {
    const user = await User.findOne({ uuid: req.session.uuid });

    const toko = Toko.findOne({ "owner.name": user.username });

    if (!toko)
      return res
        .status(404)
        .json({ msg: "You must Have a Shop to Post Product" });

    next();
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
