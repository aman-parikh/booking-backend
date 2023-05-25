const { errorHandler } = require("../utils/error-handler");
const Error = require("../utils/error");
const User = require("../models/user.model.js");

const updateUser = errorHandler(async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    return res.status(200).json(updatedUser);
  } catch (err) {
    throw new Error(err, 500, null);
  }
});
const deleteUser = errorHandler(async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json("User has been deleted.");
  } catch (err) {
    throw new Error(err, 500, null);
  }
});
const getUser = errorHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    return res.status(200).json(user);
  } catch (err) {
    throw new Error(err, 500, null);
  }
});
const getUsers = errorHandler(async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (err) {
    throw new Error(err, 500, null);
  }
});

module.exports = {
    updateUser,
    deleteUser,
    getUser,
    getUsers
}
