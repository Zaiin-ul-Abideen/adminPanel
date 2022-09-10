const mongoose = require("mongoose");

const users = new mongoose.Schema(
  {
    //  required check, giving validation error that's why I'm not using it here


    userName: {
      type: String,
      // required: true,
    },
    userEmail: {
      type: String,
      unique: true,
      lowercase: true,
      // required: true,
    },

    userPassword: {
      type: String,
      // required: true,
      minlength: 6,
    },

    userConfirmPassword: {
      type: String,
      // required: true,
      minlength: 6,
    },
    userHeight: {
      type: Number,

      // required: true,
    },

    userWeight: {
      type: Number,
      // required: true,
      minlength: 6,
    },

    userAge: {
      type: Number,
      // required: true,
      minlength: 6,
    },

    userDailyCarbsTarget: {
      type: Number,
      // required: true,
    },

    userDailyfatsTarget: {
      type: Number,
      // required: true,
    },

    userDailyProtiensTarget: {
      type: Number,
      // required: true,
    },

    userDailyCaloriesTarget: {
      type: Number,
      // required: true,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("User", users);
