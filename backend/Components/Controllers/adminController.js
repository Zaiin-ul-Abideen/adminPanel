const Admins = require("../Models/adminModel");
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

// Get Cuurent Admin

const getCurrentAdmin = async (req, res) => {
  const jwt_token = req.cookies.jwt_token;
  if (jwt_token != undefined) {
    const decoded = decodeToken(jwt_token);

    if (!mongoose.Types.ObjectId.isValid(decoded.id)) {
      return res.status(404).json({ error: "No such admin" });
    }

    const admin = await Admins.findById(decoded.id);

    if (!admin) {
      return res.status(404).json({ error: admin });
    }
    res.status(200).json(admin);
  } else {
    return res.status(404).json("You are not logged in!");
  }
};

//  Create a New Admin

const createAdmin = async (req, res) => {
  let {
    adminName,
    adminEmail,
    adminPhone,
    adminPassword,
    adminConfirmPassword,
  } = req.body;

  if (adminPassword.length < 6)
    return res.status(400).json("too short password");
  if (adminPassword !== adminConfirmPassword)
    return res.status(400).json("Oops! passwords not matched");
  const salt = await bcrypt.genSalt();
  adminPassword = await bcrypt.hash(adminPassword, salt);

  const admin = await Admins.create({
    adminName,
    adminEmail,
    adminPhone,
    adminPassword,
    // adminConfirmPassword,
  });

  try {
    const token = createToken(admin._id,'admin');
    res.cookie("jwt_token", token, {
      httpOnly: true,
      // expiresIn: "2d",
      maxAge: 11000 * 24,
    });

    res.status(201).json({ admin: admin._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//  Delete a Admin by ID
const deleteAdmin = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such admin" });
  }

  const adminDelete = await Admins.findByIdAndRemove(id);

  if (!adminDelete) {
    return res.status(404).json({ error: adminDelete });
  }

  res.status(200).json(adminDelete);
};

//  Update a Admin by ID
const updateAdmin = async (req, res) => {
  const jwt_token = req.cookies.jwt_token;

  if (jwt_token === undefined)
    return res.status(404).json("Please login first!");

  const decoded = decodeToken(jwt_token);

  if (!mongoose.Types.ObjectId.isValid(decoded.id)) {
    return res.status(404).json({ error: "No such admin" });
  }

  // const getAdminDetails = await Admins.findById(decoded.id);
  // const getHashPassword = getAdminDetails.adminPassword;

  const {
    adminName,
    adminEmail,
    adminPhone,
    adminPassword,
    adminConfirmPassword,
  } = req.body;

  //  get current password and compare with stored in db password hash for password change
  // const check = await bcrypt.compare(adminPassword,getHashPassword);

  const data = {
    adminName,
    // adminEmail,
    adminPhone,
    adminPassword,
    adminConfirmPassword,
  };
  // const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(decoded.id)) {
    return res.status(404).json({ error: "No such admin" });
  }

  const admin = await Admins.findByIdAndUpdate(decoded.id, data);

  res.status(202).json(admin);
};

const logout = (req, res) => {
  if (req.cookies.jwt_token) {
    try {
      res.clearCookie("jwt_token");
      res.status(200).json("Admin logged out");
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(400).json("No session to logout!");
  }
};

// login an Admin
const login = async (req, res) => {
  if (req.cookies.jwt_token) {
    return res.status(400).json("Admin already logged in");
  }

  const { adminEmail, adminPassword } = req.body;
  try {
    const admin = await Admins.findOne({ adminEmail });

    let credentialsMatch = await bcrypt.compare(
      adminPassword,
      admin.adminPassword
    );

    if (credentialsMatch) {
      const token = createToken(admin._id, "admin");
      res.cookie("jwt_token", token, {
        httpOnly: true,
        maxAge: 11000 * 24,
      });

      res.status(200).json({ adminEmail, token });
    } else {
      res.status(404).json("Credentials not matched");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  login,
  logout,
  getCurrentAdmin,
  createAdmin,
  deleteAdmin,
  updateAdmin,
};
