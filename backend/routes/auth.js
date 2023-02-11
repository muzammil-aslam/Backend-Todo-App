const express = require("express");
const routes = express.Router();
const User = require("../User");
const { body, validationResult } = require("express-validator");
const { updateOne } = require("../User");

routes.post(
  "/",
  [body("email").isEmail(), body("password").isLength({ min: 5 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const body = req.body;

    const dataSave = {
      name: body.name,
      email: body.email,
      password: body.password,
      date: new Date(),
      img: body.img,
    };

    const user = new User(dataSave);
    // User.findOne({
    //   email,
    //   password
    // })
    user
      .save()
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        console.log("user data not save");
        res.send(error.message);
      });
  }
);

routes.get("/", async (req, res) => {
  const a = await User.find({});
  res.send(a);
});

routes.delete("/", async (req, res) => {
  const body = req.body;
  const userId = body.userId;
  const deldata = await User.deleteOne({
    id: userId,
  });
  res.send(deldata);
});

routes.put("/", async (req, res) => {
  const body = req.body;
  const id = body.userId;
  const email = body.email;
  const password = body.password;

  const updat = await User.findByIdAndUpdate(id, {
    email: email,
    password: password,
  });
  res.send(updat);
});

module.exports = routes;
