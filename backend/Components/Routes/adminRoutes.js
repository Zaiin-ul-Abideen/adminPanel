const express = require("express");
const router = express.Router();

const {
  login,
  logout,
  createAdmin,
  getCurrentAdmin,
  deleteAdmin,
  updateAdmin,
} = require("../Controllers/adminController");

router.get("/login", login); //Done
router.get("/logout", logout); //Done
router.get("/", getCurrentAdmin); // get Current Admin //Done
// router.get("/:id", getAdmin); // get a single Admin
router.post("/", createAdmin); // create a Admin  //Done
router.delete("/", deleteAdmin); // delete a Admin  //Done
router.patch("/", updateAdmin); // update a Admin

module.exports = router;
