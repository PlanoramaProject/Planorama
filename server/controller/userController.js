const { User, Event, UserFriends, UserEvents, sequelize } = require("../models/index");
const { QueryTypes } = require('sequelize');
const argon2 = require('argon2');


function createErr(errInfo){
  const { method, type, err } = errInfo;
  return {
      log: `userController.${method} ${type}: ERROR: ${typeof err === 'object'  ? JSON.stringify(err) : err}`,
      message: { err: `Error occurred in userController.${method}. Check server logs for more details.` }
  };
}
const userController = {};

// create a user
userController.createUser = async (req, res, next) => {
  if(!req.body){
    return next(createErr({
        method: 'getUser',
        type: 'Failed to get data from req.body',
        err: 'userController.getUser: ERROR: Incorrect data received.'
    }))
  };
  if(res.locals.alreadyExists){
    console.log('user already exists, skipping create')
    return next()
  }
  try{
    const hash = await argon2.hash(req.body.password);
    const user = await User.create({
      fullName: req.body.fullName,
      password: hash,
      email: req.body.email,
      picture: req.body.picture,
      phoneNum: req.body.phoneNum
    })
    next();
  }  
  catch(error){
    next(createErr({
      method: 'createUser',
      type: 'Database Query Error for Creating User',
      err: error.toString()
    }));
  }
}

// get a user
userController.getUser = async (req, res, next) => {
  if(!req.body){
      return next(createErr({
          method: 'getUser',
          type: 'Failed to get data from req.body',
          err: 'userController.getUser: ERROR: Incorrect data received.'
      }))
  }
  try{
      const user = await User.findOne({where: {userID: req.body.userID}});
      if(user === null){
        res.locals.doesNotExist = true;
        return next();
      }
      res.locals.user = {
        userID: user.dataValues.userID,
        fullName: user.dataValues.fullName,
        email: user.dataValues.email,
        picture: user.dataValues.picture,
        phoneNum: user.dataValues.phoneNum
      };
      res.locals.doesNotExist = false;
      next();
  }
  catch(error){
      next(createErr({
          method: 'getUser',
          type: 'Database Query Error for Getting User',
          err: error.toString()
      }));
  }
}

// get user to see if user already exists
userController.userAlreadyExists = async (req, res, next) => {
  if(!req.body){
    return next(createErr({
        method: 'userAlreadyExists',
        type: 'Failed to get data from req.body',
        err: 'userController.userAlreadyExists: ERROR: Incorrect data received.'
    }))
  }
  try{
    const user = await User.findOne({where: {email: req.body.email}});
    if(!user || user === null){
      res.locals.alreadyExists = false;
      return next()
    }
    res.locals.alreadyExists = true;
    return next();
  }
  catch(error){
    next(createErr({
        method: 'userAlreadyExists',
        type: 'Database Query Error for Getting User',
        err: error.toString()
    }));
  }
}

// update a user's info
userController.updateUser = async (req, res, next) => {
  if(!req.body){
    return next(createErr({
        method: 'getUser',
        type: 'Failed to get data from req.body',
        err: 'userController.getUser: ERROR: Incorrect data received.'
    }))
  }
  console.log('Request Body:\n', req.body);

  const data = {
  userID: req.body.userID,
  fullName: req.body.fullName,
  password: req.body.password,
  email: req.body.email,
  picture: req.body.picture,
  phoneNum: req.body.phoneNum
  };

  const updateObj = {};
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined) {
      updateObj[key] = value;
    }
  });

  try {
    const result = await User.update(updateObj, {
      where: { userID: req.body.userID }
    });
    console.log(result);
    if (result[0] === 1) {
      res.locals.message = 'changes were made'
      next();
    } 
    else {
      res.locals.message = 'changes could not be made, could not find userID'
      next();
    }
  } 
  catch(error){
    next(createErr({
        method: 'updateUser',
        type: 'Database Query Error for Updating User',
        err: error.toString()
    }));
  }
}

// delete a user
userController.deleteUser = async (req, res, next) => {
  if(!req.body){
    return next(createErr({
        method: 'getUser',
        type: 'Failed to get data from req.body',
        err: 'userController.getUser: ERROR: Incorrect data received.'
    }))
  }
  if(res.locals.doesNotExist){
    return res.status(200).json({doesNotExist: true})
  }
  try{
    User.destroy({where: {userID: req.body.userID}});
    next();
  }
  catch(error){
    next(createErr({
      method: 'deleteUser',
      type: 'Database Query Error for Deleting User',
      err: error.toString()
    }))
  };
}

userController.getAll = async (req, res, next) => {
  if(!req.body){
    return next(createErr({
        method: 'getAll',
        type: 'Failed to get data from req.body',
        err: 'userController.getAll: ERROR: Incorrect data received.'
    }))
  }
  try{
    res.locals.users = await User.findAll();
    next()
  }
  catch(error){
    next(createErr({
      method: 'getAll',
      type: 'Database Query Error for Get All',
      err: error.toString()
    }))
  };
}

module.exports = { userController };