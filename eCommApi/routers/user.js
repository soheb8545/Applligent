const express = require("express");
const User = require("../models/user");
const Auth = require("../middleware/auth");
const axios = require("axios");
const { token } = require("morgan");

const router = new express.Router();

//signup Login
router.post("/index.ejs", async (req, res) => {
  if (req.body.name) {
    const data = req.body;
    const user = new User(data);
    console.log(data);

    try {
      await user.save();
      const token = await user.generateAuthToken();
      // res.status(201).send({user, token})
      axios
        .get("http://localhost:4000/items")
        .then(function (response) {
          console.log(token);
          res.render("index", { data: response.data, token: token });
        })
        .catch((err) => {
          res.send(err);
        });
      // res.status(201).render('index')
    } catch (error) {
      res.status(400).send("Unsuccesfull Signin Attempt, Please Try Again With Differernt Email");
    }
  } else {
    try {
      const user = await User.findByCredentials(
        req.body.email,
        req.body.password
      );
      const token = await user.generateAuthToken();

      axios
        .get("http://localhost:4000/items")
        .then(function (response) {
          // console.log(token);
          res.render("index", { data: response.data, token: token });
        })
        .catch((err) => {
          res.send(err);
        });

      // res.send({ user, token})
    } catch (error) {
      res.status(400).send("Unsuccesfull Login Attempt, Please Try Again");
    }
  }
});



//logout
router.post("/users/logout", Auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.user.save();
    res.send("Logout Sucessfull");
  } catch (error) {
    res.status(500).send("Logout failed ");
  }
});

module.exports = router;
