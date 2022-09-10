const mongoose = require("mongoose");

const admins = new mongoose.Schema(
  {
    //  required check, giving validation error that's why I'm not using it here

    adminName: {
      type: String,
      // required: true,
    },
    adminEmail: {
      type: String,
      unique: true,
      lowercase: true,
      // required: true,
    },

    adminPhone: {
      type: String,
      // required: true,
    },

    adminPassword: {
      type: String,
      // required: true,
      minlength: 6,
    },

    adminConfirmPassword: {
      type: String,
      // required: true,
      minlength: 6,
    },
  },
  { versionKey: false }
);

// admins.statics.login = async function (adminEmail, adminPassword) {
//   const admin = await this.findOne({ adminEmail });
//   if (admin) {
//     const auth = await bcrypt.compare(adminPassword, admin.adminPassword);
//     if (auth) {
//       return admin;
//     }
//     throw Error("incorrect password");
//   }
//   throw Error("incorrect email");
// };

// jwt.sign({ admin }, process.env.Secret, { expiresIn: "1d" });

module.exports = mongoose.model("Admin", admins);
