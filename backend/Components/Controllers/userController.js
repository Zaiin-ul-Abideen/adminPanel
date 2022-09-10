// const Admins = require("../Models/adminModel");
const Users = require("../Models/userModel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const decodeToken = (token) => {
  var decode = jwt.verify(token, process.env.Secret);
  return { id: decode._id, role: decode.role };
};

const createToken = (_id, role) => {
  return jwt.sign({ _id, role }, process.env.Secret);
};

// login User
const login = async (req, res) => {
  if (req.cookies.jwt_token) {
    return res.status(400).json("User already logged in");
  }

  const { userEmail, userPassword } = req.body;
  try {
    const user = await Users.findOne({ userEmail });

    let credentialsMatch = await bcrypt.compare(
      userPassword,
      user.userPassword
    );

    if (credentialsMatch) {
      const token = createToken(user._id, "user");
      res.cookie("jwt_token", token, {
        httpOnly: true,
        maxAge: 11000 * 24,
      });

      res.status(200).json({ userEmail, token });
    } else {
      res.status(404).json("Credentials not matched");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//  Logout
const logout = (req, res) => {
  if (req.cookies.jwt_token) {
    try {
      res.clearCookie("jwt_token");
      res.status(200).json("User logged out");
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(400).json("No session to logout!");
  }
};

// Get Current User

const getCurrentUser = async (req, res) => {
  const jwt_token = req.cookies.jwt_token;
  if (jwt_token != undefined) {
    const decoded = decodeToken(jwt_token);

    if (!mongoose.Types.ObjectId.isValid(decoded.id)) {
      return res.status(404).json({ error: "No such user" });
    }

    const user = await Users.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ error: user });
    }
    res.status(200).json(user);
  } else {
    return res.status(404).json("You are not logged in!");
  }
};

//  Signup a New User

const signupUser = async (req, res) => {
  let {
    userName,
    userEmail,
    userPassword,
    userConfirmPassword,
    userHeight,
    userWeight,
    userAge,
  } = req.body;

  if (userPassword.length < 6)
    return res.status(400).json("too short password");
  if (userPassword !== userConfirmPassword)
    return res.status(400).json("Oops! passwords not matched");
  const salt = await bcrypt.genSalt();
  userPassword = await bcrypt.hash(userPassword, salt);

  const user = await Users.create({
    userName,
    userEmail,
    userPassword,
    userHeight,
    userWeight,
    userAge,
    // userConfirmPassword,
  });

  try {
    const token = createToken(user._id, "user");
    res.cookie("jwt_token", token, {
      httpOnly: true,
      maxAge: 11000 * 24,
    });

    res.status(201).json({ user: user._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//  Delete a User by ID
const deleteUser = async (req, res) => {
  const jwt_token = req.cookies.jwt_token;
  if (jwt_token === undefined)
    return res.status(400).json("Please Login first!");

  const decoded = decodeToken(jwt_token);

  if (decoded.role === "admin" || decoded.role === "user") {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such user" });
    }

    const userDelete = await Users.findByIdAndRemove(id);

    if (!userDelete) {
      return res.status(404).json({ error: userDelete });
    }

    res.status(200).json(userDelete);
  } else {
    return res.status(400).json("Access denied!");
  }
};

//  Update a User by ID
const updateUser = async (req, res) => {
  const jwt_token = req.cookies.jwt_token;

  if (jwt_token === undefined)
    return res.status(404).json("Please login first!");

  //   const decoded = decodeToken(jwt_token);

  const { id } = req.params;

  //   if (!mongoose.Types.ObjectId.isValid(id)) {
  //     return res.status(404).json({ error: "No such user" });
  //   }

  // const getUserDetails = await Users.findById(decoded.id);
  // const getHashPassword = getUserDetails.userPassword;

  const {
    userName,
    userEmail,
    userPassword,
    userConfirmPassword,
    userHeight,
    userWeight,
    userAge,
  } = req.body;

  //  get current password and compare with stored in db password hash for password change
  // const check = await bcrypt.compare(userPassword,getHashPassword);

  const data = {
    userName,
    // userEmail,
    userPassword,
    userHeight,
    userWeight,
    userAge,
  };
  // const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such user" });
  }

  try {
    const user = await Users.findByIdAndUpdate(id, data);
    return res.status(202).json(user);
  } catch (error) {
    return res.status(404).json(error);
  }
};

module.exports = {
  login,
  logout,
  getCurrentUser,
  signupUser,
  deleteUser,
  updateUser,
};
