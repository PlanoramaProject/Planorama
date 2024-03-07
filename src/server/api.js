const express = require("express");
const router = express.Router();
const { eventController } = require("../server/controller/eventController");
// const { User, Event, UserFriends, UserEvents } = require("./db/associations");

// Sample endpoint
router.get("/User", (req, res, next) => {
  console.log("sample User endpoitn");
  res.status(200);
});

router.get("/v1/event/:eventID", eventController.getEvent, (req, res, next) => {
  res.status(200).json(res.locals.event);
});

router.post("/v1/event", eventController.createEvent, (req, res, next) => {
  return res.status(200).json(res.locals.event);
});
router.put("/v1/event", eventController.updateEvent, (req, res, next) => {
  res.status(200).json(res.locals.event);
});
router.delete("/v1/event", eventController.deleteEvent, (req, res, next) => {
  res.status(200);
});

module.exports = router;
