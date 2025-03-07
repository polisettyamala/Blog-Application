import User from "../models/User.model.js";
import bcryt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res, next) => {
  const { name, email, password, phone, role } = req.body;
  try {
    let user = await User.findOne({ email: email });
    // let userName = await User.findOne({ username: userName });

    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "user already exists" });
    }

    // Password encryption
    const salt = await bcryt.genSalt(10);
    const encryptedPassword = await bcryt.hash(password, salt);

    user = new User({
      name,
      email,
      password: encryptedPassword,
      phone,
      role,
    });

    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "User register successfull" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// crypto.randomBytes(256).toString('hex');
const createToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role, name: user.name },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "1d",
    }
  );
};

export const login = async (req, res, next) => {
  const { email } = req.body;

  try {
    let user = await User.findOne({ email: email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid email" });
    }

    const isPasswordMatch = await bcryt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Wrong password...!" });
    }

    const token = createToken(user);

    const { password, role, ...rest } = user._doc;

    return res
      .status(200)
      .json({
        success: true,
        message: "Login success",
        token,
        data: { ...rest },
        role,
      });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
