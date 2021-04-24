const router = require("express").Router();
const User = require("../models/User");
const Company = require("../models/Company");

router.get("/:id", async (req, res) => {
  // res.sendFile(__dirname + "/signup.html");
  const id = req.params.id;

  const user = (await Company.findById(id)) || (await User.findById(id));

  if (!user) {
    res.send({ message: err});
  }

  try {
    res.send(user);
  } catch (err) {
    console.log("cannot send user");
  }
});

module.exports = router;
