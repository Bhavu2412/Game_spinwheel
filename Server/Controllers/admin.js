const UserStorage = require("../Models/admin");
const express = require("express");
const router = express.Router();

router.post("/", (req, res, next) => {
  const name = req.body.name;
  const location = req.body.location;
  const user = new UserStorage({
    name: name,
    location: {
      type: "Point",
      coordinates: [location.latitude, location.longitude],
    },
  });

  user.save();
  res.status(200).json({ message: "Saved Successfully" });
});

module.exports = router;
