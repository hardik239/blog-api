const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./routes/index");
const PORT = process.env.PORT || 5000;

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(router);

function connectToDB() {
  mongoose
    .connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
    .then(() => {
      console.log("Database connected...");
    })
    .catch((err) => {
      console.log("Connection failed...");
      connectToDB();
    });
}

connectToDB();

app.listen(PORT, () => {
  console.log("express server started");
});
