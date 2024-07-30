
const mongoose = require('mongoose');
const User = require('../Models/user');
const Model = mongoose.model('user')
const crypto = require('crypto')
const passport = require('passport');
require('dotenv').config()

//register new user api controller
const register = async (req, res) => {

    //check for valid request
    if (!req.body.name || !req.body.password || !req.body.email || !req.body.registration_key) {
        
        return res
            .status(400).send()
    }
    //check for proper registration key
    else if(req.body.registration_key != process.env.REGISTRATIONKEY){
        res.status(404).send()

    }
    else{
        //search database for user with those credentials
        const q = await Model.findOne({name: req.body.name}).exec()
        const qz = await Model.findOne({email: req.body.email}).exec()

        //if user found
        if(q || qz){
            console.log("previous user found:")
            const err = new Error("User Already Registered in database")
            res.status(400).json(err.message)
        }
        //if user not found
        else{
            
            
            try{
                //create new user 
                const newUser = new Model({
                    name: req.body.name,
                    email: req.body.email,
                })
                newUser.setPassword(req.body.password)
                console.log(newUser)
                await Model.create(newUser)

                //generate and send JSON web token for authentication
                const token = newUser.generateJwt()
                console.log("Registration Successful !! User: " + newUser.name + " created")
                res.status(200).json({token})
            }catch(err){
                console.log(err.message)
                
                res.status(401)
                .json(err.message)

            }
        }
    }
};

//login api handler
const login = async (req, res) => {

    //validate request params
    if (!req.body.name || !req.body.password) {
        console.log("request error: ")
        return res
            .status(401)
            .send({ "message": "All fields required" });
    }

    try{
        //get the user in the database
        const z = await Model.findOne({name: req.body.name}).exec();
        
        //validate password and generate json web token
        if (z.validPassword(req.body.password)){
                const token = z.generateJwt()
                res.status(200).json({token})
            }
    }catch(err){
        res.status(400).json(err.message)
        console.log(err.message)
    }
};
module.exports = {
    register,
    login
}