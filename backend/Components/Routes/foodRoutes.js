const express = require("express");
const router = express.Router();

const {
  createFood,
  getFoods,
  getFood,
  deleteFood,
  updateFood,
} = require("../Controllers/foodController");

router.get("/", getFoods); // get All foods     Done
router.get("/:id", getFood); // get a single food     Done
router.post("/", createFood); // create a food           Done
router.delete("/:id", deleteFood); // delete a food     Done
router.patch("/:id", updateFood); // update a food

module.exports = router;
