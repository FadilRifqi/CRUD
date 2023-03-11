import mongoose from "mongoose";
import validator from "validator";

const UserSchema = new mongoose.Schema(
  {
    uuid: { type: String },
    username: {
      type: String,
      required: [true, "cant be blank"],
    },
    email: {
      type: String,
      required: [true, `Can't be blank`],
      lowercase: true,
      unique: true,
      validate: [validator.isEmail, "invalid email"],
    },
    password: {
      type: String,
      required: [true, "cant be blank"],
    },
    img: { type: String, required: false },
  },
  { minimize: false }
);

const User = mongoose.model("User", UserSchema);

export default User;
