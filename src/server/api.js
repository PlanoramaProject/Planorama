const express = require("express");
const router = express.Router();
// const { User, Event, UserFriends, UserEvents } = require("./db/associations");

// Sample endpoint
router.get("/User", (req, res, next) => {
  console.log("sample User endpoitn");
  res.status(200);
});

module.exports = router;
