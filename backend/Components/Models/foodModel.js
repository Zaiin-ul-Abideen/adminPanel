const mongoose = require("mongoose");

const foods = new mongoose.Schema(
  {
    foodName: {
      required: true,
      unique:true,
      type: String,
    },
    bestTimeToEat: {
      // required: true,
      type: String,
    },
    carbRatio: {
      // required: true,
      type: Number,
    },

    fatRatio: {
      // required: true,
      type: Number,
    },

    foodCalcium: {
      // required: true,
      type: Number,
    },

    foodCaloric: {
      // required: true,
      type: Number,
    },

    foodCarbs: {
      // required: true,
      type: Number,
    },

    foodCholesterol: {
      // required: true,
      type: Number,
    },

    foodDietaryFiber: {
      // required: true,
      type: Number,
    },

    foodFats: {
      // required: true,
      type: Number,
    },

    foodIron: {
      // required: true,
      type: Number,
    },

    foodMagnesium: {
      // required: true,
      type: Number,
    },

    foodPotassium: {
      // required: true,
      type: Number,
    },

    foodProtien: {
      // required: true,
      type: Number,
    },

    foodSaturatedFats: {
      // required: true,
      type: Number,
    },

    foodSugars: {
      // required: true,
      type: Number,
    },

    foodVitaminA: {
      // required: true,
      type: Number,
    },

    foodVitaminC: {
      // required: true,
      type: Number,
    },

    foodVitaminD: {
      // required: true,
      type: Number,
    },

    foodVitaminE: {
      // required: true,
      type: Number,
    },

    foodWater: {
      // required: true,
      type: Number,
    },

    foodZinc: {
      // required: true,
      type: Number,
    },

    protienRatio: {
      // required: true,
      type: Number,
    },
    // _id: {
    //   required: false,
    //   type: new mongoose.Schema.Types.ObjectId,
    // },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Food", foods);
