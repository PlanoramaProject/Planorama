const { User, Event, UserFriends, UserEvents, sequelize } = require("../models/index");
const { QueryTypes } = require('sequelize');

function createErr(errInfo){
  const { method, type, err } = errInfo;
  return {
      log: `userFriendsController.${method} ${type}: ERROR: ${typeof err === 'object'  ? JSON.stringify(err) : err}`,
      message: { err: `Error occurred in userFirnedsController.${method}. Check server logs for more details.` }
  };
}

const userFriendsController = {};

// add a friend
userFriendsController.addFriend = (req, res, next) => {
  if(!req.body){
    return next(createErr({
        method: 'addFriend',
        type: 'Failed to get data from req.body',
        err: 'userFriendsController.addFriend: ERROR: Incorrect data received.'
    }))
  };
  try{
    UserFriends.create({
      userID: req.body.userID,
      friendID: req.body.friendID
    });
    next();
  }
  catch(error){
    next(createErr({
      method: 'addFriend',
      type: 'Database Query Error for Adding Friend',
      err: error.toString()
    }));
  }
}


// delete a friend
userFriendsController.deleteFriend = (req, res, next) => {
  if(!req.body){
    return next(createErr({
        method: 'deleteFriend',
        type: 'Failed to get data from req.body',
        err: 'userFriendsController.deleteFriend: ERROR: Incorrect data received.'
    }))
  };
  try{
    UserFriends.destroy({where: {userID: req.body.userID, friendID: req.body.friendID}});
    next();
  }
  catch(error){
    next(createErr({
      method: 'deleteFriend',
      type: 'Database Query Error for Deleting Friend',
      err: error.toString()
    }));
  };
};

// get list of friends
userFriendsController.getFriendsList = async (req, res, next) => {
  if(!req.body){
    return next(createErr({
        method: 'getFriendsList',
        type: 'Failed to get data from req.body',
        err: 'userFriendsController.getFriendsList: ERROR: Incorrect data received.'
    }))
  };
  try{
    const result = await sequelize.query('SELECT * FROM "UserFriends" WHERE "userID" = :userID', {
      replacements: { userID: req.body.userID }
    });
    const friendsArr = result[0];
    res.locals.friends = {};
    for(let i = 0; i < friendsArr.length; i++){
      const name = await User.findOne({
        where: { userID: friendsArr[i].friendID }, 
        attributes: ['fullName', 'userID']})
      res.locals.friends[name.fullName] = name.userID;
    }
    next();
  }
  catch(error){
    next(createErr({
      method: 'getFriendsList',
      type: 'Database Query Error for Getting the Friends List',
      err: error.toString()
    }));
  };
}

module.exports = { userFriendsController };