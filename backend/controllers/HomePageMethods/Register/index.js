// requiring packages

const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

module.exports = async (req, res) =>{
    const body = req.body;
    //making sure that data provided compeletly
    if(!body.username){
        res.status(400).send({
            message : "please provide a username"
        })
        return;
    };
    if(!body.email){
        res.status(400).send({
            message : "please provide an email"
        })
        return;
    };
    if(!body.password){
        res.status(400).send({
            message : "please provide a password"
        })
        return;
    };

    // checking username and email being unique

    const isUsernameTakne = await mongoose.model('User').findOne({username : body.username});
    if(isUsernameTakne){
        res.status(400).send({
            message : 'this username has been taken'
        })
        return;
    };

    const isEmailTaken = await mongoose.model('User').findOne({email : body.email});
    if(isEmailTaken){
        res.status(400).send({
            message : 'this email has been taken'
        })
        return;
    };
    // creating user model and storing user in db
    const user = new mongoose.model('User')(body);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user.save().then((response) => res.status(200).send({
        response,
        message : "successfully registered"
    }));
}