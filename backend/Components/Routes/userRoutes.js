const express = require("express");
const router = express.Router();

const {
  login,
  logout,
  getCurrentUser,
  signupUser,
  deleteUser,
  updateUser,
} = require("../Controllers/UserController");

router.get("/login", login); //Done
router.get("/logout", logout); //Done
router.get("/", getCurrentUser); // get Current User //Done
router.post("/", signupUser); // create a User  //Done
router.delete("/", deleteUser); // delete a User  //Done
router.patch("/:id", updateUser); // update a User

module.exports = router;
