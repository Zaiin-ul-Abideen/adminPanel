const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const adminRoutes = require("./Components/Routes/adminRoutes");
const foodRoutes = require("./Components/Routes/foodRoutes");
const userRoutes = require("./Components/Routes/userRoutes");
const app = express();

require("dotenv").config();

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  console.log(req);
  next();
});

//Routes
app.use("/api/admin", adminRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/user", userRoutes);

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Connected Successfully, Port", process.env.PORT);
    });
  })
  .catch((error) => console.log(error));
