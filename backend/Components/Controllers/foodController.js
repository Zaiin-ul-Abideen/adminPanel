const Foods = require("../Models/foodModel");
const Admins = require("../Models/adminModel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const decodeToken = (token) => {
  var decode = jwt.verify(token, process.env.Secret);
  return { id: decode._id, role: decode.role };
};

//  Get All Foods
const getFoods = async (req, res) => {
  const jwt_token = req.cookies.jwt_token;
  if (jwt_token != undefined) {
    const decoded = decodeToken(jwt_token);

    if (!mongoose.Types.ObjectId.isValid(decoded.id)) {
      return res.status(404).json({ error: "No such admin" });
    }

    const foods = await Foods.find({}).sort({ createdAt: -1 });
    res.status(200).json(foods);
  } else {
    return res.status(404).json("Please login first!");
  }
};

//  Get a Single Food by ID
const getFood = async (req, res) => {
  const jwt_token = req.cookies.jwt_token;
  if (jwt_token === undefined)
    return res.status(400).json("Please Login first!");

  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such food" });
    }

    const food = await Foods.findById(id);

    if (!food) {
      return res.status(404).json({ error: food });
    }
    res.status(200).json(food);
  } catch (error) {
    return res.status(400).json("Please Login first!");
  }
};

//  Create a New Food
const createFood = async (req, res) => {
  const jwt_token = req.cookies.jwt_token;
  try {
    var decoded = jwt.verify(jwt_token, process.env.Secret);
    if (!decoded) return res.status(400).json("Please loggin first!");

    if (decoded.role == "admin") {
      const {
        foodName,
        bestTimeToEat,
        carbRatio,
        fatRatio,
        foodCalcium,
        foodCaloric,
        foodCarbs,
        foodCholesterol,
        foodDietaryFiber,
        foodFats,
        foodIron,
        foodMagnesium,
        foodPotassium,
        foodProtien,
        foodSaturatedFats,
        foodSugars,
        foodVitaminA,
        foodVitaminC,
        foodVitaminD,
        foodVitaminE,
        foodWater,
        foodZinc,
        protienRatio,
      } = req.body;

      const food = await Foods.create({
        foodName,
        bestTimeToEat,
        carbRatio,
        fatRatio,
        foodCalcium,
        foodCaloric,
        foodCarbs,
        foodCholesterol,
        foodDietaryFiber,
        foodFats,
        foodIron,
        foodMagnesium,
        foodPotassium,
        foodProtien,
        foodSaturatedFats,
        foodSugars,
        foodVitaminA,
        foodVitaminC,
        foodVitaminD,
        foodVitaminE,
        foodWater,
        foodZinc,
        protienRatio,
      });

      food
        .save()
        .then((newFood) => {
          res.json(food);
        })
        .catch((error) => {
          return res.status(400).send({ error: error.message });
        });
    } else return res.status(400).json("You are not Admin!");
  } catch (error) {
    res.status(400).json("Please Login first!");
  }
};

//  Delete a Food by ID
const deleteFood = async (req, res) => {
  const jwt_token = req.cookies.jwt_token;
  try {
    var decoded = jwt.verify(jwt_token, process.env.Secret);
    if (decoded.role !== "admin")
      return res.status(404).json("You are not Admin!");

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such food" });
    }

    const foodDelete = await Foods.findByIdAndRemove(id);

    if (!foodDelete) {
      return res.status(404).json({ error: foodDelete });
    }

    res.status(200).json(foodDelete);
  } catch (error) {
    return res.status(400).json("Please Login first");
  }
};

//  Update a Food by ID
const updateFood = async (req, res) => {
  const jwt_token = req.cookies.jwt_token;
  if (jwt_token === undefined)
    return res.status(400).json("Please Login first!");

  var decoded = jwt.verify(jwt_token, process.env.Secret);
  if (decoded.role !== "admin")
    return res.status(404).json("You are not Admin!");

  const {
    foodName,
    bestTimeToEat,
    carbRatio,
    fatRatio,
    foodCalcium,
    foodCaloric,
    foodCarbs,
    foodCholesterol,
    foodDietaryFiber,
    foodFats,
    foodIron,
    foodMagnesium,
    foodPotassium,
    foodProtien,
    foodSaturatedFats,
    foodSugars,
    foodVitaminA,
    foodVitaminC,
    foodVitaminD,
    foodVitaminE,
    foodWater,
    foodZinc,
    protienRatio,
  } = req.body;

  const data = {
    foodName,
    bestTimeToEat,
    carbRatio,
    fatRatio,
    foodCalcium,
    foodCaloric,
    foodCarbs,
    foodCholesterol,
    foodDietaryFiber,
    foodFats,
    foodIron,
    foodMagnesium,
    foodPotassium,
    foodProtien,
    foodSaturatedFats,
    foodSugars,
    foodVitaminA,
    foodVitaminC,
    foodVitaminD,
    foodVitaminE,
    foodWater,
    foodZinc,
    protienRatio,
  };
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such food" });
  }

  const food = await Foods.findByIdAndUpdate(id, data);
  res.send(food);

  if (!food) {
    return res.status(404).json({ error: "No such food" });
  }

  res.status(200).json(food);
};

module.exports = {
  getFoods,
  getFood,
  createFood,
  deleteFood,
  updateFood,
};
