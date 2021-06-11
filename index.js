const express = require("express");
require("dotenv").config();
const app = express();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/User");
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/user", userRouter);

mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true
  })
  .then(() => {
    console.log("Database connected...");
  })
  .catch((err) => {
    console.log("Connection failed...");
  });

app.listen(PORT, () => {
  console.log("express server started");
});
