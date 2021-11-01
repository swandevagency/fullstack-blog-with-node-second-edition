// requiring the packages
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


module.exports = async (req, res) =>{
  const {identifier, password } = req.body

  // making sure that the data has been sent the correct way
  if(!identifier) {
    return res.status(400).send({
      message: "please provide your username"
    })
  }
  if(!password) {
    return res.status(400).send({
      message: "please provide your password"
    })
  }

  // making sure that the user exists
  const user = await mongoose.model('User').findOne({username : identifier});
  if(!user){
    return res.status(400).send('invalid credentials');
  }
  
  // validating password
  const passwordIsValid = await bcrypt.compare(password , user.password);
  if(!passwordIsValid){
    res.status(400).send({
      message: "invalid credentials"
    })
  }

  // generating the jwt token
  const {_id} = user;
  const token = await jwt.sign({_id}, jwt_key,{});
  
  res.status(200).send({
    token,
    message : 'welcome'
  })
}


