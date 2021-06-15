const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/User");
const postRouter = require("./routes/Post");
const PORT = process.env.PORT || 5000;

const uniqueSlug = require("unique-slug");

const app = express();
// console.log(uniqueSlug("/How To Create Website Using Html Css/ "));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/user", userRouter);
app.use("/post", postRouter);

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
