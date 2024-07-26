const mongoose = require('mongoose');
const message = require('../Models/message');
const Model = mongoose.model('message');

const addMessage = async (req, res) => {

    console.log(req.body.author)
    console.log(req.body.message)
    const currentTime = new Date()
    const trip = await Model.create({
        author: req.body.author,
        time: currentTime,
        message: req.body.message,
        timeStamp: currentTime.toLocaleTimeString('en-US', {weekday: 'long', hour: '2-digit', minute: '2-digit'})
      })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.send(err)
      });
  };
  
const getMessages = async(req, res) => {
    const z = await Model
        .find({}).sort('-time').exec()
        .exec()
    
    if(!z){
        return res
            .status(404)
            .json(err)
    }
    else{
        return res
            .status(200)
            .json(z)
    }
}

const getLast10 = async(req, res) => {

    const z = await Model.find({}).sort('-time')

    if(!z){
        return res
            .status(404)
            .json(err)
    }
    else{
        return res
            .status(200)
            .json(z)
    }
}

const getOtherMessages = async(req, res) => {
    let homeAuthor = req.params.homeAuthor

    const q = await Model
    .find({}).where('author').ne(homeAuthor)
    .exec()

    if(!q){
        return res
            .status(404)
            .json(err);

    }
    else{
        return res
        .status(200)
        .json(q);
    }

}

module.exports = {
    addMessage,
    getMessages,
    getLast10,
    getOtherMessages
};

