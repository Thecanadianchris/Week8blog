const router = require("express").Router();
const { User } = require("../models");
const { signToken } = require("../utils/auth");





router.post("/", async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    const token = signToken(userData);
    res.status(200).json({ token, username: userData.username });
  } catch (err) {
    res.status(400).json(err);
  }
});







router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res.status(400).json({ message: "Incorrect email or password" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect email or password" });
      return;
    }

    const token = signToken(userData);
    res.status(200).json({ token, username: userData.username });
  } catch (err) {
    res.status(400).json(err);
  }
});






router.post("/logout", (req, res) => {
  res.status(204).end();
});

module.exports = router;