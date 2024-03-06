const { User, Event, UserFriends, UserEvents, sequelize } = require("../db/associations");
const { QueryTypes } = require('sequelize');



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
  }
  console.log('Request Body:\n', req.body);
  const { fullName, email, picture, phoneNum } = req.body;
  try{
    const user = await User.create({
      fullName: fullName,
      email: email,
      picture: picture,
      phoneNum: phoneNum
    })
    next();
  }  
  catch(error){
    next(createErr({
      method: 'postUser',
      type: 'Database Query Error for Posting User',
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

  console.log('Request Body:\n', req.body);
  const query = `
      SELECT * FROM Users 
      WHERE fullName = :fullName
  `;
  try{
      const results = await sequelize.query(query, {
          type: QueryTypes.SELECT,
          replacements: { fullName: req.body.fullName }
      });
      res.locals.success = 'success'
      next();
  }
  catch(error){
      next(createErr({
          method: 'getUser',
          type: 'Database Query Error for Getting User',
          err: error.toString()
      }));
  }
  next();
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
  
  // depending on what's being updated, I need to make a mutable query string
  const data = {
    userID: req.body.userID,
    fullName: req.body.fullName,
    email: req.body.email,
    picture: req.body.picture,
    phoneNum: req.body.phoneNum
  }

  // !need to fix updateController. Sequelize was not working

  // const arr = [ "fullName", "email", "picture", "phoneNum"];
  // const query = `
  // UPDATE Users SET
  // `
  // const replacementArr = [];

  // for(let i = 0; i < arr.length; i++){
  //   if(data[arr[i]]){
  //     replacementArr.push(arr[i]);
  //     query += ` ${arr[i]} = ?,`
  //   }
  // }

  // replacementArr.push(data[userID]);
  // query = query.slice(0, -1);
  // query += `WHERE userID = ?`;
  
  // try{
  //   await sequelize.query(
  //     query,
  //     {
  //       replacements: replacementArr,
  //       type: QueryTypes.UPDATE
  //     }
  //   )
  //   res.locals.success = 'success';
  //   next();
  // }
  // catch(error){
  //   next(createErr({
  //     method: 'patchUser',
  //     type: 'Database Query Error for Patching User',
  //     err: error.toString()
  //   }));
  // }


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
  console.log('Request Body:\n', req.body);
  const { fullName, email } = req.body;
  try{
    User.destroy({where: {fullName: fullName, email: email}});
    next();
  }
  catch(error){
    next(createErr({
      method: 'deleteUser',
      type: 'Database Query Error for Deleting User',
      err: error.toString()
    }))
  };
  // ? Or we can delete by userID, since they're unique. But that would require obtaining the userID in a query beforehand.
  // ? Unless it's stored somehow when the user logs
  // const { userID } = req.body;
  // const query = `
  //   DELETE FROM Users WHERE userID = ?
  // `
  // try{
  //   await sequelize.query(
  //     query,
  //     {
  //       replacements: [userID],
  //       type: QueryTypes.DELETE
  //     }
  //   );
  //   res.locals.success = 'success';
  //   next();
  // }
  // catch (error) {
  //   next(createErr({
  //     method: 'deleteUser',
  //     type: 'Database Query Error for Deleting User',
  //     err: error.toString()
  // }))
  // }

}


module.exports = { userController };