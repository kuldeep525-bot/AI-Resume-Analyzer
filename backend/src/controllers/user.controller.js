import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill the all the value" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ message: "email already exit", success: false });
    }

    const Hashpassword = await bcrypt.hash(password, 10);

    const userData = await User.create({
      name: name,
      email: email,
      password: Hashpassword,
    });

    return res.status(201).json({
      message: "User created Successfully",
      success: true,
      userData: {
        id: userData._id,
        name: userData.name,
        email: userData.email,
      },
    });
  } catch (error) {
    console.log("error", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill the all the field" });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid Credentials", success: false });
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
      return res
        .status(401)
        .json({ message: "Invalid Credentials", success: false });
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1d" },
    );

    const cookieOption = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: false,
      secure: false,
      sameSite: "lax",
    };

    res.cookie("jwt", token, cookieOption);

    return res.status(200).json({
      message: "User login Successfully",
      success: true,
      userData: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token: token,
    });
  } catch (error) {
    console.log("error", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Kindly login first", success: false });
    }
    res.clearCookie("jwt");
    return res
      .status(200)
      .json({ message: "User logout Successfully", success: true });
  } catch (error) {
    console.log("error", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
