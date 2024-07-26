
const mongoose = require('mongoose');
const User = require('../Models/user');
const Model = mongoose.model('user')
const crypto = require('crypto')
const passport = require('passport');
require('dotenv').config()


const register = async (req, res) => {
    console.log("touching register api")
    console.log(req.body.name)
    console.log(req.body.email)
    console.log(req.body.password)
    console.log(req.body.registration_key)

    if (!req.body.name || !req.body.password || !req.body.email || !req.body.registration_key) {
        
        return res
            .status(400).send()
    }
    else if(req.body.registration_key != process.env.REGISTRATIONKEY){
        res.status(404).send()

    }
    else{
        const q = await Model.findOne({name: req.body.name}).exec()
        const qz = await Model.findOne({email: req.body.email}).exec()
        if(q || qz){
            console.log("previous user found:")
            const err = new Error("User Already Registered in database")
            res.status(400).json(err.message)
        }
        else{
            
            
            try{
                const newUser = new Model({
                    name: req.body.name,
                    email: req.body.email,
                })
                newUser.setPassword(req.body.password)
                console.log(newUser)
                await Model.create(newUser)

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
const login = async (req, res) => {
    console.log("touching login api")
    console.log(req.body.name)
    console.log(req.body.password)
    if (!req.body.name || !req.body.password) {
        console.log("request error: ")
        return res
            .status(401)
            .send({ "message": "All fields required" });
    }
    try{

        const z = await Model.findOne({name: req.body.name}).exec();

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