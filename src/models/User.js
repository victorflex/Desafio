const mongoose = require("../database");
const bcrypt = require("bcryptjs");

const UserController = new mongoose.Schema({
  nome: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
    select: false,
  },
  cargo: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserController.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  next();
});
const User = mongoose.model("User", UserController);

module.exports = User;
