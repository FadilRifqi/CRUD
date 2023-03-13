export const auth = async (req, res, next) => {
  try {
    if (!req.session.uuid)
      return res.status(400).json({ msg: "You Must Login to Access" });
    next();
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
