const express = require("express");
const router = express.Router();
const { eventController } = require("../server/controller/eventController");
const { User, Event, UserFriends, UserEvents } = require("./db/associations");
const { userController } = require('./controllers/userController');


router.get("/v1/user", userController.getUser, (req, res) => {
  res.status(200).json(res.locals.user);
});

router.get("/v1/user/all", async (req,res) => {
  const users = await User.findAll();
  res.status(200).send(users);
})

router.post("/v1/user", 
  userController.userAlreadyExists, 
  userController.createUser, 
  (req, res, next) => {
    if(res.locals.alreadyExists){
      return res.status(200).json({userAlreadyExists: true})
    }
    else{
      return res.status(200).send('create was a success');
    }
});

router.delete("/v1/user", userController.getUser, userController.deleteUser, (req, res) => {
  // in the middleware chain, this route will return {doesNotExist: true} if the userID cannot be found
  res.status(200).send('delete was a success');
})

router.patch("/v1/user", userController.updateUser, (req, res) => {
  res.status(200).send(res.locals.message)
});

router.get("/v1/event/:eventID", eventController.getEvent, (req, res, next) => {
  res.status(200).json(res.locals.event);
});

router.post("/v1/event", eventController.createEvent, (req, res, next) => {
  console.log('post reached')
  return res.status(200).json(res.locals.event);
});
router.put("/v1/event", eventController.updateEvent, (req, res, next) => {
  res.status(200).json(res.locals.event);
});
router.delete("/v1/event", eventController.deleteEvent, (req, res, next) => {
  res.status(200);
});

router.post('/test', (req, res, next) => {
  console.log('test worked');
  res.sendStatus(200);
})

module.exports = router;