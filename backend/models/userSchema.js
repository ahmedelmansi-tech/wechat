import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      minlength: 3,
    },
    confirm_password: {
      type: String,
      require: true,
      minlength: 3,
    },
  },
  { timestamps: true },
);
const User = mongoose.model("User", UserSchema);
export default User;
