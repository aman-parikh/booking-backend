const User = require("./models/user.model.js");
const { errorHandler } = require("../utils/error-handler");
const Error = require("../utils/error");
const register = errorHandler(async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(200).send("User has been created.");
  } catch (err) {
    throw new Error(error, 500, null);
  }
});

const login = errorHandler(async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect){
        throw new Error({"message": "Wrong Password"}, 400, null);
    }


    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    return res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    throw new Error(error, 500, null);
  }
});

module.exports = {
  register,
  login,
};
