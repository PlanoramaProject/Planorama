const express = require("express");
const router = express.Router();
const { eventController } = require("../server/controller/eventController");
const { User, Event, UserFriends, UserEvents } = require("./db/associations");
const { userController } = require('./controller/userController');
const { userFriendsController } = require('./controller/userFriendsController');

// user routes

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

// event routes

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

// userFriends controllers
router.get("/v1/userFriends", userFriendsController.getFriendsList, (req, res) => {
  console.log('got friends list')
  res.status(200).json(res.locals.friends);
})

router.post("/v1/userFriends", userFriendsController.addFriend, (req, res) => {
  console.log('userFriends addFriend succeeded')
  res.status(200).json({"success": true});
})

router.delete("/v1/userFriends", userFriendsController.deleteFriend, (req, res) => {
  console.log('deleted friend successfully');
  res.status(200).json({"success": true});
})


module.exports = router;