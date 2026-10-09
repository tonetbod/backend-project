require("dotenv").config();

const express = require("express");
const jreg = require("./jreg");
const jlogin = require("./jlogin");
const jauth = require("./jauth");

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.post("/register", jreg);
app.post("/login", jlogin);

app.get("/profile", jauth, (req, res) => {
  res.json({
    message: "Protected profile",
    user: req.user
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});